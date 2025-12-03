import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard } from "lucide-react";

const AppDashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">FleetPay</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Bienvenue sur FleetPay</h1>
        <p className="text-muted-foreground mb-8">
          Votre plateforme de gestion de flotte est en cours de développement.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Véhicules</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-muted-foreground">Aucun véhicule enregistré</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Chauffeurs</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-muted-foreground">Aucun chauffeur enregistré</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Cartes actives</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-muted-foreground">Aucune carte active</p>
          </div>
        </div>

        <div className="mt-12 bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Phase 2 à venir</h2>
          <p className="text-muted-foreground">
            Les fonctionnalités de gestion des véhicules, chauffeurs et cartes seront disponibles prochainement.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AppDashboard;
