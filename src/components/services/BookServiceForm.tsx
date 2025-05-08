
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Upload, MessageSquare, AlertCircle } from "lucide-react";
import { db, Vehicle, Service } from "@/utils/db";

const BookServiceForm: React.FC = () => {
  const [vehicle, setVehicle] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactMe, setContactMe] = useState(true);
  const [preferredContact, setPreferredContact] = useState("phone");
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{
    text: string;
    sender: "customer" | "workshop";
    timestamp: Date;
  }[]>([
    {
      text: "Hello! How can we help you with your service booking?",
      sender: "workshop",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    }
  ]);
  const [userVehicles, setUserVehicles] = useState<Vehicle[]>([]);
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, you would get the current user's ID from authentication
        const userId = 6; // Mock user ID
        
        // Fetch user's vehicles
        const vehicles = await db.getVehiclesByOwner(userId);
        setUserVehicles(vehicles);
        
        // Fetch available services
        const services = await db.getServices();
        setAvailableServices(services);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load data for booking form",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages([...images, ...fileArray]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!vehicle || !serviceType || !date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would store the service order in the database
    // await db.createServiceOrder({...})
    
    toast({
      title: "Service booked successfully",
      description: "Your service request has been received. We'll contact you shortly to confirm.",
    });
    
    setIsSubmitting(false);
    navigate("/dashboard");
  };

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // Add customer message
    setChatMessages([
      ...chatMessages, 
      {
        text: chatMessage,
        sender: "customer",
        timestamp: new Date()
      }
    ]);
    
    // Clear input
    setChatMessage("");
    
    // Simulate workshop response after delay
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          text: "Thank you for your message. One of our service advisors will respond shortly.",
          sender: "workshop",
          timestamp: new Date()
        }
      ]);
    }, 1000);
  };

  if (loading) {
    return <div className="text-center py-6">Loading booking form...</div>;
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="vehicle">Select Vehicle</Label>
            <Select value={vehicle} onValueChange={setVehicle} required>
              <SelectTrigger id="vehicle">
                <SelectValue placeholder="Select your vehicle" />
              </SelectTrigger>
              <SelectContent>
                {userVehicles.map((v) => (
                  <SelectItem key={v.vehicle_id} value={v.vehicle_id.toString()}>
                    {v.make} {v.model} ({v.license_plate})
                  </SelectItem>
                ))}
                <SelectItem value="add-new">+ Add new vehicle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-type">Service Type</Label>
            <Select value={serviceType} onValueChange={setServiceType} required>
              <SelectTrigger id="service-type">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {availableServices.map((service) => (
                  <SelectItem key={service.service_id} value={service.service_id.toString()}>
                    {service.name} (Rp {service.base_price.toLocaleString()})
                  </SelectItem>
                ))}
                <SelectItem value="other">Other (Describe below)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Problem Description</Label>
            <Textarea
              id="description"
              placeholder="Please describe the issue with your vehicle"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Upload Photos (Optional)</Label>
            <div className="grid grid-cols-1 gap-4">
              <label 
                htmlFor="images" 
                className="border border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50"
              >
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="mb-1 text-sm font-medium">Click to upload images</p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or JPEG (max. 5MB each)
                  </p>
                  <Input
                    id="images"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </label>

              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {images.map((image, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-2">
                        <div className="relative aspect-square">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Uploaded ${index + 1}`}
                            className="object-cover w-full h-full rounded-md"
                          />
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </Button>
                        </div>
                        <p className="text-xs truncate mt-1">{image.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4 bg-muted/40 p-4 rounded-lg border">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-workshop-primary" />
              Contact Preferences
            </h3>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="contact-me"
                checked={contactMe}
                onCheckedChange={setContactMe}
              />
              <Label htmlFor="contact-me">Contact me before starting work</Label>
            </div>
            
            {contactMe && (
              <div className="space-y-2">
                <Label htmlFor="contact-method">Preferred Contact Method</Label>
                <Select value={preferredContact} onValueChange={setPreferredContact}>
                  <SelectTrigger id="contact-method">
                    <SelectValue placeholder="Select contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Book Service"}
          </Button>
        </div>
      </form>

      {/* Chat with workshop button */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-10 flex flex-col items-end">
        {showChat && (
          <Card className="mb-2 w-80 md:w-96 shadow-lg">
            <div className="flex items-center justify-between bg-workshop-primary text-white p-3 rounded-t-lg">
              <div className="font-medium">Workshop Chat Support</div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-workshop-primary/50 h-7 w-7 p-0"
                onClick={() => setShowChat(false)}
              >
                ×
              </Button>
            </div>
            <div className="h-80 overflow-y-auto p-3 flex flex-col gap-2">
              {chatMessages.map((message, index) => (
                <div 
                  key={index} 
                  className={`max-w-[80%] ${
                    message.sender === "customer" 
                      ? "ml-auto bg-workshop-primary text-white" 
                      : "mr-auto bg-muted"
                  } p-2 rounded-lg`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              ))}
            </div>
            <form onSubmit={sendChatMessage} className="p-3 border-t flex gap-2">
              <Input 
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <Button type="submit">Send</Button>
            </form>
          </Card>
        )}
        <Button 
          className="rounded-full h-14 w-14 shadow-lg"
          onClick={() => setShowChat(!showChat)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default BookServiceForm;
