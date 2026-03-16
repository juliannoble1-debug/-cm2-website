import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";

// Official Aldar CGI render — sourced from Aldar SharePoint March 2026
const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/verdes-by-haven-aerial-hero_344b4b5b.webp";
const SECONDARY = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-dubai_57c52ffe.jpg";

const data: LandingPageData = {
  slug: "dubai-project-2",
  name: "Verdes by Haven",
  location: "Dubai Land, Dubai",
  market: "Dubai",
  investmentPositioning: "Wellness-led apartments within the Haven master community — biophilic design, green corridors, and long-term lifestyle positioning in Dubai Land.",
  heroImage: HERO,
  galleryImages: [HERO, SECONDARY],
  overview: "Verdes by Haven is a wellness-led apartment development within the Haven master community in Dubai Land. Developed by Aldar Properties, the project is defined by biophilic architecture — extensive green corridors, outdoor amenities, and a design philosophy centred on health and wellbeing. The development offers 1 to 3 bedroom apartments positioned for lifestyle buyers and long-term holders who value community quality over density. Haven is one of Dubai's most distinctive wellness-branded master communities, and Verdes represents its residential apartment offering.",
  forInvestors: "Wellness-branded townhouses and villas in Dubai's growth corridor — premium positioning supports above-average rental yields and long-term capital appreciation.",
  forEndUsers: "A wellness-first family community in Dubai Land — townhouses and villas with private gardens, community amenities, and a lifestyle built around health and wellbeing.",
  ticketFrom: "AED 1.5M",
  ticketTo: "AED 4M+",
  whyPoints: [
    "Part of the Haven master community — one of Dubai's most distinctive wellness-led developments",
    "Biophilic architecture with extensive green space, outdoor amenities, and health-focused design throughout",
    "Aldar developer credibility — Abu Dhabi's largest listed developer expanding into Dubai's premium segment",
    "Wellness positioning supports premium rental demand and long-term resale confidence",
    "Dubai Land growth corridor with improving connectivity and infrastructure investment",
  ],
  unitTypes: "1, 2 and 3 bedroom wellness apartments",
  startingPrice: "From AED 1.5M (indicative — confirm with CM2 advisor)",
  handover: "Confirm with CM2 advisor",
  developer: "Aldar Properties",
  seoTitle: "Verdes by Haven — Wellness Apartments, Dubai Land | CM2 Private Property Concierge",
  seoDescription: "Verdes by Haven by Aldar — wellness apartments within the Haven master community, Dubai Land. Biophilic design from AED 1.5M. Request details from CM2.",
  ogImage: HERO,
};

export default function HavenPage() {
  return <ProjectLandingPage data={data} />;
}
