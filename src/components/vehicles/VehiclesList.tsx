
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { db, Vehicle } from "@/utils/db";

interface UserVehicle extends Vehicle {
  status: "active" | "service-due";
}

const VehiclesList: React.FC = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<UserVehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        // In a real app, you would get the current user's ID from authentication
        const userId = 6; // Mock user ID
        const userVehicles = await db.getVehiclesByOwner(userId);
        
        // Process vehicles to add status
        const processedVehicles = userVehicles.map(vehicle => {
          const lastServiceDate = vehicle.last_service_date ? new Date(vehicle.last_service_date) : null;
          const today = new Date();
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(today.getMonth() - 6);
          
          // If last service date is older than 6 months, mark as service-due
          const status = lastServiceDate && lastServiceDate < sixMonthsAgo ? "service-due" : "active";
          
          return {
            ...vehicle,
            status
          };
        });
        
        setVehicles(processedVehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        toast({
          title: "Error",
          description: "Failed to load vehicles data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [toast]);

  const handleAddVehicle = () => {
    toast({
      title: "Feature coming soon",
      description: "Add vehicle functionality will be available shortly."
    });
  };

  const handleEditVehicle = (id: number) => {
    toast({
      title: "Feature coming soon",
      description: "Edit vehicle functionality will be available shortly."
    });
  };

  const handleDeleteVehicle = (id: number) => {
    toast({
      title: "Feature coming soon",
      description: "Delete vehicle functionality will be available shortly."
    });
  };
  
  if (loading) {
    return <CardContent className="text-center py-6">Loading vehicles...</CardContent>;
  }

  return (
    <>
      <CardContent>
        {vehicles.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No vehicles found. Add your first vehicle.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <div key={vehicle.vehicle_id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{vehicle.make} {vehicle.model} ({vehicle.year})</h3>
                    <Badge variant={vehicle.status === "active" ? "outline" : "secondary"}>
                      {vehicle.status === "active" ? "Active" : "Service Due"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Reg. No: {vehicle.license_plate}</p>
                  <p className="text-sm text-muted-foreground">
                    Last service: {vehicle.last_service_date 
                      ? new Date(vehicle.last_service_date).toLocaleDateString() 
                      : "Not serviced yet"}
                  </p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <Button variant="outline" size="sm" onClick={() => handleEditVehicle(vehicle.vehicle_id)}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50" onClick={() => handleDeleteVehicle(vehicle.vehicle_id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
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
