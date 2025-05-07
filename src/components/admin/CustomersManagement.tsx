
import React, { useState } from "react";
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

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  vehicleCount: number;
  status: "active" | "inactive";
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: "C001",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+1 555-123-4567",
    joinDate: "2023-01-20",
    vehicleCount: 2,
    status: "active",
  },
  {
    id: "C002",
    name: "Emma Thomas",
    email: "emma.thomas@example.com",
    phone: "+1 555-987-6543",
    joinDate: "2023-02-15",
    vehicleCount: 1,
    status: "active",
  },
  {
    id: "C003",
    name: "Robert Garcia",
    email: "robert.garcia@example.com",
    phone: "+1 555-456-7890",
    joinDate: "2023-03-05",
    vehicleCount: 3,
    status: "active",
  },
  {
    id: "C004",
    name: "Sophia Lee",
    email: "sophia.lee@example.com",
    phone: "+1 555-789-0123",
    joinDate: "2023-04-10",
    vehicleCount: 1,
    status: "inactive",
  },
  {
    id: "C005",
    name: "William Johnson",
    email: "william.johnson@example.com",
    phone: "+1 555-234-5678",
    joinDate: "2023-05-22",
    vehicleCount: 2,
    status: "active",
  },
];

interface CustomerVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  lastService: string;
}

// Mock vehicle data
const mockVehicles: Record<string, CustomerVehicle[]> = {
  "C001": [
    {
      id: "V001",
      make: "Toyota",
      model: "Camry",
      year: 2020,
      licensePlate: "ABC123",
      lastService: "2023-05-15",
    },
    {
      id: "V002",
      make: "Honda",
      model: "CR-V",
      year: 2019,
      licensePlate: "XYZ789",
      lastService: "2023-04-20",
    },
  ],
  "C002": [
    {
      id: "V003",
      make: "Ford",
      model: "Focus",
      year: 2021,
      licensePlate: "DEF456",
      lastService: "2023-06-10",
    },
  ],
  "C003": [
    {
      id: "V004",
      make: "Chevrolet",
      model: "Malibu",
      year: 2018,
      licensePlate: "GHI789",
      lastService: "2023-03-25",
    },
    {
      id: "V005",
      make: "Nissan",
      model: "Altima",
      year: 2022,
      licensePlate: "JKL012",
      lastService: "2023-07-05",
    },
    {
      id: "V006",
      make: "Mazda",
      model: "CX-5",
      year: 2020,
      licensePlate: "MNO345",
      lastService: "2023-02-28",
    },
  ],
  "C004": [
    {
      id: "V007",
      make: "Hyundai",
      model: "Tucson",
      year: 2021,
      licensePlate: "PQR678",
      lastService: "2023-05-30",
    },
  ],
  "C005": [
    {
      id: "V008",
      make: "Kia",
      model: "Sportage",
      year: 2019,
      licensePlate: "STU901",
      lastService: "2023-04-15",
    },
    {
      id: "V009",
      make: "Subaru",
      model: "Outback",
      year: 2022,
      licensePlate: "VWX234",
      lastService: "2023-06-22",
    },
  ],
};

const CustomersManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: "active" | "inactive") => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
    );
  };

  const toggleCustomerStatus = (id: string) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status: customer.status === "active" ? "inactive" : "active",
            }
          : customer
      )
    );
    
    const customer = customers.find(c => c.id === id);
    const newStatus = customer?.status === "active" ? "inactive" : "active";
    
    toast({
      title: "Status Updated",
      description: `Customer's status has been changed to ${newStatus}`,
    });
  };

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
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.joinDate}</TableCell>
                <TableCell>{customer.vehicleCount}</TableCell>
                <TableCell>{getStatusBadge(customer.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCustomer(customer.id)}
                        >
                          View Vehicles
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Customer Vehicles</DialogTitle>
                          <DialogDescription>
                            Vehicles owned by {customers.find(c => c.id === selectedCustomer)?.name}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedCustomer && (
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
                                {mockVehicles[selectedCustomer]?.map((vehicle) => (
                                  <TableRow key={vehicle.id}>
                                    <TableCell>{vehicle.id}</TableCell>
                                    <TableCell>{vehicle.make}</TableCell>
                                    <TableCell>{vehicle.model}</TableCell>
                                    <TableCell>{vehicle.year}</TableCell>
                                    <TableCell>{vehicle.licensePlate}</TableCell>
                                    <TableCell>{vehicle.lastService}</TableCell>
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
                      onClick={() => toggleCustomerStatus(customer.id)}
                    >
                      {customer.status === "active" ? "Deactivate" : "Activate"}
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
