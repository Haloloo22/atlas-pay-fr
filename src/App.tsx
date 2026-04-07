import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Public pages
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Legal from "./pages/Legal";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Demo pages
import { DemoLayout } from "./components/demo/DemoLayout";
import DemoDashboard from "./pages/demo/DemoDashboard";
import DemoVehiclesPage from "./pages/demo/DemoVehiclesPage";
import DemoDriversPage from "./pages/demo/DemoDriversPage";
import DemoCardsPage from "./pages/demo/DemoCardsPage";
import DemoPoliciesPage from "./pages/demo/DemoPoliciesPage";
import DemoTransactionsPage from "./pages/demo/DemoTransactionsPage";
import DemoAlertsPage from "./pages/demo/DemoAlertsPage";
import DemoSettingsPage from "./pages/demo/DemoSettingsPage";

// Protected app pages
import { AppLayout } from "./components/app/AppLayout";
import AppDashboard from "./pages/app/AppDashboard";
import VehiclesPage from "./pages/app/VehiclesPage";
import DriversPage from "./pages/app/DriversPage";
import CardsPage from "./pages/app/CardsPage";
import CardDetailPage from "./pages/app/CardDetailPage";
import PoliciesPage from "./pages/app/PoliciesPage";
import PolicyDetailPage from "./pages/app/PolicyDetailPage";
import TransactionsPage from "./pages/app/TransactionsPage";
import AlertsPage from "./pages/app/AlertsPage";
import SettingsPage from "./pages/app/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Navigate to="/auth" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* Demo routes with sidebar layout */}
              <Route path="/demo" element={<DemoLayout />}>
                <Route index element={<DemoDashboard />} />
                <Route path="vehicles" element={<DemoVehiclesPage />} />
                <Route path="drivers" element={<DemoDriversPage />} />
                <Route path="cards" element={<DemoCardsPage />} />
                <Route path="policies" element={<DemoPoliciesPage />} />
                <Route path="transactions" element={<DemoTransactionsPage />} />
                <Route path="alerts" element={<DemoAlertsPage />} />
                <Route path="settings" element={<DemoSettingsPage />} />
              </Route>

              {/* Protected app routes with layout */}
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<AppDashboard />} />
                <Route path="vehicles" element={<VehiclesPage />} />
                <Route path="drivers" element={<DriversPage />} />
                <Route path="cards" element={<CardsPage />} />
                <Route path="cards/:cardId" element={<CardDetailPage />} />
                <Route path="policies" element={<PoliciesPage />} />
                <Route path="policies/:policyId" element={<PolicyDetailPage />} />
                <Route path="transactions" element={<TransactionsPage />} />
                <Route path="alerts" element={<AlertsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
