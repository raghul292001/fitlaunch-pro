import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { content } from "@/services/api";

const PricingSection = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [ptPlans, setPtPlans] = useState<any[]>([]);
  const [sectionData, setSectionData] = useState({ 
    title: "INVEST IN", 
    subtitle: "YOURSELF",
    description: "Unlock the potential inside you with our flexible pricing plans designed to fit your lifestyle."
  });
  const [ptSectionData, setPtSectionData] = useState({ 
    title: "PERSONAL TRAINER", 
    subtitle: "EXPERT GUIDANCE",
    description: "Get one-on-one attention to maximize your results and minimize injury risk with our expert coaches."
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await content.getPricing();
        if (res.data) setPlans(res.data);
        const ptRes = await content.getPersonalTraining();
        if (ptRes.data) setPtPlans(ptRes.data);
      } catch (e) {
        console.error("Failed to fetch pricing", e);
      }
    };

    const fetchSections = async () => {
        try {
            const res = await content.getSection('pricing');
            setSectionData(res.data);
            const ptRes = await content.getSection('personal-training');
            setPtSectionData(ptRes.data);
        } catch (e) {
            console.error("Failed to fetch section headers", e);
        }
    };

    fetchData();
    fetchSections();
  }, []);

  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        {/* Gym Membership Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mt-4 mb-6 uppercase">
            {sectionData.title}
            <br />
            <span className="text-gradient">{sectionData.subtitle}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {sectionData.description}
          </p>
        </motion.div>

        {/* ... (Grid for Plans) ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border ${
                plan.popular ? "border-primary bg-primary/5" : "border-border/50 card-gradient"
              } flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-display mb-2 uppercase">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 uppercase tracking-widest">{plan.subtitle}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">₹{plan.price}</span>
                  <span className="text-muted-foreground">{plan.duration}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className={`w-full ${plan.popular ? "default" : "variant-outline"}`}>
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

        {/* NOTE Section */}
        <div className="max-w-4xl mx-auto mb-24">
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-primary/20 bg-gradient-to-r from-background to-secondary/20 shadow-[0_0_20px_rgba(250,204,21,0.05)] text-center relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10"></div>
                <h4 className="text-primary font-bold mb-2 uppercase tracking-wide">NOTE: FOR THE BASIC PACKAGE</h4>
                <p className="text-muted-foreground">
                    The intake fee for new joiners is <span className="text-foreground font-semibold">₹2250 (₹1500 + ₹750)</span> as a one-time charge. 
                    From the second month onwards, your monthly fee will be <span className="text-foreground font-semibold">₹1500 only</span>.
                </p>
            </motion.div>
        </div>

        {/* Personal Training Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">
            One-on-One
          </span>
          <h2 className="text-4xl md:text-5xl font-display mt-4 mb-6 uppercase">
            {ptSectionData.title}
            <br />
            <span className="text-gradient">{ptSectionData.subtitle}</span>
          </h2>
           <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {ptSectionData.description}
          </p>
        </motion.div>
        
        {/* Personal Training Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {ptPlans.map((plan, index) => (
                 <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl card-gradient border border-border/50 text-center hover:border-primary/50 transition-colors"
                 >
                    <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
                        {plan.subLabel}
                    </span>
                    <h3 className="text-2xl font-display mb-4 uppercase">{plan.name}</h3>
                    <div className="text-4xl font-bold mb-8">₹{plan.price}</div>
                    <ul className="space-y-4 mb-8 text-left max-w-xs mx-auto">
                         {plan.features.map((f: string, i: number) => (
                            <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                <Check className="w-5 h-5 text-primary" /> {f}
                            </li>
                         ))}
                    </ul>
                    <Button variant="outline" className="w-full">Get Started</Button>
                 </motion.div>
             ))}
        </div>

      </div>
    </section>
  );
};

export default PricingSection;