
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import MechanicSchedule from "@/components/mechanic/MechanicSchedule";

const Schedule: React.FC = () => {
  return (
    <MainLayout requiredRole="mechanic">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Work Schedule</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Schedule</CardTitle>
            <CardDescription>
              View and manage your work assignments
            </CardDescription>
          </CardHeader>
          <MechanicSchedule />
        </Card>
      </div>
    </MainLayout>
  );
};

export default Schedule;
