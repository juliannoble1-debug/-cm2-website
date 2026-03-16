/**
 * server/ssrMeta.ts
 *
 * Server-Side Meta Injection for CM2 React SPA
 *
 * Problem: Googlebot fetches raw HTML and sees an empty <div id="root"></div> shell.
 * All content is rendered by React after JavaScript executes — Googlebot flags this as Soft 404.
 *
 * Solution: Before serving index.html, inject page-specific <title>, <meta description>,
 * <link rel="canonical">, Open Graph tags, and a content-rich <noscript> block into the HTML.
 * This gives Googlebot real content to index without requiring full React SSR.
 *
 * Additionally: return HTTP 404 for unknown routes so Google doesn't flag them as Soft 404.
 *
 * Canonical URL rules enforced here:
 *  1. Every page has exactly ONE <link rel="canonical"> in the served HTML.
 *  2. All canonical URLs use HTTPS.
 *  3. All canonical URLs use www.thecm2.com (no mixed www/non-www).
 *  4. Each page's canonical is self-referencing (points to its own final URL).
 *  5. Legacy alias slugs (london-project-1/2/3) point their canonical to the
 *     current canonical slug so Google consolidates signals correctly.
 */

import { readFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://www.thecm2.com";
const DEFAULT_OG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-hero_9b9eafb5.jpg";

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  /** Structured text content injected into <noscript> for Googlebot */
  bodyContent?: string;
  /** HTTP status code — defaults to 200, use 404 for unknown routes */
  status?: number;
}

// ── Project data (loaded once at startup) ────────────────────────────────────
interface Project {
  slug: string;
  name: string;
  market: string;
  oneLiner: string;
  image: string;
  type?: string;
}

function loadProjects(): Project[] {
  try {
    const p = resolve(process.cwd(), "client/src/data/projects.json");
    return JSON.parse(readFileSync(p, "utf-8")) as Project[];
  } catch {
    return [];
  }
}

const PROJECTS: Project[] = loadProjects();

// ── Landing page SEO data ─────────────────────────────────────────────────────
// NOTE: Legacy alias slugs (london-project-1/2/3) are intentionally NOT listed here.
// They are handled separately in resolvePageMeta with a canonical pointing to the
// current canonical slug so Google consolidates link equity correctly.
const LANDING_META: Record<string, { title: string; description: string; ogImage?: string; content: string }> = {
  "ransomes-wharf-battersea": {
    title: "Ransome's Wharf Battersea — London Riverside | CM2",
    description: "Ransome's Wharf, Battersea — official Aldar / London Square riverside residences. Prime SW London waterfront from £600,000. Request details from CM2.",
    ogImage: "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/ransomes-wharf-hero_b5a8c2d1.jpg",
    content: "Ransome's Wharf, Battersea — Prime riverside residences on the south bank of the Thames, SW London. Developed by Aldar Properties and London Square. 1, 2 and 3 bedroom apartments with direct river views. Battersea riverside location, 12 minutes from Victoria by tube. Starting from £600,000. Contact CM2 for full details, floor plans, and investment analysis.",
  },
  "westminster-tower": {
    title: "Westminster Tower — Prime Central London | CM2",
    description: "Westminster Tower — premium central London apartments for capital preservation. Prime Zone 1 address. Request details from CM2.",
    ogImage: "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/westminster-tower-hero_a3b1c4e2.jpg",
    content: "Westminster Tower — Prime central London residential tower in Zone 1. Premium apartments with iconic London views. Positioned for capital preservation and long-term liquidity. Steps from the Thames, Westminster Bridge, and the Houses of Parliament. Contact CM2 for full details, floor plans, and investment analysis.",
  },
  "wimbledon-bridge-house": {
    title: "Wimbledon Bridge House — London Square | CM2",
    description: "Wimbledon Bridge House by London Square — 1 and 2 bedroom apartments in a landmark heritage conversion. 17 minutes to Waterloo. Request details from CM2.",
    ogImage: "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/wimbledon-bridge-house-hero_c2d4e6f8.jpg",
    content: "Wimbledon Bridge House — A landmark heritage conversion by London Square, directly opposite Wimbledon Station. 1 and 2 bedroom apartments in a Grade II listed building. 17 minutes to Waterloo, 25 minutes to the City. SW London's most prestigious address. Contact CM2 for full details, floor plans, and investment analysis.",
  },
  "dubai-project-1": {
    title: "The Wilds Residences Dubai — Aldar Community | CM2",
    description: "The Wilds Residences by Aldar — Dubai Land's nature-led master community. Apartments and townhouses from AED 1.8M. Request details from CM2.",
    content: "The Wilds Residences — Aldar's flagship Dubai master community in Dubai Land. Nature-first design with water features, green corridors, and biophilic landscaping. 1, 2, 3 and 4 bedroom apartments and townhouses from AED 1.8M. Contact CM2 for full details and investment analysis.",
  },
  "dubai-project-2": {
    title: "Verdes by Haven — Wellness Apartments Dubai | CM2",
    description: "Verdes by Haven by Aldar — wellness apartments within the Haven master community, Dubai Land. Biophilic design from AED 1.5M. Request details from CM2.",
    content: "Verdes by Haven — Wellness-led apartments within the Haven master community, Dubai Land. Developed by Aldar Properties. Biophilic architecture with green corridors and outdoor amenities. 1, 2 and 3 bedroom apartments from AED 1.5M. Contact CM2 for full details and investment analysis.",
  },
  "abu-dhabi-project-3": {
    title: "The Source Residences — Saadiyat Island | CM2",
    description: "The Source and The Source Terraces by Aldar — wellness-led residences in Saadiyat Cultural District, Abu Dhabi. Request full details from CM2.",
    content: "The Source Residences — Wellness-focused, high-specification residences in Saadiyat Cultural District, Abu Dhabi. Developed by Aldar Properties. 2, 3 and 4 bedroom apartments with select terrace units. From USD 1.2M. Contact CM2 for full details and investment analysis.",
  },
  "fahid-island": {
    title: "Fahid Island Abu Dhabi — Aldar Waterfront Masterplan | CM2",
    description: "Fahid Island — Aldar's flagship waterfront masterplan in Abu Dhabi. 11km of coastline between Yas and Saadiyat. Three developments. Enquire with CM2.",
    content: "Fahid Island — Aldar's most ambitious waterfront masterplan in Abu Dhabi. 11km of pristine coastline positioned between Yas Island and Saadiyat Island. Three residential developments: Fahid Beach Residences, The Beach House Fahid, and Fahid Beach Terraces. Contact CM2 for full details and investment analysis.",
  },
  "fahid-beach-residences": {
    title: "Fahid Beach Residences Abu Dhabi — Aldar | CM2",
    description: "Fahid Beach Residences — 1 to 4 bedroom apartments, townhouses and penthouses on Fahid Island, Abu Dhabi. Aldar Properties flagship waterfront masterplan. Enquire with CM2.",
    content: "Fahid Beach Residences — 1 to 4 bedroom apartments, townhouses and penthouses on Fahid Island, Abu Dhabi. Part of Aldar's flagship waterfront masterplan. Resort-quality amenities and 11km of coastline. Contact CM2 for full details and investment analysis.",
  },
  "beach-house-fahid": {
    title: "The Beach House Fahid — Freehold Abu Dhabi | CM2",
    description: "The Beach House Fahid — studios to 3 bedroom freehold apartments on Fahid Island, Abu Dhabi. Flexible 65/35 payment plan. Handover Q4 2029. Enquire with CM2.",
    content: "The Beach House Fahid — Studios to 3 bedroom freehold apartments on Fahid Island, Abu Dhabi. Flexible 65/35 payment plan. Wellness amenities and direct beach access. Handover Q4 2029. Contact CM2 for full details and investment analysis.",
  },
  "fahid-beach-terraces": {
    title: "Fahid Beach Terraces — Abu Dhabi Beachfront | CM2",
    description: "Fahid Beach Terraces — premium beachfront tower residences on Fahid Island, Abu Dhabi. 1 to 4 bedrooms, duplexes and penthouses by Aldar. Enquire with CM2.",
    content: "Fahid Beach Terraces — Premium beachfront tower residences on Fahid Island, Abu Dhabi. 1 to 4 bedrooms, duplexes and penthouses by Aldar Properties. Handover circa 2029. Contact CM2 for full details and investment analysis.",
  },
  "wandsworth-common": {
    title: "Wandsworth Common Investment Zone — SW London | CM2",
    description: "Wandsworth Common, SW London — premium residential investment zone with strong rental demand and capital growth. Request a curated shortlist from CM2.",
    content: "Wandsworth Common — SW London's most accessible premium postcode. Strong rental demand from professionals, consistent capital growth, and direct access to Clapham Junction and Victoria. Entry pricing from £400,000. Contact CM2 for a curated shortlist of current opportunities.",
  },
  "twickenham-square": {
    title: "Twickenham Square — London Square Apartments | CM2",
    description: "Twickenham Square by London Square — final 1 & 2 bedroom apartments from £475,000. 9 min to Twickenham Station, 20 min to Waterloo. Over 80% sold. Request details from CM2.",
    content: "Twickenham Square — Final 1 and 2 bedroom apartments from £475,000 and 3 bedroom townhouses from £1,405,000. 9-minute walk to Twickenham Station, Waterloo in 20 minutes. Communal landscaped gardens, private outdoor space, Net Zero houses. Over 80% sold. Developer: London Square (Aldar Properties). Contact CM2 for full details.",
  },
  "twickenham-green": {
    title: "Twickenham Green — Riverside Mews Houses | CM2",
    description: "Twickenham Green by London Square — 3 & 4 bedroom riverside mews houses from £1,165,000. Next to the River Crane, Twickenham. Q3/Q4 2026 completion. Request details from CM2.",
    content: "Twickenham Green — 3 and 4 bedroom mews houses from £1,165,000. Located next to the River Crane in Twickenham. Private gardens, car parking, and EV charging to all homes. 19-minute walk to Twickenham Station, Waterloo in 20 minutes. Near Lady Eleanor Holles and Hampton School. Developer: London Square (Aldar Properties). Contact CM2 for full details.",
  },
  "woolwich": {
    title: "Woolwich Investment Zone — SE London | CM2 Property Advisory",
    description: "Woolwich, SE London — Elizabeth line investment zone with high yields and regeneration upside. Request a curated shortlist from CM2.",
    content: "Woolwich — SE London's highest-conviction regeneration story. Elizabeth line access delivers 10-minute journeys to Bond Street. Strong rental yields of 5–7% and significant capital growth potential from ongoing regeneration. Entry pricing from £280,000. Contact CM2 for a curated shortlist.",
  },
  "croydon": {
    title: "Croydon Investment Zone — South London | CM2",
    description: "Croydon, South London — high-yield regeneration investment zone with 6–8% gross yields. Request a curated shortlist from CM2.",
    content: "Croydon — London's most ambitious regeneration corridor. Exceptional rental yields of 6–8%, fast connectivity to central London, and major infrastructure investment underway. Entry pricing from £220,000. Contact CM2 for a curated shortlist of current opportunities.",
  },
  "pearson-building-croydon": {
    title: "Pearson Building Croydon — London Square | CM2 Advisory",
    description: "Pearson Building, Croydon — final homes from £335,000, ready to move in. East Croydon to London Bridge in 14 min. Over 80% sold. Request details from CM2.",
    content: "Pearson Building, Croydon — final homes from £335,000. Ready to move in. Over 80% sold. East Croydon to London Bridge in 14 minutes. Developer: London Square (Aldar Properties).",
  },
  "fifty-brook-green": {
    title: "Fifty Brook Green — Luxury West London | CM2 Property Advisory",
    description: "Fifty Brook Green by London Square — gated luxury residences in Hammersmith, West London. From £1,430,000. Architect: Darling Associates. Request details from CM2.",
    content: "Fifty Brook Green — gated luxury residences in Brook Green, Hammersmith. From £1,430,000. Architect: Darling Associates. Developer: London Square (Aldar Properties).",
  },
  "county-hall-kingston": {
    title: "County Hall Kingston — Heritage Residences | CM2 Advisory",
    description: "County Hall Kingston by London Square — Grade II* listed Surrey County Hall transformed into luxury riverside residences. From £480,000. Under 20 min to Waterloo. Request details from CM2.",
    content: "County Hall Kingston — Grade II* listed Surrey County Hall, Kingston upon Thames. From £480,000. Developer: London Square (Aldar Properties).",
  },
};

// ── Legacy alias → canonical slug mapping ────────────────────────────────────
// These old slugs still serve the same content but their canonical must point
// to the current canonical slug so Google consolidates link equity correctly.
const LEGACY_ALIAS_CANONICAL: Record<string, string> = {
  "london-project-1": "ransomes-wharf-battersea",
  "london-project-2": "westminster-tower",
  "london-project-3": "wimbledon-bridge-house",
};

// ── Blog post meta ────────────────────────────────────────────────────────────
const BLOG_META: Record<string, { title: string; description: string }> = {
  "london-property-investment-guide-overseas-investors": {
    title: "London Property Investment Guide for Overseas Investors | CM2",
    description: "Everything GCC, Asian, and international investors need to know before buying in London. Legal framework, financing, and market analysis.",
  },
  "battersea-property-investment-2026": {
    title: "Battersea Property Investment — SW London Regeneration | CM2",
    description: "The investment case for Battersea — London's most significant riverside regeneration story and what it means for international investors.",
  },
  "aldar-london-investment-why-abu-dhabi-developer": {
    title: "Why Aldar's London Expansion Matters for Investors | CM2",
    description: "Abu Dhabi's largest developer is reshaping the London new-build market — what it means for buyers and investors.",
  },
  "prime-london-property-market-outlook-2026": {
    title: "Prime London Property Market Outlook 2026 | CM2",
    description: "What international investors need to know about the key drivers, risks, and opportunities in the prime London property market in 2026.",
  },
  "buying-london-property-from-abroad-step-by-step": {
    title: "Buying London Property from Abroad: Step-by-Step | CM2",
    description: "How international investors navigate the UK purchase process from offer to completion. Legal, financial, and practical guidance.",
  },
  "abu-dhabi-investors-buying-london-property": {
    title: "Why Abu Dhabi Investors Buy London Property | CM2",
    description: "The structural, financial, and strategic reasons GCC capital continues to flow into the London residential market.",
  },
  "dubai-investors-buying-london-property": {
    title: "Why Dubai Investors Diversify into London Property | CM2",
    description: "How GCC capital from Dubai is finding a natural home in prime London residential — strategy, returns, and market access.",
  },
  "singapore-hong-kong-investors-london-property": {
    title: "Why Asia-Pacific Investors Choose London Property | CM2",
    description: "How Asia-Pacific capital continues to find its natural home in prime London residential — the investment case for GBP-denominated assets.",
  },
  "european-investors-london-property": {
    title: "Why European Investors Choose London Property | CM2",
    description: "How French, German, and Italian capital continues to flow into the London residential market — legal framework, returns, and market access.",
  },
};

// ── Static page meta ──────────────────────────────────────────────────────────
// All canonical URLs use the same format: https://www.thecm2.com/path (no trailing slash)
// Exception: homepage uses https://www.thecm2.com/ (trailing slash for root)
const STATIC_META: Record<string, PageMeta> = {
  "/": {
    title: "CM2 | Prime London Property Advisory — UK, UAE & Egypt",
    description: "CM2 is a private property investment advisory providing curated access to prime residential opportunities across the UK, UAE, and Egypt. London-first. Aldar-backed. By appointment only.",
    canonical: `${BASE_URL}/`,
    bodyContent: "CM2 — Square Centimeter. Prime London property advisory, extended into UAE and Egypt. Curated Aldar and Aldar-backed developments across London, UAE, and Egypt. Institutional-grade advisory. By appointment only. Explore projects in London, Abu Dhabi, Dubai, and Egypt. Request a curated shortlist. Download the London Investment Brief.",
  },
  "/projects": {
    title: "Property Investment Projects — London, UAE & Egypt | CM2",
    description: "Browse curated property investment projects across London, Dubai, Abu Dhabi, and Egypt. Exclusively through Aldar Properties and London Square.",
    canonical: `${BASE_URL}/projects`,
    bodyContent: "CM2 curated property investment projects. London: Ransome's Wharf Battersea, Westminster Tower, Wimbledon Bridge House, Wandsworth Common, Twickenham Square, Twickenham Green, Fifty Brook Green, Woolwich, Pearson Building Croydon, County Hall Kingston. Abu Dhabi: The Source, Fahid Island, Fahid Beach Residences, The Beach House Fahid, Fahid Beach Terraces. Dubai: The Wilds Residences, Verdes by Haven. Egypt (Aldar-backed): EASTVALE, Karmell, SODIC East.",
  },
  "/how-it-works": {
    title: "How CM2 Works | Private Property Investment Advisory",
    description: "CM2's three-step advisory process: curated shortlist, institutional-grade analysis, and end-to-end transaction support. By appointment only.",
    canonical: `${BASE_URL}/how-it-works`,
    bodyContent: "How CM2 works. Step 1: Tell us your investment objectives. Step 2: Receive a curated shortlist of opportunities. Step 3: CM2 guides you through due diligence, legal, and transaction. Private advisory for international investors. No pressure. No noise.",
  },
  "/trust": {
    title: "Trust & Transparency | CM2 Property Advisory",
    description: "CM2's compliance framework, authorised partner status, and investor protection standards. Authorised sales partner for Aldar Properties and London Square.",
    canonical: `${BASE_URL}/trust`,
    bodyContent: "CM2 Trust and Compliance. Authorised sales partner for Aldar Properties and London Square. Transparent advisory. No hidden fees. Investor protection standards. Registered in England and Wales.",
  },
  "/contact": {
    title: "Contact CM2 — Private Property Investment Enquiries",
    description: "Contact CM2 for private property investment enquiries. WhatsApp, email, or enquiry form. By appointment only. invest@thecm2.com.",
    canonical: `${BASE_URL}/contact`,
    bodyContent: "Contact CM2. Email: invest@thecm2.com. WhatsApp: +44 7424 447658. Registered office: 5 Brayford Square, London E1 0SG. By appointment only. Private property investment enquiries for London, UAE, and Egypt.",
  },
  "/privacy": {
    title: "Privacy Policy | CM2 — Square Centimeter",
    description: "CM2 privacy policy — how we collect, use, and protect your personal data in accordance with UK GDPR.",
    canonical: `${BASE_URL}/privacy`,
  },
  "/blog": {
    title: "London Property Investment Intelligence | CM2 Insights",
    description: "Expert analysis and guides for international investors buying London property. Covering GCC, Asia-Pacific, and European buyer perspectives.",
    canonical: `${BASE_URL}/blog`,
    bodyContent: "CM2 London Property Intelligence. Expert articles for international investors: London property investment guides, market outlooks, area analyses, and buyer guides for GCC, Asia-Pacific, and European investors.",
  },
  "/current-opportunities": {
    title: "Current Investment Opportunities — London, UAE & Egypt | CM2",
    description: "Browse current property investment opportunities across London, UAE, and Egypt. Curated by CM2. Request details and a personalised shortlist.",
    canonical: `${BASE_URL}/current-opportunities`,
    bodyContent: "CM2 current investment opportunities. London: Ransome's Wharf Battersea, Westminster Tower, Wimbledon Bridge House, Wandsworth Common, Twickenham, Brook Green, Woolwich, Croydon. Abu Dhabi: The Source, Fahid Island, Fahid Beach Residences, The Beach House Fahid, Fahid Beach Terraces. Dubai: The Wilds Residences, Verdes by Haven. Egypt (Aldar-backed): EASTVALE, Karmell, SODIC East.",
  },
  "/london-investment": {
    title: "London Property Investment for International Investors | CM2",
    description: "London property investment guide for international investors. Why London, how to buy, and which developments CM2 recommends. Request the London Investment Brief.",
    canonical: `${BASE_URL}/london-investment`,
    bodyContent: "London property investment for international investors. Why London remains the world's most liquid prime residential market. How to buy London property from abroad. CM2 curates the best Aldar and London Square developments for international capital. Request the London Investment Brief.",
  },
  "/overseas-investors": {
    title: "Overseas Property Investors — London, UAE & Egypt | CM2",
    description: "CM2 specialises in serving overseas investors buying property in London, UAE, and Egypt. Institutional-grade advisory. No pressure. Request a shortlist.",
    canonical: `${BASE_URL}/overseas-investors`,
    bodyContent: "CM2 serves overseas investors from the GCC, Asia-Pacific, and Europe buying property in London, UAE, and Egypt. Institutional-grade advisory. Transparent process. No hidden fees. Request a curated shortlist.",
  },
  "/prime-london-property": {
    title: "Prime London Property Investment — CM2 Prime Advisory",
    description: "Prime London property investment advisory for international buyers. Zone 1 and Zone 2 residential. Capital preservation and rental yield. Request details from CM2.",
    canonical: `${BASE_URL}/prime-london-property`,
    bodyContent: "Prime London property investment. Zone 1 and Zone 2 residential opportunities for international investors. Capital preservation, rental yield, and long-term liquidity. CM2 curates the best prime London developments. Request a shortlist.",
  },
  "/london-investment-brief": {
    title: "London Investment Brief — CM2 Prime Property Advisory",
    description: "Download the CM2 London Investment Brief — institutional-grade analysis of the London property market for international investors. Free. No spam.",
    canonical: `${BASE_URL}/london-investment-brief`,
    bodyContent: "The CM2 London Investment Brief. Institutional-grade analysis of the London residential property market. Market outlook, area guides, developer analysis, and investment framework. Free download for qualified investors.",
  },
};

// ── Known valid routes (for 404 detection) ───────────────────────────────────
const VALID_STATIC_PATHS = new Set(Object.keys(STATIC_META));

const VALID_PROJECT_SLUGS = new Set([
  // Current canonical landing page slugs
  "ransomes-wharf-battersea", "westminster-tower", "wimbledon-bridge-house",
  "dubai-project-1", "dubai-project-2", "abu-dhabi-project-3",
  "fahid-island", "fahid-beach-residences", "beach-house-fahid", "fahid-beach-terraces",
  "wandsworth-common", "twickenham", "brook-green", "woolwich", "croydon",
  "pearson-building-croydon", "fifty-brook-green", "county-hall-kingston",
  // Legacy aliases (still valid routes — served with canonical pointing to new slug)
  "london-project-1", "london-project-2", "london-project-3",
  // ProjectDetail slugs (from projects.json)
  ...PROJECTS.map((p) => p.slug),
]);

const VALID_BLOG_SLUGS = new Set(Object.keys(BLOG_META));

// ── Main meta resolver ────────────────────────────────────────────────────────
export function resolvePageMeta(pathname: string): PageMeta {
  // Normalize path: strip query string and trailing slash, but keep "/" for homepage
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";

  // Static pages
  if (VALID_STATIC_PATHS.has(path)) {
    return { ...STATIC_META[path], status: 200 };
  }

  // Project pages: /projects/:slug
  const projectMatch = path.match(/^\/projects\/(.+)$/);
  if (projectMatch) {
    const slug = projectMatch[1];

    if (!VALID_PROJECT_SLUGS.has(slug)) {
      return {
        title: "Page Not Found | CM2",
        description: "This page could not be found. Browse all CM2 investment opportunities.",
        canonical: `${BASE_URL}/projects`,
        status: 404,
      };
    }

    // Legacy alias slugs — serve the same content but canonical points to the
    // current canonical slug so Google consolidates link equity correctly.
    if (LEGACY_ALIAS_CANONICAL[slug]) {
      const canonicalSlug = LEGACY_ALIAS_CANONICAL[slug];
      const lm = LANDING_META[canonicalSlug];
      return {
        title: lm.title,
        description: lm.description,
        // Canonical points to the CURRENT canonical slug, not the legacy alias
        canonical: `${BASE_URL}/projects/${canonicalSlug}`,
        ogImage: lm.ogImage,
        bodyContent: lm.content,
        status: 200,
      };
    }

    // Current canonical landing page meta
    if (LANDING_META[slug]) {
      const lm = LANDING_META[slug];
      return {
        title: lm.title,
        description: lm.description,
        canonical: `${BASE_URL}/projects/${slug}`,
        ogImage: lm.ogImage,
        bodyContent: lm.content,
        status: 200,
      };
    }

    // ProjectDetail meta (from projects.json)
    const project = PROJECTS.find((p) => p.slug === slug);
    if (project) {
      return {
        title: `${project.name} | ${project.market} Property Investment — CM2`,
        description: `${project.oneLiner} Discover ${project.name} with CM2 — prime property investment advisory.`,
        canonical: `${BASE_URL}/projects/${slug}`,
        ogImage: project.image,
        bodyContent: `${project.name} — ${project.market} property investment. ${project.oneLiner} Contact CM2 for full details, floor plans, and investment analysis.`,
        status: 200,
      };
    }
  }

  // Blog posts: /blog/:slug
  const blogMatch = path.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    if (!VALID_BLOG_SLUGS.has(slug)) {
      return {
        title: "Article Not Found | CM2 Insights",
        description: "This article could not be found. Browse all CM2 London Property Intelligence articles.",
        canonical: `${BASE_URL}/blog`,
        status: 404,
      };
    }
    const bm = BLOG_META[slug];
    return {
      title: bm.title,
      description: bm.description,
      canonical: `${BASE_URL}/blog/${slug}`,
      status: 200,
    };
  }

  // Unknown route — return 404
  return {
    title: "Page Not Found | CM2",
    description: "This page could not be found. Browse all CM2 investment opportunities.",
    canonical: `${BASE_URL}/`,
    status: 404,
  };
}

// ── HTML meta injector ────────────────────────────────────────────────────────
export function injectMetaIntoHtml(html: string, meta: PageMeta): string {
  const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;
  const canonical = meta.canonical || `${BASE_URL}/`;

  // Replace <title>
  let result = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  // Replace meta description
  result = result.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(meta.description)}"`
  );

  // Replace canonical — this is the ONLY canonical tag in the document.
  // The regex uses a global flag equivalent via replaceAll to ensure no
  // duplicate canonical tags survive even if the template has more than one.
  result = result.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/g,
    `<link rel="canonical" href="${canonical}" />`
  );

  // Replace OG title
  result = result.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeHtml(meta.title)}"`
  );

  // Replace OG description
  result = result.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(meta.description)}"`
  );

  // Replace OG URL — keep in sync with canonical
  result = result.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonical}"`
  );

  // Replace OG image
  result = result.replace(
    /<meta property="og:image" content="[^"]*"/,
    `<meta property="og:image" content="${ogImage}"`
  );

  // Replace Twitter title
  result = result.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}"`
  );

  // Replace Twitter description
  result = result.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}"`
  );

  // Inject noscript content block for Googlebot (after <div id="root">)
  if (meta.bodyContent) {
    const noscriptBlock = `<noscript><div style="font-family:sans-serif;max-width:800px;margin:0 auto;padding:2rem"><h1>${escapeHtml(meta.title)}</h1><p>${escapeHtml(meta.description)}</p><p>${escapeHtml(meta.bodyContent)}</p><p>Please enable JavaScript to view the full CM2 website. <a href="${BASE_URL}/contact">Contact CM2</a> for investment enquiries.</p></div></noscript>`;
    result = result.replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n    ${noscriptBlock}`
    );
  }

  return result;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
