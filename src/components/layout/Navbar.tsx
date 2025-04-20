
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full py-4 border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-revon-primary to-revon-accent flex items-center justify-center">
            <Heart className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold font-montserrat tracking-tight">Revon</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/symptoms" className="text-sm font-medium hover:text-revon-primary transition-colors">
            Symptom Checker
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-revon-primary transition-colors">
            About
          </Link>
          <Button variant="default" size="sm" className="bg-revon-primary hover:bg-revon-primary/90 text-white">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
