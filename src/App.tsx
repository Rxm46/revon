
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";
import Index from "./pages/Index";
import SymptomsPage from "./pages/SymptomsPage";
import AboutPage from "./pages/AboutPage";
import DietPage from "./pages/DietPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import UserHistoryPage from "./pages/UserHistoryPage";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/symptoms" element={<SymptomsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/diet" element={<DietPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/history" element={
              <RequireAuth>
                <UserHistoryPage />
              </RequireAuth>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
