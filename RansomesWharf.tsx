import { useEffect } from "react";
import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";
import { Link } from "wouter";
import { MapPin, TrendingUp, Train, ArrowRight } from "lucide-react";
import { injectJsonLd, buildPropertySchema } from "@/lib/structuredData";

// Official Aldar / London Square CGI renders — sourced from Aldar SharePoint March 2026
const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/ransomes-wharf-dusk-hero_b9ab7587.webp";
const DELI = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/ransomes-wharf-deli-street_ccca13e8.webp";
const DOCK = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/ransomes-wharf-dock-view_5b32bd87.webp";

const data: LandingPageData = {
  slug: "london-project-1",
  name: "Ransome's Wharf, Battersea",
  location: "Battersea, South West London",
  market: "London",
  investmentPositioning: "A rare converted historic wharf in prime SW London — riverside living with genuine character, private dock, and long-term capital preservation credentials.",
  heroImage: HERO,
  galleryImages: [HERO, DELI, DOCK],
  overview: "Ransome's Wharf is a conversion of a historic Victorian wharf on the River Thames in Battersea, South West London. Developed by London Square — part of the Aldar group — the scheme offers riverside apartments and penthouses set around a private dock, with direct Thames frontage and a ground-floor deli and retail offering. Battersea sits at the heart of one of London's most significant regeneration corridors, anchored by the Battersea Power Station development and the Northern Line extension. The development is positioned for international buyers seeking a distinctive, capital-preserving London asset.",
  forInvestors: "Prime SW London riverside asset with strong capital preservation credentials — consistent demand from GCC, Asian, and European buyers seeking London exposure. Limited supply of comparable converted-wharf product in the area supports long-term liquidity.",
  forEndUsers: "Thames-facing living in one of London's most transformed neighbourhoods — Battersea Power Station, Chelsea, and the City all within easy reach. Private dock, riverside terraces, and a ground-floor deli create a genuinely distinctive residential environment.",
  ticketFrom: "GBP 800K",
  ticketTo: "GBP 3M+",
  whyPoints: [
    "Rare converted Victorian wharf — private dock, riverside terraces, and genuine architectural character",
    "Battersea is one of London's most established prime SW London addresses, anchored by the Power Station regeneration",
    "Strong GCC and international buyer demand for prime SW London — supports liquidity and resale confidence",
    "Limited supply of comparable riverside product in this corridor",
    "Developer: London Square, backed by Aldar Properties — one of the UAE's largest listed developers",
  ],
  unitTypes: "1, 2 and 3 bedroom riverside apartments, select penthouses",
  startingPrice: "From GBP 800K (indicative — confirm with CM2 advisor)",
  handover: "Confirm with CM2 advisor",
  developer: "London Square (Aldar Properties)",
  seoTitle: "Ransome's Wharf Battersea — Prime London Riverside | CM2 Private Property Concierge",
  seoDescription: "Ransome's Wharf, Battersea — official Aldar / London Square riverside residences in SW London. Capital preservation for international buyers. Request details from CM2.",
  ogImage: HERO,
};

function InvestmentIntelligence() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Investment Case ── */}
      <section className="py-16 lg:py-20 border-b border-[#E0DDD8] bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[0.6875rem] tracking-[0.2em] uppercase text-[#C9A96E] mb-4">Investment Intelligence</p>
          <h2 className="text-[#111111] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            The Battersea investment case
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 text-[0.9375rem] text-[#4A4A4A] leading-relaxed">
              <p>
                Battersea represents one of the most significant residential regeneration corridors in London over the past decade. The arrival of the Northern Line extension in 2021 — connecting Battersea Power Station directly to the West End and City — fundamentally repositioned this stretch of the South Bank as a prime investment destination.
              </p>
              <p>
                Ransome's Wharf occupies a particularly rare position within this corridor: a genuine Victorian wharf conversion with direct Thames frontage, a private dock, and a ground-floor retail and deli offering. Converted product of this character is structurally scarce in London — there are a finite number of historic wharves, and most have already been developed. This scarcity underpins long-term liquidity and supports price resilience across market cycles.
              </p>
              <p>
                For international investors, the SW London riverside market offers a combination of attributes that is difficult to replicate: sterling-denominated capital preservation, consistent rental demand from corporate and diplomatic tenants, and a buyer pool that extends across the GCC, Asia, and continental Europe — providing confidence in exit strategy.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Estimated Rental Yield", value: "4.0 – 4.8%", note: "Gross yield, 1–2 bed units" },
                { label: "Price Per Sq Ft", value: "£1,100 – £1,600", note: "Indicative range, SW8 riverside" },
                { label: "Capital Growth (5yr)", value: "~18%", note: "SW London riverside, 2019–2024" },
                { label: "Void Rate", value: "Low", note: "Strong corporate & diplomatic demand" },
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

      {/* ── Transport Links ── */}
      <section className="py-16 border-b border-[#E0DDD8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Train size={16} className="text-[#C9A96E]" strokeWidth={1.5} />
            <p className="text-[0.6875rem] tracking-[0.2em] uppercase text-[#C9A96E]">Transport Connections</p>
          </div>
          <h2 className="text-[#111111] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
            Battersea Power Station station — 5 minutes walk
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { dest: "Battersea Power Station", line: "Northern Line", time: "5 min walk" },
              { dest: "Stockwell", line: "Victoria / Northern Line", time: "2 stops" },
              { dest: "Victoria", line: "Northern Line via Stockwell", time: "12 min" },
              { dest: "London Bridge", line: "Northern Line", time: "18 min" },
              { dest: "Bank / City", line: "Northern Line", time: "22 min" },
              { dest: "King's Cross St Pancras", line: "Northern Line", time: "28 min" },
              { dest: "Heathrow Airport", line: "Piccadilly Line via Victoria", time: "55 min" },
              { dest: "Chelsea / King's Road", line: "Bus / Taxi", time: "10 min" },
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

      {/* ── Location Context ── */}
      <section className="py-16 border-b border-[#E0DDD8] bg-[#F7F5F2]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={16} className="text-[#C9A96E]" strokeWidth={1.5} />
            <p className="text-[0.6875rem] tracking-[0.2em] uppercase text-[#C9A96E]">Area Context</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4 text-[0.9375rem] text-[#4A4A4A] leading-relaxed">
              <p>
                The Battersea regeneration zone covers approximately 560 acres of former industrial land along the South Bank. Since 2013, the area has attracted over £15 billion in private investment, including the US Embassy, the Battersea Power Station mixed-use development, and a series of high-specification residential schemes.
              </p>
              <p>
                The Northern Line extension — opened in September 2021 — was the catalyst that transformed Battersea from a regeneration aspiration into a functioning prime London neighbourhood. Journey times to the West End and City are now comparable to established prime postcodes such as Clapham and Brixton, but at a price point that still reflects the area's relative newness.
              </p>
              <p>
                For investors, this represents a structural opportunity: buying into a corridor that has completed its infrastructure investment phase but has not yet fully repriced to reflect its new connectivity. Rental demand is already strong — driven by corporate tenants at the US Embassy and the growing professional population attracted by the Power Station development.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[1rem] text-[#111111]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Nearby amenities</h3>
              {[
                "Battersea Power Station — retail, dining, cinema",
                "Battersea Park — 200 acres of riverside parkland",
                "Chelsea Bridge — direct access to Chelsea & Knightsbridge",
                "US Embassy — major corporate tenant anchor",
                "Battersea Arts Centre — cultural venue",
                "Northcote Road — independent retail and dining",
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

      {/* ── Internal Links ── */}
      <section className="py-10 border-b border-[#E0DDD8]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[0.6875rem] tracking-[0.2em] uppercase text-[#9B9B9B] mb-5">Related Opportunities</p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Westminster Tower, SW1", href: "/projects/westminster-tower" },
              { label: "Wimbledon Bridge House, SW19", href: "/projects/wimbledon-bridge-house" },
              { label: "London Investment Guide", href: "/london-investment" },
              { label: "Overseas Investor Services", href: "/overseas-investors" },
              { label: "Download London Brief", href: "/london-investment-brief" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-2 text-[0.8125rem] text-[#111111] hover:text-[#C9A96E] transition-colors border border-[#E0DDD8] px-4 py-2 hover:border-[#C9A96E]"
              >
                {l.label} <ArrowRight size={12} strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default function RansomesWharfPage() {
  useEffect(() => {
    return injectJsonLd(
      buildPropertySchema({
        name: "Ransome's Wharf, Battersea",
        description: "Historic Victorian wharf conversion on the River Thames in Battersea, South West London. Riverside apartments and penthouses with private dock and Thames frontage.",
        url: "https://www.thecm2.com/projects/ransomes-wharf-battersea",
        image: HERO,
        addressLocality: "Battersea",
        addressRegion: "London",
        addressCountry: "GB",
        priceRange: "£800,000 – £3,000,000+",
      }),
      "json-ld-property-ransomes"
    );
  }, []);

  return (
    <>
      <ProjectLandingPage data={data} />
      <InvestmentIntelligence />
    </>
  );
}
