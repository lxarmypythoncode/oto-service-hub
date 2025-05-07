
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ServicesManagement from "@/components/admin/ServicesManagement";

const Services: React.FC = () => {
  return (
    <MainLayout requiredRole="admin">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Services Management</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Workshop Services</CardTitle>
            <CardDescription>
              Manage available services and pricing
            </CardDescription>
          </CardHeader>
          <ServicesManagement />
        </Card>
      </div>
    </MainLayout>
  );
};

export default Services;
