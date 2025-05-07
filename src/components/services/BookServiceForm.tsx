
import React, { useState } from "react";
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";

const BookServiceForm: React.FC = () => {
  const [vehicle, setVehicle] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

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
    
    toast({
      title: "Service booked successfully",
      description: "Your service request has been received. We'll contact you shortly to confirm.",
    });
    
    setIsSubmitting(false);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="vehicle">Select Vehicle</Label>
          <Select value={vehicle} onValueChange={setVehicle} required>
            <SelectTrigger id="vehicle">
              <SelectValue placeholder="Select your vehicle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toyota-avanza">Toyota Avanza (B 1234 XYZ)</SelectItem>
              <SelectItem value="honda-jazz">Honda Jazz (B 5678 ABC)</SelectItem>
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
              <SelectItem value="oil-change">Oil Change & Filter</SelectItem>
              <SelectItem value="brake-service">Brake Service</SelectItem>
              <SelectItem value="tune-up">Tune Up</SelectItem>
              <SelectItem value="ac-service">Air Conditioning Service</SelectItem>
              <SelectItem value="tire-service">Tire Service</SelectItem>
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
            <div className="border border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50">
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
            </div>

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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Book Service"}
        </Button>
      </div>
    </form>
  );
};

export default BookServiceForm;
