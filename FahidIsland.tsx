import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useSEO } from "@/hooks/useSEO";

const WA_LINK = "https://wa.me/447424457658";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/fahid-beach-terraces-beachfront_2eb3c7ed.jpeg";

const projects = [
  {
    slug: "fahid-beach-residences",
    name: "Fahid Beach Residences",
    typeLabel: "Beachfront Apartments & Townhouses",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/beach-house-fahid-hero_4b7f2856.jpeg",
    unitTypes: "1–4 bedroom apartments, townhouses and penthouses",
    priceRange: "Enquire for current pricing",
    handover: "Estimated 2029",
    highlights: [
      "Diverse unit mix — apartments, townhouses, and penthouses",
      "Waterfront lifestyle with direct sea access",
      "Strong early sales momentum",
    ],
    ctas: ["Request Brochure", "Book Viewing"],
  },
  {
    slug: "beach-house-fahid",
    name: "The Beach House Fahid",
    typeLabel: "Waterfront Apartments",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/beach-house-fahid-wellness-gym_aebaa71d.jpeg",
    unitTypes: "Studios to 3 bedroom + maid",
    priceRange: "Enquire for current pricing",
    handover: "Q4 2029",
    highlights: [
      "Freehold ownership — accessible entry point",
      "Flexible 65/35 payment plan",
      "Wellness amenities: fitness, yoga, resort-style pool",
    ],
    ctas: ["Get Availability", "Schedule Call"],
  },
  {
    slug: "fahid-beach-terraces",
    name: "Fahid Beach Terraces",
    typeLabel: "Beachfront Tower Residences",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/fahid-beach-terraces-beachfront_2eb3c7ed.jpeg",
    unitTypes: "1–4 bedroom apartments, duplexes and penthouses",
    priceRange: "Enquire for current pricing",
    handover: "Circa 2029",
    highlights: [
      "Premium beachfront tower — duplexes and penthouses",
      "Direct beach access on 11km coastline",
      "Scarcity of comparable beachfront tower product in Abu Dhabi",
    ],
    ctas: ["Download Floorplans", "Enquire Now"],
  },
];

const highlights = [
  { icon: "🌊", label: "11km Coastline" },
  { icon: "🌿", label: "Wellness-Focused Masterplan" },
  { icon: "📍", label: "Between Yas & Saadiyat" },
  { icon: "🏗️", label: "Aldar Flagship Development" },
  { icon: "📈", label: "Strong Early Sales Momentum" },
];

export default function FahidIsland() {
  useSEO({
    title: "Fahid Island Abu Dhabi — Aldar Waterfront Masterplan | CM2",
    description: "Fahid Island — Aldar's flagship waterfront masterplan in Abu Dhabi. 11km of coastline between Yas and Saadiyat. Three developments: Fahid Beach Residences, The Beach House Fahid, and Fahid Beach Terraces. Enquire with CM2.",
    ogImage: HERO_IMAGE,
    canonical: "https://www.thecm2.com/projects/fahid-island",
  });
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", project: "Fahid Island" });
  const [submitted, setSubmitted] = useState(false);

  const submitLead = trpc.lead.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Thank you — a CM2 advisor will be in touch shortly.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try WhatsApp directly.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    submitLead.mutate({
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      notes: `Project interest: ${form.project}`,
      market: "Abu Dhabi",
      source: "fahid-island-landing",
    });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* SEO handled via useSEO hook */}

      {/* Minimal nav strip */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8E4DE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <span className="text-[#111111] font-medium text-sm tracking-wide cursor-pointer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>
              CM<sup>2</sup>
            </span>
          </Link>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#111111] text-white text-xs font-medium px-4 py-2 rounded-sm hover:bg-[#333] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-14 min-h-[80vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-12 lg:pb-20">
          <div className="max-w-2xl">
            <p className="text-white/70 text-xs tracking-[0.15em] uppercase mb-3">Abu Dhabi · Aldar Properties</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
              Fahid Island
            </h1>
            <p className="text-white/80 text-lg mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
              Waterfront Wellness Living by Aldar
            </p>
            <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-lg">
              Aldar's flagship waterfront masterplan. 11km of coastline between Yas Island and Saadiyat Island. Over 6,000 residences across a premium wellness-led destination.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#111111] text-sm font-medium px-6 py-3 hover:bg-[#F5F3F0] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Request Details on WhatsApp
              </a>
              <a
                href="#enquire"
                className="inline-flex items-center justify-center gap-2 border border-white/60 text-white text-sm font-medium px-6 py-3 hover:bg-white/10 transition-colors"
              >
                Quick Enquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── POSITIONING ── */}
      <section className="py-16 bg-[#F9F8F6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.15em] uppercase text-[#9B8E7E] mb-4">Fahid Island — Abu Dhabi</p>
            <h2 className="text-3xl sm:text-4xl text-[#111111] mb-6 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
              A flagship waterfront masterplan positioned between Abu Dhabi's two strongest investment corridors.
            </h2>
            <p className="text-[#6B6B6B] text-[0.9375rem] leading-relaxed">
              Fahid Island is a premium wellness-led development by Aldar Properties, located between Yas Island and Saadiyat Island on Abu Dhabi's coastline. The masterplan spans over 6,000 residences across 11km of waterfront, with three distinct residential offerings — each designed for a different investor and lifestyle profile.
            </p>
          </div>
        </div>
      </section>

      {/* ── KEY HIGHLIGHTS GRID ── */}
      <section className="py-12 bg-white border-y border-[#E8E4DE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {highlights.map((h) => (
              <div key={h.label} className="text-center">
                <div className="text-2xl mb-2">{h.icon}</div>
                <p className="text-[0.8125rem] text-[#111111] font-medium leading-snug">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PROJECTS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs tracking-[0.15em] uppercase text-[#9B8E7E] mb-3">Three Residential Offerings</p>
          <h2 className="text-3xl sm:text-4xl text-[#111111] mb-12 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            Choose your position on the island.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.slug} className="border border-[#E8E4DE] overflow-hidden group">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 text-[#111111] text-[0.6875rem] tracking-wide uppercase px-2 py-1 font-medium">
                      {project.typeLabel}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl text-[#111111] mb-1 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                    {project.name}
                  </h3>
                  <p className="text-[#9B8E7E] text-xs mb-4">Fahid Island, Abu Dhabi</p>
                  {/* Key facts */}
                  <div className="space-y-1 mb-4">
                    <p className="text-[0.8125rem] text-[#6B6B6B]"><span className="font-medium text-[#111111]">Units:</span> {project.unitTypes}</p>
                    <p className="text-[0.8125rem] text-[#6B6B6B]"><span className="font-medium text-[#111111]">Handover:</span> {project.handover}</p>
                    <p className="text-[0.8125rem] text-[#6B6B6B]"><span className="font-medium text-[#111111]">Pricing:</span> {project.priceRange}</p>
                  </div>
                  {/* Highlights */}
                  <ul className="space-y-1 mb-6">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-[0.8125rem] text-[#6B6B6B]">
                        <span className="text-[#9B8E7E] mt-0.5 flex-shrink-0">—</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  {/* CTAs */}
                  <div className="flex flex-col gap-2">
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center bg-[#111111] text-white text-xs font-medium py-2.5 px-4 hover:bg-[#333] transition-colors"
                    >
                      {project.ctas[0]} — WhatsApp
                    </a>
                    <Link href={`/projects/${project.slug}`}>
                      <span className="block w-full text-center border border-[#E8E4DE] text-[#111111] text-xs font-medium py-2.5 px-4 hover:bg-[#F9F8F6] transition-colors cursor-pointer">
                        {project.ctas[1]} — View Full Details
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST & AUTHORITY ── */}
      <section className="py-16 bg-[#F9F8F6] border-y border-[#E8E4DE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-[#9B8E7E] mb-4">Authorised Partner</p>
              <h2 className="text-2xl sm:text-3xl text-[#111111] mb-4 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                Square Centimeter (CM2) is an authorised sales partner for Aldar Properties.
              </h2>
              <p className="text-[#6B6B6B] text-[0.9375rem] leading-relaxed mb-4">
                CM2 operates as a private property investment advisory. We work with a select number of clients at any time, providing direct access to developer pricing, floor plan analysis, and structured investment guidance — not mass-market brokerage.
              </p>
              <p className="text-[#6B6B6B] text-[0.9375rem] leading-relaxed">
                All Fahid Island projects are sold directly through Aldar Properties. CM2 facilitates access and provides independent advisory support throughout the process.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: "Developer", value: "Aldar Properties — Abu Dhabi's largest listed developer" },
                { label: "Masterplan", value: "Fahid Island — flagship waterfront destination" },
                { label: "Location", value: "Between Yas Island and Saadiyat Island, Abu Dhabi" },
                { label: "CM2 Role", value: "Authorised advisory partner — not a mass broker" },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-[#C8B89A] pl-4">
                  <p className="text-[0.75rem] text-[#9B8E7E] uppercase tracking-wide mb-0.5">{item.label}</p>
                  <p className="text-[0.9rem] text-[#111111]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ── */}
      <section id="enquire" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-[#9B8E7E] mb-4">Enquire Now</p>
              <h2 className="text-3xl sm:text-4xl text-[#111111] mb-4 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                Request full details on Fahid Island.
              </h2>
              <p className="text-[#6B6B6B] text-[0.9375rem] leading-relaxed mb-6">
                A CM2 advisor will respond within 24 hours with pricing, floor plans, and payment plan options for your preferred project.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#111111] text-white text-sm font-medium px-6 py-3 hover:bg-[#333] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Request Details on WhatsApp
              </a>
            </div>
            <div>
              {submitted ? (
                <div className="border border-[#E8E4DE] p-8 text-center">
                  <p className="text-[#111111] text-lg mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Thank you.</p>
                  <p className="text-[#6B6B6B] text-sm">A CM2 advisor will be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[0.75rem] text-[#9B8E7E] uppercase tracking-wide mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-[#E8E4DE] px-4 py-3 text-sm text-[#111111] bg-white focus:outline-none focus:border-[#9B8E7E] transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.75rem] text-[#9B8E7E] uppercase tracking-wide mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-[#E8E4DE] px-4 py-3 text-sm text-[#111111] bg-white focus:outline-none focus:border-[#9B8E7E] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.75rem] text-[#9B8E7E] uppercase tracking-wide mb-1.5">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      className="w-full border border-[#E8E4DE] px-4 py-3 text-sm text-[#111111] bg-white focus:outline-none focus:border-[#9B8E7E] transition-colors"
                      placeholder="+44 or +971..."
                    />
                  </div>
                  <div>
                    <label className="block text-[0.75rem] text-[#9B8E7E] uppercase tracking-wide mb-1.5">Project of Interest</label>
                    <select
                      value={form.project}
                      onChange={(e) => setForm({ ...form, project: e.target.value })}
                      className="w-full border border-[#E8E4DE] px-4 py-3 text-sm text-[#111111] bg-white focus:outline-none focus:border-[#9B8E7E] transition-colors"
                    >
                      <option value="Fahid Island">All Fahid Island Projects</option>
                      <option value="Fahid Beach Residences">Fahid Beach Residences</option>
                      <option value="The Beach House Fahid">The Beach House Fahid</option>
                      <option value="Fahid Beach Terraces">Fahid Beach Terraces</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={submitLead.isPending}
                    className="w-full bg-[#111111] text-white text-sm font-medium py-3 px-6 hover:bg-[#333] transition-colors disabled:opacity-50"
                  >
                    {submitLead.isPending ? "Sending..." : "Send Enquiry"}
                  </button>
                  <p className="text-[0.75rem] text-[#9B8E7E] text-center">
                    Your details are kept confidential and used only to respond to your enquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER DISCLAIMER ── */}
      <footer className="py-8 bg-[#F9F8F6] border-t border-[#E8E4DE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-[0.75rem] text-[#9B8E7E] leading-relaxed max-w-3xl">
            Square Centimeter (CM2) is an authorised sales partner. All prices, availability and payment plans are subject to developer confirmation. Images are computer-generated representations and are indicative only. CM2 does not provide financial or legal advice.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Link href="/"><span className="text-[0.75rem] text-[#9B8E7E] hover:text-[#111111] cursor-pointer transition-colors">CM2 Home</span></Link>
            <Link href="/projects"><span className="text-[0.75rem] text-[#9B8E7E] hover:text-[#111111] cursor-pointer transition-colors">All Projects</span></Link>
            <Link href="/privacy"><span className="text-[0.75rem] text-[#9B8E7E] hover:text-[#111111] cursor-pointer transition-colors">Privacy</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
