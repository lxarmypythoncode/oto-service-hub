
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  
  // Workshop settings
  const [workshopSettings, setWorkshopSettings] = useState({
    name: "OtoService Workshop",
    email: "contact@otoservice.com",
    phone: "+1 (555) 123-4567",
    address: "123 Mechanic Street, Auto City, AC 12345",
    hoursStart: "08:00",
    hoursEnd: "18:00",
    workDays: "Monday - Saturday",
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    marketingEmails: false,
    serviceUpdates: true,
  });
  
  // System settings
  const [systemSettings, setSystemSettings] = useState({
    autoAssignMechanics: true,
    requireApproval: true,
    sendInvoiceEmails: true,
    allowOnlineBooking: true,
    showPricesOnline: true,
  });

  const handleWorkshopSettingsSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Settings Saved",
      description: "Your workshop settings have been updated successfully.",
    });
  };

  const handleNotificationSettingsSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSystemSettingsSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "System Settings Saved",
      description: "Your system settings have been updated.",
    });
  };

  return (
    <div className="p-6">
      <Tabs defaultValue="workshop" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="workshop">Workshop Info</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="workshop">
          <Card>
            <CardHeader>
              <CardTitle>Workshop Information</CardTitle>
              <CardDescription>
                Update your workshop details that are displayed to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workshop-name">Workshop Name</Label>
                  <Input 
                    id="workshop-name"
                    value={workshopSettings.name}
                    onChange={(e) => setWorkshopSettings({...workshopSettings, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workshop-email">Email Address</Label>
                  <Input 
                    id="workshop-email"
                    type="email"
                    value={workshopSettings.email}
                    onChange={(e) => setWorkshopSettings({...workshopSettings, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workshop-phone">Phone Number</Label>
                  <Input 
                    id="workshop-phone"
                    value={workshopSettings.phone}
                    onChange={(e) => setWorkshopSettings({...workshopSettings, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="work-days">Working Days</Label>
                  <Input 
                    id="work-days"
                    value={workshopSettings.workDays}
                    onChange={(e) => setWorkshopSettings({...workshopSettings, workDays: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hours-start">Opening Time</Label>
                  <Input 
                    id="hours-start"
                    type="time"
                    value={workshopSettings.hoursStart}
                    onChange={(e) => setWorkshopSettings({...workshopSettings, hoursStart: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours-end">Closing Time</Label>
                  <Input 
                    id="hours-end"
                    type="time"
                    value={workshopSettings.hoursEnd}
                    onChange={(e) => setWorkshopSettings({...workshopSettings, hoursEnd: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="workshop-address">Address</Label>
                <Textarea 
                  id="workshop-address"
                  value={workshopSettings.address}
                  onChange={(e) => setWorkshopSettings({...workshopSettings, address: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleWorkshopSettingsSave}>
                Save Workshop Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Get text messages for important updates</p>
                </div>
                <Switch
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Appointment Reminders</p>
                  <p className="text-sm text-gray-500">Send reminders to customers for upcoming appointments</p>
                </div>
                <Switch
                  checked={notificationSettings.appointmentReminders}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, appointmentReminders: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-gray-500">Send promotional offers to customers</p>
                </div>
                <Switch
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Service Updates</p>
                  <p className="text-sm text-gray-500">Notify customers about service progress</p>
                </div>
                <Switch
                  checked={notificationSettings.serviceUpdates}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, serviceUpdates: checked})}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNotificationSettingsSave}>
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure how the workshop management system operates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-assign Mechanics</p>
                  <p className="text-sm text-gray-500">Automatically assign mechanics to new service requests</p>
                </div>
                <Switch
                  checked={systemSettings.autoAssignMechanics}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoAssignMechanics: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Require Admin Approval</p>
                  <p className="text-sm text-gray-500">New mechanics must be approved by admin</p>
                </div>
                <Switch
                  checked={systemSettings.requireApproval}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, requireApproval: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Send Invoice Emails</p>
                  <p className="text-sm text-gray-500">Automatically email invoices when services are completed</p>
                </div>
                <Switch
                  checked={systemSettings.sendInvoiceEmails}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, sendInvoiceEmails: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Allow Online Booking</p>
                  <p className="text-sm text-gray-500">Let customers book services online</p>
                </div>
                <Switch
                  checked={systemSettings.allowOnlineBooking}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, allowOnlineBooking: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Prices Online</p>
                  <p className="text-sm text-gray-500">Display service prices on the website</p>
                </div>
                <Switch
                  checked={systemSettings.showPricesOnline}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, showPricesOnline: checked})}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSystemSettingsSave}>
                Save System Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
