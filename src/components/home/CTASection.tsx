
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-revon-primary/20 to-revon-accent/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,1))]" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Take control of your health journey today
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Start with a simple symptom check and discover insights that can help you make informed health decisions.
            </p>
            
            <Button asChild size="lg" className="gradient-btn">
              <Link to="/symptoms">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
