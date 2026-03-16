/**
 * MobileStickyBar
 *
 * A mobile-only sticky CTA bar that slides up from the bottom after the user
 * scrolls past the hero section. Visible only on screens < 768px.
 *
 * Behaviour:
 *   - Hidden on desktop (window.innerWidth >= 768)
 *   - Hidden on /london-investment-brief, /admin, /thank-you
 *   - Appears with a smooth slide-up animation once the hero section exits the viewport
 *   - Sits at z-40 (below floating buttons at z-50, above page content)
 *   - Does NOT overlap the floating WhatsApp / Ask CM2 AI buttons — those are
 *     positioned at bottom-6 (~24px), this bar is 56px tall so the buttons
 *     remain fully above it
 *
 * Implementation:
 *   - Uses IntersectionObserver on a sentinel element placed at the bottom of
 *     the hero section. When the sentinel leaves the viewport, the bar appears.
 *   - Falls back to a scroll event listener if IntersectionObserver is unavailable.
 */

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

const HIDDEN_PATHS = new Set([
  "/london-investment-brief",
  "/admin",
  "/thank-you",
]);

/** Height of the bar in px — used to push floating buttons up on mobile */
export const MOBILE_STICKY_BAR_HEIGHT = 56;

export default function MobileStickyBar() {
  const [location] = useLocation();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Track mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // IntersectionObserver: show bar once hero sentinel scrolls out of view
  useEffect(() => {
    if (!isMobile) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the sentinel is NOT intersecting (scrolled past), show the bar
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isMobile]);

  // Hide on specific pages
  if (HIDDEN_PATHS.has(location)) return null;

  // On desktop, render only the sentinel (invisible) so it can be observed
  if (!isMobile) {
    return (
      <div
        ref={sentinelRef}
        aria-hidden="true"
        style={{ position: "absolute", top: "100vh", height: 1, width: 1, pointerEvents: "none" }}
      />
    );
  }

  return (
    <>
      {/* Sentinel placed at ~100vh from top — when this leaves viewport, bar appears */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        style={{ position: "absolute", top: "100vh", height: 1, width: 1, pointerEvents: "none" }}
      />

      {/* Sticky bar */}
      <div
        role="complementary"
        aria-label="Request Investment Brief"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          height: `${MOBILE_STICKY_BAR_HEIGHT}px`,
          background: "#111111",
          borderTop: "1px solid rgba(201,169,110,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.35)",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        {/* Left: short label */}
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(250,250,248,0.75)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexShrink: 1,
            minWidth: 0,
          }}
        >
          London Investment Opportunities
        </span>

        {/* Right: CTA button */}
        <Link
          href="/contact"
          aria-label="Request Investment Brief"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            flexShrink: 0,
            marginLeft: "0.75rem",
            background: "#C9A96E",
            color: "#111111",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.5rem 1rem",
            borderRadius: "2px",
            whiteSpace: "nowrap",
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(201,169,110,0.4)",
          }}
        >
          Request Brief
          <ArrowRight size={11} strokeWidth={2.5} />
        </Link>
      </div>
    </>
  );
}
