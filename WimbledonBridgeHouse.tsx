import { useEffect } from "react";
import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";
import { Link } from "wouter";
import { MapPin, TrendingUp, Train, ArrowRight } from "lucide-react";
import { injectJsonLd, buildPropertySchema } from "@/lib/structuredData";

// Official images extracted from London Square brochure (February 2026)
const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/wimbledon-bridge-house-p01_dfbc6f31.jpg";
const EXTERIOR = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/wimbledon-bridge-house-p09_bd8e37b5.jpg";
const INTERIOR = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/wimbledon-bridge-house-p15_737e4662.jpg";
const LIFESTYLE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/wimbledon-bridge-house-p02_f6e1fac2.jpg";

const data: LandingPageData = {
  slug: "wimbledon-bridge-house",
  name: "Wimbledon Bridge House",
  location: "Wimbledon, SW London",
  market: "London",
  investmentPositioning: "Wimbledon's finest new address — studios to penthouses, 2 minutes from the station, now reserving. 17 minutes to Waterloo. Named best neighbourhood high street in the UK.",
  heroImage: HERO,
  galleryImages: [HERO, EXTERIOR, INTERIOR, LIFESTYLE],
  overview: "Wimbledon Bridge House is a thoughtfully designed collection of 123 studio, one, two, and three-bedroom apartments and penthouses in the heart of Wimbledon, moments from the station. Developed by London Square (an Aldar Properties company), the development is complemented by distinctive social and wellness amenities. Wimbledon is renowned for its world-class schools, expansive green spaces, and village-like atmosphere — seamlessly blending heritage charm with outstanding connectivity to central London and beyond. Now Reserving — Exclusive First Release. Completion Q3 2028.",
  forInvestors: "Wimbledon's stable demand fundamentals — world-class schools, Wimbledon Common, and 17-minute rail access to Waterloo — support consistent rental yields and long-term capital preservation. Exclusive First Release pricing available now.",
  forEndUsers: "Village charm meets London connectivity — 2 minutes from Wimbledon Station, 70+ shops and eateries within a 10-minute walk, 15 minutes to Wimbledon Common, and 9 Outstanding or Good rated schools within 30 minutes.",
  ticketFrom: "From £487,500",
  ticketTo: "GBP 1.5M+",
  whyPoints: [
    "Landmark heritage conversion — a distinctive building with genuine character, not a generic tower",
    "Directly opposite Wimbledon Station: Zone 3, 17 minutes to London Waterloo by National Rail",
    "Wimbledon town centre location — The Broadway, Centre Court Shopping, Wimbledon Village, and the All England Club",
    "10-year NHBC warranty, 2-year customer care, and energy-efficient new-build specification throughout",
    "Developer: London Square, an Aldar Properties company — award-winning customer service and a track record of quality delivery across London",
  ],
  unitTypes: "Studio, 1, 2 and 3 bedroom apartments and penthouses (123 homes)",
  startingPrice: "From £487,500 — Exclusive First Release",
  handover: "Q3 2028",
  developer: "London Square (an Aldar Properties company)",
  seoTitle: "Wimbledon Bridge House — London Square | CM2 Property Advisory",
  seoDescription: "Wimbledon Bridge House by London Square — studios to penthouses, 2 minutes from Wimbledon Station. 17 min to Waterloo. From £487,500 — Exclusive First Release. Request details from CM2.",
  ogImage: HERO,
};

function InvestmentIntelligence() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <section className="py-16 lg:py-20 border-b border-[#E0DDD8] bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[0.6875rem] tracking-[0.2em] uppercase text-[#C9A96E] mb-4">Investment Intelligence</p>
          <h2 className="text-[#111111] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            The Wimbledon investment case
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 text-[0.9375rem] text-[#4A4A4A] leading-relaxed">
              <p>Wimbledon is one of South West London's most consistently in-demand residential addresses. The combination of excellent schools, green space, and direct rail access to central London creates a rental market that is structurally undersupplied — demand consistently exceeds available stock, particularly for new-build apartments with private outdoor space.</p>
              <p>Wimbledon Bridge House sits directly opposite Wimbledon Station, which offers three distinct transport options: National Rail to London Waterloo in 17 minutes, the London Underground District Line, and Tramlink connections to Croydon. This transport redundancy — three independent networks from one station — is rare in Zone 3 and is a significant driver of rental demand from commuters who prioritise reliability.</p>
              <p>For investors, the heritage conversion format provides a competitive advantage in the rental market. Tenants consistently pay a premium for character buildings over generic new-build towers, and the finite supply of converted heritage stock in Wimbledon supports long-term price resilience. The 10-year NHBC warranty and London Square's award-winning customer care programme reduce void risk and maintenance costs over the investment horizon.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Estimated Rental Yield", value: "4.5 – 5.5%", note: "Gross yield, 1–2 bed units" },
                { label: "Starting Price", value: "From £487.5K", note: "Studios — Exclusive First Release" },
                { label: "To Waterloo", value: "17 min", note: "National Rail, direct" },
                { label: "NHBC Warranty", value: "10 years", note: "New-build guarantee" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white border border-[#E0DDD8] p-5">
                  <p className="text-[0.625rem] tracking-[0.15em] uppercase text-[#9B9B9B] mb-2">{stat.label}</p>
                  <p className="text-[1.25rem] text-[#111111] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{stat.value}</p>
                  <p className="text-[0.75rem] text-[#9B9B9B]">{stat.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 border-b border-[#E0DDD8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Train size={16} className="text-[#C9A96E]" strokeWidth={1.5} />
            <p className="text-[0.6875rem] tracking-[0.2em] uppercase text-[#C9A96E]">Transport Connections</p>
          </div>
          <h2 className="text-[#111111] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
            Wimbledon Station — directly opposite
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { dest: "Wimbledon Station", line: "National Rail / District / Tram", time: "Opposite" },
              { dest: "London Waterloo", line: "National Rail, direct", time: "17 min" },
              { dest: "Clapham Junction", line: "National Rail", time: "8 min" },
              { dest: "Putney", line: "District Line", time: "3 stops" },
              { dest: "East Putney", line: "District Line", time: "2 stops" },
              { dest: "Earls Court", line: "District Line", time: "6 stops" },
              { dest: "Heathrow Airport", line: "District to Heathrow", time: "55 min" },
              { dest: "Croydon", line: "Tramlink", time: "25 min" },
            ].map((t) => (
              <div key={t.dest} className="flex gap-3 items-start border-b border-[#E0DDD8] pb-4">
                <MapPin size={13} className="text-[#C9A96E] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-[0.875rem] text-[#111111] font-medium">{t.dest}</p>
                  <p className="text-[0.75rem] text-[#9B9B9B]">{t.line}</p>
                  <p className="text-[0.75rem] text-[#C9A96E]">{t.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 border-b border-[#E0DDD8] bg-[#F7F5F2]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={16} className="text-[#C9A96E]" strokeWidth={1.5} />
            <p className="text-[0.6875rem] tracking-[0.2em] uppercase text-[#C9A96E]">Area Context</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4 text-[0.9375rem] text-[#4A4A4A] leading-relaxed">
              <p>Wimbledon has been one of London's most stable residential markets for over three decades. The area's appeal is multi-layered: outstanding state and independent schools, Wimbledon Common and Cannizaro Park providing green space, a thriving town centre with independent retail and dining, and direct rail access to central London.</p>
              <p>The All England Club and the annual Wimbledon Championships give the area a global profile that supports international buyer interest. For GCC and Asian investors, Wimbledon is a recognised name that requires no explanation — a significant advantage when considering resale to an international buyer pool.</p>
              <p>The SW19 postcode has consistently outperformed the broader London market in terms of rental void rates. The combination of schools, green space, and transport creates a tenant profile that is predominantly family-oriented and long-term — reducing turnover costs and supporting stable net yields over the investment horizon.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[1rem] text-[#111111]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Nearby amenities</h3>
              {[
                "Wimbledon Village — boutique retail & dining",
                "Centre Court Shopping Centre — 0.1 miles",
                "Wimbledon Common — 1,100 acres of parkland",
                "The All England Club — 0.8 miles",
                "Cannizaro Park — 0.5 miles",
                "Outstanding schools — state & independent",
              ].map((a) => (
                <div key={a} className="flex gap-2 items-start text-[0.875rem] text-[#4A4A4A]">
                  <span className="text-[#C9A96E] flex-shrink-0 mt-0.5">—</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 border-b border-[#E0DDD8]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[0.6875rem] tracking-[0.2em] uppercase text-[#9B9B9B] mb-5">Related Opportunities</p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Ransome's Wharf, Battersea", href: "/projects/ransomes-wharf-battersea" },
              { label: "Westminster Tower, SW1", href: "/projects/westminster-tower" },
              { label: "London Investment Guide", href: "/london-investment" },
              { label: "Overseas Investor Services", href: "/overseas-investors" },
              { label: "Download London Brief", href: "/london-investment-brief" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center gap-2 text-[0.8125rem] text-[#111111] hover:text-[#C9A96E] transition-colors border border-[#E0DDD8] px-4 py-2 hover:border-[#C9A96E]">
                {l.label} <ArrowRight size={12} strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function WimbledonBridgeHousePage() {
  useEffect(() => {
    return injectJsonLd(
      buildPropertySchema({
        name: "Wimbledon Bridge House, SW19",
        description: "A landmark residential development in Wimbledon, South West London. Boutique apartments in one of London's most established and sought-after residential villages, with outstanding transport links to Central London.",
        url: "https://www.thecm2.com/projects/wimbledon-bridge-house",
        image: HERO,
        addressLocality: "Wimbledon",
        addressRegion: "London",
        addressCountry: "GB",
        priceRange: "£487,500 – £1,500,000+",
      }),
      "json-ld-property-wimbledon"
    );
  }, []);

  return (
    <>
      <ProjectLandingPage data={data} />
      <InvestmentIntelligence />
    </>
  );
}
