import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: object;
}

const SEO = ({ title, description, keywords, image, url, type = 'website', schema }: SEOProps) => {
  const siteTitle = 'Dream Fitness Center';
  const fullTitle = `${title} | ${siteTitle}`;
  const defaultImage = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'; // Use a robust default
  const siteUrl = 'https://dreamfitness.com'; // Replace with actual domain
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;

  // Local Business Schema (Gym)
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "name": "Dream Fitness Center",
    "image": defaultImage,
    "@id": siteUrl,
    "url": siteUrl,
    "telephone": "+919556623441",
    "priceRange": "₹1500 - ₹9999",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "28, 3rd Street, Ramkrishnanagar, Ernavoor",
      "addressLocality": "Chennai",
      "addressRegion": "TN",
      "postalCode": "600057",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.1926, // Approximate for Ernavoor
      "longitude": 80.3060
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "05:00",
        "closes": "23:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday",
          "Sunday"
        ],
        "opens": "07:00",
        "closes": "21:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/dreamfitness",
      "https://www.instagram.com/dreamfitness"
    ]
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || 'gym, fitness, workout, chennai, ernavoor, wimco nagar, personal training, weight loss'} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;