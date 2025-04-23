
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UserProfile from '@/components/auth/UserProfile';
import { useNavigate } from "react-router-dom";

const UserHistoryPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold mb-3">Your Medical History</h1>
            <p className="text-muted-foreground">
              View and manage your previous symptom checks and diagnoses
            </p>
          </div>
          
          <UserProfile onBack={() => navigate(-1)} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserHistoryPage;
