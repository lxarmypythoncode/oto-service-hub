
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for revenue chart
const revenueData = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 14000 },
  { month: "Mar", revenue: 15800 },
  { month: "Apr", revenue: 16200 },
  { month: "May", revenue: 18900 },
  { month: "Jun", revenue: 17500 },
];

// Mock data for service type revenue
const serviceRevenueData = [
  { name: "Maintenance", value: 35000 },
  { name: "Repairs", value: 45000 },
  { name: "Diagnostics", value: 15000 },
  { name: "Parts", value: 5000 },
];

const RevenueReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select defaultValue="6months">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Legend />
                <Bar dataKey="revenue" fill="#4f46e5" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Service Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={serviceRevenueData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Legend />
                  <Bar dataKey="value" fill="#16a34a" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-100">
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold">$94,900</p>
                  <p className="text-sm text-green-600">+12.5% from last period</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-100">
                  <p className="text-sm text-gray-500">Avg. Service Value</p>
                  <p className="text-2xl font-bold">$178</p>
                  <p className="text-sm text-green-600">+5.2% from last period</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-100">
                  <p className="text-sm text-gray-500">Services Completed</p>
                  <p className="text-2xl font-bold">534</p>
                  <p className="text-sm text-green-600">+8.3% from last period</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-100">
                  <p className="text-sm text-gray-500">Unique Customers</p>
                  <p className="text-2xl font-bold">312</p>
                  <p className="text-sm text-green-600">+15.7% from last period</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueReports;
