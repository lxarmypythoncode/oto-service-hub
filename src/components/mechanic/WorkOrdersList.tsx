
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, Wrench } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock work orders data
const mockWorkOrders = [
  {
    id: "wo-001",
    vehicle: "Toyota Avanza - B 1234 XYZ",
    customer: "Ahmad Zulkifli",
    service: "Oil Change & Filter Replacement",
    status: "in_progress",
    estimatedTime: "30 mins",
    progress: 60,
    notes: "Customer requested premium oil",
    assignedAt: "2023-05-07T09:30:00",
  },
  {
    id: "wo-002",
    vehicle: "Honda Jazz - B 5678 ABC",
    customer: "Dewi Satria",
    service: "Brake Pad Replacement",
    status: "pending",
    estimatedTime: "1.5 hours",
    progress: 0,
    notes: "Front brake pads only",
    assignedAt: "2023-05-07T10:00:00",
  },
  {
    id: "wo-003",
    vehicle: "Daihatsu Xenia - B 8765 DEF",
    customer: "Budi Santoso",
    service: "Air Conditioning Service",
    status: "parts_needed",
    estimatedTime: "Waiting for parts",
    progress: 25,
    notes: "Customer approved part replacement",
    assignedAt: "2023-05-07T08:15:00",
  },
  {
    id: "wo-004",
    vehicle: "Mitsubishi Xpander - B 4321 GHI",
    customer: "Siti Rahma",
    service: "Full Maintenance Service",
    status: "completed",
    estimatedTime: "3 hours",
    progress: 100,
    notes: "60,000 km service",
    assignedAt: "2023-05-06T13:00:00",
    completedAt: "2023-05-06T16:15:00",
  },
];

type WorkOrderStatus = "pending" | "in_progress" | "parts_needed" | "completed";

const WorkOrdersList: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState(mockWorkOrders);

  const filteredOrders = orders.filter(order => 
    order.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateOrderStatus = (id: string, status: WorkOrderStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === id) {
        const newProgress = status === "completed" ? 100 : 
                           status === "in_progress" ? 50 :
                           status === "parts_needed" ? 25 : 0;
        return { ...order, status, progress: newProgress };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    toast({
      title: "Status updated",
      description: `Work order ${id} status has been updated.`,
    });
  };

  const getStatusBadge = (status: WorkOrderStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-green-100">Ready to Start</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-yellow-100">In Progress</Badge>;
      case "parts_needed":
        return <Badge variant="outline" className="bg-red-100">Parts Needed</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-blue-100">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search work orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-4">
            <div className="space-y-4">
              {filteredOrders
                .filter(order => order.status !== "completed")
                .map(order => (
                <div key={order.id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-lg">{order.service}</h4>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-gray-700">{order.vehicle}</p>
                  <div className="flex justify-between text-sm mt-2 mb-1">
                    <span>Customer: {order.customer}</span>
                    <span>Est. Time: {order.estimatedTime}</span>
                  </div>
                  <Progress value={order.progress} className="h-2 my-2" />
                  <p className="text-sm text-muted-foreground mt-2">Notes: {order.notes}</p>
                  
                  <div className="flex gap-2 mt-4">
                    {order.status === "pending" && (
                      <Button 
                        onClick={() => updateOrderStatus(order.id, "in_progress")}
                        size="sm"
                      >
                        <Clock className="mr-1 h-4 w-4" />
                        Start Job
                      </Button>
                    )}
                    
                    {order.status === "in_progress" && (
                      <>
                        <Button 
                          onClick={() => updateOrderStatus(order.id, "completed")}
                          size="sm"
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Complete
                        </Button>
                        <Button 
                          onClick={() => updateOrderStatus(order.id, "parts_needed")}
                          variant="outline"
                          size="sm"
                        >
                          <AlertTriangle className="mr-1 h-4 w-4" />
                          Need Parts
                        </Button>
                      </>
                    )}
                    
                    {order.status === "parts_needed" && (
                      <Button 
                        onClick={() => updateOrderStatus(order.id, "in_progress")}
                        size="sm"
                      >
                        <Wrench className="mr-1 h-4 w-4" />
                        Resume Job
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredOrders.filter(order => order.status !== "completed").length === 0 && (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">No active work orders found</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div key={order.id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-lg">{order.service}</h4>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-gray-700">{order.vehicle}</p>
                  <div className="flex justify-between text-sm mt-2 mb-1">
                    <span>Customer: {order.customer}</span>
                    <span>Est. Time: {order.estimatedTime}</span>
                  </div>
                  <Progress value={order.progress} className="h-2 my-2" />
                  <p className="text-sm text-muted-foreground mt-2">Notes: {order.notes}</p>
                </div>
              ))}
              
              {filteredOrders.length === 0 && (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">No work orders found</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <div className="space-y-4">
              {filteredOrders
                .filter(order => order.status === "completed")
                .map(order => (
                <div key={order.id} className="border rounded-lg p-4 shadow-sm opacity-80">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-lg">{order.service}</h4>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-gray-700">{order.vehicle}</p>
                  <div className="flex justify-between text-sm mt-2 mb-1">
                    <span>Customer: {order.customer}</span>
                    <span>Completed</span>
                  </div>
                  <Progress value={100} className="h-2 my-2" />
                  <p className="text-sm text-muted-foreground mt-2">Notes: {order.notes}</p>
                </div>
              ))}
              
              {filteredOrders.filter(order => order.status === "completed").length === 0 && (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">No completed work orders found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {filteredOrders.filter(order => order.status !== "completed").length} active work orders
        </p>
      </CardFooter>
    </>
  );
};

export default WorkOrdersList;
