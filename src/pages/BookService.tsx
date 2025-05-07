
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import BookServiceForm from "@/components/services/BookServiceForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BookService: React.FC = () => {
  return (
    <MainLayout requiredRole="customer">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Book a Service</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Service Request</CardTitle>
            <CardDescription>
              Fill out the form below to schedule a service for your vehicle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BookServiceForm />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BookService;
