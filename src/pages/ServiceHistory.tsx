
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ServiceHistoryList from "@/components/services/ServiceHistoryList";

const ServiceHistory: React.FC = () => {
  return (
    <MainLayout requiredRole="customer">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Service History</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Past Services</CardTitle>
            <CardDescription>
              View your complete vehicle service history
            </CardDescription>
          </CardHeader>
          <ServiceHistoryList />
        </Card>
      </div>
    </MainLayout>
  );
};

export default ServiceHistory;
