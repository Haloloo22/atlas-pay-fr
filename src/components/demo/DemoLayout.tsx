import { Outlet, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DemoSidebar } from "./DemoSidebar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function DemoLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DemoSidebar />
        <div className="flex-1 flex flex-col">
          {/* Demo Banner */}
          <div className="bg-primary text-primary-foreground border-b border-primary/20">
            <div className="px-6 py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="bg-primary-foreground/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                  Mode Démo
                </span>
                <span className="hidden sm:inline">Bâtiment Alami &amp; Fils — Ceci est un exemple de tableau de bord FleetPay</span>
              </div>
              <Link to="/auth">
                <Button size="sm" variant="secondary" className="font-semibold whitespace-nowrap">
                  Créer mon compte gratuit
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Header with sidebar trigger */}
          <header className="h-14 border-b border-border flex items-center px-4 bg-card">
            <SidebarTrigger />
          </header>

          <main className="flex-1 p-6 bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
