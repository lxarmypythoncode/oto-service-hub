
import React, { useState } from "react";
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

type WorkOrderStatus = "pending" | "in_progress" | "completed" | "cancelled";

interface WorkOrder {
  id: string;
  vehicleInfo: string;
  customerName: string;
  serviceType: string;
  scheduledDate: string;
  status: WorkOrderStatus;
  notes: string;
}

const mockWorkOrders: WorkOrder[] = [
  {
    id: "WO-001",
    vehicleInfo: "Toyota Camry 2020",
    customerName: "John Smith",
    serviceType: "Oil Change",
    scheduledDate: "2023-06-15",
    status: "pending",
    notes: "Customer reports engine noise",
  },
  {
    id: "WO-002",
    vehicleInfo: "Honda Civic 2019",
    customerName: "Alice Johnson",
    serviceType: "Brake Replacement",
    scheduledDate: "2023-06-16",
    status: "in_progress",
    notes: "Front brakes only",
  },
  {
    id: "WO-003",
    vehicleInfo: "Ford F-150 2021",
    customerName: "Robert Davis",
    serviceType: "Full Service",
    scheduledDate: "2023-06-17",
    status: "completed",
    notes: "Annual maintenance",
  },
  {
    id: "WO-004",
    vehicleInfo: "Chevrolet Malibu 2018",
    customerName: "Emma Wilson",
    serviceType: "A/C Repair",
    scheduledDate: "2023-06-18",
    status: "cancelled",
    notes: "Customer rescheduled",
  },
];

const WorkOrdersList: React.FC = () => {
  const { toast } = useToast();
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(mockWorkOrders);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredOrders = filterStatus === "all"
    ? workOrders
    : workOrders.filter(order => order.status === filterStatus);

  const getStatusBadge = (status: WorkOrderStatus) => {
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

  const updateStatus = (orderId: string, newStatus: WorkOrderStatus) => {
    setWorkOrders(orders => 
      orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    toast({
      title: "Work Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Input 
          placeholder="Search work orders..." 
          className="max-w-xs" 
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
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.vehicleInfo}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.serviceType}</TableCell>
                    <TableCell>{order.scheduledDate}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      {order.status === "pending" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateStatus(order.id, "in_progress")}
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
                              <AlertDialogAction onClick={() => updateStatus(order.id, "completed")}>
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
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.vehicleInfo}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.serviceType}</TableCell>
                    <TableCell>{order.scheduledDate}</TableCell>
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
