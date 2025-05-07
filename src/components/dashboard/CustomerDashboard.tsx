import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Wrench, Clock, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const CustomerDashboard: React.FC = () => {
  

  return (
    <div className="flex flex-col space-y-6">
      

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Registered vehicles</p>
          </CardContent>
          <CardFooter className="pt-1">
            <Button variant="outline" size="sm" className="w-full">
              Manage Vehicles
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
          <CardFooter className="pt-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service History</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Past services</p>
          </CardContent>
          <CardFooter className="pt-1">
            <Button variant="outline" size="sm" className="w-full">
              View History
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold mb-4">Active Service Status</h3>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Oil Change & Tune Up Service</CardTitle>
                <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
              </div>
              <CardDescription>Toyota Avanza - B 1234 XYZ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Progress</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mechanic</span>
                    <span>Budi Satria</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Started</span>
                    <span>Today, 10:30 AM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Est. Completion</span>
                    <span>Today, 12:00 PM</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Contact Workshop
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Maintenance Schedule</h3>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Service Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">Toyota Avanza</p>
                      <p className="text-sm text-muted-foreground">Brake fluid replacement</p>
                    </div>
                  </div>
                  <Badge variant="outline">Due in 2 weeks</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Honda Jazz</p>
                      <p className="text-sm text-muted-foreground">Annual inspection</p>
                    </div>
                  </div>
                  <Badge variant="outline">Due in 1 month</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="secondary">
                Book Maintenance Service
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Book a New Service</CardTitle>
          <CardDescription>
            Schedule your next vehicle service with our expert mechanics
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap md:flex-nowrap">
          <div className="flex flex-col items-center justify-center p-6 border rounded-lg w-full md:w-1/4 bg-workshop-primary/5">
            <Car className="h-10 w-10 mb-2 text-workshop-primary" />
            <h3 className="text-lg font-medium mb-1">Regular Maintenance</h3>
            <p className="text-sm text-center text-muted-foreground">Oil change, filters, and basic inspection</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-6 border rounded-lg w-full md:w-1/4 bg-workshop-secondary/5">
            <Wrench className="h-10 w-10 mb-2 text-workshop-secondary" />
            <h3 className="text-lg font-medium mb-1">Repair Service</h3>
            <p className="text-sm text-center text-muted-foreground">Fix specific issues with your vehicle</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-6 border rounded-lg w-full md:w-1/4 bg-workshop-accent/5">
            <FileText className="h-10 w-10 mb-2 text-workshop-accent" />
            <h3 className="text-lg font-medium mb-1">Inspection</h3>
            <p className="text-sm text-center text-muted-foreground">Comprehensive vehicle health check</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-6 border rounded-lg w-full md:w-1/4 bg-gray-100">
            <Clock className="h-10 w-10 mb-2 text-gray-500" />
            <h3 className="text-lg font-medium mb-1">Custom Service</h3>
            <p className="text-sm text-center text-muted-foreground">Tell us what your vehicle needs</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            Book a Service
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerDashboard;
