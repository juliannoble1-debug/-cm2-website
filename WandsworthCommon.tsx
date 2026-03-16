import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/wandsworth-common_f9e2d255.jpg";

const data: LandingPageData = {
  slug: "wandsworth-common",
  name: "Wandsworth Common",
  location: "Wandsworth Common, SW London — Zone 3",
  market: "London",
  investmentPositioning: "SW London's most accessible premium postcode — strong rental demand, consistent capital growth, and a deep professional tenant pool within 12 minutes of Victoria.",
  heroImage: HERO,
  galleryImages: [HERO],
  overview: "Wandsworth Common represents one of SW London's most compelling residential investment propositions: premium neighbourhood credentials at accessible price points. The area draws a consistent pool of professional tenants and owner-occupiers attracted by its green space, village character, and excellent connectivity. Wandsworth Common station provides direct access to Clapham Junction — one of London's busiest interchanges — and onward to Victoria in under 12 minutes. Historically tight supply and sustained demand have underpinned resilient capital values through successive market cycles, making this a reliable long-term hold for investors seeking SW London exposure.",
  forInvestors: "Consistent rental demand, low vacancy rates, and historically resilient capital values in one of SW London's most established residential addresses.",
  forEndUsers: "Village atmosphere, green space, and excellent schools — with fast access to central London and Clapham Junction.",
  ticketFrom: "GBP 400K",
  ticketTo: "GBP 900K",
  whyPoints: [
    "Premium SW London address with village character — consistently outperforms broader London averages on tenant quality and retention",
    "Wandsworth Common station: direct to Clapham Junction (2 min) and Victoria (12 min) — attracts deep professional tenant demand",
    "Entry pricing from the £400,000s delivers accessible Zone 3 exposure with Zone 2 lifestyle credentials",
    "Historically low vacancy rates across all unit types — strong rental income reliability for investors",
    "Tight new-build supply preserves scarcity value and supports above-market rental premiums",
  ],
  unitTypes: "1, 2 and 3 bedroom apartments and houses",
  startingPrice: "From GBP 400,000 (indicative, subject to confirmation)",
  handover: "Confirm with CM2 advisor",
  developer: "Various — CM2 curates best-in-class opportunities across the zone",
  seoTitle: "Wandsworth Common Investment Zone — SW London | CM2 Private Property Concierge",
  seoDescription: "Wandsworth Common, SW London — premium residential investment zone with strong rental demand and capital growth. Request a curated shortlist from CM2.",
  ogImage: HERO,
};

export default function WandsworthCommonPage() {
  return <ProjectLandingPage data={data} />;
}
