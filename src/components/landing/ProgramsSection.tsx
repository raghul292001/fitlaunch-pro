import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useEffect, useState } from "react";
import { content } from "@/services/api";

const ProgramsSection = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const [sectionData, setSectionData] = useState({ 
      title: "FIND YOUR", 
      subtitle: "PERFECT FIT",
      description: "From strength training to mindfulness, we offer programs for every fitness level and goal."
  });

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await content.getPrograms();
        // Filter out inactive programs immediately upon fetching
        if (res.data && res.data.length > 0) {
          const activePrograms = res.data.filter((p: any) => p.active !== false);
          setPrograms(activePrograms);
        } else {
            // Fallback default
            setPrograms([
              {
                icon: "Dumbbell",
                name: "Weight Training",
                shortDescription: "Build strength and muscle with personalized weight training programs.",
                cardColor: "from-[#3E4A1F] to-[#5A6026]",
              }
            ]);
        }
      } catch (e) {
        console.error("Failed to fetch programs", e);
      }
    };

    const fetchSection = async () => {
        try {
            const res = await content.getSection('programs');
            setSectionData(res.data);
        } catch (e) {
            console.error("Failed to fetch section header", e);
        }
    };

    fetchPrograms();
    fetchSection();
  }, []);

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName];
    return Icon ? <Icon className="w-8 h-8 text-primary" /> : <LucideIcons.Dumbbell className="w-8 h-8 text-primary" />;
  };

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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mt-4 mb-6 uppercase">
            {sectionData.title}
            <br />
            <span className="text-gradient">{sectionData.subtitle}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {sectionData.description}
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
              style={{ background: program.cardColor }}
              className={`relative p-8 rounded-2xl border border-border/50 cursor-pointer group overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-background/50 backdrop-blur-sm flex items-center justify-center mb-6">
                  {getIcon(program.icon)}
                </div>
                <h3 className="text-2xl font-display mb-3 uppercase">{program.name}</h3>
                <p className="text-muted-foreground">{program.shortDescription}</p>
                
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
