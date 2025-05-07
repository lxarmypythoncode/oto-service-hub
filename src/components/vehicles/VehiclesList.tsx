
import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const VehiclesList: React.FC = () => {
  const { toast } = useToast();

  // Mock vehicles data
  const vehicles = [
    {
      id: "1",
      make: "Toyota",
      model: "Avanza",
      year: 2020,
      registrationNumber: "B 1234 XYZ",
      lastService: "2023-12-15",
      status: "active"
    },
    {
      id: "2",
      make: "Honda",
      model: "Jazz",
      year: 2018,
      registrationNumber: "B 5678 ABC",
      lastService: "2024-01-20",
      status: "service-due"
    }
  ];

  const handleAddVehicle = () => {
    toast({
      title: "Feature coming soon",
      description: "Add vehicle functionality will be available shortly."
    });
  };

  const handleEditVehicle = (id: string) => {
    toast({
      title: "Feature coming soon",
      description: "Edit vehicle functionality will be available shortly."
    });
  };

  const handleDeleteVehicle = (id: string) => {
    toast({
      title: "Feature coming soon",
      description: "Delete vehicle functionality will be available shortly."
    });
  };

  return (
    <>
      <CardContent>
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{vehicle.make} {vehicle.model} ({vehicle.year})</h3>
                  <Badge variant={vehicle.status === "active" ? "outline" : "secondary"}>
                    {vehicle.status === "active" ? "Active" : "Service Due"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Reg. No: {vehicle.registrationNumber}</p>
                <p className="text-sm text-muted-foreground">Last service: {new Date(vehicle.lastService).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <Button variant="outline" size="sm" onClick={() => handleEditVehicle(vehicle.id)}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50" onClick={() => handleDeleteVehicle(vehicle.id)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddVehicle} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add New Vehicle
        </Button>
      </CardFooter>
    </>
  );
};

export default VehiclesList;
