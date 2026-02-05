import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { content } from "@/services/api";
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [sectionData, setSectionData] = useState({ 
    title: "REAL PEOPLE,", 
    subtitle: "REAL RESULTS",
    description: "Don't just take our word for it. Hear from the real people who have transformed their lives with us."
  });
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await content.getTestimonials();
        if (res.data) setTestimonials(res.data);
      } catch (e) {
        console.error("Failed to fetch testimonials", e);
      }
    };

    const fetchSection = async () => {
        try {
            const res = await content.getSection('testimonials');
            setSectionData(res.data);
        } catch (e) {
            console.error("Failed to fetch section header", e);
        }
    };

    fetchTestimonials();
    fetchSection();
  }, []);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

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
            Testimonials
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

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto px-4">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-6">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6 min-w-0">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-[#1A1D24] border border-border/10 flex flex-col h-full relative group hover:border-primary/30 transition-colors"
                            >
                                <div className="absolute top-6 left-6 text-6xl font-display text-primary/20 leading-none select-none">
                                    "
                                </div>
                                
                                <div className="flex gap-1 mb-6 mt-4 relative z-10">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                    ))}
                                </div>
                                
                                <p className="text-gray-300 mb-8 leading-relaxed relative z-10 flex-grow text-sm">
                                    "{testimonial.message}"
                                </p>
                                
                                <div className="flex items-center gap-4 relative z-10 mt-auto border-t border-white/5 pt-6">
                                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                                    {testimonial.name[0]}
                                    </div>
                                    <div>
                                    <div className="font-bold text-white uppercase text-sm tracking-wide">{testimonial.name}</div>
                                    <div className="text-xs text-primary font-medium uppercase tracking-wider">{testimonial.result}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-12">
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
                    onClick={scrollPrev}
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
                    onClick={scrollNext}
                >
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
