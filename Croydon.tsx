import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/croydon_9f433363.jpg";

const data: LandingPageData = {
  slug: "croydon",
  name: "Croydon",
  location: "Croydon, South London — Zone 5",
  market: "London",
  investmentPositioning: "London's most ambitious regeneration corridor — exceptional gross yields of 6–8%, fast rail to London Bridge and Victoria, and a £5.25bn approved masterplan delivering early-mover capital growth.",
  heroImage: HERO,
  galleryImages: [HERO],
  overview: "Croydon is undergoing London's largest approved regeneration programme — a £5.25bn committed investment that is reshaping the entire town centre, residential offer, and public realm. The area already benefits from outstanding rail connectivity: London Bridge in 15 minutes and Victoria in 17 minutes, supporting a broad and deep tenant pool of central London professionals. Entry pricing from the low £200,000s delivers gross yields of 6–8% in the current rental market — among the highest available within Greater London. Significant undersupply of quality rental stock relative to demand creates a persistent yield premium for well-specified product, and investors entering now stand to benefit from the full arc of regeneration-driven capital appreciation over the coming decade.",
  forInvestors: "Gross yields of 6–8%, fast rail to central London, and a £5.25bn regeneration programme — the most accessible high-conviction growth story in Greater London.",
  forEndUsers: "Modern South London living with fast direct rail to London Bridge and Victoria — at entry prices that make ownership genuinely accessible.",
  ticketFrom: "GBP 200K",
  ticketTo: "GBP 500K",
  whyPoints: [
    "London's largest approved regeneration programme — £5.25bn committed investment reshaping the entire town centre",
    "Exceptional affordability: entry pricing from the low £200,000s delivers gross yields of 6–8% in the current rental market",
    "Fast rail connectivity — London Bridge in 15 minutes and Victoria in 17 minutes supports a broad, deep tenant pool",
    "Significant undersupply of quality rental stock creates a persistent yield premium for well-specified product",
    "Early-mover positioning: investors entering now stand to benefit from the full arc of regeneration-driven capital appreciation",
  ],
  unitTypes: "Studios, 1, 2 and 3 bedroom apartments",
  startingPrice: "From GBP 200,000 (indicative, subject to confirmation)",
  handover: "Confirm with CM2 advisor",
  developer: "Various — CM2 curates best-in-class opportunities across the zone",
  seoTitle: "Croydon Investment Zone — South London | CM2 Private Property Concierge",
  seoDescription: "Croydon, South London — high-yield regeneration investment zone with 6–8% gross yields. Fast rail to London Bridge and Victoria. Request a shortlist from CM2.",
  ogImage: HERO,
};

export default function CroydonPage() {
  return <ProjectLandingPage data={data} />;
}
