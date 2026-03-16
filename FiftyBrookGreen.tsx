import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/woolwich_0b6d4425.jpg";

const data: LandingPageData = {
  slug: "fifty-brook-green",
  name: "Fifty Brook Green",
  location: "Brook Green, Hammersmith, West London",
  market: "London",
  investmentPositioning: "A private gated collection of luxury West London residences — soaring beamed ceilings, wellness suite, courtyard gardens. From £1,430,000.",
  heroImage: HERO,
  galleryImages: [HERO],
  overview: "Fifty Brook Green is a private gated enclave of timeless luxury residences in Brook Green, Hammersmith, West London — developed by London Square (an Aldar Properties company) and designed by award-winning architect Darling Associates. The collection comprises 1 to 4 bedroom apartments, duplexes, triplexes, and mews houses — all featuring soaring beamed ceilings, full-height windows, and private outdoor space. Residents benefit from a wellness suite and beautifully landscaped courtyard gardens. Brook Green is moments from Michelin-starred dining, Sloane Square shopping, Holland Park, and the River Thames. Completion is phased from Q4 2026 to Q2 2027.",
  forInvestors: "Gated luxury in one of West London's most private and sought-after addresses. Architect: Darling Associates. Rare combination of heritage character and contemporary specification. From £1,430,000 — limited availability.",
  forEndUsers: "Soaring beamed ceilings, full-height windows, wellness suite, courtyard gardens. Moments from Michelin-starred dining, Holland Park, and the River Thames. A rare address in West London.",
  ticketFrom: "GBP 1.43M",
  ticketTo: "GBP 4M+",
  whyPoints: [
    "Gated enclave — soaring beamed ceilings, full-height windows, wellness suite, courtyard gardens",
    "Moments from Michelin-starred dining, Sloane Square shopping, Holland Park, River Thames",
    "Architect: Darling Associates — award-winning wellbeing-led design",
    "1–4 bed apartments, duplexes, triplexes and mews houses — rare variety in West London",
    "Brook Green is one of London's most private and sought-after residential addresses",
    "Phased completion Q4 2026 – Q2 2027 — early buyers secure best selection",
    "Developer: London Square, backed by Aldar Properties",
  ],
  unitTypes: "1–4 bedroom apartments, duplexes, triplexes and mews houses",
  startingPrice: "From £1,430,000",
  handover: "Q4 2026 – Q2 2027 (phased)",
  developer: "London Square (Aldar Properties)",
  seoTitle: "Fifty Brook Green — Luxury West London | CM2 Property Advisory",
  seoDescription: "Fifty Brook Green by London Square — gated luxury residences in Hammersmith, West London. From £1,430,000. Architect: Darling Associates. Request details from CM2.",
  ogImage: HERO,
};

export default function FiftyBrookGreenPage() {
  return <ProjectLandingPage data={data} />;
}
