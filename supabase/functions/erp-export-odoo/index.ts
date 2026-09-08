// Flect — Export comptable vers l'ERP client (type Odoo) — §7 du PRD
// Exporte les transactions acceptées ET capturées non encore exportées avec succès
// sous forme d'écritures `account.move` + lignes `account.analytic.line`.
//
// MOCK — à remplacer par l'API réelle (XML-RPC / JSON-RPC Odoo) : l'appel est simulé.

import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

// MOCK — à remplacer par l'API réelle : variables d'environnement placeholder
const ODOO_URL = Deno.env.get("ODOO_URL") ?? "https://client.odoo.example";
const ODOO_DB = Deno.env.get("ODOO_DB") ?? "client_db";
const ODOO_API_KEY = Deno.env.get("ODOO_API_KEY") ?? "mock-odoo-api-key";
const MAX_ATTEMPTS = 3; // RG-E2 [HYPOTHÈSE]

const BodySchema = z.object({
  company_id: z.string().uuid(),
  simulate_failure_rate: z.number().min(0).max(1).default(0),
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
  const { company_id, simulate_failure_rate } = parsed.data;

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: membership } = await admin.from("company_members").select("id").eq("user_id", user.id).eq("company_id", company_id).maybeSingle();
  if (!membership) return json({ error: "Forbidden" }, 403);

  // RG-E1 : uniquement les transactions acceptées et capturées
  const { data: txs } = await admin.from("rule_engine_transactions")
    .select("id, amount, captured_amount, occurred_at, merchant_name, mcc, card_id, cards(card_number, vehicle_id, vehicles(plate_number, brand, model))")
    .eq("company_id", company_id).eq("status", "accept").eq("is_captured", true).order("occurred_at");
  const { data: exports } = await admin.from("rule_engine_erp_exports").select("transaction_id, status, attempts").eq("company_id", company_id);

  const successful = new Set((exports ?? []).filter((e) => e.status === "success").map((e) => e.transaction_id));
  const attemptsByTx = new Map<string, number>();
  for (const e of exports ?? []) attemptsByTx.set(e.transaction_id, Math.max(attemptsByTx.get(e.transaction_id) ?? 0, e.attempts));

  const report = { exported: 0, failed: 0, skipped: 0, escalated: 0, entries: [] as unknown[] };

  for (const tx of txs ?? []) {
    if (successful.has(tx.id)) { report.skipped++; continue; }
    const attempts = (attemptsByTx.get(tx.id) ?? 0) + 1;
    const card = tx.cards as unknown as { card_number: string; vehicle_id: string | null; vehicles: { plate_number: string; brand: string | null; model: string | null } | null } | null;
    const plate = card?.vehicles?.plate_number ?? "NON-AFFECTE";
    const amount = Number(tx.captured_amount ?? tx.amount);
    const date = tx.occurred_at.slice(0, 10);

    // Mapping §7 : centre de coût = compte analytique du véhicule (référentiel Odoo = source de vérité, RG-E3)
    const payload = {
      "account.move": {
        move_type: "in_receipt",
        date,
        ref: `FLECT-${tx.id.slice(0, 8).toUpperCase()}`,
        journal_id: "FUEL",
        line_ids: [
          { name: `Carburant ${tx.merchant_name ?? "station"} — carte ${card?.card_number ?? "?"}`, account_id: "6061 - Carburant", debit: amount, credit: 0, analytic_account_id: `VEH-${plate}` },
          { name: "Carte carburant Flect", account_id: "4011 - Fournisseur Flect", debit: 0, credit: amount },
        ],
      },
      "account.analytic.line": {
        name: `Carburant ${plate} ${date}`,
        date,
        amount: -amount,
        unit_amount: 1,
        analytic_account_id: `VEH-${plate}`,
        ref: tx.id,
        mcc: tx.mcc,
      },
    };

    // MOCK — à remplacer par l'API réelle :
    //   xmlrpc(`${ODOO_URL}/xmlrpc/2/object`).execute_kw(ODOO_DB, uid, ODOO_API_KEY, "account.move", "create", [payload["account.move"]])
    const missingCostCenter = !card?.vehicle_id; // compte analytique manquant → échec (RG-E2)
    const failed = missingCostCenter || Math.random() < simulate_failure_rate;
    console.log(`[MOCK odoo] ${ODOO_URL}/${ODOO_DB} create account.move ${payload["account.move"].ref} (key ${ODOO_API_KEY.slice(0, 4)}…) → ${failed ? "FAIL" : "OK"}`);

    const row = {
      company_id, transaction_id: tx.id, status: failed ? "failed" : "success", attempts,
      odoo_move_reference: failed ? null : `INV/${date.slice(0, 7).replace("-", "/")}/${String(Math.floor(Math.random() * 9000) + 1000)}`,
      odoo_analytic_line_reference: failed ? null : `AAL-${Math.floor(Math.random() * 90000) + 10000}`,
      error_message: failed ? (missingCostCenter ? "Compte analytique manquant : carte sans véhicule affecté" : "Odoo indisponible (simulé)") : null,
      payload,
    };
    await admin.from("rule_engine_erp_exports").insert(row);
    report.entries.push({ transaction_id: tx.id, plate, amount, status: row.status, reference: row.odoo_move_reference, error: row.error_message, attempts });
    if (failed) {
      report.failed++;
      if (attempts >= MAX_ATTEMPTS) {
        report.escalated++;
        await admin.from("alerts").insert({
          company_id, card_id: tx.card_id, alert_type: "sync_failure", status: "new", notification_channels: ["in_app", "email"],
          message: `Export ERP en échec après ${attempts} tentatives pour la transaction ${row.payload["account.move"].ref} : ${row.error_message}`,
        });
      }
    } else report.exported++;
  }

  await admin.from("rule_engine_audit_log").insert({
    company_id, entity: "erp_export", action: "batch_run", actor: user.id,
    data_after: { exported: report.exported, failed: report.failed, skipped: report.skipped, escalated: report.escalated },
  });

  return json(report);
});
