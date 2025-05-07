
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserProfile from "@/components/profile/UserProfile";

const Profile: React.FC = () => {
  return (
    <MainLayout requiredRole="customer">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <UserProfile />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
