
import React from "react";
import TestimonialCard, { TestimonialProps } from "./TestimonialCard";

// Sample testimonial data (will be replaced by real data)
const defaultTestimonials: TestimonialProps[] = [
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
  }
];

interface TestimonialsListProps {
  testimonials?: TestimonialProps[];
}

const TestimonialsList: React.FC<TestimonialsListProps> = ({ 
  testimonials = defaultTestimonials 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={index}
          name={testimonial.name}
          role={testimonial.role}
          content={testimonial.content}
          avatarUrl={testimonial.avatarUrl}
          rating={testimonial.rating}
        />
      ))}
    </div>
  );
};

export default TestimonialsList;
