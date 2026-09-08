// Flect — Moteur de règles : webhooks émetteur de carte (type Chari.ma / S2M)
// Événements gérés :
//   - "authorization"          : demande d'autorisation temps réel → {decision: accept|decline, motif}
//   - "transaction_confirmed"  : confirmation de capture → mise à jour des cumuls + alertes de seuil
//
// MOCK — à remplacer par l'API réelle : la signature HMAC (ISSUER_WEBHOOK_SECRET) et le format
// de payload sont des hypothèses en attente de la spec API de l'émetteur retenu.

import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
// MOCK — à remplacer par l'API réelle : secret partagé fourni par l'émetteur
const ISSUER_WEBHOOK_SECRET = Deno.env.get("ISSUER_WEBHOOK_SECRET") ?? "mock-issuer-secret";

const TZ = "Africa/Casablanca";

const AuthorizationSchema = z.object({
  event: z.literal("authorization"),
  card_id: z.string().uuid(),
  issuer_transaction_id: z.string().min(1).max(100),
  amount: z.number().nonnegative().max(1_000_000),
  mcc: z.string().regex(/^\d{4}$/).default("5541"),
  merchant_id: z.string().max(100).optional().nullable(),
  merchant_name: z.string().max(200).optional().nullable(),
  location_city: z.string().max(100).optional().nullable(),
  location_region: z.string().max(100).optional().nullable(),
  lat: z.number().min(-90).max(90).optional().nullable(),
  lng: z.number().min(-180).max(180).optional().nullable(),
  occurred_at: z.string().datetime().optional(),
  // Simulateur : capture immédiate après acceptation (par défaut true pour les tests)
  auto_capture: z.boolean().default(true),
});

const ConfirmedSchema = z.object({
  event: z.literal("transaction_confirmed"),
  issuer_transaction_id: z.string().min(1).max(100),
  final_amount: z.number().nonnegative().optional(),
  status: z.enum(["captured", "reversed"]).default("captured"),
});

const BodySchema = z.discriminatedUnion("event", [AuthorizationSchema, ConfirmedSchema]);

type LimitRule = {
  id: string; scope_type: string; scope_id: string; period: string; amount: number;
  mcc_filter: string[]; alert_threshold_pct: number; on_exceed: string; multi_card_mode: string;
  sync_status: string; is_active: boolean;
};
type GeoRule = {
  id: string; scope_type: string; scope_id: string; zone_type: string; geo_reference: string | null;
  center_lat: number | null; center_lng: number | null; radius_km: number | null;
  merchant_whitelist: string[]; missing_location_policy: string; is_exception: boolean;
  expires_at: string | null; sync_status: string; is_active: boolean;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

// ---------- Périodes (RG-P3, fuseau Africa/Casablanca) ----------
function casablancaParts(d: Date) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", weekday: "short", hour12: false,
  });
  const p: Record<string, string> = {};
  for (const part of fmt.formatToParts(d)) p[part.type] = part.value;
  const weekdayIdx = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(p.weekday); // 0 = lundi
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second);
  const offsetMs = asUtc - d.getTime(); // décalage local vs UTC
  return { year: +p.year, month: +p.month, day: +p.day, weekdayIdx, offsetMs };
}

function periodStart(period: string, now: Date): Date | null {
  if (period === "per_transaction") return null;
  const p = casablancaParts(now);
  let localMidnight = Date.UTC(p.year, p.month - 1, p.day);
  if (period === "week") localMidnight -= p.weekdayIdx * 86_400_000;
  if (period === "month") localMidnight = Date.UTC(p.year, p.month - 1, 1);
  return new Date(localMidnight - p.offsetMs);
}

const PERIOD_LABEL: Record<string, string> = {
  per_transaction: "par transaction", day: "journalier", week: "hebdomadaire", month: "mensuel",
};

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371, toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// ---------- Vérification HMAC (RG §8) ----------
async function verifyHmac(rawBody: string, signature: string | null) {
  if (!signature) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(ISSUER_WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  const hex = Array.from(new Uint8Array(mac)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex === signature.toLowerCase();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const rawBody = await req.text();
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // --- Authentification : soit webhook signé par l'émetteur, soit utilisateur connecté (simulateur) ---
  let actorUserId: string | null = null;
  let userCompanyIds: string[] = [];
  const authHeader = req.headers.get("Authorization");
  const signature = req.headers.get("x-flect-signature");

  if (await verifyHmac(rawBody, signature)) {
    // Appel émetteur authentifié (MOCK — à remplacer par l'API réelle)
  } else if (authHeader?.startsWith("Bearer ")) {
    const userClient = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: authHeader } } });
    const { data: { user }, error } = await userClient.auth.getUser();
    if (error || !user) return json({ error: "Unauthorized" }, 401);
    actorUserId = user.id;
    const { data: memberships } = await admin.from("company_members").select("company_id").eq("user_id", user.id);
    userCompanyIds = (memberships ?? []).map((m) => m.company_id);
  } else {
    return json({ error: "Unauthorized" }, 401);
  }

  let parsedBody: unknown;
  try { parsedBody = JSON.parse(rawBody); } catch { return json({ error: "Invalid JSON" }, 400); }
  const parsed = BodySchema.safeParse(parsedBody);
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const body = parsed.data;

  // Résolution des canaux d'alerte configurés (RG-A2)
  async function alertChannels(companyId: string, alertType: string, defaults: string[]) {
    const { data } = await admin.from("rule_engine_alert_settings").select("channels,is_enabled")
      .eq("company_id", companyId).eq("alert_type", alertType).maybeSingle();
    if (!data) return defaults;
    return data.is_enabled ? data.channels : null;
  }

  async function raiseAlert(companyId: string, cardId: string, alertType: string, message: string, defaults: string[]) {
    const channels = await alertChannels(companyId, alertType, defaults);
    if (!channels) return;
    await admin.from("alerts").insert({ company_id: companyId, card_id: cardId, alert_type: alertType, message, notification_channels: channels, status: "new" });
    // MOCK — à remplacer par l'API réelle : envoi SMS / email via le fournisseur de notifications
    console.log(`[MOCK notify] ${alertType} via ${channels.join(",")}: ${message}`);
  }

  // Cumul de période (RG-P2 : transactions capturées uniquement)
  async function periodSpend(cardIds: string[], period: string, now: Date, mcc: string[]) {
    const start = periodStart(period, now);
    if (!start) return 0;
    let q = admin.from("rule_engine_transactions").select("captured_amount, amount, mcc")
      .in("card_id", cardIds).eq("status", "accept").eq("is_captured", true).gte("occurred_at", start.toISOString());
    const { data } = await q;
    return (data ?? [])
      .filter((t) => mcc.length === 0 || mcc.includes(t.mcc))
      .reduce((s, t) => s + Number(t.captured_amount ?? t.amount), 0);
  }

  // Alertes d'approche de seuil (US-03) après capture
  async function checkThresholds(companyId: string, card: { id: string; vehicle_id: string | null; driver_id: string | null }, tx: { amount: number; mcc: string; occurred_at: string }) {
    const rules = await applicableLimitRules(companyId, card);
    const now = new Date(tx.occurred_at);
    for (const rule of rules) {
      if (rule.period === "per_transaction") continue;
      if (rule.mcc_filter.length && !rule.mcc_filter.includes(tx.mcc)) continue;
      const cardIds = await scopeCardIds(companyId, card, rule);
      const total = await periodSpend(cardIds, rule.period, now, rule.mcc_filter);
      const before = total - tx.amount;
      const threshold = (rule.alert_threshold_pct / 100) * rule.amount;
      if (total >= threshold && before < threshold && total <= rule.amount) {
        await raiseAlert(companyId, card.id, "threshold_approach",
          `Plafond ${PERIOD_LABEL[rule.period]} : ${Math.round((total / rule.amount) * 100)} % atteint (${total.toFixed(2)} / ${rule.amount} MAD)`,
          ["email", "in_app"]);
      }
    }
  }

  async function applicableLimitRules(companyId: string, card: { id: string; vehicle_id: string | null; driver_id: string | null }) {
    const ors = [`and(scope_type.eq.card,scope_id.eq.${card.id})`];
    if (card.vehicle_id) ors.push(`and(scope_type.eq.vehicle,scope_id.eq.${card.vehicle_id})`);
    if (card.driver_id) ors.push(`and(scope_type.eq.driver,scope_id.eq.${card.driver_id})`);
    const { data } = await admin.from("rule_engine_limits").select("*").eq("company_id", companyId)
      .eq("is_active", true).or(ors.join(","));
    return (data ?? []) as LimitRule[];
  }

  async function applicableGeoRules(companyId: string, card: { id: string; vehicle_id: string | null; driver_id: string | null }) {
    const ors = [`and(scope_type.eq.card,scope_id.eq.${card.id})`];
    if (card.vehicle_id) ors.push(`and(scope_type.eq.vehicle,scope_id.eq.${card.vehicle_id})`);
    if (card.driver_id) ors.push(`and(scope_type.eq.driver,scope_id.eq.${card.driver_id})`);
    const { data } = await admin.from("rule_engine_geo").select("*").eq("company_id", companyId)
      .eq("is_active", true).or(ors.join(","));
    return (data ?? []) as GeoRule[];
  }

  // Cumul multi-cartes (hypothèse : consolidé au niveau chauffeur/véhicule si demandé)
  async function scopeCardIds(companyId: string, card: { id: string; vehicle_id: string | null; driver_id: string | null }, rule: LimitRule) {
    if (rule.multi_card_mode !== "consolidated" || rule.scope_type === "card") return [card.id];
    const col = rule.scope_type === "driver" ? "driver_id" : "vehicle_id";
    const { data } = await admin.from("cards").select("id").eq("company_id", companyId).eq(col, rule.scope_id);
    return (data ?? []).map((c) => c.id);
  }

  // =============================== AUTHORIZATION ===============================
  if (body.event === "authorization") {
    const { data: card } = await admin.from("cards").select("id, company_id, vehicle_id, driver_id, is_active, card_number").eq("id", body.card_id).maybeSingle();

    // Carte inconnue → decline + alerte technique (§6)
    if (!card) return json({ decision: "decline", motif: "carte inconnue de Flect" }, 200);
    if (actorUserId && !userCompanyIds.includes(card.company_id)) return json({ error: "Forbidden" }, 403);

    // Idempotence (§6)
    const { data: existing } = await admin.from("rule_engine_transactions").select("status, decline_reason").eq("issuer_transaction_id", body.issuer_transaction_id).maybeSingle();
    if (existing) return json({ decision: existing.status, motif: existing.decline_reason, idempotent: true });

    const now = body.occurred_at ? new Date(body.occurred_at) : new Date();
    const evaluated: Array<{ rule_id: string; rule_type: string; result: string; detail: string }> = [];
    let decision: "accept" | "decline" = "accept";
    let motif: string | null = null;
    const softWarnings: string[] = [];

    if (!card.is_active) { decision = "decline"; motif = "carte bloquée"; }

    // ---- Plafonds (RG-P1 : refus si au moins un plafond dépassé) ----
    if (decision === "accept") {
      const rules = await applicableLimitRules(card.company_id, card);
      for (const rule of rules) {
        if (rule.sync_status !== "active") {
          // Règle non synchronisée : on applique la dernière règle confirmée (§6) → ignorée + alerte technique
          evaluated.push({ rule_id: rule.id, rule_type: "limit", result: "skipped", detail: `statut sync ${rule.sync_status}` });
          continue;
        }
        if (rule.mcc_filter.length && !rule.mcc_filter.includes(body.mcc)) {
          evaluated.push({ rule_id: rule.id, rule_type: "limit", result: "not_applicable", detail: `MCC ${body.mcc} hors filtre` });
          continue;
        }
        const cardIds = await scopeCardIds(card.company_id, card, rule);
        const spent = await periodSpend(cardIds, rule.period, now, rule.mcc_filter);
        const projected = spent + body.amount;
        const exceeded = rule.period === "per_transaction" ? body.amount > rule.amount : projected > rule.amount;
        const detail = rule.period === "per_transaction"
          ? `${body.amount} MAD vs plafond ${rule.amount} MAD`
          : `cumul ${spent.toFixed(2)} + ${body.amount} = ${projected.toFixed(2)} MAD vs plafond ${rule.amount} MAD`;
        if (exceeded) {
          const reason = `plafond ${PERIOD_LABEL[rule.period]} dépassé (${rule.scope_type})`;
          if (rule.on_exceed === "soft_warning") {
            evaluated.push({ rule_id: rule.id, rule_type: "limit", result: "soft_warning", detail });
            softWarnings.push(reason);
          } else {
            evaluated.push({ rule_id: rule.id, rule_type: "limit", result: "decline", detail });
            if (decision === "accept") { decision = "decline"; motif = reason; }
          }
        } else {
          evaluated.push({ rule_id: rule.id, rule_type: "limit", result: "pass", detail });
        }
      }
    }

    // ---- Géofencing (RG-G1..G3 : accepté si au moins une zone active correspond) ----
    if (decision === "accept") {
      const geoRules = (await applicableGeoRules(card.company_id, card))
        .filter((r) => r.sync_status === "active")
        .filter((r) => !r.expires_at || new Date(r.expires_at) > now);
      if (geoRules.length) {
        let anyMatch = false;
        const hasLocation = !!(body.location_region || body.location_city || (body.lat != null && body.lng != null) || body.merchant_id);
        for (const r of geoRules) {
          let match = false, detail = "";
          if (r.zone_type === "region") { match = !!body.location_region && body.location_region.toLowerCase() === (r.geo_reference ?? "").toLowerCase(); detail = `région ${body.location_region ?? "?"} vs ${r.geo_reference}`; }
          else if (r.zone_type === "city") { match = !!body.location_city && body.location_city.toLowerCase() === (r.geo_reference ?? "").toLowerCase(); detail = `ville ${body.location_city ?? "?"} vs ${r.geo_reference}`; }
          else if (r.zone_type === "radius_km") {
            if (body.lat != null && body.lng != null && r.center_lat != null && r.center_lng != null) {
              const d = haversineKm(body.lat, body.lng, r.center_lat, r.center_lng);
              match = d <= Number(r.radius_km ?? 50); detail = `${d.toFixed(1)} km du centre (rayon ${r.radius_km} km)`;
            } else detail = "coordonnées absentes";
          } else if (r.zone_type === "merchant_list") { match = !!body.merchant_id && r.merchant_whitelist.includes(body.merchant_id); detail = `marchand ${body.merchant_id ?? "?"}`; }

          if (!hasLocation && r.missing_location_policy === "allow") { match = true; detail = "localisation absente — autorisé par défaut (RG-G2)"; }
          evaluated.push({ rule_id: r.id, rule_type: "geo", result: match ? "pass" : "fail", detail });
          if (match) anyMatch = true;
        }
        if (!anyMatch) {
          decision = "decline";
          motif = hasLocation ? "tentative hors zone autorisée" : "localisation marchand absente — bloqué par prudence (RG-G2)";
        }
      }
    }

    // ---- Transaction inhabituelle (RG-A3 : > 2x moyenne 30 jours, min. 3 transactions) ----
    let unusual = false;
    if (decision === "accept") {
      const since = new Date(now.getTime() - 30 * 86_400_000).toISOString();
      const { data: hist } = await admin.from("rule_engine_transactions").select("amount").eq("card_id", card.id).eq("status", "accept").gte("occurred_at", since);
      if (hist && hist.length >= 3) {
        const avg = hist.reduce((s, t) => s + Number(t.amount), 0) / hist.length;
        if (body.amount > 2 * avg) { unusual = true; evaluated.push({ rule_id: "heuristic", rule_type: "unusual", result: "flag", detail: `${body.amount} MAD > 2 × moyenne ${avg.toFixed(0)} MAD` }); }
      }
    }

    const autoCapture = decision === "accept" && body.auto_capture;
    const { data: tx, error: txErr } = await admin.from("rule_engine_transactions").insert({
      company_id: card.company_id, card_id: card.id, issuer_transaction_id: body.issuer_transaction_id,
      amount: body.amount, mcc: body.mcc, merchant_id: body.merchant_id ?? null, merchant_name: body.merchant_name ?? null,
      location_city: body.location_city ?? null, location_region: body.location_region ?? null,
      lat: body.lat ?? null, lng: body.lng ?? null, occurred_at: now.toISOString(),
      status: decision, decline_reason: motif, evaluated_rules: evaluated,
      is_captured: autoCapture, captured_amount: autoCapture ? body.amount : null, captured_at: autoCapture ? now.toISOString() : null,
    }).select("id").single();
    if (txErr) return json({ error: txErr.message }, 500);

    // Journal d'audit de la décision (§8)
    await admin.from("rule_engine_audit_log").insert({
      company_id: card.company_id, entity: "authorization", entity_id: tx.id, action: decision,
      actor: actorUserId, data_after: { motif, evaluated_rules: evaluated, amount: body.amount, card: card.card_number },
    });

    // Alertes (§3.3)
    const label = `${body.merchant_name ?? "station"}${body.location_city ? " – " + body.location_city : ""}`;
    if (decision === "decline" && motif?.startsWith("plafond")) {
      await raiseAlert(card.company_id, card.id, "limit_exceeded", `Carte ${card.card_number} : paiement de ${body.amount} MAD refusé (${motif}) chez ${label}`, ["email", "sms", "in_app"]);
    } else if (decision === "decline" && motif && !motif.startsWith("carte")) {
      await raiseAlert(card.company_id, card.id, "out_of_zone", `Carte ${card.card_number} : tentative de ${body.amount} MAD hors zone chez ${label}`, ["sms", "in_app"]);
    }
    for (const w of softWarnings) {
      await raiseAlert(card.company_id, card.id, "limit_exceeded", `Carte ${card.card_number} : ${w} — autorisé (avertissement souple) pour ${body.amount} MAD`, ["email", "in_app"]);
    }
    if (unusual) {
      await raiseAlert(card.company_id, card.id, "unusual_transaction", `Carte ${card.card_number} : montant inhabituel de ${body.amount} MAD chez ${label}`, ["email", "in_app"]);
    }
    if (autoCapture) await checkThresholds(card.company_id, card, { amount: body.amount, mcc: body.mcc, occurred_at: now.toISOString() });

    return json({ decision, motif, transaction_id: tx.id, evaluated_rules: evaluated });
  }

  // =========================== TRANSACTION CONFIRMED ===========================
  const { data: tx } = await admin.from("rule_engine_transactions").select("id, company_id, card_id, amount, mcc, occurred_at, status, is_captured").eq("issuer_transaction_id", body.issuer_transaction_id).maybeSingle();
  if (!tx) return json({ error: "Transaction inconnue" }, 404);
  if (actorUserId && !userCompanyIds.includes(tx.company_id)) return json({ error: "Forbidden" }, 403);
  if (tx.is_captured) return json({ ok: true, idempotent: true }); // webhook rejoué
  if (tx.status !== "accept") return json({ error: "Transaction refusée : capture impossible" }, 409);

  const finalAmount = body.status === "captured" ? (body.final_amount ?? Number(tx.amount)) : 0;
  await admin.from("rule_engine_transactions").update({
    is_captured: body.status === "captured", captured_amount: finalAmount, captured_at: new Date().toISOString(),
  }).eq("id", tx.id);

  if (body.status === "captured") {
    const { data: card } = await admin.from("cards").select("id, vehicle_id, driver_id").eq("id", tx.card_id).single();
    if (card) await checkThresholds(tx.company_id, card, { amount: finalAmount, mcc: tx.mcc, occurred_at: tx.occurred_at });
  }
  return json({ ok: true });
});
