/**
 * SEO Landing Page: /overseas-investors
 * Target keywords: "overseas property investment uk", "foreign investor london property",
 *   "non-resident buy property london", "international investor london real estate"
 * Target audience: GCC, UAE, Asia, Africa HNW investors
 */
import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, MessageCircle, FileText, Globe, Shield, CheckCircle, TrendingUp } from "lucide-react";
import { trackCTAClick, trackWhatsAppClick } from "@/lib/analytics";
import InvestorLeadForm from "@/components/InvestorLeadForm";

const WA_LINK = "https://wa.me/447424447658?text=Hi%2C%20I%27m%20an%20overseas%20investor%20interested%20in%20London%20property%20opportunities.";
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/5PNDekDWV7fm3xWZEdDcSY";
const HERO_IMG = `${CDN}/ransomes_wharf_battersea_6f8b5188.webp`;

const MARKETS = [
  { flag: "🇦🇪", label: "United Arab Emirates" },
  { flag: "🇸🇦", label: "Saudi Arabia" },
  { flag: "🇶🇦", label: "Qatar" },
  { flag: "🇰🇼", label: "Kuwait" },
  { flag: "🇳🇬", label: "Nigeria" },
  { flag: "🇿🇦", label: "South Africa" },
  { flag: "🇸🇬", label: "Singapore" },
  { flag: "🇭🇰", label: "Hong Kong" },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Initial Consultation",
    body: "We begin with a private conversation — by WhatsApp, call, or video — to understand your investment objectives, budget, and timeline. No forms. No pressure.",
  },
  {
    num: "02",
    title: "Curated Shortlist",
    body: "Within 48 hours, you receive a bespoke shortlist of London properties matched to your criteria. Each opportunity includes full financial modelling, floor plans, and comparable analysis.",
  },
  {
    num: "03",
    title: "Reservation & Legal",
    body: "We guide you through the reservation process and introduce you to specialist solicitors experienced in acting for overseas buyers. Exchange and completion can be managed entirely remotely.",
  },
  {
    num: "04",
    title: "Ongoing Management",
    body: "Post-purchase, we can introduce you to trusted lettings and property management partners who specialise in managing London assets for international landlords.",
  },
];

const FAQ = [
  {
    q: "Can overseas investors buy property in London?",
    a: "Yes. There are no restrictions on foreign nationals purchasing residential property in the United Kingdom. Overseas buyers can purchase freehold or leasehold property in their own name, through a company, or via a trust structure.",
  },
  {
    q: "Do I need to be in London to complete a purchase?",
    a: "No. The entire purchase process — from reservation through to legal completion — can be managed remotely. We work with solicitors who are experienced in acting for overseas clients and can handle all documentation electronically.",
  },
  {
    q: "What taxes apply to overseas property investors?",
    a: "Overseas buyers are subject to a 2% Stamp Duty Land Tax (SDLT) surcharge in addition to the standard rates. Capital Gains Tax applies on disposal. We recommend engaging a specialist UK tax adviser, and we can make introductions.",
  },
  {
    q: "What is the minimum investment level?",
    a: "The opportunities we present typically start from £400,000 for off-plan units and from £600,000 for prime central London resale properties. We work with clients across a range of budgets up to £10M+.",
  },
];

export default function OverseasInvestors() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Overseas Property Investment in London | CM2 Private Concierge";
    const desc = document.querySelector('meta[name="description"]');
    const prevDesc = desc?.getAttribute("content") ?? "";
    desc?.setAttribute("content", "CM2 helps overseas investors buy London property. Private advisory for UAE, GCC, African and Asian investors. Off-plan and prime residential. Fully remote purchase process.");
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
            alt="Ransomes Wharf Battersea — London property for overseas investors"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.2) 100%)" }} />
        </div>
        <div className="container relative z-10 py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="cm2-label mb-4" style={{ color: "#C9A96E" }}>For Overseas Investors</p>
            <h1
              className="text-[#FAFAF8] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
            >
              Buy London Property<br />
              <em style={{ color: "rgba(250,250,248,0.65)", fontStyle: "italic" }}>from anywhere in the world.</em>
            </h1>
            <p className="text-[0.9375rem] leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(250,250,248,0.72)", fontFamily: "'DM Sans', sans-serif" }}>
              CM2 specialises in helping international investors acquire prime London residential property. We manage the entire process — from curated shortlist to legal completion — with no requirement to travel to the UK.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("/overseas-investors")}
                className="btn-primary"
                style={{ background: "#FAFAF8", color: "#111111", borderColor: "#FAFAF8" }}
              >
                <MessageCircle size={14} strokeWidth={1.5} /> WhatsApp an Advisor
              </a>
              <Link
                href="/london-investment-brief"
                onClick={() => trackCTAClick("Download London Brief", "/london-investment-brief")}
                className="btn-secondary"
                style={{ borderColor: "rgba(250,250,248,0.4)", color: "#FAFAF8" }}
              >
                <FileText size={14} strokeWidth={1.5} /> Download London Brief
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Markets We Serve ── */}
      <section className="py-10 bg-[#111111]">
        <div className="container">
          <p className="text-[0.6875rem] tracking-[0.2em] uppercase text-[rgba(201,169,110,0.7)] mb-6 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            We work with investors from
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {MARKETS.map((m) => (
              <div key={m.label} className="flex items-center gap-2 px-4 py-2 border border-[rgba(201,169,110,0.15)]">
                <span>{m.flag}</span>
                <span className="text-[0.8125rem] text-[rgba(250,250,248,0.7)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why London for Overseas Investors ── */}
      <section className="section-lg border-b border-[#E0DDD8]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="cm2-label mb-4">Why London</p>
              <h2 className="text-[#111111] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
                The world's most trusted destination for international capital
              </h2>
              <p className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                London has been the preferred destination for overseas property investment for generations. Its combination of legal certainty, transparent title, sterling-denominated assets, and global liquidity makes it uniquely attractive for investors seeking to preserve and grow capital outside their home market.
              </p>
              <p className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Unlike many markets, there are no restrictions on foreign ownership of UK residential property. Purchases can be made in personal names, through corporate structures, or via trust arrangements — giving international investors full flexibility in how they hold their assets.
              </p>
            </div>
            <div className="space-y-5">
              {[
                { icon: Shield, title: "No foreign ownership restrictions", body: "Any overseas national can purchase UK residential property. No government approval required." },
                { icon: Globe, title: "Fully remote purchase process", body: "Reservation, exchange, and completion can all be managed from your home country." },
                { icon: TrendingUp, title: "Sterling-denominated asset", body: "Diversify away from local currency exposure with a hard asset in a global reserve currency." },
                { icon: CheckCircle, title: "Transparent legal system", body: "HM Land Registry provides clear, searchable title records. Your ownership is publicly registered and legally protected." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 border border-[#E0DDD8] bg-[#F7F5F2]">
                  <item.icon size={18} className="text-[#C9A96E] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-[0.9375rem] text-[#111111] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{item.title}</p>
                    <p className="text-[0.8125rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section-lg bg-[#F7F5F2] border-b border-[#E0DDD8]">
        <div className="container">
          <p className="cm2-label mb-4">How It Works</p>
          <h2 className="text-[#111111] mb-12" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
            From first conversation to completion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="bg-white p-7 border border-[#E0DDD8]">
                <p className="text-[2rem] text-[#C9A96E] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{step.num}</p>
                <h3 className="text-[1.0625rem] text-[#111111] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{step.title}</h3>
                <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-lg border-b border-[#E0DDD8]">
        <div className="container max-w-3xl">
          <p className="cm2-label mb-4">Common Questions</p>
          <h2 className="text-[#111111] mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
            Frequently asked by overseas investors
          </h2>
          <div className="space-y-6">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-[#E0DDD8] pb-6">
                <h3 className="text-[1rem] text-[#111111] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{item.q}</h3>
                <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-lg bg-[#111111]">
        <div className="container text-center">
          <p className="cm2-label mb-4" style={{ color: "#C9A96E" }}>Start Your Enquiry</p>
          <h2 className="text-[#FAFAF8] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
            Ready to invest in London?
          </h2>
          <p className="text-[0.9375rem] text-[rgba(250,250,248,0.65)] leading-relaxed mb-8 max-w-lg mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Speak with a CM2 advisor today. We work with investors across the UAE, GCC, Africa, and Asia to identify and secure the right London opportunities.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("/overseas-investors")}
              className="btn-primary"
              style={{ background: "#FAFAF8", color: "#111111", borderColor: "#FAFAF8" }}
            >
              <MessageCircle size={14} strokeWidth={1.5} /> WhatsApp an Advisor
            </a>
            <Link
              href="/london-investment-brief"
              onClick={() => trackCTAClick("Download Brief CTA", "/london-investment-brief")}
              className="btn-secondary"
              style={{ borderColor: "rgba(250,250,248,0.4)", color: "#FAFAF8" }}
            >
              <FileText size={14} strokeWidth={1.5} /> Download London Brief
            </Link>
          </div>
          <div className="max-w-md mx-auto bg-[#1A1A1A] p-6 border border-[rgba(255,255,255,0.08)] text-left mb-10">
            <p className="text-[0.75rem] text-[#C9A96E] tracking-widest uppercase mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>Or send a written enquiry</p>
            <InvestorLeadForm
              pageSource="seo_overseas_investors"
              submitLabel="Request a London Shortlist"
              showNotes={false}
              showTimeline={false}
            />
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {[
              { label: "London Investment Guide", href: "/london-investment" },
              { label: "Prime London Property", href: "/prime-london-property" },
              { label: "Current Projects", href: "/projects" },
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
      </section>

    </div>
  );
}
