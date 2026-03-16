import { useEffect } from "react";
import ProjectLandingPage from "@/components/ProjectLandingPage";
import type { LandingPageData } from "@/components/ProjectLandingPage";
import { Link } from "wouter";
import { MapPin, TrendingUp, Train, ArrowRight } from "lucide-react";
import { injectJsonLd, buildPropertySchema } from "@/lib/structuredData";

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-london_1f0bcce4.jpg";
const INTERIOR = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-interior_6cf33e57.jpg";

const data: LandingPageData = {
  slug: "london-project-2",
  name: "Westminster Tower",
  location: "Westminster, Central London",
  market: "London",
  investmentPositioning: "Prime central London tower living — the most liquid, most internationally recognised residential market in the world, for capital preservation-focused buyers.",
  heroImage: HERO,
  galleryImages: [HERO, INTERIOR],
  overview: "Westminster Tower is a premium residential tower in Central London, offering 2–3 bedroom apartments in one of the world's most recognised and liquid property markets. Central London's prime residential market has consistently attracted international capital from the GCC, Asia, and Europe — providing a depth of buyer demand that supports long-term liquidity and capital preservation. The development is positioned for buyers who prioritise the security of a globally understood asset in the world's most international city.",
  forInvestors: "Central London prime residential — the benchmark capital preservation asset for international investors. Consistent demand, deep liquidity, and a globally understood market.",
  forEndUsers: "Live in the heart of London — Westminster, the Thames, and the City all within reach, in a premium tower with hotel-standard amenities.",
  ticketFrom: "GBP 1M",
  ticketTo: "GBP 4M+",
  whyPoints: [
    "Central London is the world's most internationally liquid prime residential market — unmatched depth of buyer demand",
    "Westminster location provides proximity to London's political, cultural, and financial centres",
    "Prime central London has preserved capital through every economic cycle over the past 50 years",
    "Strong GCC buyer demand for central London — a proven safe-haven asset class for international capital",
    "Premium tower format with hotel-standard amenities attracts senior professional and diplomatic tenants",
  ],
  unitTypes: "2 and 3 bedroom apartments, select larger units",
  startingPrice: "From GBP 1M (indicative, subject to confirmation)",
  handover: "Confirm with CM2 advisor",
  developer: "London Square (Aldar Properties)",
  seoTitle: "Westminster Tower — Prime Central London | CM2 Private Property Concierge",
  seoDescription: "Westminster Tower — premium central London apartments for capital preservation. Prime residential in the world's most liquid market. Request details from CM2.",
  ogImage: HERO,
};

function InvestmentIntelligence() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <section className="py-16 lg:py-20 border-b border-[#E0DDD8] bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[0.6875rem] tracking-[0.2em] uppercase text-[#C9A96E] mb-4">Investment Intelligence</p>
          <h2 className="text-[#111111] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
            The Westminster investment case
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 text-[0.9375rem] text-[#4A4A4A] leading-relaxed">
              <p>Westminster is the most internationally recognised residential postcode in London. For overseas investors from the GCC, Asia, and continental Europe, a central London address carries global brand recognition that translates directly into liquidity: the pool of potential buyers for a Westminster apartment is genuinely global, spanning every major wealth centre in the world.</p>
              <p>Prime central London has preserved capital through every economic cycle over the past five decades — through recessions, financial crises, and geopolitical disruptions. The structural drivers of this resilience are well understood: finite supply of prime central stock, consistent international demand, and the UK's rule of law and property rights framework, which provides legal security that many investors cannot access in their home markets.</p>
              <p>For investors seeking sterling-denominated capital preservation with a credible exit strategy, Westminster Tower represents the benchmark London asset: a premium tower format in the most liquid postcode, with a tenant profile spanning senior professionals, diplomats, and international executives.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Estimated Rental Yield", value: "3.5 – 4.5%", note: "Gross yield, 2–3 bed units" },
                { label: "Price Per Sq Ft", value: "£1,500 – £2,500", note: "Indicative range, SW1 prime" },
                { label: "Capital Growth (10yr)", value: "~32%", note: "Prime central London, 2014–2024" },
                { label: "Liquidity", value: "Highest", note: "Deepest international buyer pool" },
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
            Westminster station — walking distance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { dest: "Westminster", line: "Jubilee / Circle / District", time: "Walk" },
              { dest: "Victoria", line: "Victoria / Circle / District", time: "2 stops" },
              { dest: "Canary Wharf", line: "Jubilee Line", time: "12 min" },
              { dest: "London Bridge", line: "Jubilee Line", time: "8 min" },
              { dest: "Bond Street", line: "Jubilee Line", time: "10 min" },
              { dest: "King's Cross St Pancras", line: "Circle / Eurostar", time: "20 min" },
              { dest: "Heathrow Airport", line: "Piccadilly Line via Green Park", time: "50 min" },
              { dest: "Gatwick Airport", line: "Thameslink via Victoria", time: "35 min" },
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
              <p>Westminster is home to the Houses of Parliament, Buckingham Palace, Westminster Abbey, and the Supreme Court. It is the political and constitutional heart of the United Kingdom, and its residential streets have housed senior government ministers, ambassadors, and international executives for over two centuries.</p>
              <p>The SW1 postcode consistently ranks among the top five most expensive residential postcodes in the UK. Demand is underpinned by proximity to Whitehall and the Houses of Parliament, the concentration of embassies and diplomatic missions in the area, and the prestige of a central London address that is immediately understood by buyers in every major global city.</p>
              <p>For international investors, Westminster provides a combination of capital preservation, rental income from high-quality tenants, and a resale market that functions across economic cycles. The area's status as a global landmark ensures that demand never falls to zero, regardless of broader market conditions.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-[1rem] text-[#111111]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Nearby landmarks</h3>
              {[
                "Houses of Parliament — 0.3 miles",
                "Buckingham Palace — 0.5 miles",
                "St James's Park — 0.4 miles",
                "Tate Britain — 0.6 miles",
                "Westminster Abbey — 0.3 miles",
                "Embankment & Thames — 0.2 miles",
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
              { label: "Wimbledon Bridge House, SW19", href: "/projects/wimbledon-bridge-house" },
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

export default function WestminsterTowerPage() {
  useEffect(() => {
    return injectJsonLd(
      buildPropertySchema({
        name: "Westminster Tower, London",
        description: "Premium central London residential tower in Westminster, SW1. Exceptional views of the Thames and the Houses of Parliament. The benchmark capital preservation asset for international investors.",
        url: "https://www.thecm2.com/projects/westminster-tower",
        image: HERO,
        addressLocality: "Westminster",
        addressRegion: "London",
        addressCountry: "GB",
        priceRange: "£1,000,000 – £4,000,000+",
      }),
      "json-ld-property-westminster"
    );
  }, []);

  return (
    <>
      <ProjectLandingPage data={data} />
      <InvestmentIntelligence />
    </>
  );
}
