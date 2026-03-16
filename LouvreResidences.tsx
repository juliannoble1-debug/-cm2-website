import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-hero_9b9eafb5.jpg";
const INTERIOR = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-interior_6cf33e57.jpg";

const data: LandingPageData = {
  slug: "louvre-residences",
  name: "Louvre Abu Dhabi Residences",
  location: "Saadiyat Cultural District, Abu Dhabi",
  market: "Abu Dhabi",
  investmentPositioning: "Branded residences adjacent to the Louvre Abu Dhabi — one of the world's most recognisable cultural landmarks — offering prestige, scarcity, and international appeal.",
  heroImage: HERO,
  galleryImages: [HERO, INTERIOR, HERO, INTERIOR],
  overview: "Louvre Abu Dhabi Residences is a landmark branded residential development in the Saadiyat Cultural District, directly adjacent to the Louvre Abu Dhabi museum. Developed by Aldar, the project offers a rare combination of cultural prestige, architectural distinction, and premium positioning in Abu Dhabi's most internationally recognised address. The residences are designed for buyers who seek scarcity, brand association, and long-term capital preservation in a supply-constrained, globally recognised location.",
  forInvestors: "Branded residences adjacent to a world-class cultural institution — a globally understood prestige asset with strong international buyer demand and limited comparable supply.",
  forEndUsers: "Live within the Saadiyat Cultural District, steps from the Louvre Abu Dhabi — a once-in-a-generation lifestyle address for discerning international buyers.",
  ticketFrom: "USD 1.5M",
  ticketTo: "USD 6M+",
  whyPoints: [
    "Branded residences carry a proven premium — the Louvre name is one of the world's most recognised cultural brands",
    "Saadiyat Cultural District is home to the Louvre, Guggenheim, and Zayed National Museum — a globally unique cultural cluster",
    "Supply scarcity: branded residences adjacent to a world-class institution are inherently limited in number",
    "Strong international buyer demand from Europe, Asia, and the GCC — supports liquidity and resale value",
    "Aldar's track record on Saadiyat Island delivers consistent quality and post-handover confidence",
  ],
  unitTypes: "1, 2 and 3 bedroom apartments, select penthouses",
  startingPrice: "From USD 1.5M (indicative, subject to confirmation)",
  handover: "Confirm with CM2 advisor",
  developer: "Aldar Properties",
  seoTitle: "Louvre Abu Dhabi Residences — Saadiyat Island | CM2 Private Property Concierge",
  seoDescription: "Branded residences adjacent to the Louvre Abu Dhabi by Aldar. Request full project details from CM2, authorised partner. Saadiyat Cultural District.",
  ogImage: HERO,
};

export default function LouvreResidencesPage() {
  return <ProjectLandingPage data={data} />;
}
