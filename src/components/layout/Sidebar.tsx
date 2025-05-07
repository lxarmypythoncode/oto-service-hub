import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, DollarSign, Car, FileText, Home, Settings, Wrench, UserCircle, Users, LogOut, ClipboardList } from "lucide-react";

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  title: string;
  isActive?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon: Icon, title, isActive }) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 font-normal",
          isActive ? "bg-workshop-primary/10 text-workshop-primary" : "hover:bg-workshop-primary/10 hover:text-workshop-primary"
        )}
      >
        <Icon className="h-5 w-5" />
        {title}
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Links based on user role
  const getLinks = () => {
    const commonLinks = [
      { href: "/dashboard", icon: Home, title: "Dashboard" },
    ];

    if (user?.role === "admin") {
      return [
        ...commonLinks,
        { href: "/customers", icon: Users, title: "Customers" },
        { href: "/mechanics", icon: Wrench, title: "Mechanics" },
        { href: "/services", icon: Wrench, title: "Services" },
        { href: "/inventory", icon: ClipboardList, title: "Inventory" },
        { href: "/reports", icon: FileText, title: "Reports" },
        { href: "/settings", icon: Settings, title: "Settings" },
      ];
    } else if (user?.role === "mechanic") {
      return [
        ...commonLinks,
        { href: "/work-orders", icon: Wrench, title: "Work Orders" },
        { href: "/schedule", icon: Calendar, title: "Schedule" },
        { href: "/inventory", icon: ClipboardList, title: "Inventory" },
      ];
    } else {
      // Customer links
      return [
        ...commonLinks,
        { href: "/my-vehicles", icon: Car, title: "My Vehicles" },
        { href: "/book-service", icon: Wrench, title: "Book Service" },
        { href: "/service-history", icon: FileText, title: "Service History" },
        { href: "/profile", icon: UserCircle, title: "Profile" },
      ];
    }
  };

  const links = getLinks();

  return (
    <div className="h-screen border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Wrench className="h-6 w-6 text-workshop-primary" />
          <span className="text-xl">OtoService</span>
        </Link>
      </div>

      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="flex flex-col gap-1 p-4">
          {links.map((link) => (
            <SidebarLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              title={link.title}
              isActive={location.pathname === link.href}
            />
          ))}

          <div className="mt-auto pt-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 font-normal text-red-500 hover:bg-red-100 hover:text-red-600"
              onClick={logout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
