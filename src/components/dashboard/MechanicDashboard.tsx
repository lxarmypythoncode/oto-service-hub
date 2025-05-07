import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const MechanicDashboard: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mechanic Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your daily tasks and service orders.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Tasks</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Today's workload</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Currently working on</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Tasks completed</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Today's Work Orders</h3>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Oil Change & Filter Replacement</CardTitle>
                <Badge variant="outline" className="bg-yellow-100">In Progress</Badge>
              </div>
              <CardDescription>Toyota Avanza - B 1234 XYZ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Customer: Ahmad Zulkifli</span>
                  <span>Est. Completion: 30 mins</span>
                </div>
                <Progress value={60} className="h-2" />
                <p className="text-sm text-muted-foreground">Additional notes: Customer requested premium oil</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">Update Status</Button>
              <Button>Mark Complete</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Brake Pad Replacement</CardTitle>
                <Badge variant="outline" className="bg-green-100">Ready to Start</Badge>
              </div>
              <CardDescription>Honda Jazz - B 5678 ABC</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Customer: Dewi Satria</span>
                  <span>Est. Completion: 1.5 hours</span>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-sm text-muted-foreground">Additional notes: Front brake pads only</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">Start Job</Button>
              <Button variant="secondary">Check Parts</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Air Conditioning Service</CardTitle>
                <Badge variant="outline" className="bg-red-100">Parts Needed</Badge>
              </div>
              <CardDescription>Daihatsu Xenia - B 8765 DEF</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Customer: Budi Santoso</span>
                  <span>Est. Completion: Waiting for parts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <p className="text-sm text-amber-500">Missing: AC Compressor</p>
                </div>
                <p className="text-sm text-muted-foreground">Additional notes: Customer approved part replacement</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">Request Parts</Button>
              <Button variant="secondary">Contact Customer</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MechanicDashboard;
