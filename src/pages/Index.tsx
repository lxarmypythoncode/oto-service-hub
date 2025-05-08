import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Clock, FileText, Wrench, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import TestimonialsList from "@/components/testimonials/TestimonialsList";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-workshop-background to-white">
      {/* Navigation */}
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-workshop-primary" />
            <span className="text-xl font-bold">OtoService</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium hover:text-workshop-primary">Features</a>
            <a href="#services" className="text-sm font-medium hover:text-workshop-primary">Services</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-workshop-primary">How It Works</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-workshop-primary">Testimonials</a>
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <Button asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="container py-12 md:py-24 lg:py-32 flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Professional <span className="text-workshop-primary">Auto Service</span> Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Streamline your workshop operations and provide top-notch service to your customers with our all-in-one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" asChild className="bg-workshop-primary hover:bg-workshop-secondary">
              <Link to="/register">Get Started Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1553171347-05dd0ea0be87" 
            alt="Auto mechanic working on a car" 
            className="rounded-lg shadow-lg w-full max-w-[600px] object-cover"
          />
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="container py-12 md:py-24 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Everything you need to manage your auto service business in one platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-workshop-primary mb-2" />
              <CardTitle>Role-Based Access</CardTitle>
              <CardDescription>
                Separate dashboards for customers, mechanics, and administrators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Each user type sees exactly what they need. Customers track their vehicles, mechanics manage their tasks, and admins oversee everything.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Wrench className="h-10 w-10 text-workshop-primary mb-2" />
              <CardTitle>Service Management</CardTitle>
              <CardDescription>
                Streamlined service booking and tracking process.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>From initial booking to service completion, keep everyone informed with real-time status updates and notifications.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <FileText className="h-10 w-10 text-workshop-primary mb-2" />
              <CardTitle>Detailed Reports</CardTitle>
              <CardDescription>
                Track performance and business metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Get insights into your workshop's performance with comprehensive reports on services, revenue, and customer satisfaction.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-12 md:py-24 bg-workshop-background">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              We provide a wide range of auto services to keep your vehicle in top condition.
            </p>
          </div>
          
          <Tabs defaultValue="maintenance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="repair">Repair</TabsTrigger>
              <TabsTrigger value="inspection">Inspection</TabsTrigger>
            </TabsList>
            <TabsContent value="maintenance" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Oil Change</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Regular oil changes to keep your engine running smoothly and extend its life.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Book Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Filter Replacement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Replace air, fuel, and cabin filters to maintain performance and air quality.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Book Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Fluid Top-Up</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Check and refill all essential fluids to keep your vehicle operating at its best.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Book Now</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="repair" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Brake Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Complete brake system repair including pads, rotors, and fluid replacement.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Book Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Electrical System</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Diagnosis and repair of all electrical issues in your vehicle.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Book Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Engine Repair</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Expert diagnosis and repair of engine problems to restore performance.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Book Now</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="inspection" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pre-Purchase Inspection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Thorough inspection before buying a used vehicle to avoid costly surprises.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Book Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Annual Check-Up</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Comprehensive annual inspection to ensure your vehicle is safe and reliable.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Book Now</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Emission Testing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Verify that your vehicle meets environmental standards and regulations.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Book Now</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="container py-12 md:py-24 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Our platform makes vehicle service management simple and transparent.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-workshop-primary/10 p-4 rounded-full">
              <Car className="h-8 w-8 text-workshop-primary" />
            </div>
            <h3 className="text-xl font-semibold">1. Book a Service</h3>
            <p className="text-muted-foreground">Choose your vehicle, select a service, and pick a convenient date.</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-workshop-primary/10 p-4 rounded-full">
              <Wrench className="h-8 w-8 text-workshop-primary" />
            </div>
            <h3 className="text-xl font-semibold">2. Mechanic Assignment</h3>
            <p className="text-muted-foreground">We assign an expert mechanic specialized in your service needs.</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-workshop-primary/10 p-4 rounded-full">
              <Clock className="h-8 w-8 text-workshop-primary" />
            </div>
            <h3 className="text-xl font-semibold">3. Track Progress</h3>
            <p className="text-muted-foreground">Follow your vehicle's service progress with real-time updates.</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-workshop-primary/10 p-4 rounded-full">
              <FileText className="h-8 w-8 text-workshop-primary" />
            </div>
            <h3 className="text-xl font-semibold">4. Service Completion</h3>
            <p className="text-muted-foreground">Review detailed service reports and pick up your vehicle.</p>
          </div>
        </div>
        
        <div className="flex justify-center pt-6">
          <Button size="lg" asChild className="bg-workshop-primary hover:bg-workshop-secondary">
            <Link to={user ? "/book-service" : "/register"}>Book a Service Now</Link>
          </Button>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="container py-12 md:py-24 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Real feedback from real customers who've experienced our service.
          </p>
        </div>
        
        <TestimonialsList />
        
        <div className="flex justify-center pt-6">
          <Button variant="outline" asChild>
            <Link to="/reviews">Read More Reviews</Link>
          </Button>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-workshop-primary text-white py-12">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your auto service experience?</h2>
          <p className="text-xl max-w-[800px] mx-auto opacity-90">
            Join thousands of satisfied customers and workshops using our platform.
          </p>
          <div className="pt-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to={user ? "/dashboard" : "/register"}>
                {user ? "Go to Dashboard" : "Register Now"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-workshop-dark text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="h-6 w-6" />
                <span className="text-xl font-bold">OtoService</span>
              </div>
              <p className="text-sm opacity-70">
                The complete platform for auto service management.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm opacity-70">
                <li>Vehicle Maintenance</li>
                <li>Repair Services</li>
                <li>Inspections</li>
                <li>Custom Services</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm opacity-70">
                <li>About Us</li>
                <li>Locations</li>
                <li>Our Team</li>
                <li>Careers</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm opacity-70">
                <li>Email: info@otoservice.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Hours: Mon-Fri: 8am - 6pm</li>
                <li>Address: 123 Service St</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-sm opacity-70 text-center">
            <p>&copy; {new Date().getFullYear()} OtoService. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
