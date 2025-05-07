
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const ServiceHistoryList: React.FC = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [vehicleFilter, setVehicleFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock service history data
  const serviceHistory = [
    {
      id: "1",
      vehicle: {
        id: "1",
        name: "Toyota Avanza (B 1234 XYZ)"
      },
      serviceType: "Regular Maintenance",
      date: "2023-12-15",
      cost: "Rp 850,000",
      status: "completed",
      mechanic: "Budi Satria",
      description: "Oil change, filter replacement, and general inspection.",
      parts: [
        { name: "Engine Oil", quantity: 4, price: "Rp 300,000" },
        { name: "Oil Filter", quantity: 1, price: "Rp 150,000" },
        { name: "Air Filter", quantity: 1, price: "Rp 200,000" }
      ]
    },
    {
      id: "2",
      vehicle: {
        id: "1",
        name: "Toyota Avanza (B 1234 XYZ)"
      },
      serviceType: "Brake Repair",
      date: "2023-09-05",
      cost: "Rp 1,200,000",
      status: "completed",
      mechanic: "Agus Prakoso",
      description: "Front brake pad replacement and brake fluid flush.",
      parts: [
        { name: "Brake Pads (Front)", quantity: 1, price: "Rp 600,000" },
        { name: "Brake Fluid", quantity: 1, price: "Rp 250,000" }
      ]
    },
    {
      id: "3",
      vehicle: {
        id: "2",
        name: "Honda Jazz (B 5678 ABC)"
      },
      serviceType: "Battery Replacement",
      date: "2024-01-20",
      cost: "Rp 950,000",
      status: "completed",
      mechanic: "Budi Satria",
      description: "Replacement of battery that was no longer holding charge.",
      parts: [
        { name: "Battery", quantity: 1, price: "Rp 800,000" }
      ]
    }
  ];

  const toggleServiceDetails = (serviceId: string) => {
    if (expandedService === serviceId) {
      setExpandedService(null);
    } else {
      setExpandedService(serviceId);
    }
  };

  const filteredServices = serviceHistory.filter((service) => {
    // Filter by vehicle
    const vehicleMatch = vehicleFilter === "all" || service.vehicle.id === vehicleFilter;
    
    // Filter by search query
    const searchMatch = 
      service.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.mechanic.toLowerCase().includes(searchQuery.toLowerCase());
    
    return vehicleMatch && searchMatch;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "scheduled": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
              <SelectItem value="1">Toyota Avanza</SelectItem>
              <SelectItem value="2">Honda Jazz</SelectItem>
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
            <div key={service.id} className="border rounded-lg overflow-hidden">
              <div 
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 cursor-pointer hover:bg-muted/50"
                onClick={() => toggleServiceDetails(service.id)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{service.serviceType}</h3>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status === "completed" ? "Completed" : service.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.vehicle.name}</p>
                  <p className="text-sm text-muted-foreground">Date: {new Date(service.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <span className="font-medium">{service.cost}</span>
                  {expandedService === service.id ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              {expandedService === service.id && (
                <div className="p-4 bg-muted/30 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Service Details</p>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
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
                          {service.parts.map((part, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-2">{part.name}</td>
                              <td className="text-center py-2">{part.quantity}</td>
                              <td className="text-right py-2">{part.price}</td>
                            </tr>
                          ))}
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
