import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "+919566623441";
  const whatsappNumber = "919566623441";
  const whatsappMessage = encodeURIComponent("Hi! I came across your website and I am interested in joining your gym. Please share the details.");

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2"
          >
            {/* WhatsApp */}
            <motion.a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium text-sm whitespace-nowrap">WhatsApp</span>
            </motion.a>

            {/* Phone */}
            <motion.a
              href={`tel:${phoneNumber}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium text-sm whitespace-nowrap">Call Now</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground animate-pulse-glow"
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingContactButton;
