import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useEffect, useState } from "react";
import { content } from "@/services/api";

const FeaturesSection = () => {
  const [features, setFeatures] = useState<any[]>([]);
  const [sectionData, setSectionData] = useState({ 
    title: "EVERYTHING YOU NEED", 
    subtitle: "TO SUCCEED",
    description: "We've built a complete fitness ecosystem designed to support every aspect of your transformation journey."
  });

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await content.getFeatures();
        if (res.data && res.data.length > 0) {
          setFeatures(res.data.filter((f: any) => f.active !== false));
        } else {
            // Fallback default
            setFeatures([
              {
                icon: "Award",
                title: "Certified Trainers",
                description: "Our expert trainers hold internationally recognized certifications and bring years of experience."
              },
              // ... other defaults
            ]);
        }
      } catch (e) {
        console.error("Failed to fetch features", e);
      }
    };

    const fetchSection = async () => {
        try {
            const res = await content.getSection('features');
            setSectionData(res.data);
        } catch (e) {
            console.error("Failed to fetch section header", e);
        }
    };

    fetchFeatures();
    fetchSection();
  }, []);

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName];
    return Icon ? <Icon className="w-7 h-7 text-primary" /> : <LucideIcons.Dumbbell className="w-7 h-7 text-primary" />;
  };

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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mt-4 mb-6 uppercase">
            {sectionData.title}
            <br />
            <span className="text-gradient">{sectionData.subtitle}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {sectionData.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.filter(f => f.active !== false).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 rounded-2xl card-gradient border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(142_76%_45%_/_0.1)]"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                {getIcon(feature.icon)}
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
