import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: 1500,
    period: "/month",
    description: "Start your journey",
    features: [
      "1 Month Validity",
      "Full gym access",
      "General guidance",
      "Locker room access",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: 4499,
    period: "/3 months",
    description: "Commit to consistency",
    features: [
      "3 Months Validity",
      "Everything in Basic",
      "Diet consultation",
      "Progress tracking",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: 6699,
    period: "/6 months",
    description: "Serious transformation",
    features: [
      "6 Months Validity",
      "Advanced progress tracking",
      "Nutrition planning",
      "Priority support",
    ],
    popular: false,
  },
  {
    name: "Ultimate",
    price: 9999,
    period: "/1 year",
    description: "Lifestyle change",
    features: [
      "1 Year Validity",
      "All Premium features",
      "Free personal training session",
      "Unlimited guest passes",
    ],
    popular: false,
  },
];

const personalTraining = [
  {
    name: "Individual Package",
    price: 4000,
    description: "For 1 Person",
    features: ["Personalized workout plan", "1-on-1 coaching", "Diet & nutrition plan"],
  },
  {
    name: "Couple Package",
    price: 7499,
    description: "For 2 Persons",
    features: ["Train with a partner", "Shared goals", "Double motivation"],
  },
];

const PricingSection = () => {
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">
            Membership Plans
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mt-4 mb-6">
            Invest In
            <br />
            <span className="text-gradient">Yourself</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose the plan that fits your lifestyle.
          </p>
        </motion.div>

        <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-display text-center mb-8 text-primary">GYM MEMBERSHIP</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border flex flex-col ${
                    plan.popular
                    ? "border-primary bg-gradient-to-b from-primary/10 to-transparent shadow-[0_0_40px_hsl(142_76%_45%_/_0.15)]"
                    : "border-border/50 card-gradient"
                }`}
                >
                {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full whitespace-nowrap">
                        <Star className="w-4 h-4" />
                        Most Popular
                    </span>
                    </div>
                )}

                <div className="text-center mb-6">
                    <h3 className="text-xl font-display mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                    
                    <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-display">₹{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                    </div>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                    </li>
                    ))}
                </ul>

                <Button
                    variant={plan.popular ? "hero" : "heroOutline"}
                    size="lg"
                    className="w-full mt-auto"
                >
                    Get Started
                </Button>
                </motion.div>
            ))}
            </div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-muted/30 rounded-lg border border-primary/20 text-center">
            <p className="text-sm md:text-base text-muted-foreground">
                <span className="text-primary font-bold block mb-2">NOTE: FOR THE BASIC PACKAGE</span>
                The initial fee for new joiners is <span className="text-foreground font-semibold">₹2250</span> (₹1500 + ₹750). The ₹750 is a one-time charge. From the second month onwards, your monthly fee will be ₹1500 only.
            </p>
        </div>

        <div className="mt-24">
            <h3 className="text-2xl md:text-3xl font-display text-center mb-8 text-primary">PERSONAL TRAINER</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {personalTraining.map((plan, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative p-8 rounded-2xl border border-border/50 card-gradient"
                    >
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-display mb-2">{plan.name}</h3>
                            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">{plan.description}</p>
                            
                            <div className="flex items-baseline justify-center gap-1">
                            <span className="text-4xl font-display">₹{plan.price}</span>
                            </div>
                        </div>
                        
                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 justify-center">
                                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                            </li>
                            ))}
                        </ul>

                        <Button variant="heroOutline" size="lg" className="w-full">
                            Select Plan
                        </Button>
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default PricingSection;
