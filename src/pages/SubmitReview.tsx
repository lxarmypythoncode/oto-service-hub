
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  role: z.string().optional(),
  content: z.string().min(10, {
    message: "Testimonial must be at least 10 characters.",
  }),
  rating: z.number().min(1).max(5),
});

const SubmitReview: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      content: "",
      rating: 5,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would send the data to your backend
    console.log("Testimonial submitted:", values);
    
    toast({
      title: "Testimonial submitted!",
      description: "Thank you for sharing your experience with us!",
    });
    
    // Navigate back to homepage
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  return (
    <MainLayout>
      <div className="container py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Share Your Experience</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Submit a Review</CardTitle>
            <CardDescription>
              Your feedback helps us improve our service and helps other customers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Info (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Toyota Camry Owner" {...field} />
                      </FormControl>
                      <FormDescription>
                        E.g., "Honda Civic Owner" or "SUV Owner"
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Review</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your experience with our service..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            type="button"
                            variant={field.value >= rating ? "default" : "outline"}
                            className={`h-10 w-10 p-0 ${
                              field.value >= rating ? "bg-yellow-500 hover:bg-yellow-600" : ""
                            }`}
                            onClick={() => field.onChange(rating)}
                          >
                            {rating}
                          </Button>
                        ))}
                      </div>
                      <FormDescription>
                        Rate your overall experience from 1 to 5 stars
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Submit Review
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SubmitReview;
