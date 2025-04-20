
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SymptomChecker from "@/components/symptoms/SymptomChecker";

const SymptomsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-3">Symptom Checker</h1>
            <p className="text-muted-foreground">
              Analyze your symptoms to understand potential health conditions, precautions, and dietary recommendations.
            </p>
          </div>
          
          <SymptomChecker />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SymptomsPage;
