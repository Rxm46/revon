
import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import UserProfile from '@/components/auth/UserProfile';
import { useAuth } from '@/components/auth/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  // Get the redirect path from location state, or default to '/'
  const from = location.state?.from?.pathname || '/';
  
  // Redirect to the page they were trying to visit if logged in
  if (user && !isLoading) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-3">Your Health Account</h1>
            <p className="text-muted-foreground">
              {user 
                ? "View your health profile and medical history" 
                : "Sign in to save your medical history and symptom checks"
              }
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-revon-primary"></div>
            </div>
          ) : user ? (
            <UserProfile />
          ) : (
            <div>
              {isLogin ? (
                <LoginForm onToggleForm={() => setIsLogin(false)} />
              ) : (
                <RegisterForm onToggleForm={() => setIsLogin(true)} />
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
