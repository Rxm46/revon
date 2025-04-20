
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-revon-primary to-revon-accent flex items-center justify-center">
                <Heart className="text-white" size={16} />
              </div>
              <span className="text-lg font-bold font-montserrat tracking-tight">Revon</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              AI-powered health insights to help you understand your symptoms and make informed healthcare decisions.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/symptoms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link to="/nearby" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Find Hospitals
                </Link>
              </li>
              <li>
                <Link to="/diet" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Diet Suggestions
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Revon Health Insight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
