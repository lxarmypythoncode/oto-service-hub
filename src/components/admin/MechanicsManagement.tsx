
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type MechanicStatus = "pending" | "approved" | "rejected";

interface Mechanic {
  id: string;
  name: string;
  email: string;
  specialization: string;
  experience: string;
  joinDate: string;
  status: MechanicStatus;
}

// Mock data
const mockMechanics: Mechanic[] = [
  {
    id: "M001",
    name: "John Smith",
    email: "john.smith@example.com",
    specialization: "Engine Repair",
    experience: "5 years",
    joinDate: "2023-01-15",
    status: "approved",
  },
  {
    id: "M002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    specialization: "Electrical Systems",
    experience: "3 years",
    joinDate: "2023-03-10",
    status: "approved",
  },
  {
    id: "M003",
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    specialization: "Transmission",
    experience: "7 years",
    joinDate: "2023-05-22",
    status: "pending",
  },
  {
    id: "M004",
    name: "Lisa Brown",
    email: "lisa.brown@example.com",
    specialization: "Brake Systems",
    experience: "2 years",
    joinDate: "2023-06-05",
    status: "pending",
  },
  {
    id: "M005",
    name: "David Clark",
    email: "david.clark@example.com",
    specialization: "General Maintenance",
    experience: "4 years",
    joinDate: "2023-02-18",
    status: "rejected",
  },
];

const MechanicsManagement: React.FC = () => {
  const [mechanics, setMechanics] = useState<Mechanic[]>(mockMechanics);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMechanic, setNewMechanic] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
  });

  const filteredMechanics = mechanics.filter(
    (mechanic) =>
      mechanic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mechanic.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: MechanicStatus) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handleStatusChange = (id: string, newStatus: MechanicStatus) => {
    setMechanics((prevMechanics) =>
      prevMechanics.map((mechanic) =>
        mechanic.id === id ? { ...mechanic, status: newStatus } : mechanic
      )
    );

    toast({
      title: "Status Updated",
      description: `Mechanic's status has been changed to ${newStatus}`,
    });
  };

  const handleAddMechanic = () => {
    const id = `M${String(mechanics.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    const mechanic: Mechanic = {
      id,
      name: newMechanic.name,
      email: newMechanic.email,
      specialization: newMechanic.specialization,
      experience: newMechanic.experience,
      joinDate: today,
      status: "pending",
    };

    setMechanics([...mechanics, mechanic]);
    setIsAddDialogOpen(false);
    setNewMechanic({
      name: "",
      email: "",
      specialization: "",
      experience: "",
    });

    toast({
      title: "Mechanic Added",
      description: "New mechanic has been added and is pending approval",
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Input
          placeholder="Search mechanics..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-workshop-primary hover:bg-workshop-secondary">
              Add New Mechanic
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Mechanic</DialogTitle>
              <DialogDescription>
                Enter the details of the new mechanic to add them to your workshop.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newMechanic.name}
                  onChange={(e) =>
                    setNewMechanic({ ...newMechanic, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newMechanic.email}
                  onChange={(e) =>
                    setNewMechanic({ ...newMechanic, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialization" className="text-right">
                  Specialization
                </Label>
                <Input
                  id="specialization"
                  value={newMechanic.specialization}
                  onChange={(e) =>
                    setNewMechanic({
                      ...newMechanic,
                      specialization: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="experience" className="text-right">
                  Experience
                </Label>
                <Input
                  id="experience"
                  value={newMechanic.experience}
                  onChange={(e) =>
                    setNewMechanic({ ...newMechanic, experience: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddMechanic}>
                Add Mechanic
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Mechanics</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMechanics.map((mechanic) => (
                  <TableRow key={mechanic.id}>
                    <TableCell className="font-medium">{mechanic.id}</TableCell>
                    <TableCell>{mechanic.name}</TableCell>
                    <TableCell>{mechanic.email}</TableCell>
                    <TableCell>{mechanic.specialization}</TableCell>
                    <TableCell>{mechanic.experience}</TableCell>
                    <TableCell>{mechanic.joinDate}</TableCell>
                    <TableCell>{getStatusBadge(mechanic.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {mechanic.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-50 text-green-700 hover:bg-green-100"
                              onClick={() => handleStatusChange(mechanic.id, "approved")}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-50 text-red-700 hover:bg-red-100"
                              onClick={() => handleStatusChange(mechanic.id, "rejected")}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {mechanic.status === "approved" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedMechanic(mechanic)}
                              >
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Mechanic Details</DialogTitle>
                              </DialogHeader>
                              {selectedMechanic && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-right font-medium">ID:</p>
                                    <p className="col-span-3">{selectedMechanic.id}</p>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-right font-medium">Name:</p>
                                    <p className="col-span-3">{selectedMechanic.name}</p>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-right font-medium">Email:</p>
                                    <p className="col-span-3">{selectedMechanic.email}</p>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-right font-medium">Specialization:</p>
                                    <p className="col-span-3">{selectedMechanic.specialization}</p>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-right font-medium">Experience:</p>
                                    <p className="col-span-3">{selectedMechanic.experience}</p>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-right font-medium">Join Date:</p>
                                    <p className="col-span-3">{selectedMechanic.joinDate}</p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMechanics
                  .filter((m) => m.status === "pending")
                  .map((mechanic) => (
                    <TableRow key={mechanic.id}>
                      <TableCell className="font-medium">{mechanic.id}</TableCell>
                      <TableCell>{mechanic.name}</TableCell>
                      <TableCell>{mechanic.email}</TableCell>
                      <TableCell>{mechanic.specialization}</TableCell>
                      <TableCell>{mechanic.experience}</TableCell>
                      <TableCell>{mechanic.joinDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-green-50 text-green-700 hover:bg-green-100"
                            onClick={() => handleStatusChange(mechanic.id, "approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-50 text-red-700 hover:bg-red-100"
                            onClick={() => handleStatusChange(mechanic.id, "rejected")}
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMechanics
                  .filter((m) => m.status === "approved")
                  .map((mechanic) => (
                    <TableRow key={mechanic.id}>
                      <TableCell className="font-medium">{mechanic.id}</TableCell>
                      <TableCell>{mechanic.name}</TableCell>
                      <TableCell>{mechanic.email}</TableCell>
                      <TableCell>{mechanic.specialization}</TableCell>
                      <TableCell>{mechanic.experience}</TableCell>
                      <TableCell>{mechanic.joinDate}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMechanic(mechanic)}
                        >
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

export default MechanicsManagement;
