
import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "customer" | "mechanic" | "admin";
export type MechanicApprovalStatus = "pending" | "approved" | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  approvalStatus?: MechanicApprovalStatus;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const MOCK_USERS: User[] = [
  { id: "1", name: "Admin User", email: "admin@bengkel.com", role: "admin" },
  { id: "2", name: "Mechanic User", email: "mechanic@bengkel.com", role: "mechanic", approvalStatus: "approved" },
  { id: "3", name: "Customer User", email: "customer@bengkel.com", role: "customer" },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check localStorage for saved session
    const savedUser = localStorage.getItem("bengkelUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser) {
      // Check if mechanic is approved
      if (foundUser.role === "mechanic" && foundUser.approvalStatus !== "approved") {
        throw new Error("Your account is pending admin approval. Please check back later.");
      }
      
      setUser(foundUser);
      localStorage.setItem("bengkelUser", JSON.stringify(foundUser));
    } else {
      throw new Error("Invalid email or password");
    }
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      throw new Error("User already exists with this email");
    }

    // Create new user (in a real app, this would be an API call)
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      // Set approval status to pending for mechanics, undefined for others
      ...(role === "mechanic" ? { approvalStatus: "pending" as MechanicApprovalStatus } : {})
    };

    // Update mock data (in a real app, this would be stored in the database)
    MOCK_USERS.push(newUser);

    // If the user is a mechanic, they need approval first
    if (role === "mechanic") {
      setLoading(false);
      throw new Error("Your mechanic account has been created and is pending admin approval. You will be notified when approved.");
    } else {
      // Log in the new user for customers
      setUser(newUser);
      localStorage.setItem("bengkelUser", JSON.stringify(newUser));
    }
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bengkelUser");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
