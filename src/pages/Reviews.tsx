
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { TestimonialProps } from "@/components/testimonials/TestimonialCard";
import TestimonialsList from "@/components/testimonials/TestimonialsList";
import { db, Testimonial } from "@/utils/db";

const Reviews: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        // Get approved testimonials
        const testimonialsList = await db.getTestimonials(true);
        
        // Convert to TestimonialProps format
        const formattedTestimonials: TestimonialProps[] = testimonialsList.map(testimonial => ({
          name: testimonial.name,
          role: testimonial.role || "",
          content: testimonial.content,
          rating: testimonial.rating
        }));
        
        setTestimonials(formattedTestimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

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
          
          {loading ? (
            <div className="text-center py-8">Loading testimonials...</div>
          ) : (
            <TestimonialsList testimonials={testimonials} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Reviews;
