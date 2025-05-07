
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type ServiceStatus = "completed" | "in-progress" | "waiting" | "cancelled";

interface Service {
  id: string;
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
    case "in-progress":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Progress</Badge>;
    case "waiting":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Waiting</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export const RecentServicesList: React.FC = () => {
  const services: Service[] = [
    {
      id: "SRV-001",
      customer: "Ahmad Zulkifli",
      vehicle: "Toyota Avanza B 1234 XYZ",
      service: "Oil Change & Filter Replacement",
      date: "Today, 10:30 AM",
      status: "in-progress",
    },
    {
      id: "SRV-002",
      customer: "Dewi Satria",
      vehicle: "Honda Jazz B 5678 ABC",
      service: "Brake Pad Replacement",
      date: "Today, 09:15 AM",
      status: "waiting",
    },
    {
      id: "SRV-003",
      customer: "Budi Santoso",
      vehicle: "Daihatsu Xenia B 8765 DEF",
      service: "Air Conditioning Service",
      date: "Yesterday, 02:45 PM",
      status: "completed",
    },
    {
      id: "SRV-004",
      customer: "Joko Suwarno",
      vehicle: "Suzuki Ertiga B 4321 GHI",
      service: "Wheel Alignment",
      date: "Yesterday, 10:00 AM",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-4">
      {services.map((service, index) => (
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
      ))}
    </div>
  );
};
