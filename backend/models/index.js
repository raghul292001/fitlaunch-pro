const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  mainHeading1: { type: String, required: true },
  highlightedHeading1: { type: String, required: true },
  mainHeading2: { type: String, required: true },
  highlightedHeading2: { type: String, required: true },
  subheading: { type: String, required: true },
  backgroundImage: { type: String },
  primaryCtaText: { type: String, default: 'JOIN NOW →' },
  secondaryCtaText: { type: String, default: 'BOOK FREE TRIAL' },
  stats: [{
    label: String,
    value: String
  }]
});

const sectionHeaderSchema = new mongoose.Schema({
  sectionName: { type: String, required: true, unique: true }, // e.g., 'programs', 'features'
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String } // New Field
});

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  active: { type: Boolean, default: true }
});

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  ctaText: { type: String, default: 'Learn More' },
  highlighted: { type: Boolean, default: false },
  icon: { type: String, required: true }, 
  cardColor: { type: String, required: true }, 
  active: { type: Boolean, default: true } 
});

const coachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String },
  bio: { type: String }, // New Field
  certifications: [{ type: String }], // New Field: Array of strings
  experience: { type: String }, // e.g., "12 years"
  instagram: { type: String },
  linkedin: { type: String }
});

const pricingPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subtitle: { type: String },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  features: [{ type: String }],
  popular: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  noteTitle: { type: String, default: 'NOTE FOR THE BASIC PACKAGE' }, 
  noteContent: { type: String, default: 'The intake fee for new joiners is ₹2250 (₹1500 + ₹750) as a one-time charge. From the second month onwards, your monthly fee will be ₹1500 only.' }
});

const personalTrainingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subLabel: { type: String }, 
  price: { type: Number, required: true },
  features: [{ type: String }]
});

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String }, // Can be result like "Lost 30 lbs" or role "Marathon runner"
  result: { type: String }, // Explicit result field if needed, but role can serve both. Let's add result for clarity.
  rating: { type: Number, min: 1, max: 5, default: 5 },
  message: { type: String, required: true },
  image: { type: String },
  publish: { type: Boolean, default: true }
});

const bmiContentSchema = new mongoose.Schema({
  title: { type: String, default: 'BMI CALCULATOR' },
  description: { type: String },
  buttonText: { type: String, default: 'CALCULATE BMI' },
  disclaimer: { type: String }
});

const ctaBannerSchema = new mongoose.Schema({
  heading: { type: String, default: 'YOUR FITNESS JOURNEY' },
  subheading: { type: String, default: 'STARTS TODAY' },
  primaryCtaText: { type: String, default: 'Join Now' },
  secondaryCtaText: { type: String, default: 'Book a Free Session' }
});

const footerContactSchema = new mongoose.Schema({
  brand: {
    title: { type: String, default: 'DREAM FITNESS CENTER' },
    description: { type: String, default: 'Premium fitness center dedicated to helping you achieve your health and fitness goals.' }
  },
  contact: {
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    openingHours: {
      weekday: { type: String, default: 'Mon - Fri: 5:00 AM - 11:00 PM' },
      weekend: { type: String, default: 'Sat - Sun: 7:00 AM - 9:00 PM' }
    }
  },
  social: {
    instagram: { url: { type: String, default: '' }, active: { type: Boolean, default: true } },
    facebook: { url: { type: String, default: '' }, active: { type: Boolean, default: true } },
    twitter: { url: { type: String, default: '' }, active: { type: Boolean, default: true } },
    youtube: { url: { type: String, default: '' }, active: { type: Boolean, default: true } }
  },
  quickLinks: [{
    label: String,
    href: String
  }],
  newsletter: {
    enabled: { type: Boolean, default: true },
    title: { type: String, default: 'NEWSLETTER' },
    description: { type: String, default: 'Subscribe to get fitness tips and exclusive offers.' },
    cta: { type: String, default: 'Join' }
  },
  legal: [{
    label: String,
    href: String
  }],
  copyrightText: { type: String, default: '© 2026 Dream Fitness Center. All rights reserved.' }
});

const contactSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true }, // Rich text or HTML
  author: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  videoUrl: { type: String }, // New Field: YouTube or Instagram URL
  date: { type: Date, default: Date.now }
});

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = {
  Hero: mongoose.model('Hero', heroSchema),
  Feature: mongoose.model('Feature', featureSchema),
  Program: mongoose.model('Program', programSchema),
  Coach: mongoose.model('Coach', coachSchema),
  PricingPlan: mongoose.model('PricingPlan', pricingPlanSchema),
  PersonalTraining: mongoose.model('PersonalTraining', personalTrainingSchema),
  Testimonial: mongoose.model('Testimonial', testimonialSchema),
  BMIContent: mongoose.model('BMIContent', bmiContentSchema),
  CTABanner: mongoose.model('CTABanner', ctaBannerSchema),
  FooterContact: mongoose.model('FooterContact', footerContactSchema),
  ContactSubmission: mongoose.model('ContactSubmission', contactSubmissionSchema),
  BlogPost: mongoose.model('BlogPost', blogPostSchema),
  Admin: mongoose.model('Admin', adminSchema),
  SectionHeader: mongoose.model('SectionHeader', sectionHeaderSchema)
};
