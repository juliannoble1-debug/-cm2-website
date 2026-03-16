/* Design: Quiet Modernism — Thank you page
 * Updated: improved messaging, Browse London Projects + Speak to an Advisor CTAs
 */
import { Link } from "wouter";
import { MessageCircle, CheckCircle, ArrowRight, BookOpen } from "lucide-react";

const WA_LINK = "https://wa.me/447424447658?text=Hi%2C%20I%20just%20submitted%20an%20enquiry%20on%20the%20CM2%20website%20and%20would%20like%20to%20speak%20with%20an%20advisor.";

export default function ThankYou() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20">
      <div className="container max-w-2xl text-center stagger-children">

        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.3)" }}
          >
            <CheckCircle size={28} style={{ color: "#C9A96E" }} strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading */}
        <p className="cm2-label mb-3">Enquiry Received</p>
        <h1
          className="text-[#111111] mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(2.25rem, 5vw, 3rem)" }}
        >
          Thank you for your enquiry.
        </h1>
        <p
          className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed mb-3 max-w-lg mx-auto"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          A CM2 advisor will review your requirements and respond within <strong>48 hours</strong> with a bespoke shortlist of opportunities matched to your criteria.
        </p>
        <p
          className="text-[0.875rem] text-[#9B9B9B] leading-relaxed mb-10 max-w-md mx-auto"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Check your inbox — we have also sent you a copy of our <em>London Investment Brief</em> to read at your convenience.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2 justify-center"
          >
            <MessageCircle size={15} strokeWidth={1.5} />
            Speak to an Advisor Now
          </a>
          <Link href="/current-opportunities" className="btn-primary flex items-center gap-2 justify-center">
            Browse Current Opportunities
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Secondary links */}
        <div
          className="border-t border-[#E0DDD8] pt-8 flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link
            href="/london-investment-brief"
            className="flex items-center gap-2 text-[0.8125rem] text-[#6B6B6B] hover:text-[#111111] transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <BookOpen size={14} strokeWidth={1.5} />
            Download London Investment Brief
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[0.8125rem] text-[#6B6B6B] hover:text-[#111111] transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <ArrowRight size={14} strokeWidth={1.5} />
            Read our Insights
          </Link>
        </div>

      </div>
    </div>
  );
}
