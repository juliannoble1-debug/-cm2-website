import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/twickenham_1d9155eb.jpg";

const data: LandingPageData = {
  slug: "twickenham",
  name: "Twickenham",
  location: "Twickenham, SW London — Zone 5",
  market: "London",
  investmentPositioning: "Riverside SW London with exceptional price-to-quality ratio — direct Waterloo access in under 30 minutes, strong rental yields, and accelerating capital growth driven by town centre regeneration.",
  heroImage: HERO,
  galleryImages: [HERO],
  overview: "Twickenham offers one of London's most compelling investment fundamentals: premium riverside SW London credentials at a fraction of the cost of equivalent Zone 2–3 addresses. The area sits within the London Borough of Richmond upon Thames — one of the capital's most desirable boroughs — and benefits from direct National Rail services to London Waterloo in under 30 minutes. This connectivity attracts a deep, consistent pool of professional tenants who cannot afford Zone 2–3 pricing but demand Zone 2–3 lifestyle standards. An ongoing town centre regeneration programme is accelerating capital growth momentum, with new public realm, retail, and residential investment reshaping the area's long-term trajectory.",
  forInvestors: "High rental yields, strong tenant demand, and accelerating capital growth driven by regeneration — at entry prices significantly below comparable SW London addresses.",
  forEndUsers: "Riverside living in Richmond Borough — parks, river, independent restaurants, and a fast commute to Waterloo.",
  ticketFrom: "GBP 300K",
  ticketTo: "GBP 700K",
  whyPoints: [
    "Exceptional price-to-quality ratio — riverside SW London character at significantly lower entry cost than Zone 2–3 equivalents",
    "Direct National Rail to London Waterloo in under 30 minutes — attracts a deep, consistent professional tenant pool",
    "Richmond Borough location delivers premium lifestyle credentials: river, parks, and independent retail",
    "Ongoing town centre regeneration is accelerating capital growth momentum across the area",
    "Strong long-term hold case: constrained supply, growing demand, and improving transport links",
  ],
  unitTypes: "1, 2 and 3 bedroom apartments",
  startingPrice: "From GBP 300,000 (indicative, subject to confirmation)",
  handover: "Confirm with CM2 advisor",
  developer: "Various — CM2 curates best-in-class opportunities across the zone",
  seoTitle: "Twickenham Investment Zone — SW London | CM2 Private Property Concierge",
  seoDescription: "Twickenham, SW London — riverside investment zone with strong rental yields and capital growth. Direct Waterloo access. Request a curated shortlist from CM2.",
  ogImage: HERO,
};

export default function TwickenhamPage() {
  return <ProjectLandingPage data={data} />;
}
