import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useSEO } from "@/hooks/useSEO";

const WA_LINK = "https://wa.me/447424457658";
const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/beach-house-fahid-wellness-gym_aebaa71d.jpeg";
const GALLERY_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/beach-house-fahid-hero_4b7f2856.jpeg";

export default function BeachHouseFahid() {
  useSEO({
    title: "The Beach House Fahid Abu Dhabi — Freehold Waterfront Apartments | CM2",
    description: "The Beach House Fahid — studios to 3 bedroom freehold apartments on Fahid Island, Abu Dhabi. Flexible 65/35 payment plan. Wellness amenities. Handover Q4 2029. Enquire with CM2.",
    ogImage: HERO_IMAGE,
    canonical: "https://www.thecm2.com/projects/beach-house-fahid",
  });
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const [submitted, setSubmitted] = useState(false);

  const submitLead = trpc.lead.submit.useMutation({
    onSuccess: () => { setSubmitted(true); toast.success("Thank you — a CM2 advisor will be in touch shortly."); },
    onError: () => { toast.error("Something went wrong. Please try WhatsApp directly."); },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    submitLead.mutate({ name: form.name, email: form.email, whatsapp: form.whatsapp, notes: "The Beach House Fahid", market: "Abu Dhabi", source: "beach-house-fahid-landing" });
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* SEO handled via useSEO hook */}

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8E4DE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/"><span className="text-[#111111] font-medium cursor-pointer" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>CM<sup>2</sup></span></Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#111111] text-white text-xs font-medium px-4 py-2 hover:bg-[#333] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-14 min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-12 lg:pb-20">
          <div className="max-w-2xl">
            <p className="text-white/70 text-xs tracking-[0.15em] uppercase mb-3">Fahid Island · Abu Dhabi · Aldar Properties</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-3 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>The Beach House Fahid</h1>
            <p className="text-white/80 text-lg mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>Freehold waterfront living with a flexible payment plan.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white text-[#111111] text-sm font-medium px-6 py-3 hover:bg-[#F5F3F0] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Get Availability on WhatsApp
              </a>
              <a href="#enquire" className="inline-flex items-center justify-center border border-white/60 text-white text-sm font-medium px-6 py-3 hover:bg-white/10 transition-colors">Schedule a Call</a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-[#F9F8F6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-[#9B8E7E] mb-4">Project Overview</p>
              <h2 className="text-3xl text-[#111111] mb-4 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>An accessible entry point to Aldar's flagship waterfront masterplan.</h2>
              <p className="text-[#6B6B6B] text-[0.9375rem] leading-relaxed mb-4">The Beach House Fahid offers studios to 3 bedroom + maid apartments on Fahid Island, with freehold ownership and a flexible 65/35 payment plan. Handover is scheduled for Q4 2029.</p>
              <p className="text-[#6B6B6B] text-[0.9375rem] leading-relaxed">Suited to investors seeking a lower capital entry point to Fahid Island, as well as owner-occupiers looking for wellness-led waterfront living in Abu Dhabi.</p>
            </div>
            <div className="space-y-3">
              {[
                { label: "Location", value: "Fahid Island, Abu Dhabi" },
                { label: "Unit Types", value: "Studios to 3 bedroom + maid apartments" },
                { label: "Ownership", value: "Freehold" },
                { label: "Payment Plan", value: "Flexible 65/35" },
                { label: "Handover", value: "Q4 2029" },
                { label: "Developer", value: "Aldar Properties" },
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

      {/* Why */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs tracking-[0.15em] uppercase text-[#9B8E7E] mb-4">Why This Project</p>
          <h2 className="text-2xl sm:text-3xl text-[#111111] mb-8 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Five reasons to consider The Beach House Fahid.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Freehold Ownership", body: "Full freehold title on Fahid Island — one of Abu Dhabi's most significant new waterfront addresses." },
              { title: "Flexible 65/35 Payment Plan", body: "65% during construction, 35% on handover — reduces capital commitment and improves cash flow management." },
              { title: "Wellness Amenities", body: "Resort-style facilities including fitness centre, yoga studio, and pool — aligned with premium lifestyle demand." },
              { title: "Strategic Location", body: "Between Yas Island and Saadiyat Island — two of Abu Dhabi's most established and liquid investment corridors." },
              { title: "Broad Unit Mix", body: "Studios to 3-bed + maid accommodates both entry-level investors and family buyers within the same development." },
            ].map((item) => (
              <div key={item.title} className="border border-[#E8E4DE] p-6">
                <h3 className="text-base text-[#111111] font-medium mb-2">{item.title}</h3>
                <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 bg-[#F9F8F6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img src={HERO_IMAGE} alt="The Beach House Fahid wellness amenities" className="w-full h-64 object-cover" loading="lazy" />
            <img src={GALLERY_IMAGE} alt="The Beach House Fahid exterior" className="w-full h-64 object-cover" loading="lazy" />
          </div>
          <p className="text-[0.6875rem] text-[#9B8E7E] mt-2">Computer-generated images. Indicative only.</p>
        </div>
      </section>

      {/* Trust */}
      <section className="py-12 bg-white border-y border-[#E8E4DE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs tracking-[0.15em] uppercase text-[#9B8E7E] mb-3">Authorised Partner</p>
          <p className="text-[#111111] text-base max-w-2xl leading-relaxed">Square Centimeter (CM2) is an authorised sales partner for Aldar Properties. We provide independent advisory support — not mass-market brokerage. All transactions are completed directly with Aldar.</p>
          <Link href="/projects/fahid-island"><span className="inline-block mt-4 text-sm text-[#9B8E7E] hover:text-[#111111] cursor-pointer transition-colors">← View all Fahid Island projects</span></Link>
        </div>
      </section>

      {/* CTA */}
      <section id="enquire" className="py-20 bg-[#F9F8F6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-[#9B8E7E] mb-4">Get Availability</p>
              <h2 className="text-3xl sm:text-4xl text-[#111111] mb-4 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Request availability and payment plan details.</h2>
              <p className="text-[#6B6B6B] text-[0.9375rem] leading-relaxed mb-6">A CM2 advisor will respond within 24 hours with current availability, floor plans, and the 65/35 payment plan breakdown.</p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#111111] text-white text-sm font-medium px-6 py-3 hover:bg-[#333] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Get Availability on WhatsApp
              </a>
            </div>
            <div>
              {submitted ? (
                <div className="border border-[#E8E4DE] p-8 text-center bg-white">
                  <p className="text-[#111111] text-lg mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Thank you.</p>
                  <p className="text-[#6B6B6B] text-sm">A CM2 advisor will be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 border border-[#E8E4DE]">
                  <div>
                    <label className="block text-[0.75rem] text-[#9B8E7E] uppercase tracking-wide mb-1.5">Full Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-[#E8E4DE] px-4 py-3 text-sm text-[#111111] bg-white focus:outline-none focus:border-[#9B8E7E] transition-colors" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-[0.75rem] text-[#9B8E7E] uppercase tracking-wide mb-1.5">Email Address *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-[#E8E4DE] px-4 py-3 text-sm text-[#111111] bg-white focus:outline-none focus:border-[#9B8E7E] transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-[0.75rem] text-[#9B8E7E] uppercase tracking-wide mb-1.5">WhatsApp Number</label>
                    <input type="tel" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full border border-[#E8E4DE] px-4 py-3 text-sm text-[#111111] bg-white focus:outline-none focus:border-[#9B8E7E] transition-colors" placeholder="+44 or +971..." />
                  </div>
                  <button type="submit" disabled={submitLead.isPending} className="w-full bg-[#111111] text-white text-sm font-medium py-3 px-6 hover:bg-[#333] transition-colors disabled:opacity-50">
                    {submitLead.isPending ? "Sending..." : "Send Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-white border-t border-[#E8E4DE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-[0.75rem] text-[#9B8E7E] leading-relaxed max-w-3xl">Square Centimeter (CM2) is an authorised sales partner. All prices, availability and payment plans are subject to developer confirmation. Images are computer-generated representations and are indicative only.</p>
          <div className="mt-4 flex items-center gap-4">
            <Link href="/"><span className="text-[0.75rem] text-[#9B8E7E] hover:text-[#111111] cursor-pointer transition-colors">CM2 Home</span></Link>
            <Link href="/projects/fahid-island"><span className="text-[0.75rem] text-[#9B8E7E] hover:text-[#111111] cursor-pointer transition-colors">Fahid Island</span></Link>
            <Link href="/projects"><span className="text-[0.75rem] text-[#9B8E7E] hover:text-[#111111] cursor-pointer transition-colors">All Projects</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
