
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for service distribution
const serviceDistribution = [
  { name: "Oil Change", value: 120 },
  { name: "Brake Service", value: 80 },
  { name: "Tire Replacement", value: 60 },
  { name: "Engine Repair", value: 30 },
  { name: "AC Service", value: 45 },
  { name: "Others", value: 55 },
];

// Mock data for service satisfaction
const satisfactionData = [
  { name: "Oil Change", satisfaction: 4.8 },
  { name: "Brake Service", satisfaction: 4.5 },
  { name: "Tire Replacement", satisfaction: 4.7 },
  { name: "Engine Repair", satisfaction: 4.3 },
  { name: "AC Service", satisfaction: 4.6 },
];

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const ServiceReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Services"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={satisfactionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip formatter={(value) => [value, "Rating (out of 5)"]} />
                  <Legend />
                  <Bar dataKey="satisfaction" fill="#16a34a" name="Satisfaction Rating" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-gray-100">
              <p className="text-sm text-gray-500">Total Services</p>
              <p className="text-2xl font-bold">390</p>
              <p className="text-sm text-green-600">Last 30 days</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-100">
              <p className="text-sm text-gray-500">Avg. Completion Time</p>
              <p className="text-2xl font-bold">1.4 hrs</p>
              <p className="text-sm text-green-600">-12% from target</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-100">
              <p className="text-sm text-gray-500">Repeat Customers</p>
              <p className="text-2xl font-bold">62%</p>
              <p className="text-sm text-green-600">+5% from last month</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-100">
              <p className="text-sm text-gray-500">Avg. Rating</p>
              <p className="text-2xl font-bold">4.6/5</p>
              <p className="text-sm text-green-600">+0.2 from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceReports;
