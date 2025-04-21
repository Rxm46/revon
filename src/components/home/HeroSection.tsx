
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Shield, Search, Sparkles } from "lucide-react";

// Function to animate each character in "AI Precision" with a sparkle
const AnimatedAIText = () => {
  const text = "AI Precision";
  // We'll animate each letter after the last, slight stagger
  return (
    <span
      className="bg-clip-text text-transparent bg-gradient-to-r from-revon-primary to-revon-accent inline-block font-playfair"
      aria-label={text}
    >
      {[...text].map((char, idx) => (
        <span
          className={`relative inline-block animate-fade-in !opacity-0`}
          style={{
            animationDelay: `${0.15 + idx * 0.08}s`,
            animationFillMode: "forwards",
          }}
          key={idx}
        >
          {char === " " ? "\u00A0" : char}
          {/* Sparkle dust appears above letters, skip for spaces */}
          {char !== " " && (
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{ animation: `dust-pop 0.7s ${0.13 + idx * 0.08}s both` }}
            >
              <Sparkles className="w-4 h-4 text-revon-accent opacity-80" />
            </span>
          )}
        </span>
      ))}
      <style>{`
        @keyframes dust-pop {
          0% { opacity: 0; transform: scale(0.4) translateY(6px);}
          50% { opacity: .9; transform: scale(1.2) translateY(-6px);}
          80% { opacity: .6; transform: scale(0.93) translateY(-2px);}
          100% { opacity: 0; transform: scale(.7) translateY(0);}
        }
      `}</style>
    </span>
  );
};

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-revon-primary/10 text-revon-primary text-sm font-medium mb-2">
              <span>AI-Powered Health Insights</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Understand Your Symptoms with{" "}
              <AnimatedAIText />
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Input your symptoms and let our AI analyze potential conditions, recommend precautions, and suggest dietary adjustments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="gradient-btn">
                <Link to="/symptoms">
                  Check Symptoms
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-revon-primary/10 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-revon-primary" />
                </div>
                <span className="text-sm">HIPAA Compliant</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-revon-primary/10 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-revon-primary" />
                </div>
                <span className="text-sm">Health Focused</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -z-10 inset-0 bg-gradient-radial from-revon-primary/20 to-transparent opacity-70" />
            
            <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-8 max-w-md mx-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-revon-primary/5">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Symptom Checker</h3>
                  <Search className="h-5 w-5 text-revon-accent" />
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-revon-primary/70 animate-pulse-slow" />
                    <span className="text-sm">Persistent cough</span>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-revon-primary/70 animate-pulse-slow" />
                    <span className="text-sm">Fatigue</span>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-revon-primary/70 animate-pulse-slow" />
                    <span className="text-sm">Fever</span>
                  </div>
                </div>
                
                <Button className="w-full gradient-btn">
                  Analyze Symptoms
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
