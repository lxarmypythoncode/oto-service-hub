
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

export interface TestimonialProps {
  name: string;
  role?: string;
  content: string;
  avatarUrl?: string;
  rating?: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ 
  name, 
  role, 
  content, 
  avatarUrl,
  rating
}) => {
  // Get initials for avatar fallback
  const initials = name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="h-full">
      <CardContent className="pt-6 pb-4 px-6 flex flex-col h-full">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 mr-4">
            <Avatar className="h-10 w-10">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={name} />
              ) : null}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h4 className="font-semibold">{name}</h4>
            {role && <p className="text-sm text-muted-foreground">{role}</p>}
          </div>
        </div>
        
        <div className="relative flex-grow">
          <Quote className="h-5 w-5 text-workshop-primary absolute -left-1 -top-1 opacity-20" />
          <p className="text-muted-foreground pt-4 italic">{content}</p>
        </div>
        
        {rating && (
          <div className="mt-4 flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-yellow-500" : "text-gray-300"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
