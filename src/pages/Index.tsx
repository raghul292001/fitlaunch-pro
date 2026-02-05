import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ProgramsSection from "@/components/landing/ProgramsSection";
import TrainersSection from "@/components/landing/TrainersSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import BMICalculator from "@/components/landing/BMICalculator";
import CTASection from "@/components/landing/CTASection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import FloatingContactButton from "@/components/landing/FloatingContactButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <section id="programs">
        <ProgramsSection />
      </section>
      <section id="trainers">
        <TrainersSection />
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
      <TestimonialsSection />
      <BMICalculator />
      <section id="contact">
        <CTASection />
        <ContactSection />
      </section>
      <Footer />
      <FloatingContactButton />
    </div>
  );
};

export default Index;
