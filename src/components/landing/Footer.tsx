import { MapPin, Phone, Clock, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { content } from "@/services/api";

const Footer = () => {
  const [footerData, setFooterData] = useState({
    brand: { title: "DREAM FITNESS CENTER", description: "" },
    contact: { 
      address: "", 
      phone: "", 
      openingHours: { weekday: "", weekend: "" } 
    },
    social: {
      instagram: { url: "", active: false },
      facebook: { url: "", active: false },
      twitter: { url: "", active: false },
      youtube: { url: "", active: false }
    },
    quickLinks: [],
    newsletter: { enabled: true, title: "NEWSLETTER", description: "", cta: "Join" },
    legal: [],
    copyrightText: ""
  });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await content.getFooter();
        if (res.data) setFooterData(res.data);
      } catch (e) {
        console.error("Failed to fetch footer", e);
      }
    };
    fetchFooter();
  }, []);

  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    youtube: Youtube
  };

  return (
    <footer className="bg-secondary/50 border-t border-border/50">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-display text-gradient mb-4 uppercase">{footerData.brand.title}</h3>
            <p className="text-muted-foreground text-sm mb-6">
              {footerData.brand.description}
            </p>
            <div className="flex gap-4">
              {Object.entries(footerData.social).map(([key, value]: [string, any]) => {
                if (!value.active) return null;
                // @ts-ignore
                const Icon = socialIcons[key];
                return (
                  <a
                    key={key}
                    href={value.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-4 uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {footerData.quickLinks.map((link: any, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg mb-4 uppercase">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  {footerData.contact.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  {footerData.contact.phone}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  {footerData.contact.openingHours?.weekday}
                  <br />
                  {footerData.contact.openingHours?.weekend}
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {footerData.newsletter.enabled && (
            <div>
              <h4 className="font-display text-lg mb-4 uppercase">{footerData.newsletter.title}</h4>
              <p className="text-muted-foreground text-sm mb-4">
                {footerData.newsletter.description}
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  {footerData.newsletter.cta}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            {footerData.copyrightText}
          </p>
          <div className="flex gap-6">
            {footerData.legal.map((link: any, index) => (
              <a
                key={index}
                href={link.href}
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
