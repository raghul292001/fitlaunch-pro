const mongoose = require('mongoose');
const { Hero, Feature, Program, PricingPlan, PersonalTraining, Coach, Testimonial, CTABanner, SectionHeader, BlogPost } = require('./models'); // Added BlogPost
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gym-cms');
    console.log('MongoDB Connected');

    // Seed Coaches
    await Coach.deleteMany({});
    await Coach.create([
      {
        name: "MARCUS CHEN",
        role: "Head Strength Coach",
        bio: "Former professional athlete specializing in powerlifting and functional training.",
        certifications: ["NSCA-CSCS", "NASM-CPT"],
        experience: "12 years",
        image: "/uploads/coach1.jpg" // Placeholder path, assumes you might have these or they will be empty
      },
      {
        name: "ALEX RIVERA",
        role: "CrossFit Specialist",
        bio: "Competitive CrossFit athlete and certified Olympic weightlifting coach.",
        certifications: ["CrossFit L3", "USAW"],
        experience: "8 years",
        image: "/uploads/coach2.jpg"
      },
      {
        name: "JORDAN LEE",
        role: "Nutrition & Wellness",
        bio: "Registered dietitian combining fitness training with evidence-based nutrition.",
        certifications: ["RD", "ISSN-CNS"],
        experience: "10 years",
        image: "/uploads/coach3.jpg"
      }
    ]);
    console.log('Coaches Seeded');
    await SectionHeader.deleteMany({});
    await SectionHeader.create([
      { 
        sectionName: 'features', 
        title: 'EVERYTHING YOU NEED', 
        subtitle: 'TO SUCCEED',
        description: "We've built a complete fitness ecosystem designed to support every aspect of your transformation journey."
      },
      { 
        sectionName: 'programs', 
        title: 'FIND YOUR', 
        subtitle: 'PERFECT FIT', 
        description: 'From strength training to mindfulness, we offer programs for every fitness level and goal.' 
      },
      { 
        sectionName: 'pricing', 
        title: 'INVEST IN', 
        subtitle: 'YOURSELF',
        description: 'Unlock the potential inside you with our flexible pricing plans designed to fit your lifestyle.'
      },
      { 
        sectionName: 'coaches', 
        title: 'MEET YOUR', 
        subtitle: 'COACHES',
        description: 'Our certified trainers bring passion, expertise, and dedication to every session to help you reach your peak.'
      },
      { 
        sectionName: 'testimonials', 
        title: 'REAL PEOPLE,', 
        subtitle: 'REAL RESULTS',
        description: "Don't just take our word for it. Hear from the real people who have transformed their lives with us."
      },
      { 
        sectionName: 'personal-training', 
        title: 'PERSONAL TRAINER', 
        subtitle: 'EXPERT GUIDANCE',
        description: 'Get one-on-one attention to maximize your results and minimize injury risk with our expert coaches.'
      }
    ]);
    console.log('Section Headers Seeded');

    // Seed Hero
    await Hero.deleteMany({});
    await Hero.create({
      mainHeading1: 'TRANSFORM YOUR',
      highlightedHeading1: 'BODY',
      mainHeading2: 'TRANSFORM YOUR',
      highlightedHeading2: 'LIFE.',
      subheading: 'Personal training, modern equipment, and real results. Join the gym that transforms goals into achievements.',
      primaryCtaText: 'JOIN NOW →',
      secondaryCtaText: 'BOOK FREE TRIAL',
      stats: [
        { value: "10K+", label: "Active Members" },
        { value: "50+", label: "Expert Trainers" },
        { value: "15+", label: "Years Experience" }
      ]
    });
    console.log('Hero Seeded');

    // Seed Features
    await Feature.deleteMany({});
    await Feature.create( [
{
icon: "Award",
title: "Certified Trainers",
description:
"Our expert trainers hold internationally recognized certifications and bring years of experience to help you achieve your goals.",
},
{
icon: "Dumbbell",
title: "Modern Equipment",
description:
"State-of-the-art machines and free weights from top brands, maintained daily for your safety and comfort.",
},
{
icon: "Calendar",
title: "Flexible Plans",
description:
"Choose from monthly, quarterly, or yearly memberships. No long-term commitments required.",
},
{
icon: "Apple",
title: "Nutrition Guidance",
description:
"Personalized diet plans and nutrition coaching to complement your training and maximize results.",
},
]);
    console.log('Features Seeded');

    // Seed Programs
    await Program.deleteMany({});
    await Program.create([
      {
        name: "WEIGHT TRAINING",
        shortDescription: "Build strength and muscle with personalized weight training programs.",
        icon: "Dumbbell",
        cardColor: "linear-gradient(to bottom, #3E4A1F, #5A6026)" // olive/green gradient
      },
      {
        name: "FAT LOSS PROGRAM",
        shortDescription: "Burn fat effectively with our scientifically designed workout plans.",
        icon: "Flame",
        cardColor: "linear-gradient(to bottom, #4A2A1F, #6A2E2C)" // brown/red gradient
      },
      {
        name: "CROSSFIT / HIIT",
        shortDescription: "High-intensity workouts that push your limits and deliver results.",
        icon: "Zap",
        cardColor: "linear-gradient(to bottom, #4A3E1F, #5A4C26)" // dark golden/olive gradient
      },
      {
        name: "YOGA & CARDIO",
        shortDescription: "Improve flexibility, balance, and cardiovascular health.",
        icon: "Heart",
        cardColor: "linear-gradient(to bottom, #3B1F2E, #592543)" // burgundy/purple gradient
      },
      {
        name: "PERSONAL TRAINING",
        shortDescription: "One-on-one sessions tailored to your specific goals and needs.",
        icon: "User",
        cardColor: "linear-gradient(to bottom, #0E243F, #17365D)" // navy/blue gradient
      }
    ]);
    console.log('Programs Seeded');

    // Seed Pricing Plans
    await PricingPlan.deleteMany({});
    await PricingPlan.create([
        { 
            name: 'BASIC', 
            subtitle: 'Start your journey',
            price: 1500, 
            duration: '/ month', 
            features: ['1 Month Validity', 'Gym floor access', 'Group classes', 'Locker room access'],
            popular: false
        },
        { 
            name: 'STANDARD', 
            subtitle: 'Commit to consistency',
            price: 4499, 
            duration: '/ 3 months', 
            features: ['3 Months Validity', 'Everything in Basic', 'Diet consultation', 'Progress tracking'], 
            popular: true 
        },
        { 
            name: 'PREMIUM', 
            subtitle: 'Serious transformation',
            price: 6699, 
            duration: '/ 6 months', 
            features: ['6 Months Validity', 'Advanced progress tracking', 'Personal training', 'Priority support'],
            popular: false
        },
        { 
            name: 'ULTIMATE', 
            subtitle: 'Lifetime change',
            price: 9999, 
            duration: '/ 12 months', 
            features: ['1 Year Validity', 'All Premium features', 'Free personal training session', 'Unlimited guest passes'],
            popular: false
        }
    ]);
    console.log('Pricing Plans Seeded');

    // Seed Personal Training
    await PersonalTraining.deleteMany({});
    await PersonalTraining.create([
        {
            name: 'INDIVIDUAL PACKAGE',
            subLabel: 'FOR 1 PERSON',
            price: 4000,
            features: ['Personalized workout plan', '1-on-1 coaching', 'Diet & nutrition plan']
        },
        {
            name: 'COUPLE PACKAGE',
            subLabel: 'FOR 2 PERSONS',
            price: 7499,
            features: ['Train with a partner', 'Shared goals', 'Double motivation']
        }
    ]);
    console.log('Personal Training Seeded');

    // Seed Testimonials
    await Testimonial.deleteMany({});
    await Testimonial.create([
      {
        name: "SARAH MITCHELL",
        result: "Lost 30 lbs in 4 months",
        message: "The trainers here changed my life. I came in feeling hopeless and left feeling like a completely new person. The personalized attention made all the difference.",
        rating: 5
      },
      {
        name: "DAVID PARK",
        result: "Gained 20 lbs of muscle",
        message: "Best gym I've ever been to. The equipment is top-notch, the atmosphere is motivating, and the community keeps you accountable. Worth every penny.",
        rating: 5
      },
      {
        name: "EMMA RODRIGUEZ",
        result: "Marathon runner",
        message: "The combination of strength training and cardio programs helped me shave 15 minutes off my marathon time. The nutrition guidance was a game-changer.",
        rating: 5
      }
    ]);
    console.log('Testimonials Seeded');

    // Seed Footer
    const { FooterContact } = require('./models');
    await FooterContact.deleteMany({});
    await FooterContact.create({
      brand: {
        title: 'DREAM FITNESS CENTER',
        description: 'Premium fitness center dedicated to helping you achieve your health and fitness goals through expert training and state-of-the-art facilities.'
      },
      contact: {
        address: '28, 3rd Street, Ramkrishnanagar, Ernavoor, Chennai-57',
        phone: '+91 9556623441',
        email: 'info@dreamfitness.com',
        openingHours: {
          weekday: 'Mon - Fri: 5:00 AM - 11:00 PM',
          weekend: 'Sat - Sun: 7:00 AM - 9:00 PM'
        }
      },
      social: {
        instagram: { url: 'https://instagram.com', active: true },
        facebook: { url: 'https://facebook.com', active: true },
        twitter: { url: 'https://twitter.com', active: true },
        youtube: { url: 'https://youtube.com', active: true }
      },
      quickLinks: [
        { label: 'About Us', href: '#' },
        { label: 'Programs', href: '#programs' },
        { label: 'Trainers', href: '#trainers' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Schedule', href: '#' },
        { label: 'Blog', href: '/blog' }
      ],
      newsletter: {
        enabled: true,
        title: 'NEWSLETTER',
        description: 'Subscribe to get fitness tips and exclusive offers.',
        cta: 'Join'
      },
      legal: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Cookie Policy', href: '/cookie-policy' }
      ],
      copyrightText: '© 2026 Dream Fitness Center. All rights reserved.'
    });
    console.log('Footer Seeded');

    // Seed Blog Posts
    await BlogPost.deleteMany({});
    await BlogPost.create([
      {
        title: "10 Tips for Building Muscle Mass",
        excerpt: "Discover the essential strategies for maximizing muscle growth through proper training and nutrition.",
        content: `
          <p>Building muscle mass requires a combination of consistent training, adequate nutrition, and sufficient recovery. Here are 10 essential tips to help you maximize your gains:</p>
          <h3>1. Focus on Compound Exercises</h3>
          <p>Compound movements like squats, deadlifts, bench presses, and overhead presses recruit multiple muscle groups, allowing you to lift heavier weights and stimulate more growth.</p>
          <h3>2. Progressive Overload</h3>
          <p>To keep growing, you need to challenge your muscles. Gradually increase the weight, reps, or volume over time.</p>
          <h3>3. Eat Enough Protein</h3>
          <p>Protein is the building block of muscle. Aim for 1.6 to 2.2 grams of protein per kilogram of body weight daily.</p>
          <h3>4. Don't Neglect Recovery</h3>
          <p>Muscles grow while you rest, not while you train. Ensure you get 7-9 hours of quality sleep each night.</p>
          <h3>5. Stay Hydrated</h3>
          <p>Dehydration can impair performance and recovery. Drink plenty of water throughout the day.</p>
          <p>Implement these tips into your routine, and you'll see significant improvements in your muscle-building journey!</p>
        `,
        author: "Marcus Chen",
        category: "Training",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
      },
      {
        title: "The Importance of Recovery",
        excerpt: "Why rest days are just as important as workout days for achieving your fitness goals.",
        content: `
          <p>Many people believe that more training equals better results, but recovery is where the magic happens. Without adequate rest, you risk overtraining and injury.</p>
          <h3>Why Recovery Matters</h3>
          <p>During exercise, you create microscopic tears in your muscle fibers. Rest allows these fibers to repair and grow stronger.</p>
          <h3>Active vs. Passive Recovery</h3>
          <p>Active recovery involves low-intensity activities like walking or yoga, which can improve blood flow and reduce soreness. Passive recovery means complete rest.</p>
          <h3>Sleep: The Ultimate Recovery Tool</h3>
          <p>Sleep is when your body releases growth hormone. Prioritize sleep hygiene to maximize your recovery potential.</p>
        `,
        author: "Jordan Lee",
        category: "Wellness",
        image: "https://images.unsplash.com/photo-1621750627159-cf77b0b91aac?q=80&w=1331&auto=format&fit=crop"
      },
      {
        title: "Nutrition Myths Debunked",
        excerpt: "Separating fact from fiction when it comes to diet, supplements, and healthy eating.",
        content: `
          <p>The fitness world is full of conflicting advice. Let's clear up some common nutrition myths.</p>
          <h3>Myth 1: Carbs Make You Fat</h3>
          <p>Carbohydrates are your body's primary fuel source. Excess calories, not carbs specifically, lead to weight gain.</p>
          <h3>Myth 2: You Need Supplements to Get Fit</h3>
          <p>While supplements can be helpful, whole foods should always be the foundation of your diet.</p>
          <h3>Myth 3: Eating Late at Night Causes Weight Gain</h3>
          <p>Weight management is primarily about total daily caloric intake vs. expenditure, regardless of when you eat.</p>
        `,
        author: "Jordan Lee",
        category: "Nutrition",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1470&auto=format&fit=crop"
      },
      {
        title: "HIIT vs. Steady State Cardio",
        excerpt: "Which cardio method is right for you? We break down the pros and cons of each approach.",
        content: `
          <p>Choosing the right cardio depends on your goals and preferences. Let's compare High-Intensity Interval Training (HIIT) and Steady State Cardio.</p>
          <h3>HIIT (High-Intensity Interval Training)</h3>
          <p>Involves short bursts of intense effort followed by rest. Great for burning calories in less time and improving athletic conditioning.</p>
          <h3>Steady State Cardio</h3>
          <p>Involves maintaining a consistent pace for a longer duration (e.g., jogging). Excellent for endurance and recovery.</p>
          <h3>The Verdict</h3>
          <p>Both methods are effective. Mix them up to prevent boredom and target different energy systems.</p>
        `,
        author: "Alex Rivera",
        category: "Training",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop"
      },
      {
        title: "Mindset for Success",
        excerpt: "How to stay motivated and disciplined on your fitness journey even when things get tough.",
        content: `
          <p>Physical strength starts with mental strength. Here is how to build a mindset for success.</p>
          <h3>Set Clear Goals</h3>
          <p>Define what you want to achieve and break it down into smaller, manageable steps.</p>
          <h3>Focus on Consistency</h3>
          <p>Motivation gets you started; habit keeps you going. Show up even when you don't feel like it.</p>
          <h3>Celebrate Small Wins</h3>
          <p>Acknowledge your progress, no matter how small. It builds momentum and confidence.</p>
        `,
        author: "Sarah Mitchell",
        category: "Motivation",
        image: "https://images.unsplash.com/photo-1674504502895-3ac04ab2943e?q=80&w=2070&auto=format&fit=crop"
      }
    ]);
    console.log('Blog Posts Seeded');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
