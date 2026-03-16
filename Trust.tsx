/* Design: Quiet Modernism — Trust & Compliance page */
import { CheckCircle, MessageCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const WA_LINK = "https://wa.me/447424447658";

export default function Trust() {
  useSEO({
    title: "Trust & Transparency | CM2 Property Advisory",
    description: "CM2 operates with a single standard: accurate, approved information. Discover our commitment to transparency, compliance, and investor protection.",
    canonical: "https://www.thecm2.com/trust",
  });

  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-3xl">
        <p className="cm2-label mb-3">Trust &amp; Compliance</p>
        <h1 className="text-[2.5rem] sm:text-[3rem] text-[#111111] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
          Our commitment to clarity.
        </h1>
        <p className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed mb-12" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          CM2 operates with a single standard: provide accurate, approved information and let buyers make informed decisions. We do not overclaim, pressure, or speculate.
        </p>

        {/* Trust bullets */}
        <div className="mb-12">
          <p className="cm2-label mb-5">Our Standards</p>
          <ul className="space-y-4">
            {[
              "Official Aldar and Aldar-backed projects only — no third-party or unverified listings.",
              "Indicative pricing only, subject to availability and confirmation.",
              "No sensitive documents requested in chat — we do not ask for passports, IDs, or financial statements via CM2 GPT.",
              "Human verification before any reservation — no automated commitments.",
              "CM2 is an Aldar partner. All information is based on approved developer materials.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[0.9375rem] text-[#6B6B6B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-[#111111]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="cm2-rule mb-12" />

        {/* Important notes */}
        <div className="mb-12">
          <p className="cm2-label mb-5">Important Notes</p>
          <div className="space-y-5">
            {[
              {
                title: "Pricing and availability",
                body: "Pricing and availability can change. Always confirm with a CM2 advisor before making decisions. All pricing shown or discussed is indicative only.",
              },
              {
                title: "Not financial advice",
                body: "CM2 GPT does not provide financial advice and does not guarantee returns. Nothing on this website constitutes investment advice. Seek independent financial counsel before making investment decisions.",
              },
              {
                title: "Data security",
                body: "Do not share passports, ID documents, or sensitive personal data in chat. CM2 will never request such documents through CM2 GPT or any chat interface.",
              },
            ].map((note, i) => (
              <div key={i} className="border-l-2 border-[#E0DDD8] pl-5">
                <h3 className="text-[1rem] text-[#111111] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  {note.title}
                </h3>
                <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="cm2-rule mb-12" />

        {/* Developer Partnerships */}
        <div className="mb-12">
          <p className="cm2-label mb-5">Developer Partnerships</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-[#E0DDD8] bg-[#FAFAF8] p-6" style={{ borderRadius: 2 }}>
              <p className="text-[0.6875rem] tracking-[0.18em] uppercase font-medium mb-2" style={{ color: "#C9A96E", fontFamily: "'DM Sans', sans-serif" }}>Authorised Partner</p>
              <h3 className="text-[1.125rem] text-[#111111] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Aldar Properties</h3>
              <p className="text-[0.8125rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                CM2 is an authorised sales partner for Aldar Properties — Abu Dhabi's largest listed developer, operating across the UAE and Egypt through SODIC.
              </p>
            </div>
            <div className="border border-[#E0DDD8] bg-[#FAFAF8] p-6" style={{ borderRadius: 2 }}>
              <p className="text-[0.6875rem] tracking-[0.18em] uppercase font-medium mb-2" style={{ color: "#C9A96E", fontFamily: "'DM Sans', sans-serif" }}>Authorised Partner</p>
              <h3 className="text-[1.125rem] text-[#111111] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>London Square</h3>
              <p className="text-[0.8125rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                CM2 is an authorised partner for London Square — a leading London residential developer delivering prime Zone 1 and Zone 2 developments.
              </p>
            </div>
          </div>
        </div>

        <div className="cm2-rule mb-12" />

        {/* Case Study */}
        <div className="mb-12">
          <p className="cm2-label mb-5">Client Outcome</p>
          <div className="border border-[#E0DDD8] bg-[#FAFAF8] p-8" style={{ borderRadius: 2 }}>
            <p
              className="text-[0.6875rem] tracking-[0.18em] uppercase font-medium mb-4"
              style={{ color: "#C9A96E", fontFamily: "'DM Sans', sans-serif" }}
            >
              Anonymised — Placeholder
            </p>
            <h3
              className="text-[1.375rem] text-[#111111] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
            >
              UAE investor. London capital preservation objective.
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              {[
                { label: "Investor Profile", value: "UAE-based, GCC national. Capital deployment objective." },
                { label: "Market", value: "London — Zone 1 / Zone 2 riverside" },
                { label: "Outcome", value: "Off-plan reservation within 14 days of first enquiry." },
              ].map((item) => (
                <div key={item.label}>
                  <p className="cm2-label mb-1.5">{item.label}</p>
                  <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Following an initial CM2 GPT session, the investor was matched with two London riverside developments aligned to their capital preservation objective and 10-year horizon. A structured briefing call was arranged within 48 hours. Verified floor plans, payment structures, and comparable transaction data were prepared in advance. The investor proceeded to reservation within two weeks of first contact.
            </p>
            <p className="text-[0.75rem] text-[#9B9B9B] mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              This case study is illustrative. Live transaction data will replace this placeholder when available.
            </p>
          </div>
        </div>

        <div className="cm2-rule mb-10" />

        <div className="flex flex-wrap gap-3 mb-16">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle size={15} /> WhatsApp an Advisor
          </a>
        </div>

        <div className="border-t border-[#E0DDD8] pt-12">
          <h2 className="text-[1.5rem] text-[#111111] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            CM2 property advisory London — authorised partner for Aldar and London Square
          </h2>
          <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            CM2 is an authorised sales partner for Aldar Properties and London Square — two of the most respected residential developers operating across London, UAE, and Egypt. As a prime London property advisory, CM2 provides London residential property for international investors with institutional-grade analysis and a transparent, no-pressure process.
          </p>
          <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            For UAE-based buyers seeking to buy property in London from UAE, CM2 offers a structured advisory process covering London property investment for expats and GCC nationals. CM2 also provides access to Aldar property investment in Dubai and Abu Dhabi, and Aldar-backed property in Egypt through SODIC — including SODIC East Egypt, Karmell Egypt Aldar, and EASTVALE Egypt property investment.
          </p>
        </div>
      </div>
    </div>
  );
}
