/**
 * FloatingGPTButton — "Ask CM2 AI" chat widget
 *
 * Positioned bottom-LEFT, stacked above the WhatsApp button, to avoid
 * any conflict with the "Request Investment Brief" CTA on the bottom-RIGHT.
 *
 * On mobile (< 768px), shifts up by the MobileStickyBar height (56px)
 * once the user has scrolled past the hero, to avoid overlap.
 */
import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { MOBILE_STICKY_BAR_HEIGHT } from "./MobileStickyBar";

interface FloatingGPTButtonProps {
  onClick: () => void;
}

export default function FloatingGPTButton({ onClick }: FloatingGPTButtonProps) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [barVisible, setBarVisible] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setBarVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On mobile, shift up when sticky bar is visible
  // Base: 5.5rem (88px) above WhatsApp. WhatsApp shifts up by mobileOffset too,
  // so GPT button stays 64px above WhatsApp regardless.
  const mobileOffset = isMobile && barVisible ? MOBILE_STICKY_BAR_HEIGHT : 0;
  const bottomPx = 88 + mobileOffset; // 5.5rem = 88px

  return (
    <button
      onClick={onClick}
      className="fixed z-50 flex items-center gap-1.5 hover:opacity-90 hover:-translate-y-0.5"
      style={{
        bottom: `${bottomPx}px`,
        left: "1rem",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.75rem",
        fontWeight: 500,
        letterSpacing: "0.03em",
        background: "rgba(17,17,17,0.82)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        color: "#FAFAF8",
        padding: "0.5rem 0.875rem",
        borderRadius: "2px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
        transition: "opacity 0.2s, transform 0.2s, bottom 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}
      aria-label="Ask CM2 AI"
    >
      <MessageSquare size={13} strokeWidth={1.5} className="flex-shrink-0 opacity-80" />
      <span>Ask CM2 AI</span>
    </button>
  );
}
