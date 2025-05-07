
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import BookService from "./pages/BookService";
import MyVehicles from "./pages/MyVehicles";
import ServiceHistory from "./pages/ServiceHistory";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import WorkOrders from "./pages/WorkOrders";
import Schedule from "./pages/Schedule";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Mechanics from "./pages/Mechanics";
import Services from "./pages/Services";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book-service" element={<BookService />} />
            <Route path="/my-vehicles" element={<MyVehicles />} />
            <Route path="/service-history" element={<ServiceHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/work-orders" element={<WorkOrders />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/mechanics" element={<Mechanics />} />
            <Route path="/services" element={<Services />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
