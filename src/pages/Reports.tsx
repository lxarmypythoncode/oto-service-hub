
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RevenueReports from "@/components/admin/RevenueReports";
import ServiceReports from "@/components/admin/ServiceReports";

const Reports: React.FC = () => {
  return (
    <MainLayout requiredRole="admin">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>
        
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="mechanics">Mechanics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>
                  Track your workshop's financial performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueReports />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Service Analytics</CardTitle>
                <CardDescription>
                  Analyze service popularity and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ServiceReports />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mechanics">
            <Card>
              <CardHeader>
                <CardTitle>Mechanic Performance</CardTitle>
                <CardDescription>
                  Evaluate mechanic efficiency and service quality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="pb-4">Mechanic performance reports will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Reports;
