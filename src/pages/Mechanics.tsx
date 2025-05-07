
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import MechanicsManagement from "@/components/admin/MechanicsManagement";

const Mechanics: React.FC = () => {
  return (
    <MainLayout requiredRole="admin">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Mechanics Management</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Mechanics</CardTitle>
            <CardDescription>
              Manage and approve mechanics in your workshop
            </CardDescription>
          </CardHeader>
          <MechanicsManagement />
        </Card>
      </div>
    </MainLayout>
  );
};

export default Mechanics;
