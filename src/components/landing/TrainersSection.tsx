import { motion } from "framer-motion";
import trainer1 from "@/assets/trainer-1.jpg";
import trainer2 from "@/assets/trainer-2.jpg";
import trainer3 from "@/assets/trainer-3.jpg";
import { Instagram, Twitter } from "lucide-react";

const trainers = [
  {
    name: "Marcus Chen",
    role: "Head Strength Coach",
    image: trainer1,
    certifications: ["NSCA-CSCS", "NASM-CPT"],
    experience: "12 years",
    bio: "Former professional athlete specializing in powerlifting and functional training.",
  },
  {
    name: "Alex Rivera",
    role: "CrossFit Specialist",
    image: trainer3,
    certifications: ["CrossFit L3", "USAW"],
    experience: "8 years",
    bio: "Competitive CrossFit athlete and certified Olympic weightlifting coach.",
  },
  {
    name: "Jordan Lee",
    role: "Nutrition & Wellness",
    image: trainer2,
    certifications: ["RD", "ISSN-SNS"],
    experience: "10 years",
    bio: "Registered dietitian combining fitness training with evidence-based nutrition.",
  },
];

const TrainersSection = () => {
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
            Expert Team
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mt-4 mb-6">
            Meet Your
            <br />
            <span className="text-gradient">Coaches</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our certified trainers bring passion, expertise, and dedication to every session.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                
                {/* Social Links */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Instagram className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Twitter className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-display">{trainer.name}</h3>
                <p className="text-primary font-medium mb-3">{trainer.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{trainer.bio}</p>
                
                <div className="flex flex-wrap gap-2">
                  {trainer.certifications.map((cert, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                  <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                    {trainer.experience}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;
