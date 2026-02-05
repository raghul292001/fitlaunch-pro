import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from 'react-helmet-async';

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const HeroEditor = lazy(() => import("./pages/admin/HeroEditor"));
const PricingEditor = lazy(() => import("./pages/admin/PricingEditor"));
const FeaturesEditor = lazy(() => import("./pages/admin/FeaturesEditor"));
const ProgramsEditor = lazy(() => import("./pages/admin/ProgramsEditor"));
const CoachesEditor = lazy(() => import("./pages/admin/CoachesEditor"));
const TestimonialsEditor = lazy(() => import("./pages/admin/TestimonialsEditor"));
const FooterEditor = lazy(() => import("./pages/admin/FooterEditor"));
const ContactSubmissions = lazy(() => import("./pages/admin/ContactSubmissions"));
const BlogEditor = lazy(() => import("./pages/admin/BlogEditor"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-primary animate-pulse">Loading...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="hero" element={<HeroEditor />} />
                <Route path="pricing" element={<PricingEditor />} />
                <Route path="features" element={<FeaturesEditor />} />
                <Route path="programs" element={<ProgramsEditor />} />
                <Route path="coaches" element={<CoachesEditor />} />
                <Route path="testimonials" element={<TestimonialsEditor />} />
                <Route path="blog" element={<BlogEditor />} />
                <Route path="footer" element={<FooterEditor />} />
                <Route path="contact-submissions" element={<ContactSubmissions />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
