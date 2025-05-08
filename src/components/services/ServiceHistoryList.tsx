
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { db, ServiceOrder, Vehicle, Service, Part, ServicePart } from "@/utils/db";

interface ExtendedServiceOrder extends ServiceOrder {
  vehicle: {
    id: number;
    name: string;
  };
  serviceType: string;
  mechanic: string;
  cost: string;
  parts: {
    name: string;
    quantity: number;
    price: string;
  }[];
}

const ServiceHistoryList: React.FC = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [vehicleFilter, setVehicleFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [serviceHistory, setServiceHistory] = useState<ExtendedServiceOrder[]>([]);
  const [userVehicles, setUserVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceHistory = async () => {
      setLoading(true);
      try {
        // In a real app, you would get the current user's ID from authentication
        const userId = 6; // Mock user ID
        
        // Get user's service orders
        const orders = await db.getServiceOrdersByCustomer(userId);
        const vehicles = await db.getVehiclesByOwner(userId);
        setUserVehicles(vehicles);
        
        // Get all services to map service types
        const allServices = await db.getServices();
        const serviceMap: Record<number, Service> = {};
        allServices.forEach(service => {
          serviceMap[service.service_id] = service;
        });
        
        // Fetch parts for each order
        const extendedOrders: ExtendedServiceOrder[] = await Promise.all(
          orders.map(async (order) => {
            const vehicle = vehicles.find(v => v.vehicle_id === order.vehicle_id);
            
            // Get parts used in this service
            const orderParts = await db.getServicePartsByOrder(order.order_id);
            const partsDetails: {name: string; quantity: number; price: string}[] = [];
            
            for (const servicePart of orderParts) {
              const part = await db.getPartById(servicePart.part_id);
              if (part) {
                partsDetails.push({
                  name: part.name,
                  quantity: servicePart.quantity,
                  price: `Rp ${servicePart.unit_price.toLocaleString()}`
                });
              }
            }
            
            // Calculate total cost from parts if not provided
            const totalCost = order.total_cost || 
              orderParts.reduce((sum, part) => sum + (part.unit_price * part.quantity), 0);
            
            return {
              ...order,
              vehicle: {
                id: vehicle?.vehicle_id || 0,
                name: vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.license_plate})` : "Unknown Vehicle"
              },
              serviceType: "Service Order", // Default service type if none specified
              mechanic: "Workshop Technician", // Default mechanic name if none specified
              cost: `Rp ${totalCost.toLocaleString()}`,
              parts: partsDetails
            };
          })
        );
        
        setServiceHistory(extendedOrders);
      } catch (error) {
        console.error("Error fetching service history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceHistory();
  }, []);

  const toggleServiceDetails = (serviceId: number) => {
    if (expandedService === serviceId) {
      setExpandedService(null);
    } else {
      setExpandedService(serviceId);
    }
  };

  const filteredServices = serviceHistory.filter((service) => {
    // Filter by vehicle
    const vehicleMatch = vehicleFilter === "all" || service.vehicle.id.toString() === vehicleFilter;
    
    // Filter by search query
    const searchMatch = 
      service.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.notes || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.mechanic.toLowerCase().includes(searchQuery.toLowerCase());
    
    return vehicleMatch && searchMatch;
  });

  const getStatusColor = (status: ServiceOrder['status']) => {
    switch(status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-orange-100 text-orange-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  if (loading) {
    return <CardContent className="text-center py-6">Loading service history...</CardContent>;
  }

  return (
    <CardContent>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <div className="w-full sm:w-1/3">
          <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by vehicle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vehicles</SelectItem>
              {userVehicles.map(vehicle => (
                <SelectItem key={vehicle.vehicle_id} value={vehicle.vehicle_id.toString()}>
                  {vehicle.make} {vehicle.model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-2/3">
          <Input
            placeholder="Search by service type, description, or mechanic"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredServices.length === 0 ? (
          <div className="text-center py-10">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No service history found</h3>
            <p className="text-sm text-muted-foreground">
              No records match your current filters.
            </p>
          </div>
        ) : (
          filteredServices.map((service) => (
            <div key={service.order_id} className="border rounded-lg overflow-hidden">
              <div 
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 cursor-pointer hover:bg-muted/50"
                onClick={() => toggleServiceDetails(service.order_id)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{service.serviceType}</h3>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status === "completed" ? "Completed" : 
                       service.status === "in_progress" ? "In Progress" : 
                       service.status === "pending" ? "Pending" : "Cancelled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.vehicle.name}</p>
                  <p className="text-sm text-muted-foreground">Date: {new Date(service.service_date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <span className="font-medium">{service.cost}</span>
                  {expandedService === service.order_id ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              {expandedService === service.order_id && (
                <div className="p-4 bg-muted/30 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Service Details</p>
                      <p className="text-sm text-muted-foreground">{service.notes || "No details provided."}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Mechanic</p>
                      <p className="text-sm text-muted-foreground">{service.mechanic}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Parts & Materials</p>
                    <div className="bg-background rounded-md p-2">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Item</th>
                            <th className="text-center py-2">Qty</th>
                            <th className="text-right py-2">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {service.parts.length > 0 ? (
                            service.parts.map((part, index) => (
                              <tr key={index} className="border-b last:border-0">
                                <td className="py-2">{part.name}</td>
                                <td className="text-center py-2">{part.quantity}</td>
                                <td className="text-right py-2">{part.price}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3} className="py-4 text-center text-muted-foreground">
                                No parts data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </CardContent>
  );
};

export default ServiceHistoryList;
