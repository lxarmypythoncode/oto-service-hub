
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { TestimonialProps } from "@/components/testimonials/TestimonialCard";
import TestimonialsList from "@/components/testimonials/TestimonialsList";

// Sample testimonial data (in a real app, this would come from a database)
const sampleTestimonials: TestimonialProps[] = [
  {
    name: "John Smith",
    role: "Toyota Owner",
    content: "OtoService saved me so much time and hassle. The mechanics were professional and I could track the progress of my repair in real-time.",
    rating: 5
  },
  {
    name: "Sarah Johnson",
    role: "Honda Civic Owner",
    content: "I love being able to book my service appointments online. The whole process is smooth and the staff are very friendly!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "BMW Owner",
    content: "As someone who knows very little about cars, I appreciate how transparent the mechanics are about explaining what needs to be fixed.",
    rating: 4
  },
  {
    name: "Emma Wilson",
    role: "Ford Owner",
    content: "The workshop is always clean and the waiting area is comfortable. My car is always ready when promised.",
    rating: 5
  },
  {
    name: "David Lee",
    role: "Audi Owner",
    content: "I've been using OtoService for two years now and have always had excellent service. Their online booking system is so convenient!",
    rating: 5
  },
  {
    name: "Sophia Rodriguez",
    role: "Mazda Owner",
    content: "The mechanics are knowledgeable and don't try to upsell unnecessary services. I appreciate their honesty.",
    rating: 4
  },
  {
    name: "James Wilson",
    role: "Hyundai Owner",
    content: "Quick service and fair prices. The digital updates during the service were very helpful.",
    rating: 5
  },
  {
    name: "Olivia Brown",
    role: "Kia Owner",
    content: "I was able to book an emergency appointment when my car broke down, and they fixed it the same day. Amazing service!",
    rating: 5
  }
];

const Reviews: React.FC = () => {
  const [testimonials] = useState<TestimonialProps[]>(sampleTestimonials);

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Customer Reviews</h1>
          <Button asChild>
            <Link to="/submit-review">Submit a Review</Link>
          </Button>
        </div>
        
        <div className="space-y-8">
          <p className="text-muted-foreground">
            Read what our customers have to say about their experience with our auto service.
          </p>
          
          <TestimonialsList testimonials={testimonials} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Reviews;
