
import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // After successful login, navigate to history page
      const from = location.state?.from?.pathname || '/history';
      navigate(from);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-xl bg-white/10 dark:bg-black/30 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Login to access your medical history and saved reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="your@email.com"
              className="bg-white/5 border-white/10 focus:border-white/30 transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
              className="bg-white/5 border-white/10 focus:border-white/30 transition-all duration-300"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-revon-primary to-revon-accent hover:from-revon-primary/90 hover:to-revon-accent/90 backdrop-blur-md bg-opacity-20 border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:hover:translate-y-0 animate-fade-in" 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <Button variant="link" className="p-0 h-auto hover:text-revon-accent transition-colors" onClick={onToggleForm}>
            Register
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
