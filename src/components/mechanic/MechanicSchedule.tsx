
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { id } from 'date-fns/locale';

// Mock schedule data
const mockScheduleEvents = [
  {
    id: "evt-001",
    title: "Oil Change - Toyota Avanza",
    date: new Date(2025, 4, 6), // May 6, 2025
    startTime: "09:00",
    endTime: "10:00",
    customer: "Ahmad Zulkifli",
    status: "scheduled",
  },
  {
    id: "evt-002",
    title: "Brake Inspection - Honda Jazz",
    date: new Date(2025, 4, 6), // May 6, 2025
    startTime: "11:00",
    endTime: "12:30",
    customer: "Dewi Satria",
    status: "scheduled",
  },
  {
    id: "evt-003",
    title: "AC Repair - Daihatsu Xenia",
    date: new Date(2025, 4, 7), // May 7, 2025
    startTime: "13:00",
    endTime: "15:00",
    customer: "Budi Santoso",
    status: "scheduled",
  },
  {
    id: "evt-004",
    title: "Full Maintenance - Mitsubishi Xpander",
    date: new Date(2025, 4, 8), // May 8, 2025
    startTime: "10:00",
    endTime: "13:00",
    customer: "Siti Rahma",
    status: "scheduled",
  },
  {
    id: "evt-005",
    title: "Tire Replacement - Suzuki Ertiga",
    date: new Date(2025, 4, 9), // May 9, 2025
    startTime: "14:00",
    endTime: "15:00",
    customer: "Rudi Hermawan",
    status: "scheduled",
  },
];

const MechanicSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState(mockScheduleEvents);
  
  // Function to check if a date has events
  const hasEventsOn = (date: Date) => {
    return events.some(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Get events for the selected date
  const getDailyEvents = () => {
    if (!selectedDate) return [];
    
    return events.filter(event => 
      event.date.getDate() === selectedDate.getDate() && 
      event.date.getMonth() === selectedDate.getMonth() && 
      event.date.getFullYear() === selectedDate.getFullYear()
    ).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const dailyEvents = getDailyEvents();
  
  // Navigation for week view
  const goToNextDay = () => {
    if (selectedDate) {
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setSelectedDate(nextDay);
    }
  };
  
  const goToPreviousDay = () => {
    if (selectedDate) {
      const prevDay = new Date(selectedDate);
      prevDay.setDate(prevDay.getDate() - 1);
      setSelectedDate(prevDay);
    }
  };

  return (
    <>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-md"
              locale={id}
              modifiers={{
                hasEvent: (date) => hasEventsOn(date),
              }}
              modifiersClassNames={{
                hasEvent: "bg-workshop-primary/20",
              }}
            />
          </div>
          
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" size="icon" onClick={goToPreviousDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <h3 className="text-lg font-medium flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                {selectedDate ? format(selectedDate, "EEEE, d MMMM yyyy") : "No date selected"}
              </h3>
              
              <Button variant="outline" size="icon" onClick={goToNextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            {dailyEvents.length > 0 ? (
              <div className="space-y-3">
                {dailyEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-3 shadow-sm">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge>{event.startTime} - {event.endTime}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Customer: {event.customer}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">No appointments scheduled for this day</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {events.length} total appointments in your schedule
        </p>
      </CardFooter>
    </>
  );
};

export default MechanicSchedule;
