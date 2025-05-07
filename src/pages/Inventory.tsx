
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import InventoryManagement from "@/components/inventory/InventoryManagement";

const Inventory: React.FC = () => {
  return (
    <MainLayout requiredRole="mechanic">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Inventory</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Spare Parts Inventory</CardTitle>
            <CardDescription>
              Check parts availability and request restocking
            </CardDescription>
          </CardHeader>
          <InventoryManagement />
        </Card>
      </div>
    </MainLayout>
  );
};

export default Inventory;
