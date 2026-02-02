import { motion } from "framer-motion";
import { Flame, Zap, Heart, User, Dumbbell } from "lucide-react";

const programs = [
  {
    icon: Dumbbell,
    title: "Weight Training",
    description: "Build strength and muscle with personalized weight training programs.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Flame,
    title: "Fat Loss Program",
    description: "Burn fat effectively with our scientifically designed workout plans.",
    color: "from-orange-500/20 to-orange-500/5",
  },
  {
    icon: Zap,
    title: "CrossFit / HIIT",
    description: "High-intensity workouts that push your limits and deliver results.",
    color: "from-yellow-500/20 to-yellow-500/5",
  },
  {
    icon: Heart,
    title: "Yoga & Cardio",
    description: "Improve flexibility, balance, and cardiovascular health.",
    color: "from-pink-500/20 to-pink-500/5",
  },
  {
    icon: User,
    title: "Personal Training",
    description: "One-on-one sessions tailored to your specific goals and needs.",
    color: "from-blue-500/20 to-blue-500/5",
  },
];

const ProgramsSection = () => {
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
            Our Programs
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mt-4 mb-6">
            Find Your
            <br />
            <span className="text-gradient">Perfect Fit</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From strength training to mindfulness, we offer programs for every fitness level and goal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative p-8 rounded-2xl bg-gradient-to-b ${program.color} border border-border/50 cursor-pointer group overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-background/50 backdrop-blur-sm flex items-center justify-center mb-6">
                  <program.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display mb-3">{program.title}</h3>
                <p className="text-muted-foreground">{program.description}</p>
                
                <div className="mt-6 flex items-center text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
