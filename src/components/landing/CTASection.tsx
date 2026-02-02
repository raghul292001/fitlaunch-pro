import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 mb-8"
          >
            <Zap className="w-10 h-10 text-primary" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display mb-6">
            Your Fitness Journey
            <br />
            <span className="text-gradient">Starts Today</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Take the first step towards the body and life you've always wanted. 
            Join thousands of members who've already transformed their lives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="glow-effect">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Contact Us
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            No credit card required • Cancel anytime • 7-day free trial
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
