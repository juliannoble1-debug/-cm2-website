import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-interior_6cf33e57.jpg";
const SAADIYAT = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-saadiyat_987293ed.jpg";

const data: LandingPageData = {
  slug: "abu-dhabi-project-3",
  name: "The Source / The Source Terraces",
  location: "Saadiyat Cultural District, Abu Dhabi",
  market: "Abu Dhabi",
  investmentPositioning: "Wellness-focused, high-specification residences in Saadiyat — for buyers who value lifestyle differentiation and long-term quality.",
  heroImage: HERO,
  galleryImages: [HERO, SAADIYAT, HERO, SAADIYAT],
  overview: "The Source and The Source Terraces are wellness-led residential developments by Aldar in the Saadiyat Cultural District, Abu Dhabi. Designed around a holistic living philosophy, the residences offer high-specification interiors, curated wellness amenities, and a lifestyle positioning that appeals to both premium end-users and capital-focused investors seeking differentiated assets in Abu Dhabi's most desirable location. The terrace units offer private outdoor living spaces that are increasingly rare in urban Abu Dhabi.",
  forInvestors: "Wellness-branded residences in Saadiyat command a premium over standard apartments — strong positioning for capital appreciation and premium rental yield.",
  forEndUsers: "A curated wellness lifestyle in the heart of Saadiyat's Cultural District — high-specification interiors, private terraces, and a community built around wellbeing.",
  ticketFrom: "USD 1.2M",
  ticketTo: "USD 4M+",
  whyPoints: [
    "Wellness-led positioning commands a premium — buyers increasingly pay above market for lifestyle-differentiated assets",
    "Saadiyat Cultural District location provides long-term demand from international buyers and senior professionals",
    "Terrace units offer private outdoor space — a scarce commodity in Abu Dhabi's apartment market",
    "High-specification interiors and curated amenities support premium rental yields from quality tenants",
    "Aldar's consistent delivery track record on Saadiyat Island provides post-handover confidence",
  ],
  unitTypes: "2, 3 and 4 bedroom apartments; select terrace units with private outdoor space",
  startingPrice: "From USD 1.2M (indicative, subject to confirmation)",
  handover: "Confirm with CM2 advisor",
  developer: "Aldar Properties",
  seoTitle: "The Source Residences — Saadiyat Island, Abu Dhabi | CM2 Private Property Concierge",
  seoDescription: "The Source and The Source Terraces by Aldar — wellness-led residences in Saadiyat Cultural District, Abu Dhabi. Request full details from CM2.",
  ogImage: HERO,
};

export default function TheSourcePage() {
  return <ProjectLandingPage data={data} />;
}
