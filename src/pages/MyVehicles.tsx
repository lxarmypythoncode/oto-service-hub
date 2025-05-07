
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import VehiclesList from "@/components/vehicles/VehiclesList";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const MyVehicles: React.FC = () => {
  return (
    <MainLayout requiredRole="customer">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Vehicles</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Registered Vehicles</CardTitle>
            <CardDescription>
              Manage your vehicles for service at our workshop
            </CardDescription>
          </CardHeader>
          <VehiclesList />
        </Card>
      </div>
    </MainLayout>
  );
};

export default MyVehicles;
