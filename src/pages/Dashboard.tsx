
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import MechanicDashboard from "@/components/dashboard/MechanicDashboard";
import CustomerDashboard from "@/components/dashboard/CustomerDashboard";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard />;
      case "mechanic":
        return <MechanicDashboard />;
      case "customer":
        return <CustomerDashboard />;
      default:
        return <div>Unknown user role</div>;
    }
  };

  return (
    <MainLayout>
      {renderDashboard()}
    </MainLayout>
  );
};

export default Dashboard;
