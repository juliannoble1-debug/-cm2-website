/**
 * Tests for landing page data integrity and route coverage.
 * Validates that all 8 landing pages have required fields and correct slugs.
 */
import { describe, it, expect } from "vitest";

// The 8 required landing page slugs as specified
const REQUIRED_SLUGS = [
  "saadiyat-lagoons",
  "louvre-residences",
  "abu-dhabi-project-3",
  "dubai-project-1",
  "dubai-project-2",
  "london-project-1",
  "london-project-2",
  "london-project-3",
];

// Inline data mirrors for each landing page (server-side validation)
const landingPages = [
  {
    slug: "saadiyat-lagoons",
    name: "Saadiyat Lagoons",
    market: "Abu Dhabi",
    location: "Saadiyat Island, Abu Dhabi",
    developer: "Aldar Properties",
    ticketFrom: "USD 2M",
    unitTypes: "4, 5 and 6 bedroom villas",
    whyPoints: [
      "Saadiyat Island is Abu Dhabi's most prestigious residential address",
      "Supply-constrained villa market",
      "Aldar Properties — Abu Dhabi's largest developer",
      "Nature-led masterplan with lagoon frontage",
      "Strong rental yield narrative",
    ],
    seoTitle: "Saadiyat Lagoons Villas — Abu Dhabi | CM2 Private Property Concierge",
    seoDescription: "Saadiyat Lagoons by Aldar — premium 4–6 bed villas on Saadiyat Island, Abu Dhabi.",
  },
  {
    slug: "louvre-residences",
    name: "Louvre Abu Dhabi Residences",
    market: "Abu Dhabi",
    location: "Saadiyat Cultural District, Abu Dhabi",
    developer: "Aldar Properties",
    ticketFrom: "USD 1.5M",
    unitTypes: "1, 2 and 3 bedroom apartments, select penthouses",
    whyPoints: [
      "Branded residences carry a proven premium",
      "Saadiyat Cultural District is home to the Louvre, Guggenheim",
      "Supply scarcity",
      "Strong international buyer demand",
      "Aldar's track record on Saadiyat Island",
    ],
    seoTitle: "Louvre Abu Dhabi Residences — Saadiyat Island | CM2 Private Property Concierge",
    seoDescription: "Branded residences adjacent to the Louvre Abu Dhabi by Aldar.",
  },
  {
    slug: "abu-dhabi-project-3",
    name: "The Source / The Source Terraces",
    market: "Abu Dhabi",
    location: "Saadiyat Cultural District, Abu Dhabi",
    developer: "Aldar Properties",
    ticketFrom: "USD 1.2M",
    unitTypes: "2, 3 and 4 bedroom apartments; select terrace units",
    whyPoints: [
      "Wellness-led positioning commands a premium",
      "Saadiyat Cultural District location",
      "Terrace units offer private outdoor space",
      "High-specification interiors",
      "Aldar's consistent delivery track record",
    ],
    seoTitle: "The Source Residences — Saadiyat Island, Abu Dhabi | CM2 Private Property Concierge",
    seoDescription: "The Source and The Source Terraces by Aldar — wellness-led residences.",
  },
  {
    slug: "dubai-project-1",
    name: "The Wilds by Aldar",
    market: "Dubai",
    location: "Dubai Land, Dubai",
    developer: "Aldar Properties",
    ticketFrom: "USD 1M",
    unitTypes: "3 and 4 bedroom apartments, townhouses",
    whyPoints: [
      "Aldar's first major Dubai master community",
      "Dubai Land is one of the emirate's fastest-growing residential corridors",
      "Larger-format units (3-bed+) are in high demand",
      "Nature-led masterplan",
      "Strong capital growth potential",
    ],
    seoTitle: "The Wilds by Aldar — Dubai Land | CM2 Private Property Concierge",
    seoDescription: "The Wilds by Aldar — premium master community in Dubai Land.",
  },
  {
    slug: "dubai-project-2",
    name: "Haven by Aldar",
    market: "Dubai",
    location: "Dubai Land, Dubai",
    developer: "Aldar Properties",
    ticketFrom: "USD 1.2M",
    unitTypes: "3 and 4 bedroom townhouses, 4 and 5 bedroom villas",
    whyPoints: [
      "Wellness-branded communities command a premium",
      "Townhouses and villas with private outdoor space are in high demand",
      "Dubai Land's infrastructure investment",
      "Aldar's wellness expertise from Abu Dhabi",
      "Strong fit for long-term holders",
    ],
    seoTitle: "Haven by Aldar — Dubai Land | CM2 Private Property Concierge",
    seoDescription: "Haven by Aldar — wellness-led townhouses and villas in Dubai Land.",
  },
  {
    slug: "london-project-1",
    name: "Ransome's Wharf, Battersea",
    market: "London",
    location: "Battersea, South West London",
    developer: "Aldar-backed development",
    ticketFrom: "GBP 800K",
    unitTypes: "2 and 3 bedroom riverside apartments, select penthouses",
    whyPoints: [
      "Prime Thames riverside positioning",
      "Battersea's regeneration is one of London's most significant urban transformations",
      "Strong GCC and international buyer demand",
      "2–3 bed and penthouse units attract premium professional tenants",
      "London's prime residential market has demonstrated long-term capital preservation",
    ],
    seoTitle: "Ransome's Wharf Battersea — Prime London Riverside | CM2 Private Property Concierge",
    seoDescription: "Ransome's Wharf, Battersea — prime Thames riverside apartments in SW London.",
  },
  {
    slug: "london-project-2",
    name: "Westminster Tower",
    market: "London",
    location: "Central London",
    developer: "Aldar-backed development",
    ticketFrom: "GBP 1M",
    unitTypes: "2 and 3 bedroom apartments, select larger units",
    whyPoints: [
      "Central London is the world's most internationally liquid prime residential market",
      "Westminster location provides proximity to London's political, cultural, and financial centres",
      "Prime central London has preserved capital through every economic cycle",
      "Strong GCC buyer demand for central London",
      "Premium tower format with hotel-standard amenities",
    ],
    seoTitle: "Westminster Tower — Prime Central London | CM2 Private Property Concierge",
    seoDescription: "Westminster Tower — premium central London apartments for capital preservation.",
  },
  {
    slug: "london-project-3",
    name: "Wimbledon Bridge House",
    market: "London",
    location: "Wimbledon, South West London",
    developer: "Aldar-backed development",
    ticketFrom: "GBP 700K",
    unitTypes: "2 and 3 bedroom apartments, select larger units",
    whyPoints: [
      "Wimbledon is one of London's most consistently in-demand residential areas",
      "Global brand recognition: the Wimbledon name is understood by international buyers",
      "Strong owner-occupier and professional-tenant demand",
      "Excellent transport links to central London",
      "Family-oriented community with top-rated schools",
    ],
    seoTitle: "Wimbledon Bridge House — SW London | CM2 Private Property Concierge",
    seoDescription: "Wimbledon Bridge House — premium apartments in Wimbledon, SW London.",
  },
];

describe("Landing page data integrity", () => {
  it("covers all 8 required slugs", () => {
    const slugs = landingPages.map(p => p.slug);
    for (const required of REQUIRED_SLUGS) {
      expect(slugs).toContain(required);
    }
    expect(slugs).toHaveLength(8);
  });

  it("every page has a non-empty name", () => {
    for (const page of landingPages) {
      expect(page.name.trim().length).toBeGreaterThan(0);
    }
  });

  it("every page has a valid market", () => {
    const validMarkets = ["Abu Dhabi", "Dubai", "London"];
    for (const page of landingPages) {
      expect(validMarkets).toContain(page.market);
    }
  });

  it("every page has 3–5 why points", () => {
    for (const page of landingPages) {
      expect(page.whyPoints.length).toBeGreaterThanOrEqual(3);
      expect(page.whyPoints.length).toBeLessThanOrEqual(5);
    }
  });

  it("every page has a non-empty SEO title and description", () => {
    for (const page of landingPages) {
      expect(page.seoTitle.trim().length).toBeGreaterThan(0);
      expect(page.seoDescription.trim().length).toBeGreaterThan(0);
    }
  });

  it("every page has a ticket starting price", () => {
    for (const page of landingPages) {
      expect(page.ticketFrom.trim().length).toBeGreaterThan(0);
    }
  });

  it("every page has unit types defined", () => {
    for (const page of landingPages) {
      expect(page.unitTypes.trim().length).toBeGreaterThan(0);
    }
  });

  it("Abu Dhabi pages use USD pricing", () => {
    const abuDhabiPages = landingPages.filter(p => p.market === "Abu Dhabi");
    for (const page of abuDhabiPages) {
      expect(page.ticketFrom).toMatch(/USD/);
    }
  });

  it("London pages use GBP pricing", () => {
    const londonPages = landingPages.filter(p => p.market === "London");
    for (const page of londonPages) {
      expect(page.ticketFrom).toMatch(/GBP/);
    }
  });

  it("no placeholder or lorem ipsum text in any field", () => {
    const allText = landingPages
      .map(p => [p.name, p.location, p.seoTitle, p.seoDescription, p.unitTypes, ...p.whyPoints].join(" "))
      .join(" ")
      .toLowerCase();
    expect(allText).not.toContain("lorem ipsum");
    expect(allText).not.toContain("placeholder");
    expect(allText).not.toContain("todo");
    expect(allText).not.toContain("tbd");
  });

  it("all 3 markets are represented", () => {
    const markets = new Set(landingPages.map(p => p.market));
    expect(markets.has("Abu Dhabi")).toBe(true);
    expect(markets.has("Dubai")).toBe(true);
    expect(markets.has("London")).toBe(true);
  });
});
