/**
 * StickyInvestorBar
 *
 * A thin premium sticky bar that sits at the very bottom of the viewport,
 * above the floating buttons layer (z-30 so floating buttons at z-50 remain on top).
 *
 * Content:
 *   Left:  "London Residential Investment Opportunities  ·  Prime Projects | High Yield | Off-Market Access"
 *   Right: "Request Investment Brief" button (gold accent on charcoal)
 *
 * Hidden on: /london-investment-brief, /admin, /thank-you
 * Hidden on mobile (< 768px) — uses JS window.innerWidth to avoid Tailwind
 * hidden/flex conflict with inline styles (inline style always wins over class).
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

const HIDDEN_PATHS = new Set([
  "/london-investment-brief",
  "/admin",
  "/thank-you",
]);

export default function StickyInvestorBar() {
  const [location] = useLocation();
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Hide on specific pages
  if (HIDDEN_PATHS.has(location)) return null;

  // Hide on mobile — return null so there is zero layout impact
  if (!isDesktop) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.5rem",
        background: "#1A1A1A",
        borderTop: "1px solid rgba(201,169,110,0.18)",
        height: "52px",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.22)",
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Left: headline copy */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0, overflow: "hidden" }}>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#FAFAF8",
            whiteSpace: "nowrap",
          }}
        >
          London Residential Investment Opportunities
        </span>
        <span style={{ color: "#C9A96E", fontSize: "0.6875rem", opacity: 0.7, flexShrink: 0 }}>·</span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.6875rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#9B9B9B",
            whiteSpace: "nowrap",
          }}
        >
          Prime Projects&nbsp;&nbsp;|&nbsp;&nbsp;High Yield&nbsp;&nbsp;|&nbsp;&nbsp;Off-Market Access
        </span>
      </div>

      {/* Right: CTA button */}
      <Link
        href="/contact"
        aria-label="Request Investment Brief"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexShrink: 0,
          marginLeft: "1.5rem",
          background: "#C9A96E",
          color: "#111111",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "0.5rem 1.25rem",
          borderRadius: "2px",
          boxShadow: "0 2px 8px rgba(201,169,110,0.3)",
          whiteSpace: "nowrap",
          textDecoration: "none",
        }}
      >
        Request Investment Brief
        <ArrowRight size={12} strokeWidth={2} />
      </Link>
    </div>
  );
}
