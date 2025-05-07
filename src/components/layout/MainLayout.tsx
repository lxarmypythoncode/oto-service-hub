
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { UserNav } from "@/components/layout/UserNav";

interface MainLayoutProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "mechanic" | "customer";
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block md:w-64">
        <Sidebar />
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <div className="flex-1">
            <UserNav />
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
        
        {/* Mobile bottom navigation */}
        <div className="md:hidden border-t bg-background p-2">
          <div className="flex justify-between">
            <button className="flex flex-col items-center p-2">
              <Home className="h-5 w-5" />
              <span className="text-xs">Dashboard</span>
            </button>
            <button className="flex flex-col items-center p-2">
              <Tool className="h-5 w-5" />
              <span className="text-xs">Services</span>
            </button>
            <button className="flex flex-col items-center p-2">
              <Car className="h-5 w-5" />
              <span className="text-xs">Vehicles</span>
            </button>
            <button className="flex flex-col items-center p-2">
              <UserCircle className="h-5 w-5" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
