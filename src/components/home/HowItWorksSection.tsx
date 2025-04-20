
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Input Your Symptoms",
    description: "Describe the symptoms you're experiencing in detail for better analysis."
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our AI engine processes your symptoms to identify potential health conditions."
  },
  {
    number: "03",
    title: "Get Recommendations",
    description: "Receive personalized precautions and dietary suggestions based on analysis."
  },
  {
    number: "04",
    title: "Find Healthcare",
    description: "Locate nearby healthcare facilities if professional attention is needed."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">How Revon Works</h2>
          <p className="text-muted-foreground">
            Our intuitive process helps you understand your health concerns in just a few simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className={`relative animate-fade-in animate-fade-in-delay-${index + 1}`}>
              <div className="gradient-card rounded-xl p-6 h-full">
                <div className="text-4xl font-bold text-revon-primary/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="text-revon-primary/30 h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="gradient-btn">
            <Link to="/symptoms">
              Try Symptom Checker
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
