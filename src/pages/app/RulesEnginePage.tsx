import { FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LimitRulesTab } from "@/components/rules-engine/LimitRulesTab";
import { GeoRulesTab } from "@/components/rules-engine/GeoRulesTab";
import { AlertSettingsTab } from "@/components/rules-engine/AlertSettingsTab";
import { AuthorizationSimulatorTab } from "@/components/rules-engine/AuthorizationSimulatorTab";
import { ErpExportTab } from "@/components/rules-engine/ErpExportTab";
import { AuditLogTab } from "@/components/rules-engine/AuditLogTab";

export default function RulesEnginePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-primary/10 text-primary"><FlaskConical className="w-6 h-6" /></div>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Règles de gestion <Badge variant="outline">test</Badge>
          </h1>
          <p className="text-muted-foreground">
            Moteur de règles opposable au moment de l'autorisation : plafonds, zones géographiques, alertes temps réel et export ERP.
            Intégrations émetteur (type Chari.ma / S2M) et Odoo simulées.
          </p>
        </div>
      </div>

      <Tabs defaultValue="limits" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto w-full lg:w-auto lg:inline-flex">
          <TabsTrigger value="limits">Plafonds</TabsTrigger>
          <TabsTrigger value="geo">Zones géographiques</TabsTrigger>
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
          <TabsTrigger value="simulator">Autorisation (émetteur)</TabsTrigger>
          <TabsTrigger value="erp">Export ERP</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>
        <TabsContent value="limits"><LimitRulesTab /></TabsContent>
        <TabsContent value="geo"><GeoRulesTab /></TabsContent>
        <TabsContent value="alerts"><AlertSettingsTab /></TabsContent>
        <TabsContent value="simulator"><AuthorizationSimulatorTab /></TabsContent>
        <TabsContent value="erp"><ErpExportTab /></TabsContent>
        <TabsContent value="audit"><AuditLogTab /></TabsContent>
      </Tabs>
    </div>
  );
}
