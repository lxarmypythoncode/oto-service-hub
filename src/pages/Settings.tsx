
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import AdminSettings from "@/components/admin/AdminSettings";

const Settings: React.FC = () => {
  return (
    <MainLayout requiredRole="admin">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Workshop Settings</CardTitle>
            <CardDescription>
              Configure your workshop preferences and system settings
            </CardDescription>
          </CardHeader>
          <AdminSettings />
        </Card>
      </div>
    </MainLayout>
  );
};

export default Settings;
