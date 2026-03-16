/**
 * /current-opportunities
 * Showcases all current investment opportunities across London, UAE, and Egypt.
 * Includes market filter tabs, opportunity cards, and a lead capture form.
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, MapPin, Filter } from "lucide-react";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";
import InvestorLeadForm from "@/components/InvestorLeadForm";
import { trackCTAClick } from "@/lib/analytics";
import { useSEO } from "@/hooks/useSEO";

const projects: Project[] = projectsData as Project[];

const MARKETS = ["All", "London", "Abu Dhabi", "Dubai", "Egypt"] as const;
type Market = typeof MARKETS[number];

const MARKET_COLORS: Record<string, string> = {
  London: "#1A3A5C",
  "Abu Dhabi": "#5C3A1A",
  Dubai: "#1A5C3A",
  Egypt: "#5C1A3A",
};

const MARKET_BG: Record<string, string> = {
  London: "rgba(26,58,92,0.08)",
  "Abu Dhabi": "rgba(92,58,26,0.08)",
  Dubai: "rgba(26,92,58,0.08)",
  Egypt: "rgba(92,26,58,0.08)",
};

export default function CurrentOpportunities() {
  useSEO({
    title: "Current Investment Opportunities | CM2 — London, UAE & Egypt",
    description: "Explore CM2's current property investment opportunities across London, UAE, and Egypt. Off-plan and resale developments with institutional-grade advisory.",
    canonical: "https://www.thecm2.com/current-opportunities",
  });

  const [activeMarket, setActiveMarket] = useState<Market>("All");

  const filtered = activeMarket === "All"
    ? projects
    : projects.filter((p) => p.market === activeMarket);

  const counts = {
    All: projects.length,
    London: projects.filter((p) => p.market === "London").length,
    "Abu Dhabi": projects.filter((p) => p.market === "Abu Dhabi").length,
    Dubai: projects.filter((p) => p.market === "Dubai").length,
    Egypt: projects.filter((p) => p.market === "Egypt").length,
  };

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="pt-28 pb-14 bg-[#111111]">
        <div className="container">
          <p className="cm2-label mb-4" style={{ color: "#C9A96E" }}>Current Opportunities</p>
          <h1
            className="text-[#FAFAF8] mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(2.5rem, 5vw, 3.75rem)", lineHeight: 1.05 }}
          >
            Curated investment opportunities<br />
            <em style={{ color: "rgba(250,250,248,0.55)", fontStyle: "italic" }}>across London, UAE, and Egypt.</em>
          </h1>
          <p className="text-[0.9375rem] text-[rgba(250,250,248,0.65)] leading-relaxed max-w-2xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Every opportunity presented by CM2 has been selected for specification quality, developer track record, and long-term investment merit. We provide private access to off-plan and resale residential across three of the world's most resilient property markets.
          </p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="py-6 bg-[#1A1A1A] border-b border-[rgba(255,255,255,0.06)]">
        <div className="container">
          <div className="flex flex-wrap gap-6 md:gap-12">
            {[
              { label: "Active Opportunities", value: `${projects.length}` },
              { label: "Markets", value: "3" },
              { label: "Developer Partners", value: "4+" },
              { label: "Response Time", value: "< 48 hrs" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[1.5rem] text-[#C9A96E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{stat.value}</p>
                <p className="text-[0.6875rem] tracking-[0.15em] uppercase text-[rgba(250,250,248,0.45)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="py-8 border-b border-[#E0DDD8] bg-[#F7F5F2] sticky top-[64px] z-20">
        <div className="container">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-[#9B9B9B]" strokeWidth={1.5} />
            {MARKETS.map((market) => (
              <button
                key={market}
                onClick={() => setActiveMarket(market)}
                className="flex items-center gap-2 px-4 py-2 text-[0.8125rem] border transition-all"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: activeMarket === market ? "#111111" : "transparent",
                  color: activeMarket === market ? "#FAFAF8" : "#6B6B6B",
                  borderColor: activeMarket === market ? "#111111" : "#D4D0CA",
                }}
              >
                {market}
                <span
                  className="text-[0.625rem] px-1.5 py-0.5 rounded-full"
                  style={{
                    background: activeMarket === market ? "rgba(255,255,255,0.15)" : "#E0DDD8",
                    color: activeMarket === market ? "#FAFAF8" : "#9B9B9B",
                  }}
                >
                  {counts[market]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Opportunities Grid ── */}
      <section className="section-lg">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                onClick={() => trackCTAClick(project.name, `/projects/${project.slug}`)}
                className="group block border border-[#E0DDD8] bg-white hover:border-[#C9A96E] transition-all duration-300 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: "220px" }}>
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Market badge */}
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 text-[0.625rem] tracking-[0.15em] uppercase"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: MARKET_BG[project.market] || "rgba(0,0,0,0.5)",
                      color: MARKET_COLORS[project.market] || "#FAFAF8",
                      backdropFilter: "blur(8px)",
                      border: `1px solid ${MARKET_COLORS[project.market] || "rgba(255,255,255,0.2)"}`,
                    }}
                  >
                    {project.market}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-[0.625rem] tracking-[0.15em] uppercase text-[#C9A96E] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {project.typeLabel}
                      </p>
                      <h3 className="text-[1.0625rem] text-[#111111] leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                        {project.name}
                      </h3>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-[#C9A96E] flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      strokeWidth={1.5}
                    />
                  </div>

                  <p className="text-[0.8125rem] text-[#6B6B6B] leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {project.oneLiner}
                  </p>

                  {/* Location */}
                  {project.facts?.[0] && (
                    <div className="flex items-center gap-1.5 text-[0.75rem] text-[#9B9B9B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <MapPin size={11} strokeWidth={1.5} />
                      {project.facts[0]}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#9B9B9B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>No opportunities found for this market.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Lead Capture ── */}
      <section className="section-lg bg-[#111111]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: copy */}
            <div>
              <p className="cm2-label mb-4" style={{ color: "#C9A96E" }}>Private Advisory</p>
              <h2 className="text-[#FAFAF8] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
                Not sure which opportunity is right for you?
              </h2>
              <p className="text-[0.9375rem] text-[rgba(250,250,248,0.65)] leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Share your investment objectives and budget with us. Within 48 hours, a CM2 advisor will respond with a bespoke shortlist of opportunities matched to your criteria — across London, Abu Dhabi, and Dubai.
              </p>
              <div className="space-y-4">
                {[
                  "Private, no-obligation consultation",
                  "Bespoke shortlist within 48 hours",
                  "Full financial modelling and floor plans included",
                  "Fully remote purchase process available",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-[#C9A96E] mt-2 flex-shrink-0" />
                    <p className="text-[0.875rem] text-[rgba(250,250,248,0.65)]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-[#1A1A1A] p-7 border border-[rgba(255,255,255,0.08)]">
              <InvestorLeadForm
                pageSource="current_opportunities"
                submitLabel="Request a Bespoke Shortlist"
                showNotes={true}
                showTimeline={true}
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
