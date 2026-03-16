/**
 * FloatingContactButtons
 * Site-wide fixed floating buttons:
 *   — Bottom-left:  WhatsApp "Speak with an Advisor" (green)
 *   — Bottom-right: "Request Investment Brief" (gold, opens Contact page)
 *
 * The CM2 AI chat button (FloatingGPTButton) is positioned bottom-left
 * above the WhatsApp button at z-50, so there is no overlap.
 *
 * Both buttons appear after 300px of scroll and fade in smoothly.
 * They are hidden on the London Brief page (which has its own floating buttons).
 * They are also hidden on the /admin page.
 *
 * On mobile (< 768px), the buttons shift up by the MobileStickyBar height (56px)
 * once the user has scrolled past the hero, to avoid overlap with the sticky bar.
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { MessageCircle, Mail } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";
import { MOBILE_STICKY_BAR_HEIGHT } from "./MobileStickyBar";

const WA_LINK = "https://wa.me/447424447658?text=Hi%2C%20I%20would%20like%20to%20speak%20with%20a%20CM2%20advisor%20about%20property%20investment.";

// Pages where floating buttons should NOT appear (they have their own CTAs)
const HIDDEN_PATHS = new Set([
  "/london-investment-brief",
  "/admin",
]);

export default function FloatingContactButtons() {
  const [visible, setVisible] = useState(false);
  const [location] = useLocation();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [barVisible, setBarVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 300;
      setVisible(scrolled);
      // On mobile, the sticky bar appears after ~100vh scroll
      setBarVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Hide on certain pages
  if (HIDDEN_PATHS.has(location)) return null;

  // On mobile, shift buttons up when the sticky bar is visible
  const mobileOffset = isMobile && barVisible ? MOBILE_STICKY_BAR_HEIGHT : 0;
  const bottomBase = 24; // bottom-6 = 1.5rem = 24px
  const bottomPx = bottomBase + mobileOffset;

  const base =
    "fixed z-50 flex items-center gap-2 rounded-full shadow-lg transition-all duration-300 text-[0.8125rem] font-medium";
  const shown = "opacity-100 translate-y-0 pointer-events-auto";
  const hidden = "opacity-0 translate-y-4 pointer-events-none";

  return (
    <>
      {/* WhatsApp — bottom-left */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Speak with a CM2 advisor on WhatsApp"
        onClick={() => trackWhatsAppClick("floating-whatsapp-button")}
        className={`${base} left-4 sm:left-6 bg-[#25D366] text-white px-4 py-3 hover:bg-[#1ebe5d] ${visible ? shown : hidden}`}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          bottom: `${bottomPx}px`,
          transition: "opacity 0.3s, transform 0.3s, bottom 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <MessageCircle size={16} strokeWidth={1.5} className="flex-shrink-0" />
        <span className="hidden sm:inline">Speak with an Advisor</span>
      </a>

      {/* Request Investment Brief — bottom-right */}
      <Link
        href="/contact"
        aria-label="Request Investment Brief — contact CM2"
        className={`${base} right-4 sm:right-6 bg-[#C9A96E] text-white px-4 py-3 hover:bg-[#b8924f] ${visible ? shown : hidden}`}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          bottom: `${bottomPx}px`,
          transition: "opacity 0.3s, transform 0.3s, bottom 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <Mail size={16} strokeWidth={1.5} className="flex-shrink-0" />
        <span className="hidden sm:inline">Request Investment Brief</span>
      </Link>
    </>
  );
}
