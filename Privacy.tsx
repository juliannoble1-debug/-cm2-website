/* Design: Quiet Modernism — Privacy page */
import { MessageCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const WA_LINK = "https://wa.me/447424447658";

export default function Privacy() {
  useSEO({
    title: "Privacy Policy | CM2 Square Centimeter",
    description: "CM2 collects only the minimum information necessary to provide our concierge service. We do not sell, share, or misuse your data.",
    canonical: "https://www.thecm2.com/privacy",
  });

  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-3xl">
        <p className="cm2-label mb-3">Privacy</p>
        <h1 className="text-[2.5rem] sm:text-[3rem] text-[#111111] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
          Your information, handled with care.
        </h1>
        <p className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed mb-12" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          CM2 collects only the minimum information necessary to provide our concierge service. We do not sell, share, or misuse your data.
        </p>

        <div className="space-y-10">
          {/* What we collect */}
          <div>
            <p className="cm2-label mb-4">Information We May Collect</p>
            <ul className="space-y-3">
              {[
                "Contact details you provide voluntarily — name, WhatsApp number, and optionally email — when submitting a request through CM2 GPT or our contact form.",
                "Preference data from the CM2 GPT qualification flow — your stated investment objective, market preference, unit type, and timeline.",
                "Basic usage information — pages visited and interactions with CM2 GPT — to improve the quality of our service.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[0.875rem] text-[#6B6B6B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C0BDB8] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="cm2-rule" />

          {/* How we use it */}
          <div>
            <p className="cm2-label mb-4">How We Use It</p>
            <ul className="space-y-3">
              {[
                "To respond to your enquiry and provide a personalised property shortlist.",
                "To connect you with a CM2 advisor for live availability confirmation.",
                "To improve our concierge service and the quality of CM2 GPT recommendations.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[0.875rem] text-[#6B6B6B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C0BDB8] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="cm2-rule" />

          {/* Retention */}
          <div>
            <p className="cm2-label mb-3">Retention</p>
            <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              We retain your information only for as long as necessary to provide the service you requested and to comply with applicable legal obligations. You may request deletion of your data at any time by contacting us on WhatsApp.
            </p>
          </div>

          <div className="cm2-rule" />

          {/* Contact */}
          <div>
            <p className="cm2-label mb-3">Contact</p>
            <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              For any privacy-related questions or requests, please contact us directly on WhatsApp.
            </p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
              <MessageCircle size={15} /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
