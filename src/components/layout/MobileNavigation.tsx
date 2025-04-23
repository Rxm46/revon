
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon, User, Smartphone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '@/components/auth/AuthContext';

const MobileNavigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-xl">Revon Health</SheetTitle>
        </SheetHeader>
        <div className="py-4 flex flex-col gap-2">
          <Link to="/">
            <div className={`p-3 rounded-md cursor-pointer ${isActive('/') ? 'bg-revon-primary/10 text-revon-primary' : 'hover:bg-muted'}`}>
              Home
            </div>
          </Link>
          <Link to="/symptoms">
            <div className={`p-3 rounded-md cursor-pointer ${isActive('/symptoms') ? 'bg-revon-primary/10 text-revon-primary' : 'hover:bg-muted'}`}>
              Symptom Checker
            </div>
          </Link>
          <Link to="/diet">
            <div className={`p-3 rounded-md cursor-pointer ${isActive('/diet') ? 'bg-revon-primary/10 text-revon-primary' : 'hover:bg-muted'}`}>
              Diet Planner
            </div>
          </Link>
          <Link to="/about">
            <div className={`p-3 rounded-md cursor-pointer ${isActive('/about') ? 'bg-revon-primary/10 text-revon-primary' : 'hover:bg-muted'}`}>
              About
            </div>
          </Link>
          
          <div className="h-px bg-border my-4" />
          
          {user ? (
            <>
              <Link to="/history">
                <div className={`p-3 rounded-md cursor-pointer flex items-center gap-2 ${isActive('/history') ? 'bg-revon-primary/10 text-revon-primary' : 'hover:bg-muted'}`}>
                  <User className="h-4 w-4" />
                  My Health Profile
                </div>
              </Link>
            </>
          ) : (
            <Link to="/auth">
              <div className={`p-3 rounded-md cursor-pointer flex items-center gap-2 ${isActive('/auth') ? 'bg-revon-primary/10 text-revon-primary' : 'hover:bg-muted'}`}>
                <User className="h-4 w-4" />
                Login / Register
              </div>
            </Link>
          )}
          
          <div className="h-px bg-border my-4" />
          
          <div className="p-3 rounded-md bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="h-5 w-5 text-revon-primary" />
              <h3 className="font-medium">Mobile App</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Take Revon Health on the go with our mobile app
            </p>
            <Button className="w-full" variant="outline">
              Coming Soon
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
