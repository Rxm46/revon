
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface MedicalHistory {
  id: string;
  userId: string;
  symptoms: string[];
  diagnosis: any[];
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  history: MedicalHistory[];
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  saveHistory: (symptoms: string[], diagnosis: any[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock functions for demonstration - in a real app, these would connect to a backend
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check for stored users in localStorage
  const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const user = storedUsers.find((u: any) => u.email === email);
  
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const mockRegister = async (name: string, email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check for existing users
  const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
  if (storedUsers.some((u: any) => u.email === email)) {
    throw new Error('Email already in use');
  }
  
  // Create new user
  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    password,
    createdAt: new Date(),
  };
  
  // Save to "database"
  localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
  
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<MedicalHistory[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      
      // Load user's medical history
      const storedHistory = localStorage.getItem(`history-${JSON.parse(storedUser).id}`);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const loggedInUser = await mockLogin(email, password);
      setUser(loggedInUser);
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      
      // Load user's medical history
      const storedHistory = localStorage.getItem(`history-${loggedInUser.id}`);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
      
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${loggedInUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const newUser = await mockRegister(name, email, password);
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const saveHistory = (symptoms: string[], diagnosis: any[]) => {
    if (!user) return;
    
    const newHistoryItem: MedicalHistory = {
      id: `history-${Date.now()}`,
      userId: user.id,
      symptoms,
      diagnosis,
      createdAt: new Date(),
    };
    
    const updatedHistory = [...history, newHistoryItem];
    setHistory(updatedHistory);
    
    // Save to localStorage
    localStorage.setItem(`history-${user.id}`, JSON.stringify(updatedHistory));
    
    toast({
      title: "Medical record saved",
      description: "Your symptom check has been saved to your history.",
    });
  };

  const value = {
    user,
    isLoading,
    history,
    login,
    register,
    logout,
    saveHistory,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
