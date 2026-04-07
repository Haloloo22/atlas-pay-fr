import { User, Building2, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoCompany } from "@/data/demoData";

export default function DemoSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Profil et informations de l'entreprise (mode démo)</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2"><User className="w-4 h-4" />Profil</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Lock className="w-4 h-4" />Sécurité</TabsTrigger>
          <TabsTrigger value="company" className="gap-2"><Building2 className="w-4 h-4" />Entreprise</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>Données du compte administrateur</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Prénom</label>
                  <Input value="Mohammed" disabled />
                </div>
                <div>
                  <label className="text-sm font-medium">Nom</label>
                  <Input value="Alami" disabled />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input value="demo@alami-fils.ma" disabled />
              </div>
              <div>
                <label className="text-sm font-medium">Téléphone</label>
                <Input value="+212 661 234 567" disabled />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>Les modifications de mot de passe sont désactivées en mode démo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Mot de passe actuel</label>
                <Input type="password" value="••••••••" disabled />
              </div>
              <div>
                <label className="text-sm font-medium">Nouveau mot de passe</label>
                <Input type="password" placeholder="••••••••" disabled />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'entreprise</CardTitle>
              <CardDescription>{demoCompany.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nom</label>
                <Input value={demoCompany.name} disabled />
              </div>
              <div>
                <label className="text-sm font-medium">ICE / SIRET</label>
                <Input value={demoCompany.siret || ""} disabled />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Ville</label>
                  <Input value={demoCompany.city || ""} disabled />
                </div>
                <div>
                  <label className="text-sm font-medium">Code postal</label>
                  <Input value={demoCompany.postal_code || ""} disabled />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Adresse</label>
                <Input value={demoCompany.address || ""} disabled />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Téléphone</label>
                  <Input value={demoCompany.phone || ""} disabled />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input value={demoCompany.email || ""} disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
