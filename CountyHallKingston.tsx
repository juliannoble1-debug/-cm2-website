import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/woolwich_0b6d4425.jpg";

const data: LandingPageData = {
  slug: "county-hall-kingston",
  name: "County Hall Kingston",
  location: "Kingston upon Thames, South West London",
  market: "London",
  investmentPositioning: "A living legacy — Grade II* listed Surrey County Hall transformed into luxury riverside residences. Under 20 minutes to Waterloo. From £480,000.",
  heroImage: HERO,
  galleryImages: [HERO],
  overview: "County Hall Kingston is a landmark transformation of the Grade II* listed Surrey County Hall in Kingston upon Thames — one of London's most significant heritage conversions. Developed by London Square (an Aldar Properties company), the development comprises 1, 2 and 3 bedroom apartments and duplexes, each finished to an exceptional specification. Residents benefit from 24-hour concierge, a wellness studio, tasting room, games parlour, cinema room, and private courtyard. Kingston is nestled along the River Thames, with outstanding restaurants, scenic riverside walks, and a historic market scene on the doorstep. Under 20 minutes to Waterloo Station; 30 minutes drive to Heathrow Airport. Completion phased Q4 2026 – Q3 2027.",
  forInvestors: "Grade II* listed heritage conversion — rare, finite supply, strong resale appeal. Kingston is one of London's most family-friendly boroughs with outstanding schools. Under 20 minutes to Waterloo. From £480,000.",
  forEndUsers: "A rare piece of London history you can live in — 24-hour concierge, wellness studio, cinema room, tasting room, and private courtyard. Riverside Kingston on the doorstep.",
  ticketFrom: "GBP 480K",
  ticketTo: "GBP 1.5M+",
  whyPoints: [
    "Grade II* listed Surrey County Hall — a rare piece of London history you can live in",
    "24-hour concierge, wellness studio, tasting room, games parlour, cinema room, private courtyard",
    "Nestled along the River Thames — restaurants, scenic walks, historic market scene",
    "Under 20 minutes to Waterloo Station; 30 minutes drive to Heathrow Airport",
    "Outstanding education on the doorstep — Kingston is one of London's most family-friendly boroughs",
    "Heritage conversion format — finite supply supports long-term price resilience",
    "Developer: London Square, backed by Aldar Properties",
  ],
  unitTypes: "1, 2 & 3 bedroom apartments and duplexes",
  startingPrice: "From £480,000",
  handover: "Q4 2026 – Q3 2027 (phased)",
  developer: "London Square (Aldar Properties)",
  seoTitle: "County Hall Kingston — Heritage Residences | CM2 Advisory",
  seoDescription: "County Hall Kingston by London Square — Grade II* listed Surrey County Hall transformed into luxury riverside residences. From £480,000. Under 20 min to Waterloo. Request details from CM2.",
  ogImage: HERO,
};

export default function CountyHallKingstonPage() {
  return <ProjectLandingPage data={data} />;
}
