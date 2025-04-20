
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, ShieldCheck, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-6">About Revon</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Revon is an AI-powered health insight platform designed to help users understand their symptoms, 
                receive potential disease predictions, learn about precautions, and get dietary suggestions.
              </p>
              
              <div className="flex items-center gap-4 mb-12">
                <div className="h-12 w-12 rounded-full bg-revon-primary/10 flex items-center justify-center">
                  <HeartPulse className="h-6 w-6 text-revon-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To make health insights accessible to everyone through innovative AI technology.
                  </p>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <h2>How Revon Helps You</h2>
                <p>
                  Revon uses advanced machine learning algorithms to analyze the symptoms you input and 
                  provide potential health conditions that may be associated with those symptoms. Our system 
                  is designed to be informative, not diagnostic.
                </p>
                
                <h2>Our Technology</h2>
                <p>
                  Our platform leverages cutting-edge AI technology to process symptom data and provide 
                  personalized insights. We continuously update our models with the latest medical research 
                  to ensure the highest level of accuracy.
                </p>
                
                <div className="bg-muted/30 p-6 rounded-lg my-8">
                  <h3 className="flex items-center gap-2 text-xl font-semibold mb-3">
                    <ShieldCheck className="h-5 w-5 text-revon-primary" />
                    Important Note
                  </h3>
                  <p className="text-muted-foreground">
                    Revon is not a substitute for professional medical advice, diagnosis, or treatment. 
                    Always seek the advice of your physician or other qualified health provider with any 
                    questions you may have regarding a medical condition.
                  </p>
                </div>
                
                <h2>Privacy & Security</h2>
                <p>
                  We take your privacy seriously. All data provided to Revon is encrypted and securely stored. 
                  We do not share your personal health information with third parties without your explicit consent.
                </p>
              </div>
              
              <div className="mt-12 flex justify-center">
                <Button asChild size="lg" className="gradient-btn">
                  <Link to="/symptoms">
                    Try Symptom Checker
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
