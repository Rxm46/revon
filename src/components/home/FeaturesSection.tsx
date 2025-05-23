
import { HeartPulse, ShieldCheck, MapPin, Utensils, FileText, Info } from "lucide-react";

const features = [
  {
    icon: <HeartPulse className="h-6 w-6 text-revon-primary" />,
    title: "Symptom Analysis",
    description: "Input your symptoms and receive AI-powered analysis of potential health conditions."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-revon-primary" />,
    title: "Precaution Recommendations",
    description: "Get personalized precautionary measures to help manage your health condition."
  },
  {
    icon: <Utensils className="h-6 w-6 text-revon-primary" />,
    title: "Diet Suggestions",
    description: "Receive dietary recommendations tailored to your health needs and predicted conditions."
  },
  {
    icon: <MapPin className="h-6 w-6 text-revon-primary" />,
    title: "Nearby Hospitals",
    description: "Find healthcare facilities near you for professional medical assistance."
  },
  {
    icon: <FileText className="h-6 w-6 text-revon-primary" />,
    title: "Health Reports",
    description: "Generate comprehensive reports of your health analysis that you can share with healthcare providers."
  },
  {
    icon: <Info className="h-6 w-6 text-revon-primary" />,
    title: "Health Education",
    description: "Access educational resources about various health conditions and preventive care."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Health Insights</h2>
          <p className="text-muted-foreground">
            Revon combines cutting-edge AI with medical knowledge to provide you with actionable health insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group rounded-2xl overflow-hidden animate-fade-in animate-fade-in-delay-${Math.min(Math.floor(index / 3) + 1, 3)}`}
            >
              <div className="gradient-card p-6 h-full transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-revon-primary/10 flex items-center justify-center mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 transition-transform duration-300 group-hover:translate-x-1">{feature.title}</h3>
                <p className="text-muted-foreground transition-all duration-300 group-hover:translate-x-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
