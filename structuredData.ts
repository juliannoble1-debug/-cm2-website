/**
 * Structured Data Utilities
 * Injects JSON-LD schema markup for Organisation, RealEstateAgent, and Property pages.
 * Improves Google rich results and Knowledge Panel eligibility.
 */

export function injectJsonLd(schema: object, id = "json-ld-default"): () => void {
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);

  return () => {
    document.getElementById(id)?.remove();
  };
}

// ── Organisation + RealEstateAgent (site-wide) ────────────────────────────────

export const organisationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "RealEstateAgent"],
  "@id": "https://www.thecm2.com/#organisation",
  "name": "CM2 — Square Centimeter",
  "alternateName": "Square Centimeter",
  "url": "https://www.thecm2.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.thecm2.com/logo.png",
    "width": 200,
    "height": 60
  },
  "description": "CM2 is a prime property investment advisory specialising in curated off-plan and prime residential opportunities across London, UAE, and Egypt for international investors.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "5 Brayford Square",
    "addressLocality": "London",
    "postalCode": "E1 0SG",
    "addressCountry": "GB"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "investor enquiries",
      "email": "invest@thecm2.com",
      "availableLanguage": ["English", "Arabic"]
    }
  ],
  "areaServed": [
    { "@type": "City", "name": "London" },
    { "@type": "City", "name": "Abu Dhabi" },
    { "@type": "City", "name": "Dubai" },
    { "@type": "Country", "name": "Egypt" }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/thecm2",
    "https://www.instagram.com/thecm2"
  ]
};

// ── Website schema ─────────────────────────────────────────────────────────────

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.thecm2.com/#website",
  "url": "https://www.thecm2.com",
  "name": "CM2 — Square Centimeter | Prime Property Investment Advisory",
  "description": "Curated off-plan and prime residential property investment opportunities across London, UAE, and Egypt for international investors.",
  "publisher": {
    "@id": "https://www.thecm2.com/#organisation"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.thecm2.com/projects?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// ── Property schema factory ────────────────────────────────────────────────────

interface PropertySchemaOptions {
  name: string;
  description: string;
  url: string;
  image: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  priceRange?: string;
  numberOfRooms?: string;
  floorSize?: string;
}

export function buildPropertySchema(opts: PropertySchemaOptions): object {
  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    "name": opts.name,
    "description": opts.description,
    "url": opts.url,
    "image": opts.image,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": opts.addressLocality,
      "addressRegion": opts.addressRegion,
      "addressCountry": opts.addressCountry
    },
    ...(opts.priceRange && { "priceRange": opts.priceRange }),
    ...(opts.numberOfRooms && { "numberOfRooms": opts.numberOfRooms }),
    ...(opts.floorSize && {
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": opts.floorSize,
        "unitCode": "FTK"
      }
    }),
    "broker": {
      "@id": "https://www.thecm2.com/#organisation"
    }
  };
}

// ── Blog article schema factory ────────────────────────────────────────────────

interface ArticleSchemaOptions {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}

export function buildArticleSchema(opts: ArticleSchemaOptions): object {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": opts.title,
    "description": opts.description,
    "url": opts.url,
    "datePublished": opts.datePublished,
    "dateModified": opts.dateModified || opts.datePublished,
    "author": {
      "@type": "Organization",
      "name": opts.authorName || "CM2 — Square Centimeter",
      "@id": "https://www.thecm2.com/#organisation"
    },
    "publisher": {
      "@id": "https://www.thecm2.com/#organisation"
    },
    "isPartOf": {
      "@type": "Blog",
      "name": "London Property Intelligence",
      "url": "https://www.thecm2.com/blog"
    }
  };
}
