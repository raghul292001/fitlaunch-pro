import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Monthly",
    price: 49,
    period: "/month",
    description: "Perfect for trying out our facilities",
    features: [
      "Full gym access",
      "Group classes included",
      "Locker room access",
      "Basic fitness assessment",
    ],
    popular: false,
  },
  {
    name: "Quarterly",
    price: 129,
    period: "/3 months",
    originalPrice: 147,
    description: "Best value for committed fitness enthusiasts",
    features: [
      "Everything in Monthly",
      "2 personal training sessions",
      "Nutrition consultation",
      "Progress tracking app",
      "Guest passes (2/month)",
    ],
    popular: true,
  },
  {
    name: "Yearly",
    price: 449,
    period: "/year",
    originalPrice: 588,
    description: "Ultimate commitment with maximum savings",
    features: [
      "Everything in Quarterly",
      "Monthly personal training",
      "Custom meal plans",
      "Priority class booking",
      "Unlimited guest passes",
      "Exclusive member events",
    ],
    popular: false,
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
            Choose the plan that fits your lifestyle. All plans include full gym access and group classes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border ${
                plan.popular
                  ? "border-primary bg-gradient-to-b from-primary/10 to-transparent shadow-[0_0_40px_hsl(142_76%_45%_/_0.15)]"
                  : "border-border/50 card-gradient"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-display mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-display">${plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <span className="line-through">${plan.originalPrice}</span>
                    <span className="text-primary ml-2">
                      Save ${plan.originalPrice - plan.price}
                    </span>
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "heroOutline"}
                size="lg"
                className="w-full"
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
