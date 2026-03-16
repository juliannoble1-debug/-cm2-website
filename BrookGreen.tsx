import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/brook-green_14ff9d2f.jpg";

const data: LandingPageData = {
  slug: "brook-green",
  name: "Brook Green",
  location: "Brook Green, Hammersmith, W6 — Zone 2",
  market: "London",
  investmentPositioning: "West London's most discreet premium address — boutique supply, persistent professional demand, and a Zone 2 location that consistently outperforms on both yield and capital growth.",
  heroImage: HERO,
  galleryImages: [HERO],
  overview: "Brook Green is one of West London's best-kept investment secrets: a boutique Zone 2 address that consistently outperforms broader West London averages on rental yield and capital growth, yet remains significantly more accessible than Notting Hill or Kensington. The area benefits from proximity to Hammersmith's major employment hub — home to media, technology, and professional services firms — which drives persistent, year-round demand from high-quality professional tenants. Extremely limited new-build supply preserves scarcity value and supports above-market rental premiums. Hammersmith station, within walking distance, provides access to four tube lines: Piccadilly, District, Circle, and Overground.",
  forInvestors: "Boutique Zone 2 scarcity, persistent professional tenant demand, and consistently above-average yields — a low-volatility, long-term hold proposition.",
  forEndUsers: "A quiet, leafy West London address with village character — Hammersmith, Shepherd's Bush, and Kensington all within reach.",
  ticketFrom: "GBP 400K",
  ticketTo: "GBP 1.2M",
  whyPoints: [
    "Boutique Zone 2 address — consistently outperforms broader West London averages on yield and capital growth",
    "Proximity to Hammersmith employment hub drives persistent demand from media, tech, and finance professionals",
    "Extremely limited new-build supply preserves scarcity value and supports above-market rental premiums",
    "Hammersmith station within walking distance: Piccadilly, District, Circle, and Overground lines",
    "Established owner-occupier base provides price floor stability — a low-volatility, long-term hold proposition",
  ],
  unitTypes: "1, 2 and 3 bedroom apartments",
  startingPrice: "From GBP 400,000 (indicative, subject to confirmation)",
  handover: "Confirm with CM2 advisor",
  developer: "Various — CM2 curates best-in-class opportunities across the zone",
  seoTitle: "Brook Green Investment Zone — West London | CM2 Private Property Concierge",
  seoDescription: "Brook Green, Hammersmith W6 — boutique Zone 2 investment zone with strong rental yields and capital resilience. Request a curated shortlist from CM2.",
  ogImage: HERO,
};

export default function BrookGreenPage() {
  return <ProjectLandingPage data={data} />;
}
