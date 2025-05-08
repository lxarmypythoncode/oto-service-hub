
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { db, ServiceOrder, User, Vehicle } from "@/utils/db";

type ServiceStatus = "completed" | "in_progress" | "pending" | "cancelled";

interface ServiceWithDetails {
  id: number;
  customer: string;
  vehicle: string;
  service: string;
  date: string;
  status: ServiceStatus;
}

const getStatusBadge = (status: ServiceStatus) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
    case "in_progress":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Progress</Badge>;
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Waiting</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export const RecentServicesList: React.FC = () => {
  const [services, setServices] = useState<ServiceWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentServices = async () => {
      setLoading(true);
      try {
        // Fetch all service orders
        const serviceOrders = await db.getServiceOrders();
        
        // Sort by date
        serviceOrders.sort((a, b) => 
          new Date(b.service_date).getTime() - new Date(a.service_date).getTime()
        );
        
        // Take only the most recent ones
        const recentOrders = serviceOrders.slice(0, 5);
        
        // Get details for each order
        const detailedServices: ServiceWithDetails[] = await Promise.all(
          recentOrders.map(async (order) => {
            const customer = await db.getUserById(order.customer_id);
            const vehicle = await db.getVehicleById(order.vehicle_id);
            
            return {
              id: order.order_id,
              customer: customer?.name || "Unknown Customer",
              vehicle: vehicle ? `${vehicle.make} ${vehicle.model} ${vehicle.license_plate}` : "Unknown Vehicle",
              service: order.notes?.split(',')[0] || "General Service",
              date: formatServiceDate(new Date(order.service_date)),
              status: order.status as ServiceStatus
            };
          })
        );
        
        setServices(detailedServices);
      } catch (error) {
        console.error("Error fetching recent services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentServices();
  }, []);

  const formatServiceDate = (date: Date): string => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date >= today) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date >= yesterday) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };
  
  if (loading) {
    return <div className="py-4 text-center">Loading recent services...</div>;
  }

  return (
    <div className="space-y-4">
      {services.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No recent services found.</p>
      ) : (
        services.map((service, index) => (
          <React.Fragment key={service.id}>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="font-medium">{service.service}</p>
                <p className="text-sm text-muted-foreground">{service.vehicle}</p>
                <p className="text-sm text-muted-foreground">{service.customer}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div>{getStatusBadge(service.status)}</div>
                <p className="text-xs text-muted-foreground">{service.date}</p>
              </div>
            </div>
            {index < services.length - 1 && <Separator className="my-2" />}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default RecentServicesList;
