
import React from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { UserNav } from "@/components/layout/UserNav";
import { Calendar, ClipboardList, LayoutDashboard, Wrench, Car, UserCircle, FileText } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "mechanic" | "customer";
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render role-specific mobile navigation
  const renderMobileNav = () => {
    if (user.role === "admin") {
      return (
        <div className="flex justify-between">
          <Link to="/dashboard" className="flex flex-col items-center p-2">
            <LayoutDashboard className={`h-5 w-5 ${location.pathname === '/dashboard' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/dashboard' ? 'text-workshop-primary' : ''}`}>Dashboard</span>
          </Link>
          <Link to="/customers" className="flex flex-col items-center p-2">
            <UserCircle className={`h-5 w-5 ${location.pathname === '/customers' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/customers' ? 'text-workshop-primary' : ''}`}>Customers</span>
          </Link>
          <Link to="/mechanics" className="flex flex-col items-center p-2">
            <Wrench className={`h-5 w-5 ${location.pathname === '/mechanics' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/mechanics' ? 'text-workshop-primary' : ''}`}>Mechanics</span>
          </Link>
          <Link to="/inventory" className="flex flex-col items-center p-2">
            <ClipboardList className={`h-5 w-5 ${location.pathname === '/inventory' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/inventory' ? 'text-workshop-primary' : ''}`}>Inventory</span>
          </Link>
          <Link to="/settings" className="flex flex-col items-center p-2">
            <LayoutDashboard className={`h-5 w-5 ${location.pathname === '/settings' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/settings' ? 'text-workshop-primary' : ''}`}>Settings</span>
          </Link>
        </div>
      );
    } else if (user.role === "mechanic") {
      return (
        <div className="flex justify-between">
          <Link to="/dashboard" className="flex flex-col items-center p-2">
            <LayoutDashboard className={`h-5 w-5 ${location.pathname === '/dashboard' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/dashboard' ? 'text-workshop-primary' : ''}`}>Dashboard</span>
          </Link>
          <Link to="/work-orders" className="flex flex-col items-center p-2">
            <Wrench className={`h-5 w-5 ${location.pathname === '/work-orders' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/work-orders' ? 'text-workshop-primary' : ''}`}>Work</span>
          </Link>
          <Link to="/schedule" className="flex flex-col items-center p-2">
            <Calendar className={`h-5 w-5 ${location.pathname === '/schedule' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/schedule' ? 'text-workshop-primary' : ''}`}>Schedule</span>
          </Link>
          <Link to="/inventory" className="flex flex-col items-center p-2">
            <ClipboardList className={`h-5 w-5 ${location.pathname === '/inventory' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/inventory' ? 'text-workshop-primary' : ''}`}>Inventory</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-2">
            <UserCircle className={`h-5 w-5 ${location.pathname === '/profile' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/profile' ? 'text-workshop-primary' : ''}`}>Profile</span>
          </Link>
        </div>
      );
    } else {
      // Default customer navigation
      return (
        <div className="flex justify-between">
          <Link to="/dashboard" className="flex flex-col items-center p-2">
            <LayoutDashboard className={`h-5 w-5 ${location.pathname === '/dashboard' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/dashboard' ? 'text-workshop-primary' : ''}`}>Dashboard</span>
          </Link>
          <Link to="/my-vehicles" className="flex flex-col items-center p-2">
            <Car className={`h-5 w-5 ${location.pathname === '/my-vehicles' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/my-vehicles' ? 'text-workshop-primary' : ''}`}>Vehicles</span>
          </Link>
          <Link to="/book-service" className="flex flex-col items-center p-2">
            <Wrench className={`h-5 w-5 ${location.pathname === '/book-service' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/book-service' ? 'text-workshop-primary' : ''}`}>Book</span>
          </Link>
          <Link to="/service-history" className="flex flex-col items-center p-2">
            <FileText className={`h-5 w-5 ${location.pathname === '/service-history' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/service-history' ? 'text-workshop-primary' : ''}`}>History</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-2">
            <UserCircle className={`h-5 w-5 ${location.pathname === '/profile' ? 'text-workshop-primary' : ''}`} />
            <span className={`text-xs ${location.pathname === '/profile' ? 'text-workshop-primary' : ''}`}>Profile</span>
          </Link>
        </div>
      );
    }
  };

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
          {renderMobileNav()}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
