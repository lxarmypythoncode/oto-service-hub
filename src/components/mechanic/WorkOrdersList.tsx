
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { db, ServiceOrder, User, Vehicle } from "@/utils/db";

interface WorkOrderWithDetails extends ServiceOrder {
  vehicleInfo: string;
  customerName: string;
  serviceType: string;
}

const WorkOrdersList: React.FC = () => {
  const { toast } = useToast();
  const [workOrders, setWorkOrders] = useState<WorkOrderWithDetails[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      setLoading(true);
      try {
        // In a real app, you would get the current mechanic's ID from authentication
        const mechanicId = 2; // Mock mechanic ID
        
        // Get service orders assigned to this mechanic
        const orders = await db.getServiceOrdersByMechanic(mechanicId);
        
        // Get customers and vehicles for these orders
        const customerIds = orders.map(order => order.customer_id);
        const vehicleIds = orders.map(order => order.vehicle_id);
        
        // Fetch all unique customers and vehicles at once
        const customers = await db.getUsers();
        const customersMap: Record<number, User> = {};
        customers.forEach(customer => {
          customersMap[customer.user_id] = customer;
        });
        
        const vehicles = await db.getVehicles();
        const vehiclesMap: Record<number, Vehicle> = {};
        vehicles.forEach(vehicle => {
          vehiclesMap[vehicle.vehicle_id] = vehicle;
        });
        
        // Create extended work orders with full details
        const extendedOrders: WorkOrderWithDetails[] = orders.map(order => {
          const customer = customersMap[order.customer_id];
          const vehicle = vehiclesMap[order.vehicle_id];
          
          return {
            ...order,
            vehicleInfo: vehicle ? `${vehicle.make} ${vehicle.model} ${vehicle.year}` : "Unknown Vehicle",
            customerName: customer ? customer.name : "Unknown Customer",
            serviceType: order.notes?.split(',')[0] || "General Service", // Use first part of notes as service type
          };
        });
        
        setWorkOrders(extendedOrders);
      } catch (error) {
        console.error("Error fetching work orders:", error);
        toast({
          title: "Error",
          description: "Failed to load work orders",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWorkOrders();
  }, [toast]);

  const filteredOrders = workOrders.filter(order => {
    // Apply status filter
    const statusMatch = filterStatus === "all" || order.status === filterStatus;
    
    // Apply search filter
    const searchMatch = 
      searchTerm === "" || 
      order.vehicleInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
      
    return statusMatch && searchMatch;
  });

  const getStatusBadge = (status: ServiceOrder['status']) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const updateStatus = async (orderId: number, newStatus: ServiceOrder['status']) => {
    try {
      const success = await db.updateServiceOrderStatus(orderId, newStatus);
      
      if (success) {
        setWorkOrders(orders => 
          orders.map(order => 
            order.order_id === orderId ? { ...order, status: newStatus } : order
          )
        );
        
        toast({
          title: "Work Order Updated",
          description: `Order ${orderId} status changed to ${newStatus.replace('_', ' ')}`,
        });
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };
  
  if (loading) {
    return <div className="p-6 text-center">Loading work orders...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Input 
          placeholder="Search work orders..." 
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.filter(order => order.status !== "completed" && order.status !== "cancelled").map(order => (
                  <TableRow key={order.order_id}>
                    <TableCell className="font-medium">WO-{order.order_id.toString().padStart(3, '0')}</TableCell>
                    <TableCell>{order.vehicleInfo}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.serviceType}</TableCell>
                    <TableCell>{new Date(order.service_date).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      {order.status === "pending" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateStatus(order.order_id, "in_progress")}
                        >
                          Start Work
                        </Button>
                      )}
                      {order.status === "in_progress" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">Complete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Mark as Completed?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will mark the work order as completed. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => updateStatus(order.order_id, "completed")}>
                                Complete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.filter(order => order.status === "completed" || order.status === "cancelled").map(order => (
                  <TableRow key={order.order_id}>
                    <TableCell className="font-medium">WO-{order.order_id.toString().padStart(3, '0')}</TableCell>
                    <TableCell>{order.vehicleInfo}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.serviceType}</TableCell>
                    <TableCell>{new Date(order.service_date).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkOrdersList;
