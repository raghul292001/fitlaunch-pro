import { motion } from "framer-motion";
import { Award, Dumbbell, Calendar, Apple } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Certified Trainers",
    description:
      "Our expert trainers hold internationally recognized certifications and bring years of experience to help you achieve your goals.",
  },
  {
    icon: Dumbbell,
    title: "Modern Equipment",
    description:
      "State-of-the-art machines and free weights from top brands, maintained daily for your safety and comfort.",
  },
  {
    icon: Calendar,
    title: "Flexible Plans",
    description:
      "Choose from monthly, quarterly, or yearly memberships. No long-term commitments required.",
  },
  {
    icon: Apple,
    title: "Nutrition Guidance",
    description:
      "Personalized diet plans and nutrition coaching to complement your training and maximize results.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mt-4 mb-6">
            Everything You Need
            <br />
            <span className="text-gradient">To Succeed</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We've built a complete fitness ecosystem designed to support every aspect of your transformation journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-2xl card-gradient border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(142_76%_45%_/_0.1)]"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
