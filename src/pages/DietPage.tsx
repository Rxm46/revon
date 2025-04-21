
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const DietPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-3">Healthy Diet Recommendations</h1>
            <p className="text-muted-foreground">
              Explore dietary recommendations based on your health condition and symptoms.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-card rounded-lg shadow-md">
            <p className="text-center text-muted-foreground mb-8">
              Our diet recommendations are powered by AI and based on your analyzed symptoms.
              Please check your symptom analysis for personalized dietary suggestions.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Healthy Diet Basics</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-revon-primary/70"></div>
                    <span>Stay hydrated with 8 glasses of water daily</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-revon-primary/70"></div>
                    <span>Include fruits and vegetables with every meal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-revon-primary/70"></div>
                    <span>Limit processed foods and added sugars</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-revon-primary/70"></div>
                    <span>Choose whole grains over refined grains</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Immunity-Boosting Foods</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-revon-primary/70"></div>
                    <span>Citrus fruits (oranges, grapefruits, lemons)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-revon-primary/70"></div>
                    <span>Leafy greens (spinach, kale)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-revon-primary/70"></div>
                    <span>Yogurt and fermented foods</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-revon-primary/70"></div>
                    <span>Foods rich in zinc (seafood, nuts, seeds)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DietPage;
