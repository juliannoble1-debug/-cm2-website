import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/woolwich_0b6d4425.jpg";

const data: LandingPageData = {
  slug: "pearson-building-croydon",
  name: "Pearson Building, Croydon",
  location: "6–44 Station Road, Croydon, CR0 2RB — South London",
  market: "London",
  investmentPositioning: "Final homes at Pearson Building — ready to move in now. East Croydon to London Bridge in 14 minutes. Over 80% sold. From £335,000.",
  heroImage: HERO,
  galleryImages: [HERO],
  overview: "Pearson Building is a landmark development at 6–44 Station Road, Croydon CR0 2RB, developed by London Square (an Aldar Properties company). Over 80% of homes are now sold — only a limited selection of final homes remains. Residents benefit from 24-hour concierge, rooftop terraces, a residents lounge, and a podium garden. East Croydon Station is moments away, providing direct access to London Bridge in 14 minutes, Victoria in 15 minutes, and Gatwick Airport in 15 minutes. Croydon has been named one of the best areas to buy in London by the Evening Standard, and this development represents one of the most accessible entry points into Greater London new-build property.",
  forInvestors: "Ready to move in — no construction risk, no wait. Over 80% sold signals strong demand. From £335,000 delivers compelling yield-to-price ratios in Greater London. East Croydon to London Bridge in 14 minutes.",
  forEndUsers: "Move in immediately — 24-hour concierge, rooftop terraces, residents lounge, and podium garden. East Croydon Station moments away for fast access to central London and Gatwick Airport.",
  ticketFrom: "GBP 335K",
  ticketTo: "GBP 550K",
  whyPoints: [
    "Ready to move in — no wait, no construction risk",
    "Over 80% sold — final homes remaining, strong demand signal",
    "East Croydon to London Bridge in 14 minutes, Victoria in 15 minutes, Gatwick Airport in 15 minutes",
    "24-hour concierge, rooftop terraces, residents lounge, podium garden",
    "Croydon named one of the best areas to buy in London (Evening Standard)",
    "Most accessible entry point into Greater London new-build property from £335,000",
    "Developer: London Square, backed by Aldar Properties",
  ],
  unitTypes: "1 & 2 bedroom apartments",
  startingPrice: "From £335,000",
  handover: "Ready to move in now",
  developer: "London Square (Aldar Properties)",
  seoTitle: "Pearson Building Croydon — London Square | CM2 Advisory",
  seoDescription: "Pearson Building, Croydon — final homes from £335,000, ready to move in. East Croydon to London Bridge in 14 min. Over 80% sold. Request details from CM2.",
  ogImage: HERO,
};

export default function PearsonBuildingPage() {
  return <ProjectLandingPage data={data} />;
}
