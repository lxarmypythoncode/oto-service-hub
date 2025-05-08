
import React, { useState, useEffect } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db, User, Vehicle } from "@/utils/db";

interface CustomerWithVehicleCount extends User {
  vehicleCount: number;
}

const CustomersManagement: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerWithVehicleCount[]>([]);
  const [vehicles, setVehicles] = useState<Record<number, Vehicle[]>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        // Get customers from the database
        const customersList = await db.getUsersByRole('customer');
        const allVehicles = await db.getVehicles();
        
        // Count vehicles for each customer
        const customersWithCount = await Promise.all(
          customersList.map(async (customer) => {
            const custVehicles = allVehicles.filter(v => v.owner_id === customer.user_id);
            
            // Store vehicles for this customer
            setVehicles(prev => ({
              ...prev,
              [customer.user_id]: custVehicles
            }));
            
            return {
              ...customer,
              vehicleCount: custVehicles.length
            };
          })
        );
        
        setCustomers(customersWithCount);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast({
          title: "Error",
          description: "Failed to load customers data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [toast]);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (isApproved: boolean) => {
    return isApproved ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
    );
  };

  const toggleCustomerStatus = async (id: number) => {
    const customer = customers.find(c => c.user_id === id);
    if (!customer) return;
    
    const newStatus = !customer.is_approved;
    
    try {
      const success = await db.updateUserStatus(id, newStatus);
      
      if (success) {
        setCustomers(prevCustomers =>
          prevCustomers.map(customer =>
            customer.user_id === id
              ? {
                  ...customer,
                  is_approved: newStatus,
                }
              : customer
          )
        );
        
        toast({
          title: "Status Updated",
          description: `Customer's status has been changed to ${newStatus ? 'active' : 'inactive'}`,
        });
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating customer status:", error);
      toast({
        title: "Error",
        description: "Failed to update customer status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading customers data...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Input
          placeholder="Search customers..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Vehicles</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.user_id}>
                <TableCell className="font-medium">C{customer.user_id.toString().padStart(3, '0')}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone || "—"}</TableCell>
                <TableCell>{new Date(customer.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{customer.vehicleCount}</TableCell>
                <TableCell>{getStatusBadge(customer.is_approved)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCustomer(customer.user_id)}
                        >
                          View Vehicles
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Customer Vehicles</DialogTitle>
                          <DialogDescription>
                            Vehicles owned by {customers.find(c => c.user_id === selectedCustomer)?.name}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedCustomer && vehicles[selectedCustomer] && (
                          <div className="mt-4">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>ID</TableHead>
                                  <TableHead>Make</TableHead>
                                  <TableHead>Model</TableHead>
                                  <TableHead>Year</TableHead>
                                  <TableHead>License Plate</TableHead>
                                  <TableHead>Last Service</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {vehicles[selectedCustomer]?.map((vehicle) => (
                                  <TableRow key={vehicle.vehicle_id}>
                                    <TableCell>V{vehicle.vehicle_id.toString().padStart(3, '0')}</TableCell>
                                    <TableCell>{vehicle.make}</TableCell>
                                    <TableCell>{vehicle.model}</TableCell>
                                    <TableCell>{vehicle.year}</TableCell>
                                    <TableCell>{vehicle.license_plate}</TableCell>
                                    <TableCell>{vehicle.last_service_date ? new Date(vehicle.last_service_date).toLocaleDateString() : "—"}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCustomerStatus(customer.user_id)}
                    >
                      {customer.is_approved ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomersManagement;
