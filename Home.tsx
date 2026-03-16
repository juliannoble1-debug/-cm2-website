/* CM2 Home Page — Quiet Modernism (Audit Upgrade)
 * FIX C1: Full-bleed hero with dark overlay + hero enquiry form panel
 * FIX C2: Removed invalid font-500 class, corrected to font-medium
 * FIX C3: Removed "USD 1M+" references from body copy
 * FIX I1: Expanded principles section with full body copy
 * FIX I2: End-Users card now has 4 bullet points (visual balance)
 * FIX I3: How It Works upgraded to 4-step dark section
 * FIX I4: Trust section upgraded to grid of authority stats
 * FIX E1: Hero alt text improved for SEO
 */
import { Link } from "wouter";
import { ArrowRight, CheckCircle, MessageCircle, FileText } from "lucide-react";
import { blogPosts } from "@/data/blog";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";
import { toast } from "sonner";
import { trackWhatsAppClick } from "@/lib/analytics";
import InvestorLeadForm from "@/components/InvestorLeadForm";
import { useSEO } from "@/hooks/useSEO";

const WA_LINK = "https://wa.me/447424447658";
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-hero-ZDxTaAVhFRgqBxHBuzD9Mo.webp";
const projects: Project[] = projectsData as Project[];

interface HomeProps {
  onOpenGPT?: () => void;
}

const featuredSlugs = [
  "ransomes-wharf-battersea",
  "wimbledon-bridge-house",
  "the-wilds",
  "haven",
  "fahid-beach-terraces",
  "the-source",
];

const featured = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter(Boolean) as Project[];

const grouped: Record<string, Project[]> = {
  London: featured.filter((p) => p.market === "London"),
  "Abu Dhabi": featured.filter((p) => p.market === "Abu Dhabi"),
  Dubai: featured.filter((p) => p.market === "Dubai"),
  Egypt: featured.filter((p) => p.market === "Egypt"),
};

export default function Home({ onOpenGPT }: HomeProps) {
  useSEO({
    title: "CM2 | Prime London Property Advisory — UK, UAE & Egypt",
    description: "CM2 is a private property investment advisory providing curated access to prime residential opportunities across the UK, UAE, and Egypt. London-first. Aldar-backed. By appointment only.",
    canonical: "https://www.thecm2.com/",
  });

  return (
    <div className="min-h-screen">

      {/* ── Hero — Full Bleed ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMG}
            alt="Premium waterfront property — CM2 Square Centimeter prime property investment advisory"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, rgba(10,10,10,0.84) 0%, rgba(10,10,10,0.58) 48%, rgba(10,10,10,0.24) 100%)",
            }}
          />
        </div>

        <div className="container relative z-10 py-20 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Text */}
            <div className="lg:col-span-6 xl:col-span-5 stagger-children">
              <p
                className="text-[0.6875rem] tracking-[0.2em] uppercase font-medium mb-5"
                style={{ color: "rgba(250,250,248,0.6)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Square Centimeter (CM2)
              </p>
              <h1
                className="text-[#FAFAF8] mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: "clamp(2.75rem, 5vw, 4.5rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                Prime London property advisory.{" "}
                <em style={{ color: "rgba(250,250,248,0.6)", fontStyle: "italic" }}>
                  Extended into UAE and Egypt.
                </em>
              </h1>
              <p
                className="text-[0.9375rem] leading-relaxed mb-8 max-w-md"
                style={{ color: "rgba(250,250,248,0.70)", fontFamily: "'DM Sans', sans-serif" }}
              >
                Curated Aldar and Aldar-backed developments across London, UAE, and Egypt. Institutional-grade advisory. No pressure. No noise.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <button
                  onClick={onOpenGPT}
                  className="btn-primary"
                  style={{ background: "#FAFAF8", color: "#111111", borderColor: "#FAFAF8" }}
                >
                  Ask CM2 GPT
                  <ArrowRight size={14} strokeWidth={1.5} />
                </button>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ borderColor: "rgba(250,250,248,0.4)", color: "#FAFAF8" }}
                >
                  <MessageCircle size={14} strokeWidth={1.5} />
                  WhatsApp an Advisor
                </a>
                <Link
                  href="/london-investment-brief"
                  className="btn-secondary"
                  style={{ borderColor: "rgba(201,169,110,0.55)", color: "#C9A96E" }}
                >
                  <FileText size={14} strokeWidth={1.5} />
                  London Investment Brief
                </Link>
              </div>
            </div>

            {/* Enquiry form panel */}
            <div className="lg:col-span-5 xl:col-span-4 lg:col-start-8 w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none lg:mx-0">
              <div
                className="p-7 lg:p-8"
                style={{
                  background: "#FAFAF8",
                  borderRadius: 2,
                  boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
                  borderTop: "3px solid #111111",
                }}
              >
                <InvestorLeadForm
                  pageSource="home-hero"
                  title="Request a curated shortlist"
                  submitLabel="Submit Enquiry"
                  showNotes={false}
                  showTimeline={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Three Principles ── */}
      <section className="section-lg border-b border-[#E0DDD8]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="cm2-label mb-4">Our Approach</p>
              <h2
                className="text-[#111111] mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                Three principles.<br />No exceptions.
              </h2>
              <p
                className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed max-w-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                CM2 operates on a single mandate: deliver institutional-grade property intelligence to private investors. We do not list everything. We list what is worth your attention.
              </p>
            </div>
            <div className="flex flex-col gap-8">
              {[
                {
                  num: "01",
                  title: "Curated, not aggregated",
                  body: "Every project on CM2 has been assessed for developer credibility, location fundamentals, and investment merit. We remove the noise so you can focus on the signal.",
                },
                {
                  num: "02",
                  title: "Transparent, not transactional",
                  body: "We disclose our relationship with developers upfront. Our advisory is structured around your objectives, not our commission.",
                },
                {
                  num: "03",
                  title: "Precise, not approximate",
                  body: "Floor plans, payment structures, handover timelines, and yield projections are verified before they reach you. No estimates. No guesswork.",
                },
              ].map((item) => (
                <div key={item.num} className="flex gap-6 items-start">
                  <span
                    className="text-[2.25rem] leading-none font-medium flex-shrink-0 w-12 text-right"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: "#C0BDB8",
                      fontWeight: 500,
                    }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <p
                      className="text-[1rem] text-[#111111] mb-1.5 font-medium"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-[0.875rem] text-[#6B6B6B] leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Choose Your Path ── */}
      <section className="section-lg bg-[#F5F3F0] border-b border-[#E0DDD8]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="cm2-label mb-3">Who We Serve</p>
            <h2
              className="text-[#111111]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
            >
              Choose your path
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="p-8 border border-[#E0DDD8] bg-[#FAFAF8]" style={{ borderRadius: 2 }}>
              <p className="cm2-label mb-4">Investors</p>
              <h3
                className="text-[1.375rem] text-[#111111] mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                Capital deployment with precision
              </h3>
              <ul className="flex flex-col gap-3 mb-7">
                {[
                  "Off-plan and resale opportunities",
                  "Yield and capital growth analysis",
                  "Portfolio diversification across three markets",
                  "Structured payment plan guidance",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[0.875rem] text-[#6B6B6B]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <CheckCircle size={14} className="text-[#111111] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={onOpenGPT} className="btn-primary w-full justify-center">
                Find Investment Opportunities
              </button>
            </div>

            <div className="p-8 border border-[#E0DDD8] bg-[#FAFAF8]" style={{ borderRadius: 2 }}>
              <p className="cm2-label mb-4">End-Users</p>
              <h3
                className="text-[1.375rem] text-[#111111] mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                Find the right home, not just a property
              </h3>
              <ul className="flex flex-col gap-3 mb-7">
                {[
                  "Lifestyle-matched property selection",
                  "School, transport, and amenity mapping",
                  "Viewing coordination and developer liaison",
                  "Handover timeline and community details",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[0.875rem] text-[#6B6B6B]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <CheckCircle size={14} className="text-[#111111] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center"
              >
                Speak to an Advisor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Opportunities ── */}
      <section className="section-lg border-b border-[#E0DDD8]">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="cm2-label mb-3">Current Portfolio</p>
              <h2
                className="text-[#111111]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                Featured opportunities
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:flex items-center gap-2 text-[0.8rem] tracking-[0.06em] uppercase font-medium text-[#6B6B6B] hover:text-[#111111] transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              View all <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </div>

          {Object.entries(grouped).map(([market, items]) =>
            items.length > 0 ? (
              <div key={market} className="mb-12 last:mb-0">
                <div className="flex items-center gap-4 mb-6">
                  <p
                    className="text-[0.75rem] tracking-[0.14em] uppercase font-medium text-[#6B6B6B]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {market}
                  </p>
                  <div className="flex-1 h-px bg-[#E0DDD8]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((project) => (
                    <ProjectCard key={project.slug} project={project} onOpenGPT={onOpenGPT} />
                  ))}
                </div>
              </div>
            ) : null
          )}

          <div className="mt-10 text-center sm:hidden">
            <Link href="/projects" className="btn-secondary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works — Dark ── */}
      <section className="section-lg border-b" style={{ background: "#111111", borderColor: "#2A2A28" }}>
        <div className="container">
          <div className="text-center mb-12">
            <p
              className="text-[0.6875rem] tracking-[0.2em] uppercase font-medium mb-3"
              style={{ color: "rgba(250,250,248,0.45)", fontFamily: "'DM Sans', sans-serif" }}
            >
              The Process
            </p>
            <h2
              className="text-[#FAFAF8]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
            >
              How CM2 works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Tell us your objectives",
                body: "Investment horizon, budget, preferred markets, and risk appetite — five minutes via CM2 GPT or WhatsApp.",
              },
              {
                step: "02",
                title: "Receive a curated shortlist",
                body: "We match your criteria against our verified portfolio and deliver a concise, annotated shortlist within 24 hours.",
              },
              {
                step: "03",
                title: "Deep-dive on selected projects",
                body: "Floor plans, payment structures, developer track record, and comparable transactions — all prepared for you.",
              },
              {
                step: "04",
                title: "Proceed with full support",
                body: "From reservation to handover, your CM2 advisor manages every touchpoint with the developer on your behalf.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col gap-3">
                <span
                  className="text-[2.5rem] leading-none font-medium"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "rgba(250,250,248,0.15)",
                    fontWeight: 500,
                  }}
                >
                  {item.step}
                </span>
                <p
                  className="text-[1rem] font-medium"
                  style={{ color: "#FAFAF8", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.title}
                </p>
                <p
                  className="text-[0.875rem] leading-relaxed"
                  style={{ color: "rgba(250,250,248,0.52)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/how-it-works"
              className="btn-secondary"
              style={{ borderColor: "rgba(250,250,248,0.28)", color: "#FAFAF8" }}
            >
              Learn More About Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust & Authority ── */}
      <section className="section-md border-b border-[#E0DDD8]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="cm2-label mb-4">Trust & Transparency</p>
              <h2
                className="text-[#111111] mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                Authorised partner.<br />Independent advisory.
              </h2>
              <p
                className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed mb-6 max-w-md"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                CM2 is an authorised sales partner for Aldar Properties and London Square. We are not a mass broker. We operate a selective, appointment-based model designed for investors who value precision over volume.
              </p>
              <Link href="/trust" className="btn-secondary">
                Our Trust Framework
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Developer", value: "Aldar Properties" },
                { label: "London Partner", value: "London Square" },
                { label: "Markets", value: "UK, UAE, Egypt" },
                { label: "Model", value: "By Appointment" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 border border-[#E0DDD8] bg-[#FAFAF8]"
                  style={{ borderRadius: 2 }}
                >
                  <p className="cm2-label mb-2">{item.label}</p>
                  <p
                    className="text-[1.125rem] text-[#111111] font-medium"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO Keywords Section ── */}
      <section className="py-10 border-t border-[#E0DDD8] bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-[1.25rem] text-[#111111] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
            >
              London Property Investment Advisory — UK, UAE &amp; Egypt
            </h2>
            <p
              className="text-[0.875rem] text-[#6B6B6B] leading-relaxed mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              CM2 is a prime London property advisory providing curated access to London residential property for international investors — including UAE-based, GCC, and expat buyers seeking to buy property in London from Dubai or Abu Dhabi. Each London property investment is selected for capital preservation, rental yield, and long-term liquidity.
            </p>
            <p
              className="text-[0.875rem] text-[#6B6B6B] leading-relaxed mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              In the UAE, CM2 provides access to Aldar property investment across Abu Dhabi and Dubai — including off-plan property Dubai and Abu Dhabi residential property through Aldar's flagship masterplans. Dubai property investment advisory and Abu Dhabi advisory are available by appointment.
            </p>
            <p
              className="text-[0.875rem] text-[#6B6B6B] leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              In Egypt, CM2 provides early-mover access to Aldar Egypt property through SODIC — including SODIC East Egypt, Karmell Egypt Aldar, and EASTVALE Egypt property investment. Aldar backed property Egypt represents a compelling diversification opportunity for international investors seeking off-plan property in a high-growth emerging market.
            </p>
          </div>
        </div>
      </section>

      {/* ── As Featured In ── */}
      <section className="py-10 border-t border-[#E0DDD8] bg-[#FAFAF8]">
        <div className="container">
          <div className="text-center">
            <p className="cm2-label mb-6">As Featured In</p>
            <p
              className="text-[0.8125rem] text-[#9B9B9B] leading-relaxed max-w-md mx-auto"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Media coverage and editorial mentions will appear here as they are secured. CM2 is currently in active outreach with property and investment media.
            </p>
          </div>
        </div>
      </section>

      {/* ── Latest Insights ── */}
      <section className="section-lg border-t border-b border-[#E0DDD8] bg-white">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="cm2-label mb-3">London Property Intelligence</p>
              <h2
                className="text-[2rem] text-[#111111]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                Latest Insights
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-2 text-[0.8rem] tracking-[0.06em] uppercase font-medium transition-colors duration-200 text-[#6B6B6B] hover:text-[#111111]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              View all
              <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...blogPosts].reverse().slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-[#E0DDD8] hover:border-[#C9A96E] transition-colors duration-200 overflow-hidden"
                style={{ borderRadius: 2 }}
              >
                {post.thumbnail && (
                  <div className="overflow-hidden" style={{ height: '160px' }}>
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p
                    className="text-[0.6875rem] tracking-[0.12em] uppercase mb-3 font-medium"
                    style={{ color: "#C9A96E", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {post.category} &middot; {post.readingTime}
                  </p>
                  <h3
                    className="text-[1.0625rem] text-[#111111] leading-snug mb-3 group-hover:text-[#6B6B6B] transition-colors duration-200"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-[0.8125rem] text-[#6B6B6B] leading-relaxed line-clamp-3"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {post.excerpt}
                  </p>
                  <p
                    className="mt-4 text-[0.75rem] tracking-[0.06em] uppercase font-medium flex items-center gap-1.5 transition-colors duration-200 text-[#6B6B6B] group-hover:text-[#111111]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Read
                    <ArrowRight size={11} strokeWidth={1.5} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 sm:hidden text-center">
            <Link
              href="/blog"
              className="text-[0.8rem] tracking-[0.06em] uppercase font-medium text-[#6B6B6B] hover:text-[#111111] transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              View all insights →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section-lg bg-[#F5F3F0]">
        <div className="container text-center">
          <p className="cm2-label mb-4">Begin Your Enquiry</p>
          <h2
            className="text-[#111111] mb-5 max-w-xl mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
          >
            Ready to explore your options?
          </h2>
          <p
            className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed mb-8 max-w-md mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Use CM2 GPT for an instant curated shortlist, or speak directly with an advisor via WhatsApp.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={onOpenGPT} className="btn-primary">
              Ask CM2 GPT
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <MessageCircle size={14} strokeWidth={1.5} />
              WhatsApp an Advisor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
