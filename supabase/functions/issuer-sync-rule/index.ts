// Flect — Moteur de règles : push d'une règle vers l'émetteur de carte (RG-P4)
// Flect → Émetteur : PUT /cards/{id}/limits — statut "pending" → "active" à la confirmation.
//
// MOCK — à remplacer par l'API réelle (Chari.ma / S2M) : l'appel HTTP est simulé.

import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

// MOCK — à remplacer par l'API réelle : variables d'environnement placeholder
const ISSUER_API_BASE_URL = Deno.env.get("ISSUER_API_BASE_URL") ?? "https://sandbox.issuer.example/api/v1";
const ISSUER_API_KEY = Deno.env.get("ISSUER_API_KEY") ?? "mock-issuer-api-key";

const BodySchema = z.object({
  rule_type: z.enum(["limit", "geo"]),
  rule_id: z.string().uuid(),
  simulate_failure: z.boolean().default(false),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);
  const userClient = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: authHeader } } });
  const { data: { user }, error: authErr } = await userClient.auth.getUser();
  if (authErr || !user) return json({ error: "Unauthorized" }, 401);

  const parsed = BodySchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const { rule_type, rule_id, simulate_failure } = parsed.data;

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const table = rule_type === "limit" ? "rule_engine_limits" : "rule_engine_geo";

  // La règle doit être visible par l'utilisateur (RLS) → contrôle d'appartenance
  const { data: rule, error } = await userClient.from(table).select("*").eq("id", rule_id).maybeSingle();
  if (error || !rule) return json({ error: "Règle introuvable" }, 404);

  // MOCK — à remplacer par l'API réelle :
  //   await fetch(`${ISSUER_API_BASE_URL}/cards/${rule.scope_id}/limits`, {
  //     method: "PUT", headers: { Authorization: `Bearer ${ISSUER_API_KEY}` },
  //     body: JSON.stringify({ montant: rule.amount, periodicite: rule.period }) })
  console.log(`[MOCK issuer] PUT ${ISSUER_API_BASE_URL}/cards/${rule.scope_id}/limits (key ${ISSUER_API_KEY.slice(0, 4)}…)`);
  await new Promise((r) => setTimeout(r, 400));
  const confirmed = !simulate_failure;
  const sync_status = confirmed ? "active" : "failed";

  await admin.from(table).update({ sync_status }).eq("id", rule_id);
  await admin.from("rule_engine_audit_log").insert({
    company_id: rule.company_id, entity: table, entity_id: rule_id, action: confirmed ? "sync_confirmed" : "sync_failed",
    actor: user.id, data_before: { sync_status: rule.sync_status }, data_after: { sync_status },
  });

  if (!confirmed) {
    // Alerte "échec de synchronisation règle" (§3.3) — destinataire : support Flect / in-app
    await admin.from("alerts").insert({
      company_id: rule.company_id, card_id: rule.scope_type === "card" ? rule.scope_id : null,
      alert_type: "sync_failure", status: "new", notification_channels: ["in_app", "email"],
      message: `Échec de synchronisation de la règle ${rule_type === "limit" ? "de plafond" : "géographique"} avec l'émetteur — l'ancienne règle reste opposable.`,
    });
  }

  return json({ statut_sync: confirmed ? "confirme" : "echec", sync_status });
});
