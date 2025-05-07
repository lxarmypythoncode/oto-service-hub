
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import CustomersManagement from "@/components/admin/CustomersManagement";

const Customers: React.FC = () => {
  return (
    <MainLayout requiredRole="admin">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Customers Management</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>
              Manage customer accounts and information
            </CardDescription>
          </CardHeader>
          <CustomersManagement />
        </Card>
      </div>
    </MainLayout>
  );
};

export default Customers;
