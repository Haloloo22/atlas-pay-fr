import { useState } from "react";
import { Sparkles, Car, Users, CreditCard, TrendingUp, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { seedDemoData } from "@/utils/seedDemoData";
import { seedAlamiData } from "@/utils/seedAlamiData";
import { useCompany } from "@/hooks/useCompany";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function EmptyDashboard() {
  const { company } = useCompany();
  const queryClient = useQueryClient();
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedDemoData = async () => {
    if (!company) return;
    
    setIsSeeding(true);
    try {
      await seedDemoData(company.id);
      toast.success("Données de démonstration générées avec succès !");
      
      // Invalidate all queries to refresh data
      await queryClient.invalidateQueries();
    } catch (error) {
      console.error("Error seeding demo data:", error);
      toast.error("Erreur lors de la génération des données");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-6">
        <TrendingUp className="w-10 h-10 text-primary" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Bienvenue sur FleetPay !</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Votre tableau de bord est vide pour le moment. Commencez par ajouter vos véhicules, 
        chauffeurs et cartes, ou générez des données de démonstration pour explorer la plateforme.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8 w-full max-w-lg">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <Car className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-sm font-medium">Véhicules</p>
          <p className="text-xs text-muted-foreground">Gérez votre flotte</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <Users className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-sm font-medium">Chauffeurs</p>
          <p className="text-xs text-muted-foreground">Assignez vos équipes</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <CreditCard className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-sm font-medium">Cartes</p>
          <p className="text-xs text-muted-foreground">Contrôlez les dépenses</p>
        </div>
      </div>

      <Button 
        size="lg" 
        onClick={handleSeedDemoData} 
        disabled={isSeeding}
        className="gap-2"
      >
        <Sparkles className="w-4 h-4" />
        {isSeeding ? "Génération en cours..." : "Générer des données de démo"}
      </Button>
      
      <p className="text-xs text-muted-foreground mt-4">
        Cela créera des véhicules, chauffeurs, cartes et transactions fictifs pour explorer la plateforme.
      </p>
    </div>
  );
}
