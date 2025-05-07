
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import UserProfile from "@/components/profile/UserProfile";
import UserSettings from "@/components/profile/UserSettings";
import { UserCircle, Settings, Bell } from "lucide-react";

const Profile: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <UserProfile />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <UserSettings />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground mb-4">
                    Manage how you receive notifications from the workshop.
                  </p>
                  
                  <div className="space-y-6">
                    <NotificationPreference 
                      title="Service Updates" 
                      description="Receive updates when your vehicle service status changes."
                      defaultChecked={true}
                    />
                    
                    <NotificationPreference 
                      title="Appointment Reminders" 
                      description="Get reminders about upcoming service appointments."
                      defaultChecked={true}
                    />
                    
                    <NotificationPreference 
                      title="Maintenance Reminders" 
                      description="Receive periodic reminders for vehicle maintenance."
                      defaultChecked={false}
                    />
                    
                    <NotificationPreference 
                      title="Promotions & Offers" 
                      description="Stay updated with special offers and promotions."
                      defaultChecked={false}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

const NotificationPreference: React.FC<{ 
  title: string; 
  description: string;
  defaultChecked?: boolean;
}> = ({ title, description, defaultChecked = false }) => {
  const [enabled, setEnabled] = useState(defaultChecked);
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={enabled} onCheckedChange={setEnabled} />
    </div>
  );
};

export default Profile;
