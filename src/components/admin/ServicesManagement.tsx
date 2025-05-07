
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
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  isActive: boolean;
}

// Mock data
const mockServices: Service[] = [
  {
    id: "S001",
    name: "Oil Change",
    description: "Standard oil and filter change with quality oil",
    duration: "30 min",
    price: 49.99,
    category: "Maintenance",
    isActive: true,
  },
  {
    id: "S002",
    name: "Brake Pad Replacement",
    description: "Replacement of worn brake pads with new premium pads",
    duration: "60 min",
    price: 199.99,
    category: "Repairs",
    isActive: true,
  },
  {
    id: "S003",
    name: "Wheel Alignment",
    description: "Computer-assisted alignment of all wheels",
    duration: "45 min",
    price: 89.99,
    category: "Maintenance",
    isActive: true,
  },
  {
    id: "S004",
    name: "AC System Check",
    description: "Comprehensive check and recharge of AC system",
    duration: "60 min",
    price: 129.99,
    category: "Diagnostics",
    isActive: true,
  },
  {
    id: "S005",
    name: "Engine Timing Belt Replacement",
    description: "Complete replacement of timing belt and related components",
    duration: "180 min",
    price: 499.99,
    category: "Repairs",
    isActive: false,
  },
];

const ServicesManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [newService, setNewService] = useState<Partial<Service>>({
    name: "",
    description: "",
    duration: "",
    price: 0,
    category: "",
    isActive: true,
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleActive = (id: string) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id
          ? { ...service, isActive: !service.isActive }
          : service
      )
    );

    const service = services.find((s) => s.id === id);
    const newStatus = service?.isActive ? "inactive" : "active";

    toast({
      title: "Service Status Updated",
      description: `${service?.name} is now ${newStatus}`,
    });
  };

  const handleAddService = () => {
    const id = `S${String(services.length + 1).padStart(3, "0")}`;
    
    const service: Service = {
      id,
      name: newService.name || "",
      description: newService.description || "",
      duration: newService.duration || "",
      price: newService.price || 0,
      category: newService.category || "",
      isActive: newService.isActive || true,
    };

    setServices([...services, service]);
    setIsAddDialogOpen(false);
    setNewService({
      name: "",
      description: "",
      duration: "",
      price: 0,
      category: "",
      isActive: true,
    });

    toast({
      title: "Service Added",
      description: `${service.name} has been added to your service list`,
    });
  };

  const handleUpdateService = () => {
    if (!editingService) return;

    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === editingService.id ? editingService : service
      )
    );

    setIsEditDialogOpen(false);
    setEditingService(null);

    toast({
      title: "Service Updated",
      description: "Service details have been updated successfully",
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Input
          placeholder="Search services..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-workshop-primary hover:bg-workshop-secondary">
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new service for your workshop catalog
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newService.name}
                  onChange={(e) =>
                    setNewService({ ...newService, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({ ...newService, description: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration
                </Label>
                <Input
                  id="duration"
                  placeholder="e.g. 30 min"
                  value={newService.duration}
                  onChange={(e) =>
                    setNewService({ ...newService, duration: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newService.price}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  placeholder="e.g. Maintenance, Repairs"
                  value={newService.category}
                  onChange={(e) =>
                    setNewService({ ...newService, category: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddService}>
                Add Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-gray-500 hidden md:block">
                      {service.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {service.category}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {service.duration}
                </TableCell>
                <TableCell>${service.price.toFixed(2)}</TableCell>
                <TableCell>
                  {service.isActive ? (
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Dialog open={isEditDialogOpen && editingService?.id === service.id} onOpenChange={(open) => {
                      setIsEditDialogOpen(open);
                      if (!open) setEditingService(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingService(service);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Edit Service</DialogTitle>
                          <DialogDescription>
                            Update service details
                          </DialogDescription>
                        </DialogHeader>
                        {editingService && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-name" className="text-right">
                                Name
                              </Label>
                              <Input
                                id="edit-name"
                                value={editingService.name}
                                onChange={(e) =>
                                  setEditingService({
                                    ...editingService,
                                    name: e.target.value,
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-description" className="text-right">
                                Description
                              </Label>
                              <Textarea
                                id="edit-description"
                                value={editingService.description}
                                onChange={(e) =>
                                  setEditingService({
                                    ...editingService,
                                    description: e.target.value,
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-duration" className="text-right">
                                Duration
                              </Label>
                              <Input
                                id="edit-duration"
                                value={editingService.duration}
                                onChange={(e) =>
                                  setEditingService({
                                    ...editingService,
                                    duration: e.target.value,
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-price" className="text-right">
                                Price ($)
                              </Label>
                              <Input
                                id="edit-price"
                                type="number"
                                value={editingService.price}
                                onChange={(e) =>
                                  setEditingService({
                                    ...editingService,
                                    price: parseFloat(e.target.value),
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-category" className="text-right">
                                Category
                              </Label>
                              <Input
                                id="edit-category"
                                value={editingService.category}
                                onChange={(e) =>
                                  setEditingService({
                                    ...editingService,
                                    category: e.target.value,
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button type="submit" onClick={handleUpdateService}>
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(service.id)}
                    >
                      {service.isActive ? "Deactivate" : "Activate"}
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

export default ServicesManagement;
