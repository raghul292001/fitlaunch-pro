import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-gym.png";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { content, API_BASE_URL } from "@/services/api";

const HeroSection = () => {
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await content.getHero();
        setHeroData(res.data);
      } catch (error) {
        console.error("Failed to fetch hero data", error);
      }
    };
    fetchData();
  }, []);

  // Default fallbacks if data is missing or loading
  const bgImage = heroData?.backgroundImage ? `${API_BASE_URL}${heroData.backgroundImage}` : heroImage;
  const mainHeading1 = heroData?.mainHeading1 || "TRANSFORM YOUR";
  const highlightedHeading1 = heroData?.highlightedHeading1 || "BODY";
  const mainHeading2 = heroData?.mainHeading2 || "TRANSFORM YOUR";
  const highlightedHeading2 = heroData?.highlightedHeading2 || "LIFE.";
  const subheading = heroData?.subheading || "Personal training, modern equipment, and real results. Join the gym that transforms goals into achievements.";

  const handleJoinNow = () => {
    const message = encodeURIComponent("I want to join Dream Fitness Center.");
    window.open(`https://wa.me/919566623441?text=${message}`, "_blank");
  };

  const handleBookTrial = () => {
    const message = encodeURIComponent("Hi! I’d like to book a free trial session.");
    window.open(`https://wa.me/919566623441?text=${message}`, "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Gym workout"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display leading-none mb-6"
          >
            {mainHeading1}
            <br />
            <span className="text-gradient">{highlightedHeading1}</span>
            <br />
            {mainHeading2}
            <br />
            <span className="text-gradient">{highlightedHeading2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
          >
            {subheading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" size="xl" onClick={handleJoinNow}>
              {heroData?.primaryCtaText || "JOIN NOW →"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="heroOutline" size="xl" onClick={handleBookTrial}>
              <Play className="w-5 h-5" />
              {heroData?.secondaryCtaText || "BOOK FREE TRIAL"}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-8 md:gap-12 mt-12 pt-12 border-t border-border/30"
          >
            {(heroData?.stats || [
              { value: "10K+", label: "Active Members" },
              { value: "50+", label: "Expert Trainers" },
              { value: "15+", label: "Years Experience" },
            ]).map((stat: any, index: number) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-display text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>


      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
