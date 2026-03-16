/* High-conversion property landing page component
 * Structure: Hero → Overview → Why → Units Snapshot → Visuals → Trust → CTA
 * No nav distractions. WhatsApp CTA above fold and at bottom.
 * Mobile-first. All forms route to tRPC lead.submit.
 */
import { useEffect } from "react";
import { MessageCircle, CheckCircle, Shield, ChevronDown } from "lucide-react";
import InvestorLeadForm from "@/components/InvestorLeadForm";

const WA_NUMBER = "447424447658";
const CM2_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-logo-transparent_3206076e.png";

export interface LandingPageData {
  slug: string;
  name: string;
  location: string;          // e.g. "Saadiyat Island, Abu Dhabi"
  market: string;            // "Abu Dhabi" | "Dubai" | "London"
  investmentPositioning: string; // one-line
  heroImage: string;
  galleryImages?: string[];
  overview: string;          // short paragraph
  forInvestors?: string;     // one sentence
  forEndUsers?: string;      // one sentence
  ticketFrom: string;        // e.g. "USD 1M"
  ticketTo?: string;         // e.g. "USD 5M+"
  whyPoints: string[];       // 3–5 bullets
  unitTypes: string;         // e.g. "1–3 bed apartments, penthouses"
  startingPrice: string;     // e.g. "From USD 1.2M (indicative)"
  handover?: string;         // e.g. "Q4 2027"
  developer: string;         // e.g. "Aldar Properties"
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
}


function WAButton({ projectName, slug }: { projectName: string; slug: string }) {
  const message = encodeURIComponent(`Hi CM2, I'd like to know more about ${projectName}. Please send me the details.`);
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-medium px-6 py-3.5 transition-all hover:bg-[#1ebe5d] w-full justify-center"
      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", borderRadius: "2px" }}
    >
      <MessageCircle size={18} />
      Request Details on WhatsApp
    </a>
  );
}

export default function ProjectLandingPage({ data }: { data: LandingPageData }) {
  // Update document title and meta for SEO
  useEffect(() => {
    document.title = data.seoTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", data.seoDescription);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", data.seoTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", data.seoDescription);
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute("content", data.ogImage);

    // Per-page canonical URL
    const pageCanonical = `https://www.thecm2.com/projects/${data.slug}`;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute("href", pageCanonical);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", pageCanonical);

    // RealEstateListing schema for each project page
    const schemaId = `schema-real-estate-${data.slug}`;
    let schemaScript = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": data.name,
      "description": data.seoDescription,
      "url": pageCanonical,
      "image": data.ogImage,
      "offers": {
        "@type": "Offer",
        "priceCurrency": data.market === "London" ? "GBP" : data.market === "Egypt" ? "EGP" : "AED",
        "price": data.startingPrice,
        "availability": "https://schema.org/InStock"
      },
      "provider": {
        "@type": "Organization",
        "name": "CM2 — Square Centimeter Property Advisory",
        "url": "https://www.thecm2.com"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": data.location,
        "addressCountry": data.market === "London" ? "GB" : data.market === "Egypt" ? "EG" : "AE"
      }
    });

    return () => {
      document.title = "CM2 | Prime Property Investment Advisory";
      if (desc) desc.setAttribute("content", "CM2 curates prime property investments across London, UAE, and Egypt. Aldar developments, off-plan advisory, and institutional-grade guidance.");
      if (canonicalLink) canonicalLink.setAttribute("href", "https://www.thecm2.com");
      if (ogUrl) ogUrl.setAttribute("content", "https://www.thecm2.com");
      const existingSchema = document.getElementById(schemaId);
      if (existingSchema) existingSchema.remove();
    };
  }, [data]);

  const waMessage = encodeURIComponent(`Hi CM2, I'd like to know more about ${data.name}. Please send me the details.`);

  return (
    <div className="min-h-screen bg-[#FAFAF8] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={data.heroImage}
            alt={data.name}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/70 via-[#111111]/50 to-[#111111]/80" />
        </div>

        {/* Minimal top bar — logo only, no nav */}
        <div className="relative z-10 px-6 pt-6 pb-0">
          <a href="/" className="inline-block">
            <img src={CM2_LOGO} alt="CM2 Square Centimeter" className="h-10 w-auto object-contain brightness-0 invert" />
          </a>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="w-full max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: text */}
            <div>
              <p className="text-[0.6875rem] font-medium tracking-[0.2em] uppercase text-[#C0BDB8] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {data.market} · {data.location}
              </p>
              <h1
                className="text-[2.5rem] sm:text-[3.25rem] leading-[1.05] text-white mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                {data.name}
              </h1>
              <p className="text-[1rem] text-[#E0DDD8] leading-relaxed mb-8 max-w-md" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {data.investmentPositioning}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-medium px-6 py-3.5 hover:bg-[#1ebe5d] transition-colors justify-center"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9375rem", borderRadius: "2px" }}
                >
                  <MessageCircle size={18} />
                  Request Details on WhatsApp
                </a>
              </div>
              <p className="text-[0.75rem] text-[#9B9B9B] mt-4 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Indicative pricing only. Subject to availability and confirmation.
              </p>
            </div>

            {/* Right: enquiry form */}
            <div className="bg-[#FAFAF8] p-6 sm:p-8" style={{ borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
              <p className="text-[0.6875rem] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Quick Enquiry
              </p>
              <h2 className="text-[1.375rem] text-[#111111] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                Receive full project details
              </h2>
              <InvestorLeadForm
                pageSource={`project_${data.slug}`}
                projectSlug={data.slug}
                submitLabel={`Request Details on ${data.name}`}
                showNotes={false}
                showTimeline={false}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 flex justify-center pb-8">
          <ChevronDown size={20} className="text-white/50 animate-bounce" />
        </div>
      </section>

      {/* ── PROJECT OVERVIEW ── */}
      <section className="py-20 border-b border-[#E0DDD8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="cm2-label mb-4">Project Overview</p>
              <h2 className="text-[1.875rem] sm:text-[2.25rem] text-[#111111] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                {data.name}
              </h2>
              <p className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {data.overview}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.forInvestors && (
                  <div className="bg-[#111111] text-[#FAFAF8] p-5">
                    <p className="text-[0.6875rem] tracking-[0.15em] uppercase text-[#9B9B9B] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>For Investors</p>
                    <p className="text-[0.875rem] text-[#E0DDD8] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{data.forInvestors}</p>
                  </div>
                )}
                {data.forEndUsers && (
                  <div className="bg-[#F4F2EE] border border-[#E0DDD8] p-5">
                    <p className="text-[0.6875rem] tracking-[0.15em] uppercase text-[#6B6B6B] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>For End-Users</p>
                    <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{data.forEndUsers}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Key facts sidebar */}
            <div className="border border-[#E0DDD8] p-6 self-start">
              <p className="cm2-label mb-5">At a Glance</p>
              <div className="space-y-4">
                <div>
                  <p className="text-[0.6875rem] tracking-[0.12em] uppercase text-[#9B9B9B] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Location</p>
                  <p className="text-[0.875rem] text-[#111111] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{data.location}</p>
                </div>
                <div className="h-px bg-[#E0DDD8]" />
                <div>
                  <p className="text-[0.6875rem] tracking-[0.12em] uppercase text-[#9B9B9B] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Developer</p>
                  <p className="text-[0.875rem] text-[#111111] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{data.developer}</p>
                </div>
                <div className="h-px bg-[#E0DDD8]" />
                <div>
                  <p className="text-[0.6875rem] tracking-[0.12em] uppercase text-[#9B9B9B] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Ticket Range</p>
                  <p className="text-[0.875rem] text-[#111111] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {data.ticketFrom}{data.ticketTo ? ` – ${data.ticketTo}` : "+"}
                  </p>
                </div>
                {data.handover && (
                  <>
                    <div className="h-px bg-[#E0DDD8]" />
                    <div>
                      <p className="text-[0.6875rem] tracking-[0.12em] uppercase text-[#9B9B9B] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Handover</p>
                      <p className="text-[0.875rem] text-[#111111] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{data.handover}</p>
                    </div>
                  </>
                )}
                <div className="h-px bg-[#E0DDD8]" />
                <WAButton projectName={data.name} slug={data.slug} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY THIS PROJECT ── */}
      <section className="py-20 bg-[#F4F2EE] border-b border-[#E0DDD8]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="cm2-label mb-4">Why This Project</p>
          <h2 className="text-[1.875rem] sm:text-[2.25rem] text-[#111111] mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            The investment case, clearly stated.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E0DDD8]">
            {data.whyPoints.map((point, i) => (
              <div key={i} className="bg-[#F4F2EE] p-7 flex gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle size={16} className="text-[#111111]" />
                </div>
                <p className="text-[0.9375rem] text-[#111111] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNITS SNAPSHOT ── */}
      <section className="py-20 border-b border-[#E0DDD8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="cm2-label mb-4">Units Snapshot</p>
              <h2 className="text-[1.875rem] sm:text-[2.25rem] text-[#111111] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                What is available.
              </h2>
              <div className="space-y-5">
                <div className="flex gap-5 items-start">
                  <div className="w-1 h-full bg-[#E0DDD8] flex-shrink-0 self-stretch" />
                  <div>
                    <p className="text-[0.6875rem] tracking-[0.15em] uppercase text-[#9B9B9B] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Unit Types</p>
                    <p className="text-[1rem] text-[#111111] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{data.unitTypes}</p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-1 h-full bg-[#E0DDD8] flex-shrink-0 self-stretch" />
                  <div>
                    <p className="text-[0.6875rem] tracking-[0.15em] uppercase text-[#9B9B9B] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Starting Price</p>
                    <p className="text-[1rem] text-[#111111] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{data.startingPrice}</p>
                  </div>
                </div>
                {data.handover && (
                  <div className="flex gap-5 items-start">
                    <div className="w-1 h-full bg-[#E0DDD8] flex-shrink-0 self-stretch" />
                    <div>
                      <p className="text-[0.6875rem] tracking-[0.15em] uppercase text-[#9B9B9B] mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Handover</p>
                      <p className="text-[1rem] text-[#111111] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{data.handover}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-8">
                <p className="text-[0.75rem] text-[#9B9B9B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  All pricing is indicative and subject to confirmation. Availability changes. Speak to a CM2 advisor for live inventory.
                </p>
              </div>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-3">
              {(data.galleryImages || [data.heroImage]).slice(0, 4).map((img, i) => (
                <div key={i} className={`overflow-hidden ${i === 0 ? "col-span-2 h-52" : "h-36"}`}>
                  <img src={img} alt={`${data.name} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                </div>
              ))}
              {(!data.galleryImages || data.galleryImages.length < 2) && (
                <div className="h-36 overflow-hidden">
                  <img src={data.heroImage} alt={data.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST & AUTHORITY ── */}
      <section className="py-16 bg-[#111111] border-b border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-shrink-0">
              <img src={CM2_LOGO} alt="CM2" className="h-10 w-auto object-contain brightness-0 invert opacity-80" />
            </div>
            <div className="h-px md:h-12 w-full md:w-px bg-[#2A2A2A]" />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex gap-3 items-start">
                <Shield size={16} className="text-[#9B9B9B] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[0.8125rem] text-white font-medium mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Authorised Partner</p>
                  <p className="text-[0.75rem] text-[#9B9B9B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>CM2 is an authorised partner of {data.developer}. All information is based on approved developer materials.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Shield size={16} className="text-[#9B9B9B] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[0.8125rem] text-white font-medium mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Advisory, Not Brokerage</p>
                  <p className="text-[0.75rem] text-[#9B9B9B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>CM2 operates as a private advisory. We do not mass-market or share your enquiry with third parties.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Shield size={16} className="text-[#9B9B9B] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[0.8125rem] text-white font-medium mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Human Verification</p>
                  <p className="text-[0.75rem] text-[#9B9B9B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>No reservation proceeds without a direct conversation with a CM2 advisor. Pricing confirmed live.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="cm2-label mb-4">Ready to Proceed?</p>
              <h2
                className="text-[2rem] sm:text-[2.75rem] text-[#111111] mb-6 leading-[1.1]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                Get the full picture on {data.name}.
              </h2>
              <p className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed mb-8 max-w-md" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A CM2 advisor will send you the full project pack — floor plans, pricing guide, payment schedule, and availability — within 24 hours.
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-medium px-7 py-4 hover:bg-[#1ebe5d] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", borderRadius: "2px" }}
              >
                <MessageCircle size={20} />
                Request Details on WhatsApp
              </a>
              <p className="text-[0.75rem] text-[#9B9B9B] mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                +44 7424 457658 · Available 7 days a week
              </p>
            </div>

            <div className="bg-white border border-[#E0DDD8] p-7 sm:p-8">
              <p className="text-[0.6875rem] tracking-[0.15em] uppercase text-[#6B6B6B] mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Or send a quick enquiry
              </p>
              <h3 className="text-[1.25rem] text-[#111111] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                We will respond within 24 hours.
              </h3>
              <InvestorLeadForm
                pageSource={`project_${data.slug}`}
                projectSlug={data.slug}
                submitLabel={`Request Details on ${data.name}`}
                showNotes={false}
                showTimeline={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <div className="py-6 border-t border-[#E0DDD8] bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="inline-block">
            <img src={CM2_LOGO} alt="CM2" className="h-7 w-auto object-contain" />
          </a>
          <p className="text-[0.75rem] text-[#9B9B9B] text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            © {new Date().getFullYear()} Square Centimeter (CM2). Indicative pricing only. Subject to availability. &nbsp;
            <a href="/privacy" className="underline hover:text-[#111111] transition-colors">Privacy</a>
            &nbsp;·&nbsp;
            <a href="/trust" className="underline hover:text-[#111111] transition-colors">Trust</a>
          </p>
        </div>
      </div>

    </div>
  );
}
