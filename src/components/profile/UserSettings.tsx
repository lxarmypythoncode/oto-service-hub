
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Bell, Globe, Moon, Smartphone, Sun } from "lucide-react";

const UserSettings: React.FC = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    theme: "system",
    language: "id",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    privacySettings: {
      shareData: false,
      showProfile: true,
    }
  });
  
  const handleThemeChange = (theme: string) => {
    setSettings(prev => ({ ...prev, theme }));
    toast({
      title: "Theme changed",
      description: `Display theme has been changed to ${theme}.`,
    });
  };
  
  const handleLanguageChange = (language: string) => {
    setSettings(prev => ({ ...prev, language }));
    toast({
      title: "Language changed",
      description: `Interface language has been changed to ${language === 'id' ? 'Bahasa Indonesia' : 'English'}.`,
    });
  };
  
  const handleNotificationToggle = (type: 'email' | 'sms' | 'push', value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
    
    toast({
      title: `${value ? 'Enabled' : 'Disabled'} ${type} notifications`,
      description: `You will ${value ? 'now' : 'no longer'} receive ${type} notifications.`,
    });
  };
  
  const handlePrivacyToggle = (setting: 'shareData' | 'showProfile', value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [setting]: value
      }
    }));
    
    const settingNames = {
      shareData: 'anonymous data sharing',
      showProfile: 'profile visibility'
    };
    
    toast({
      title: `${value ? 'Enabled' : 'Disabled'} ${settingNames[setting]}`,
      description: `${settingNames[setting]} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Sun className="h-5 w-5" />
          Appearance
        </h3>
        
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select value={settings.theme} onValueChange={handleThemeChange}>
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">
                <div className="flex items-center">
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </div>
              </SelectItem>
              <SelectItem value="dark">
                <div className="flex items-center">
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </div>
              </SelectItem>
              <SelectItem value="system">
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 flex">
                    <Sun className="h-4 w-2 overflow-hidden" />
                    <Moon className="h-4 w-2 overflow-hidden" />
                  </div>
                  System
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={settings.language} onValueChange={handleLanguageChange}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4" />
                  Bahasa Indonesia
                </div>
              </SelectItem>
              <SelectItem value="en">
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4" />
                  English
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Methods
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch 
              id="email-notifications" 
              checked={settings.notifications.email}
              onCheckedChange={(value) => handleNotificationToggle('email', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications" className="font-medium">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via SMS
              </p>
            </div>
            <Switch 
              id="sms-notifications" 
              checked={settings.notifications.sms}
              onCheckedChange={(value) => handleNotificationToggle('sms', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive in-app push notifications
              </p>
            </div>
            <Switch 
              id="push-notifications" 
              checked={settings.notifications.push}
              onCheckedChange={(value) => handleNotificationToggle('push', value)}
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Privacy & Data
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="share-data" className="font-medium">Share Anonymous Data</Label>
              <p className="text-sm text-muted-foreground">
                Help us improve by sharing anonymous usage data
              </p>
            </div>
            <Switch 
              id="share-data" 
              checked={settings.privacySettings.shareData}
              onCheckedChange={(value) => handlePrivacyToggle('shareData', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-profile" className="font-medium">Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">
                Allow service staff to see your profile details
              </p>
            </div>
            <Switch 
              id="show-profile" 
              checked={settings.privacySettings.showProfile}
              onCheckedChange={(value) => handlePrivacyToggle('showProfile', value)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-2">
        <Button variant="outline" className="mr-2">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default UserSettings;
