import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCompany } from "./useCompany";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import type { Database, Json } from "@/integrations/supabase/types";

type T = Database["public"]["Tables"];
export type LimitRule = T["rule_engine_limits"]["Row"];
export type LimitRuleInsert = Omit<T["rule_engine_limits"]["Insert"], "company_id">;
export type GeoRule = T["rule_engine_geo"]["Row"];
export type GeoRuleInsert = Omit<T["rule_engine_geo"]["Insert"], "company_id">;
export type AlertSetting = T["rule_engine_alert_settings"]["Row"];
export type EngineTransaction = T["rule_engine_transactions"]["Row"];
export type ErpExport = T["rule_engine_erp_exports"]["Row"];
export type AuditEntry = T["rule_engine_audit_log"]["Row"];

export type ScopeType = "card" | "vehicle" | "driver";

export const ALERT_TYPES: { value: string; label: string; defaults: string[] }[] = [
  { value: "threshold_approach", label: "Approche de plafond", defaults: ["email", "in_app"] },
  { value: "limit_exceeded", label: "Dépassement de plafond", defaults: ["email", "sms", "in_app"] },
  { value: "out_of_zone", label: "Tentative hors zone", defaults: ["sms", "in_app"] },
  { value: "unusual_transaction", label: "Transaction inhabituelle", defaults: ["email", "in_app"] },
  { value: "sync_failure", label: "Échec de synchronisation règle", defaults: ["in_app", "email"] },
];

function useAudit() {
  const { company } = useCompany();
  const { user } = useAuth();
  return async (entity: string, entity_id: string | null, action: string, before: Json | null, after: Json | null) => {
    if (!company || !user) return;
    await supabase.from("rule_engine_audit_log").insert({ company_id: company.id, entity, entity_id, action, actor: user.id, data_before: before, data_after: after });
  };
}

async function syncWithIssuer(rule_type: "limit" | "geo", rule_id: string, simulate_failure = false) {
  const { data, error } = await supabase.functions.invoke("issuer-sync-rule", { body: { rule_type, rule_id, simulate_failure } });
  if (error) throw error;
  return data as { sync_status: string };
}

export function useLimitRules() {
  const { company } = useCompany();
  const qc = useQueryClient();
  const audit = useAudit();
  const key = ["rule-engine-limits", company?.id];

  const query = useQuery({
    queryKey: key,
    enabled: !!company,
    queryFn: async () => {
      const { data, error } = await supabase.from("rule_engine_limits").select("*").eq("company_id", company!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data as LimitRule[];
    },
  });

  const create = useMutation({
    mutationFn: async (rule: LimitRuleInsert) => {
      const { data, error } = await supabase.from("rule_engine_limits").insert({ ...rule, company_id: company!.id }).select().single();
      if (error) throw error;
      await audit("rule_engine_limits", data.id, "create", null, data as unknown as Json);
      // RG-P4 : push immédiat vers l'émetteur
      qc.invalidateQueries({ queryKey: key });
      const res = await syncWithIssuer("limit", data.id);
      return res;
    },
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: key });
      toast.success(res.sync_status === "active" ? "Plafond enregistré et confirmé par l'émetteur" : "Plafond enregistré (synchronisation en échec)");
    },
    onError: (e) => { toast.error("Erreur lors de la création du plafond"); console.error(e); },
  });

  const update = useMutation({
    mutationFn: async ({ id, before, ...patch }: Partial<LimitRule> & { id: string; before: LimitRule }) => {
      const { data, error } = await supabase.from("rule_engine_limits").update({ ...patch, sync_status: "pending" }).eq("id", id).select().single();
      if (error) throw error;
      await audit("rule_engine_limits", id, "update", before as unknown as Json, data as unknown as Json);
      qc.invalidateQueries({ queryKey: key });
      return syncWithIssuer("limit", id);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: key }); toast.success("Plafond mis à jour"); },
    onError: (e) => { toast.error("Erreur lors de la mise à jour"); console.error(e); },
  });

  const remove = useMutation({
    mutationFn: async (rule: LimitRule) => {
      const { error } = await supabase.from("rule_engine_limits").delete().eq("id", rule.id);
      if (error) throw error;
      await audit("rule_engine_limits", rule.id, "delete", rule as unknown as Json, null);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: key }); toast.success("Plafond supprimé"); },
    onError: (e) => { toast.error("Erreur lors de la suppression"); console.error(e); },
  });

  const resync = useMutation({
    mutationFn: ({ id, fail }: { id: string; fail?: boolean }) => syncWithIssuer("limit", id, fail),
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
    onError: () => toast.error("Erreur de synchronisation"),
  });

  return { rules: query.data ?? [], isLoading: query.isLoading, create, update, remove, resync };
}

export function useGeoRules() {
  const { company } = useCompany();
  const qc = useQueryClient();
  const audit = useAudit();
  const key = ["rule-engine-geo", company?.id];

  const query = useQuery({
    queryKey: key,
    enabled: !!company,
    queryFn: async () => {
      const { data, error } = await supabase.from("rule_engine_geo").select("*").eq("company_id", company!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data as GeoRule[];
    },
  });

  const create = useMutation({
    mutationFn: async (rule: GeoRuleInsert) => {
      const { data, error } = await supabase.from("rule_engine_geo").insert({ ...rule, company_id: company!.id }).select().single();
      if (error) throw error;
      await audit("rule_engine_geo", data.id, "create", null, data as unknown as Json);
      qc.invalidateQueries({ queryKey: key });
      return syncWithIssuer("geo", data.id);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: key }); toast.success("Zone enregistrée et synchronisée"); },
    onError: (e) => { toast.error("Erreur lors de la création de la zone"); console.error(e); },
  });

  const remove = useMutation({
    mutationFn: async (rule: GeoRule) => {
      const { error } = await supabase.from("rule_engine_geo").delete().eq("id", rule.id);
      if (error) throw error;
      await audit("rule_engine_geo", rule.id, "delete", rule as unknown as Json, null);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: key }); toast.success("Zone supprimée"); },
    onError: (e) => { toast.error("Erreur lors de la suppression"); console.error(e); },
  });

  const toggle = useMutation({
    mutationFn: async (rule: GeoRule) => {
      const { error } = await supabase.from("rule_engine_geo").update({ is_active: !rule.is_active }).eq("id", rule.id);
      if (error) throw error;
      await audit("rule_engine_geo", rule.id, "toggle", { is_active: rule.is_active }, { is_active: !rule.is_active });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: key }),
  });

  return { rules: query.data ?? [], isLoading: query.isLoading, create, remove, toggle };
}

export function useAlertSettings() {
  const { company } = useCompany();
  const qc = useQueryClient();
  const key = ["rule-engine-alert-settings", company?.id];

  const query = useQuery({
    queryKey: key,
    enabled: !!company,
    queryFn: async () => {
      const { data, error } = await supabase.from("rule_engine_alert_settings").select("*").eq("company_id", company!.id);
      if (error) throw error;
      return data as AlertSetting[];
    },
  });

  const upsert = useMutation({
    mutationFn: async (s: { alert_type: string; channels: string[]; recipients: string[]; is_enabled: boolean }) => {
      const { error } = await supabase.from("rule_engine_alert_settings").upsert({ ...s, company_id: company!.id }, { onConflict: "company_id,alert_type" });
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: key }); toast.success("Paramètres d'alerte enregistrés"); },
    onError: (e) => { toast.error("Erreur lors de l'enregistrement"); console.error(e); },
  });

  return { settings: query.data ?? [], isLoading: query.isLoading, upsert };
}

export function useEngineTransactions() {
  const { company } = useCompany();
  const qc = useQueryClient();
  const key = ["rule-engine-transactions", company?.id];

  const query = useQuery({
    queryKey: key,
    enabled: !!company,
    queryFn: async () => {
      const { data, error } = await supabase.from("rule_engine_transactions").select("*").eq("company_id", company!.id).order("occurred_at", { ascending: false }).limit(100);
      if (error) throw error;
      return data as EngineTransaction[];
    },
  });

  const authorize = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const { data, error } = await supabase.functions.invoke("card-issuer-webhook", { body: { event: "authorization", ...payload } });
      if (error) throw error;
      if (data?.error) throw new Error(typeof data.error === "string" ? data.error : JSON.stringify(data.error));
      return data as { decision: "accept" | "decline"; motif: string | null; evaluated_rules: { rule_type: string; result: string; detail: string }[] };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: key });
      qc.invalidateQueries({ queryKey: ["alerts"] });
      qc.invalidateQueries({ queryKey: ["rule-engine-audit"] });
    },
    onError: (e) => { toast.error("Erreur d'autorisation : " + (e as Error).message); },
  });

  const confirm = useMutation({
    mutationFn: async (issuer_transaction_id: string) => {
      const { data, error } = await supabase.functions.invoke("card-issuer-webhook", { body: { event: "transaction_confirmed", issuer_transaction_id } });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: key }); qc.invalidateQueries({ queryKey: ["alerts"] }); toast.success("Capture confirmée"); },
    onError: (e) => toast.error((e as Error).message),
  });

  return { transactions: query.data ?? [], isLoading: query.isLoading, authorize, confirm };
}

export function useErpExports() {
  const { company } = useCompany();
  const qc = useQueryClient();
  const key = ["rule-engine-erp-exports", company?.id];

  const query = useQuery({
    queryKey: key,
    enabled: !!company,
    queryFn: async () => {
      const { data, error } = await supabase.from("rule_engine_erp_exports").select("*").eq("company_id", company!.id).order("exported_at", { ascending: false }).limit(100);
      if (error) throw error;
      return data as ErpExport[];
    },
  });

  const run = useMutation({
    mutationFn: async (simulate_failure_rate: number) => {
      const { data, error } = await supabase.functions.invoke("erp-export-odoo", { body: { company_id: company!.id, simulate_failure_rate } });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data as { exported: number; failed: number; skipped: number; escalated: number };
    },
    onSuccess: (r) => {
      qc.invalidateQueries({ queryKey: key });
      qc.invalidateQueries({ queryKey: ["alerts"] });
      qc.invalidateQueries({ queryKey: ["rule-engine-audit"] });
      toast.success(`Export Odoo : ${r.exported} écriture(s) créée(s), ${r.failed} échec(s), ${r.skipped} déjà exportée(s)`);
    },
    onError: (e) => toast.error("Erreur d'export : " + (e as Error).message),
  });

  return { exports: query.data ?? [], isLoading: query.isLoading, run };
}

export function useAuditLog() {
  const { company } = useCompany();
  return useQuery({
    queryKey: ["rule-engine-audit", company?.id],
    enabled: !!company,
    queryFn: async () => {
      const { data, error } = await supabase.from("rule_engine_audit_log").select("*").eq("company_id", company!.id).order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      return data as AuditEntry[];
    },
  });
}
