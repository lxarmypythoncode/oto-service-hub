
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { Wrench } from "lucide-react";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-workshop-background">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Wrench className="h-6 w-6 text-workshop-primary" />
          <span className="text-xl">OtoService</span>
        </Link>
      </div>
      
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
          
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-workshop-primary hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} OtoService. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
