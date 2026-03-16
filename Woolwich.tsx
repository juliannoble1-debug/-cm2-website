import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/woolwich_0b6d4425.jpg";

const data: LandingPageData = {
  slug: "woolwich",
  name: "Woolwich",
  location: "Woolwich, SE London — Royal Borough of Greenwich",
  market: "London",
  investmentPositioning: "SE London's highest-conviction regeneration story — Elizabeth line to Canary Wharf in 8 minutes, 16.5% rental growth forecast 2025–2029, from £408,000.",
  heroImage: HERO,
  galleryImages: [HERO],
  overview: "London Square Woolwich is a prestigious collection of 1 and 2 bedroom apartments in the heart of Woolwich, SE London. The Elizabeth line has fundamentally transformed the area's connectivity: Canary Wharf is now 8 minutes away, the City of London 14 minutes, and Bond Street 22 minutes — repositioning Woolwich as a genuine commuter destination for central London professionals. Woolwich is undergoing a £25M transformation, positioning it as one of London's most exciting investment hotspots. With 16.5% rental growth and 19.4% sales growth forecasted between 2025–2029, these apartments present a compelling opportunity for investors seeking strong returns. Each residence features a private balcony and access to a beautifully landscaped rooftop terrace with breath-taking views of the River Thames. Show apartment and sales suite launching Spring 2026. Move in from Q1 2028.",
  forInvestors: "16.5% rental growth and 19.4% sales growth forecasted 2025–2029. Elizabeth line to Canary Wharf in 8 minutes and Bond Street in 22 minutes. From £408,000 — a high-conviction regeneration opportunity backed by London Square (Aldar Properties).",
  forEndUsers: "Modern SE London living with private balcony, rooftop terrace with Thames views, co-working space, and 24-hour concierge — 2 minutes walk to Woolwich Station.",
  ticketFrom: "GBP 408K",
  ticketTo: "GBP 650K",
  whyPoints: [
    "Elizabeth line to Canary Wharf in 8 minutes, City of London in 14 minutes, Bond Street in 22 minutes",
    "Woolwich undergoing £25M transformation — one of London's most exciting investment hotspots",
    "16.5% rental growth and 19.4% sales growth forecasted between 2025–2029",
    "Roof terrace with Thames views, co-working space, 24-hour concierge, private balconies on every apartment",
    "2-minute walk to Woolwich Station; 5 minutes to London City Airport",
    "Near Greenwich Park World Heritage Site (15 minutes) and Woolwich Common",
    "Developer: London Square, backed by Aldar Properties",
  ],
  unitTypes: "1 & 2 bedroom apartments",
  startingPrice: "From £408,000",
  handover: "Q1 2028",
  developer: "London Square (Aldar Properties)",
  seoTitle: "Woolwich Apartments — London Square | CM2 Property Advisory",
  seoDescription: "London Square Woolwich — 1 & 2 bedroom apartments from £408,000. Elizabeth line to Canary Wharf in 8 minutes. 16.5% rental growth forecast. Request details from CM2.",
  ogImage: HERO,
};

export default function WoolwichPage() {
  return <ProjectLandingPage data={data} />;
}
