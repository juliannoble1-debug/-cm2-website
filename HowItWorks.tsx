/* Design: Quiet Modernism — How It Works page */
import { MessageCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const WA_LINK = "https://wa.me/447424447658";

interface HowItWorksProps {
  onOpenGPT?: () => void;
}

export default function HowItWorks({ onOpenGPT }: HowItWorksProps) {
  useSEO({
    title: "How CM2 Works | Private Property Investment Advisory",
    description: "Discover CM2's structured, discreet process for international property investment. From initial enquiry to completion — clarity at every step.",
    canonical: "https://www.thecm2.com/how-it-works",
  });

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <p className="cm2-label mb-3">How It Works</p>
          <h1 className="text-[2.5rem] sm:text-[3rem] text-[#111111] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            A discreet, structured process.
          </h1>
          <p className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            CM2 is designed for buyers who value clarity over noise. We do not send unsolicited materials. We do not pressure. We provide information when you need it, and a human when you are ready.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-0 mb-16">
          {[
            {
              num: "01",
              title: "Ask CM2 GPT",
              body: "Begin with four brief questions about your objective, preferred market, unit type, and timeline. CM2 GPT is a guided advisory experience — not a real AI — designed to surface the most relevant opportunities from our Aldar portfolio.",
              action: (
                <button onClick={onOpenGPT} className="btn-primary mt-5">
                  Open CM2 GPT
                </button>
              ),
            },
            {
              num: "02",
              title: "Receive a curated shortlist",
              body: "CM2 GPT returns up to three matched opportunities with a hero image, one-liner, key facts, and indicative pricing notes. All pricing is indicative only and subject to availability and confirmation.",
              action: null,
            },
            {
              num: "03",
              title: "Confirm live availability with a CM2 advisor",
              body: "CM2 operates by appointment only. Once you have identified an opportunity of interest, your CM2 advisor will arrange a structured briefing call to understand your objectives in full. A curated shortlist is prepared in advance, alongside verified project materials — floor plans, payment structures, and yield projections — so your time is spent on decisions, not discovery. No reservation is made without human verification.",
              action: (
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-5 inline-flex">
                  <MessageCircle size={15} /> WhatsApp an Advisor
                </a>
              ),
            },
          ].map((step, i) => (
            <div key={step.num} className={`grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 py-10 ${i > 0 ? "border-t border-[#E0DDD8]" : ""}`}>
              <div
                className="text-[3.5rem] leading-none text-[#E0DDD8]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
              >
                {step.num}
              </div>
              <div>
                <h2 className="text-[1.5rem] text-[#111111] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  {step.title}
                </h2>
                <p className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {step.body}
                </p>
                {step.action}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="border border-[#E0DDD8] bg-[#F4F2EE] p-6 max-w-2xl mb-16">
          <p className="cm2-label mb-2">Important</p>
          <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            CM2 GPT does not provide financial advice and does not guarantee returns. Pricing and availability can change. Always confirm with a CM2 advisor before making any decisions. Do not share passports, ID documents, or sensitive personal data in chat.
          </p>
        </div>

        {/* SEO — Who CM2 Serves */}
        <div className="border-t border-[#E0DDD8] pt-12 max-w-2xl">
          <h2 className="text-[1.5rem] text-[#111111] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            London property investment advisory for international buyers
          </h2>
          <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            CM2 is a prime London property advisory UK serving international investors, expats, and high-net-worth individuals from the GCC, Asia-Pacific, and Europe. Whether you are looking for London property investment for UAE investors, seeking to buy London property from Dubai, or exploring London property investment for expats, CM2 provides a structured, discreet process from first enquiry to completion.
          </p>
          <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            CM2 also provides access to Aldar property investment in the UAE — including off-plan property in Dubai and Abu Dhabi residential property — and Aldar-backed property in Egypt through SODIC. All markets are available by appointment. Contact CM2 to begin.
          </p>
        </div>
      </div>
    </div>
  );
}
