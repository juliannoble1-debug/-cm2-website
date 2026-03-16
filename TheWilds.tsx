import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";

// Official Aldar campaign key visual — sourced from Aldar SharePoint March 2026
const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/the-wilds-key-visual-nature_f1e15011.webp";
const SECONDARY = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-dubai_57c52ffe.jpg";

const data: LandingPageData = {
  slug: "dubai-project-1",
  name: "The Wilds Residences",
  location: "Dubai Land, Dubai",
  market: "Dubai",
  investmentPositioning: "Aldar's first major Dubai master community — nature-led design, larger family layouts, and long-term positioning in a growing Dubai corridor.",
  heroImage: HERO,
  galleryImages: [HERO, SECONDARY],
  overview: "The Wilds Residences is Aldar's flagship Dubai master community, located in Dubai Land. The development is built around a nature-first design philosophy — water features, stepping stones, open green corridors, and biophilic landscaping throughout. The Wilds offers apartments and townhouses with larger-than-average layouts, positioned for family buyers and long-term holders seeking quality community living in Dubai. As Aldar's first major Dubai master community, it carries significant brand credibility and long-term development commitment.",
  forInvestors: "Aldar's entry into Dubai's master community segment — backed by Abu Dhabi's largest developer — with strong capital growth potential in a high-demand growth corridor.",
  forEndUsers: "Spacious family living in a nature-led master community, with the quality and community standards that Aldar is known for in Abu Dhabi, now in Dubai.",
  ticketFrom: "AED 1.8M",
  ticketTo: "AED 5M+",
  whyPoints: [
    "Aldar's first major Dubai master community — significant developer commitment and brand credibility",
    "Nature-first design: water features, stepping stones, green corridors — a genuinely differentiated product",
    "Larger unit layouts aligned with family demand and USD 1M+ investment tickets",
    "Dubai Land growth corridor with improving infrastructure and connectivity",
    "Long-term capital appreciation potential as the community matures and surrounding infrastructure develops",
  ],
  unitTypes: "1, 2, 3 and 4 bedroom apartments and townhouses",
  startingPrice: "From AED 1.8M (indicative — confirm with CM2 advisor)",
  handover: "Confirm with CM2 advisor",
  developer: "Aldar Properties",
  seoTitle: "The Wilds Residences Dubai — Aldar Master Community | CM2 Private Property Concierge",
  seoDescription: "The Wilds Residences by Aldar — Dubai Land's nature-led master community. Apartments and townhouses from AED 1.8M. Request details from CM2.",
  ogImage: HERO,
};

export default function TheWildsPage() {
  return <ProjectLandingPage data={data} />;
}
