import { useState } from "react";
import { LayoutDashboard, Car, Users, CreditCard, Receipt, Bell, LogOut, Shield, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { useAlerts } from "@/hooks/useAlerts";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Tableau de bord", url: "/app/dashboard", icon: LayoutDashboard },
  { title: "Véhicules", url: "/app/vehicles", icon: Car },
  { title: "Chauffeurs", url: "/app/drivers", icon: Users },
  { title: "Cartes", url: "/app/cards", icon: CreditCard },
  { title: "Politiques", url: "/app/policies", icon: Shield },
  { title: "Transactions", url: "/app/transactions", icon: Receipt },
  { title: "Alertes", url: "/app/alerts", icon: Bell },
  { title: "Paramètres", url: "/app/settings", icon: Settings },
];

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const { unreadCount } = useAlerts();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    signOut();
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">FleetPay</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                        activeClassName="bg-primary/10 text-primary font-medium"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="flex-1">{item.title}</span>
                        {item.title === "Alertes" && unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-auto h-5 min-w-5 flex items-center justify-center text-xs">
                            {unreadCount > 99 ? "99+" : unreadCount}
                          </Badge>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-border p-4">
          <div className="flex flex-col gap-2">
            <div className="px-3 py-2 text-sm text-muted-foreground truncate">
              {user?.email}
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Déconnexion</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarFooter>
      </Sidebar>

      <ConfirmDialog
        open={showLogoutConfirm}
        onOpenChange={setShowLogoutConfirm}
        title="Déconnexion"
        description="Êtes-vous sûr de vouloir vous déconnecter ?"
        confirmLabel="Se déconnecter"
        cancelLabel="Annuler"
        onConfirm={handleLogout}
        variant="destructive"
      />
    </>
  );
}