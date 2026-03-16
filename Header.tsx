/* CM2 Header — Quiet Modernism
 * Sticky, glass-morphism on scroll, smooth mobile menu
 * FIX I8: smooth mobile menu animation
 * FIX C2: corrected font-weight classes (font-medium not font-500)
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, FileText } from "lucide-react";

interface HeaderProps {
  onOpenGPT?: () => void;
}

const WA_LINK = "https://wa.me/447424447658";
const CM2_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-logo-transparent_3206076e.png";

export default function Header({ onOpenGPT }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/current-opportunities", label: "Opportunities" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/trust", label: "Trust" },
    { href: "/blog", label: "Insights" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAFAF8]/96 backdrop-blur-md border-b border-[#E0DDD8] shadow-[0_1px_12px_oklch(0.13_0.005_60/0.07)]"
          : "bg-[#FAFAF8]/85 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-[4.25rem]">

          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="CM2 Square Centimeter — Home">
            <img
              src={CM2_LOGO}
              alt="CM2 Square Centimeter"
              className="h-9 w-auto object-contain group-hover:opacity-75 transition-opacity duration-200"
              loading="eager"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[0.8rem] tracking-[0.06em] uppercase font-medium transition-colors duration-200 ${
                  location === link.href
                    ? "text-[#111111]"
                    : "text-[#6B6B6B] hover:text-[#111111]"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/london-investment-brief"
              className="flex items-center gap-1.5 text-[0.75rem] tracking-[0.04em] font-medium transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#C9A96E" }}
              aria-label="Download London Investment Brief"
            >
              <FileText size={13} strokeWidth={1.5} />
              London Brief
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8rem] tracking-[0.04em] text-[#6B6B6B] hover:text-[#111111] transition-colors duration-200 font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              aria-label="Contact CM2 on WhatsApp"
            >
              WhatsApp
            </a>
            <button
              onClick={onOpenGPT}
              className="btn-primary text-[0.75rem] py-2.5 px-5"
              aria-label="Open CM2 GPT assistant"
            >
              Ask CM2 GPT
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-[#111111] hover:text-[#6B6B6B] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — animated slide down */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "#FAFAF8", borderTop: menuOpen ? "1px solid #E0DDD8" : "none" }}
      >
        <div className="px-6 pt-5 pb-7 flex flex-col gap-5">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[0.9375rem] font-medium transition-colors ${
                  location === link.href ? "text-[#111111]" : "text-[#6B6B6B]"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-1 flex flex-col gap-3 border-t border-[#E0DDD8]">
            <button
              onClick={() => { setMenuOpen(false); onOpenGPT?.(); }}
              className="btn-primary w-full justify-center py-3"
            >
              Ask CM2 GPT
            </button>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full justify-center py-3"
            >
              WhatsApp an Advisor
            </a>
            <Link
              href="/london-investment-brief"
              className="flex items-center justify-center gap-2 w-full py-3 text-[0.875rem] font-medium border border-dashed transition-colors duration-200"
              style={{ borderColor: "rgba(201,169,110,0.55)", color: "#C9A96E", fontFamily: "'DM Sans', sans-serif" }}
            >
              <FileText size={14} strokeWidth={1.5} />
              Download London Brief
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
