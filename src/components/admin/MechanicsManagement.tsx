
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
import { db, User } from "@/utils/db";

interface MechanicWithDetails extends User {
  specialization?: string;
  experience?: string;
}

const MechanicsManagement: React.FC = () => {
  const [mechanics, setMechanics] = useState<MechanicWithDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [selectedMechanic, setSelectedMechanic] = useState<MechanicWithDetails | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMechanic, setNewMechanic] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMechanics = async () => {
      setLoading(true);
      try {
        // Get mechanics from the database
        const mechanicsList = await db.getUsersByRole('mechanic');
        
        // Add mock specialization and experience data
        // In a real implementation, you would have this data in the database
        const mechanicsWithDetails: MechanicWithDetails[] = mechanicsList.map((mechanic, index) => {
          const specializations = ["Engine Repair", "Electrical Systems", "Transmission", "Brake Systems", "General Maintenance"];
          const experienceYears = ["2 years", "3 years", "4 years", "5 years", "7 years"];
          
          return {
            ...mechanic,
            specialization: specializations[index % specializations.length],
            experience: experienceYears[index % experienceYears.length]
          };
        });
        
        setMechanics(mechanicsWithDetails);
      } catch (error) {
        console.error("Error fetching mechanics:", error);
        toast({
          title: "Error",
          description: "Failed to load mechanics data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMechanics();
  }, [toast]);

  const filteredMechanics = mechanics.filter(
    (mechanic) =>
      mechanic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mechanic.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (isApproved: boolean) => {
    if (isApproved) {
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>;
    }
  };

  const handleStatusChange = async (id: number, newStatus: boolean) => {
    try {
      const success = await db.updateUserStatus(id, newStatus);
      
      if (success) {
        setMechanics((prevMechanics) =>
          prevMechanics.map((mechanic) =>
            mechanic.user_id === id ? { ...mechanic, is_approved: newStatus } : mechanic
          )
        );

        toast({
          title: "Status Updated",
          description: `Mechanic's status has been changed to ${newStatus ? 'approved' : 'rejected'}`,
        });
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating mechanic status:", error);
      toast({
        title: "Error",
        description: "Failed to update mechanic status",
        variant: "destructive",
      });
    }
  };

  const handleAddMechanic = async () => {
    try {
      const newUser = await db.addUser({
        name: newMechanic.name,
        email: newMechanic.email,
        role: 'mechanic',
        is_approved: false,
      });
      
      const mechanicWithDetails: MechanicWithDetails = {
        ...newUser,
        specialization: newMechanic.specialization,
        experience: newMechanic.experience
      };
      
      setMechanics([...mechanics, mechanicWithDetails]);
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
    } catch (error) {
      console.error("Error adding mechanic:", error);
      toast({
        title: "Error",
        description: "Failed to add mechanic",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading mechanics data...</div>;
  }

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
                  <TableRow key={mechanic.user_id}>
                    <TableCell className="font-medium">M{mechanic.user_id.toString().padStart(3, '0')}</TableCell>
                    <TableCell>{mechanic.name}</TableCell>
                    <TableCell>{mechanic.email}</TableCell>
                    <TableCell>{mechanic.specialization}</TableCell>
                    <TableCell>{mechanic.experience}</TableCell>
                    <TableCell>{new Date(mechanic.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(mechanic.is_approved)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {!mechanic.is_approved && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-50 text-green-700 hover:bg-green-100"
                              onClick={() => handleStatusChange(mechanic.user_id, true)}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-50 text-red-700 hover:bg-red-100"
                              onClick={() => handleStatusChange(mechanic.user_id, false)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {mechanic.is_approved && (
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
                                    <p className="col-span-3">M{selectedMechanic.user_id.toString().padStart(3, '0')}</p>
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
                                    <p className="col-span-3">{new Date(selectedMechanic.created_at).toLocaleDateString()}</p>
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
                  .filter((m) => !m.is_approved)
                  .map((mechanic) => (
                    <TableRow key={mechanic.user_id}>
                      <TableCell className="font-medium">M{mechanic.user_id.toString().padStart(3, '0')}</TableCell>
                      <TableCell>{mechanic.name}</TableCell>
                      <TableCell>{mechanic.email}</TableCell>
                      <TableCell>{mechanic.specialization}</TableCell>
                      <TableCell>{mechanic.experience}</TableCell>
                      <TableCell>{new Date(mechanic.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-green-50 text-green-700 hover:bg-green-100"
                            onClick={() => handleStatusChange(mechanic.user_id, true)}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-50 text-red-700 hover:bg-red-100"
                            onClick={() => handleStatusChange(mechanic.user_id, false)}
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
                  .filter((m) => m.is_approved)
                  .map((mechanic) => (
                    <TableRow key={mechanic.user_id}>
                      <TableCell className="font-medium">M{mechanic.user_id.toString().padStart(3, '0')}</TableCell>
                      <TableCell>{mechanic.name}</TableCell>
                      <TableCell>{mechanic.email}</TableCell>
                      <TableCell>{mechanic.specialization}</TableCell>
                      <TableCell>{mechanic.experience}</TableCell>
                      <TableCell>{new Date(mechanic.created_at).toLocaleDateString()}</TableCell>
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
