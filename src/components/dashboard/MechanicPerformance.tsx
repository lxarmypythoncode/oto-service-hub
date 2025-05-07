
import React from "react";
import { Progress } from "@/components/ui/progress";

export const MechanicPerformance = () => {
  const mechanics = [
    { id: 1, name: "Joko Widodo", completed: 15, total: 18, percentage: 83 },
    { id: 2, name: "Budi Santoso", completed: 12, total: 15, percentage: 80 },
    { id: 3, name: "Dewi Lestari", completed: 18, total: 20, percentage: 90 },
  ];
  
  return (
    <div className="space-y-4">
      {mechanics.map(mechanic => (
        <div key={mechanic.id} className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="font-medium">{mechanic.name}</div>
            <div className="text-sm text-muted-foreground">
              {mechanic.completed}/{mechanic.total} tasks
            </div>
          </div>
          <Progress value={mechanic.percentage} className="h-2" />
        </div>
      ))}
    </div>
  );
};
