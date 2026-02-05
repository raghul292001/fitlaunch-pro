import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { content, API_BASE_URL } from "@/services/api";

const TrainersSection = () => {
  const [coaches, setCoaches] = useState<any[]>([]);
  const [sectionData, setSectionData] = useState({ 
    title: "MEET YOUR", 
    subtitle: "COACHES",
    description: "Our certified trainers bring passion, expertise, and dedication to every session to help you reach your peak."
  });

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await content.getCoaches();
        if (res.data) setCoaches(res.data);
      } catch (e) {
        console.error("Failed to fetch coaches", e);
      }
    };
    
    const fetchSection = async () => {
        try {
            const res = await content.getSection('coaches');
            setSectionData(res.data);
        } catch (e) {
            console.error("Failed to fetch section header", e);
        }
    };

    fetchCoaches();
    fetchSection();
  }, []);

  return (
    <section className="py-24 bg-secondary/20">
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display mt-4 mb-6 uppercase">
            {sectionData.title}
            <br />
            <span className="text-gradient">{sectionData.subtitle}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {sectionData.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coaches.map((coach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative rounded-2xl overflow-hidden card-gradient border border-border/50"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={coach.image ? `${API_BASE_URL}${coach.image}` : "https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
                  alt={coach.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-2xl font-display mb-1 uppercase text-white">{coach.name}</h3>
                <p className="text-primary font-bold text-sm mb-2 uppercase tracking-wide">{coach.role}</p>
                <p className="text-sm text-gray-300 mb-4 leading-relaxed line-clamp-2">{coach.bio}</p>
                
                <div className="flex flex-wrap gap-2">
                    {coach.certifications && coach.certifications.map((cert: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                            {cert}
                        </span>
                    ))}
                    {coach.experience && (
                         <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                            {coach.experience}
                        </span>
                    )}
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
