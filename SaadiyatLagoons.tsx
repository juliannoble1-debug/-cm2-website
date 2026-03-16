import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-saadiyat_987293ed.jpg";
const INTERIOR = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-interior_6cf33e57.jpg";

const data: LandingPageData = {
  slug: "saadiyat-lagoons",
  name: "Saadiyat Lagoons",
  location: "Saadiyat Island, Abu Dhabi",
  market: "Abu Dhabi",
  investmentPositioning: "Expansive villas on Saadiyat Island — the UAE's most prestigious address for legacy ownership and long-term capital resilience.",
  heroImage: HERO,
  galleryImages: [HERO, INTERIOR, HERO, INTERIOR],
  overview: "Saadiyat Lagoons is an Aldar master-planned villa community on Saadiyat Island, Abu Dhabi — home to the Louvre, Guggenheim, and Zayed National Museum. The development offers 4–6 bedroom villas set within a nature-led, lagoon-facing environment designed for families who prioritise space, privacy, and long-term quality of life. With Saadiyat Island consistently ranking as Abu Dhabi's most sought-after residential address, Saadiyat Lagoons represents a rare opportunity to own in a supply-constrained, culturally anchored location.",
  forInvestors: "Capital preservation play in Abu Dhabi's most undersupplied premium villa segment, with strong long-term appreciation narrative.",
  forEndUsers: "Generational family living on Saadiyat Island — the UAE's cultural capital — with direct lagoon access and premium community amenities.",
  ticketFrom: "USD 2M",
  ticketTo: "USD 8M+",
  whyPoints: [
    "Saadiyat Island is Abu Dhabi's most prestigious residential address — home to the Louvre, Guggenheim, and NYU Abu Dhabi",
    "Supply-constrained villa market: limited new villa releases in this location support long-term capital appreciation",
    "Aldar Properties — Abu Dhabi's largest developer — delivers consistent build quality and post-handover support",
    "Nature-led masterplan with lagoon frontage, mangrove proximity, and curated community amenities",
    "Strong rental yield narrative: premium villas on Saadiyat command top-tier rents from senior executives and diplomats",
  ],
  unitTypes: "4, 5 and 6 bedroom villas",
  startingPrice: "From USD 2M (indicative, subject to confirmation)",
  handover: "Confirm with CM2 advisor",
  developer: "Aldar Properties",
  seoTitle: "Saadiyat Lagoons Villas — Abu Dhabi | CM2 Private Property Concierge",
  seoDescription: "Saadiyat Lagoons by Aldar — premium 4–6 bed villas on Saadiyat Island, Abu Dhabi. Request full project details from CM2, authorised partner.",
  ogImage: HERO,
};

export default function SaadiyatLagoonsPage() {
  return <ProjectLandingPage data={data} />;
}
