
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import WorkOrdersList from "@/components/mechanic/WorkOrdersList";

const WorkOrders: React.FC = () => {
  return (
    <MainLayout requiredRole="mechanic">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Work Orders</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Work Orders</CardTitle>
            <CardDescription>
              Manage your assigned service tasks
            </CardDescription>
          </CardHeader>
          <WorkOrdersList />
        </Card>
      </div>
    </MainLayout>
  );
};

export default WorkOrders;
