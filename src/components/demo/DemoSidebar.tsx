import { LayoutDashboard, Car, Users, CreditCard, Receipt, Bell, Shield, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Badge } from "@/components/ui/badge";
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
  { title: "Tableau de bord", url: "/demo", icon: LayoutDashboard },
  { title: "Véhicules", url: "/demo/vehicles", icon: Car },
  { title: "Chauffeurs", url: "/demo/drivers", icon: Users },
  { title: "Cartes", url: "/demo/cards", icon: CreditCard },
  { title: "Politiques", url: "/demo/policies", icon: Shield },
  { title: "Transactions", url: "/demo/transactions", icon: Receipt },
  { title: "Alertes", url: "/demo/alerts", icon: Bell },
  { title: "Paramètres", url: "/demo/settings", icon: Settings },
];

export function DemoSidebar() {
  return (
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
                      end={item.url === "/demo"}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="flex-1">{item.title}</span>
                      {item.title === "Alertes" && (
                        <Badge variant="destructive" className="ml-auto h-5 min-w-5 flex items-center justify-center text-xs">
                          3
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
        <div className="px-3 py-2 text-sm text-muted-foreground">
          demo@alami-fils.ma
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
