/* Design: Quiet Modernism — Contact page */
import { MessageCircle, Phone, MapPin } from "lucide-react";
import InvestorLeadForm from "@/components/InvestorLeadForm";
import { useSEO } from "@/hooks/useSEO";

const WA_LINK = "https://wa.me/447424447658";

export default function Contact() {
  useSEO({
    title: "Contact CM2 | Private Property Investment Enquiries",
    description: "Get in touch with CM2 for discreet, expert guidance on London, UAE, and Egypt property investments. WhatsApp, email, or submit an enquiry form.",
    canonical: "https://www.thecm2.com/contact",
  });

  return (
    <div className="min-h-screen py-20">
      <div className="container">

        {/* Page header */}
        <div className="max-w-2xl mb-16">
          <p className="cm2-label mb-3">Contact</p>
          <h1
            className="text-[2.5rem] sm:text-[3.25rem] text-[#111111] mb-5 leading-[1.1]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
          >
            Get in Touch
          </h1>
          <h2
            className="text-[1.375rem] sm:text-[1.625rem] text-[#6B6B6B] mb-6 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "italic" }}
          >
            Let's Start the Conversation
          </h2>
          <p
            className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            We are here to help you secure the right property or investment aligned with your objectives.
            Speak with us directly to discuss current opportunities in London and the UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left: Contact details */}
          <div>
            {/* WhatsApp CTA */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex mb-10"
            >
              <MessageCircle size={15} /> WhatsApp an Advisor
            </a>

            <div className="cm2-rule mb-10" />

            {/* Phone */}
            <div className="mb-8">
              <p className="cm2-label mb-2 flex items-center gap-1.5">
                <Phone size={11} className="opacity-60" /> Call us
              </p>
              <a
                href="tel:+442038728065"
                className="text-[1rem] text-[#111111] hover:text-[#6B6B6B] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                +44 (0)203 872 8065
              </a>
            </div>

            {/* Registered Office */}
            <div className="mb-8">
              <p className="cm2-label mb-2 flex items-center gap-1.5">
                <MapPin size={11} className="opacity-60" /> Registered Office
              </p>
              <address
                className="not-italic text-[0.9375rem] text-[#6B6B6B] leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Square Centimetre Ltd<br />
                5 Brayford Square<br />
                London<br />
                England<br />
                E1 0SN
              </address>
            </div>

            {/* Markets */}
            <div>
              <p className="cm2-label mb-2">Markets</p>
              <p
                className="text-[0.875rem] text-[#6B6B6B]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                London · Abu Dhabi · Dubai · Egypt
              </p>
            </div>
          </div>

          {/* Right: Standardised investor lead form */}
          <div>
            <p
              className="text-[0.875rem] text-[#6B6B6B] mb-6 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Prefer a written request? Complete the form below and a CM2 advisor will be in touch within 24 hours.
            </p>
            <InvestorLeadForm
              pageSource="contact"
              title="Request a Shortlist"
              submitLabel="Send Request"
              showNotes={true}
              showTimeline={true}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
