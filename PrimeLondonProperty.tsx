/**
 * SEO Landing Page: /prime-london-property
 * Target keywords: "prime london property", "prime central london real estate",
 *   "luxury london property investment", "pcl property investment"
 * Target audience: HNW buyers seeking prime central London residential
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, MessageCircle, FileText, MapPin } from "lucide-react";
import { trackCTAClick, trackWhatsAppClick } from "@/lib/analytics";
import InvestorLeadForm from "@/components/InvestorLeadForm";

const WA_LINK = "https://wa.me/447424447658?text=Hi%2C%20I%27m%20interested%20in%20prime%20London%20property%20opportunities.";
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/5PNDekDWV7fm3xWZEdDcSY";
const HERO_IMG = `${CDN}/westminster_tower_hero_cafcbee9.webp`;

const PRIME_ZONES = [
  {
    postcode: "SW1",
    name: "Westminster & Pimlico",
    desc: "The heartland of prime central London. SW1 encompasses Belgravia, Pimlico, and Westminster — some of the most internationally recognised addresses in the world. Demand from diplomatic, corporate, and private family buyers underpins values across all market cycles.",
    priceRange: "£800k – £5M+",
    yield: "3.8–4.2%",
    link: "/projects/westminster-tower",
    linkLabel: "Westminster Tower",
  },
  {
    postcode: "SW8 / SW11",
    name: "Battersea",
    desc: "London's most significant regeneration story of the past decade. The arrival of the Northern Line extension, the US Embassy, and the Battersea Power Station development have transformed this riverside corridor into one of the most compelling investment destinations in the capital.",
    priceRange: "£500k – £2.5M",
    yield: "4.0–4.8%",
    link: "/projects/ransomes-wharf-battersea",
    linkLabel: "Ransomes Wharf",
  },
  {
    postcode: "SW19",
    name: "Wimbledon",
    desc: "Wimbledon occupies a unique position in the London market — it combines the prestige of a globally recognised address with the practicality of excellent transport links, outstanding schools, and a strong local economy. A perennial favourite for long-term family buyers and international investors.",
    priceRange: "£600k – £3M",
    yield: "3.9–4.5%",
    link: "/projects/wimbledon-bridge-house",
    linkLabel: "Wimbledon Bridge House",
  },
];

const WHAT_IS_PRIME = [
  {
    title: "Location within zones 1–3",
    body: "Prime London property is concentrated in the inner London boroughs — Westminster, Kensington & Chelsea, Wandsworth, and Lambeth. Proximity to transport, green space, and cultural amenities defines the premium.",
  },
  {
    title: "Specification and finish",
    body: "Prime residential developments are characterised by high-quality materials, generous room proportions, concierge services, and amenity spaces. Off-plan prime developments offer the additional advantage of new-build warranties and modern energy ratings.",
  },
  {
    title: "Developer and tenure quality",
    body: "The quality of the developer, the length of the lease, and the service charge structure are critical factors in prime London. CM2 only presents opportunities from established developers with proven delivery track records.",
  },
  {
    title: "Liquidity and exit",
    body: "Prime London property benefits from deep, liquid secondary markets. Well-located, well-specified assets in core postcodes can be resold to a global pool of buyers — providing confidence in exit strategy.",
  },
];

export default function PrimeLondonProperty() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Prime London Property | CM2 Private Investment Concierge";
    const desc = document.querySelector('meta[name="description"]');
    const prevDesc = desc?.getAttribute("content") ?? "";
    desc?.setAttribute("content", "Discover prime London property opportunities with CM2. Westminster, Battersea, and Wimbledon. Private advisory for HNW buyers and investors seeking prime central London residential.");
    return () => {
      document.title = prev;
      desc?.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMG}
            alt="Westminster Tower — prime central London property by CM2"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.2) 100%)" }} />
        </div>
        <div className="container relative z-10 py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="cm2-label mb-4" style={{ color: "#C9A96E" }}>Prime London Property</p>
            <h1
              className="text-[#FAFAF8] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
            >
              Prime Central London.<br />
              <em style={{ color: "rgba(250,250,248,0.65)", fontStyle: "italic" }}>Curated. Private. Precise.</em>
            </h1>
            <p className="text-[0.9375rem] leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(250,250,248,0.72)", fontFamily: "'DM Sans', sans-serif" }}>
              CM2 provides private access to the most compelling prime London residential opportunities — off-plan and resale — in Westminster, Battersea, and Wimbledon. Every opportunity is selected for specification quality, developer track record, and long-term investment merit.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/projects"
                onClick={() => trackCTAClick("View Prime Properties", "/projects")}
                className="btn-primary"
                style={{ background: "#FAFAF8", color: "#111111", borderColor: "#FAFAF8" }}
              >
                View Prime Properties <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("/prime-london-property")}
                className="btn-secondary"
                style={{ borderColor: "rgba(250,250,248,0.4)", color: "#FAFAF8" }}
              >
                <MessageCircle size={14} strokeWidth={1.5} /> Speak with an Advisor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── What is Prime London ── */}
      <section className="section-lg border-b border-[#E0DDD8]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="cm2-label mb-4">Defining Prime</p>
            <h2 className="text-[#111111] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
              What defines prime London residential property?
            </h2>
            <p className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              "Prime" in the London residential market refers to a specific tier of property — characterised by location, specification, and the depth of buyer demand — that consistently outperforms the broader market over long investment cycles. Understanding what constitutes prime is essential to making sound investment decisions.
            </p>
            <div className="space-y-6">
              {WHAT_IS_PRIME.map((item) => (
                <div key={item.title} className="flex gap-5 border-b border-[#E0DDD8] pb-6">
                  <div className="w-1 bg-[#C9A96E] flex-shrink-0 rounded-full" />
                  <div>
                    <h3 className="text-[1rem] text-[#111111] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{item.title}</h3>
                    <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Prime Zones ── */}
      <section className="section-lg bg-[#F7F5F2] border-b border-[#E0DDD8]">
        <div className="container">
          <p className="cm2-label mb-4">Investment Zones</p>
          <h2 className="text-[#111111] mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
            Prime London zones we cover
          </h2>
          <div className="space-y-6">
            {PRIME_ZONES.map((zone) => (
              <div key={zone.postcode} className="bg-white p-7 lg:p-9 border border-[#E0DDD8] grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin size={14} className="text-[#C9A96E]" strokeWidth={1.5} />
                    <span className="text-[0.6875rem] tracking-[0.2em] uppercase text-[#C9A96E]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{zone.postcode}</span>
                  </div>
                  <h3 className="text-[1.25rem] text-[#111111] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{zone.name}</h3>
                  <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{zone.desc}</p>
                </div>
                <div className="border-t lg:border-t-0 lg:border-l border-[#E0DDD8] pt-5 lg:pt-0 lg:pl-7">
                  <div className="mb-4">
                    <p className="text-[0.625rem] tracking-[0.15em] uppercase text-[#9B9B9B] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Price Range</p>
                    <p className="text-[0.9375rem] text-[#111111] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{zone.priceRange}</p>
                  </div>
                  <div className="mb-5">
                    <p className="text-[0.625rem] tracking-[0.15em] uppercase text-[#9B9B9B] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Rental Yield</p>
                    <p className="text-[0.9375rem] text-[#111111] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{zone.yield}</p>
                  </div>
                  <Link
                    href={zone.link}
                    onClick={() => trackCTAClick(zone.linkLabel, zone.link)}
                    className="flex items-center gap-2 text-[0.8125rem] text-[#111111] hover:text-[#C9A96E] transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    View {zone.linkLabel} <ArrowRight size={12} strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-lg bg-[#111111]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="cm2-label mb-4" style={{ color: "#C9A96E" }}>Private Advisory</p>
            <h2 className="text-[#FAFAF8] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
              Request a curated prime London shortlist
            </h2>
            <p className="text-[0.9375rem] text-[rgba(250,250,248,0.65)] leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Tell us your budget, objectives, and preferred location. We will respond within 48 hours with a bespoke selection of prime London opportunities matched to your criteria.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("/prime-london-property")}
                className="btn-primary"
                style={{ background: "#FAFAF8", color: "#111111", borderColor: "#FAFAF8" }}
              >
                <MessageCircle size={14} strokeWidth={1.5} /> WhatsApp an Advisor
              </a>
              <Link
                href="/london-investment-brief"
                onClick={() => trackCTAClick("Download Brief", "/london-investment-brief")}
                className="btn-secondary"
                style={{ borderColor: "rgba(250,250,248,0.4)", color: "#FAFAF8" }}
              >
                <FileText size={14} strokeWidth={1.5} /> Download London Brief
              </Link>
            </div>
            <div className="max-w-md mx-auto bg-[#1A1A1A] p-6 border border-[rgba(255,255,255,0.08)] text-left mb-10">
              <p className="text-[0.75rem] text-[#C9A96E] tracking-widest uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Or send a written enquiry</p>
              <InvestorLeadForm
                pageSource="seo_prime_london_property"
                submitLabel="Request a Prime London Shortlist"
                showNotes={false}
                showTimeline={false}
              />
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {[
                { label: "London Investment Guide", href: "/london-investment" },
                { label: "Overseas Investors", href: "/overseas-investors" },
                { label: "All Projects", href: "/projects" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => trackCTAClick(l.label, l.href)}
                  className="flex items-center gap-2 text-[0.8125rem] text-[rgba(250,250,248,0.55)] hover:text-[#C9A96E] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {l.label} <ArrowRight size={12} strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
