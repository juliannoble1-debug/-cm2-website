/* CM2 Footer — Quiet Modernism
 * FIX C5: Replace text logo with official CM2 image logo (inverted for dark bg)
 * FIX I6: Remove USD 1M+ reference, use clean positioning copy
 * FIX E5: Add Contact link to Information column
 * FIX C2: Remove font-600 invalid class
 */
import { Link } from "wouter";

const WA_LINK = "https://wa.me/447424447658";
const CM2_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-logo-transparent_3206076e.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: "#111111", color: "#FAFAF8" }}
      role="contentinfo"
    >
      {/* Main footer grid */}
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="CM2 Square Centimeter — Home">
              <img
                src={CM2_LOGO}
                alt="CM2 Square Centimeter"
                className="h-10 w-auto object-contain mb-5 opacity-90 hover:opacity-100 transition-opacity duration-200"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p
              className="text-[0.8125rem] leading-relaxed mb-6"
              style={{ color: "#9B9896", fontFamily: "'DM Sans', sans-serif" }}
            >
              Private property investment advisory.<br />
              Curated opportunities across London,<br />
              UAE, and Egypt.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.75rem] tracking-[0.08em] uppercase font-medium transition-colors duration-200 hover:text-[#FAFAF8]"
              style={{ color: "#9B9896", fontFamily: "'DM Sans', sans-serif" }}
              aria-label="Contact CM2 on WhatsApp"
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#25D366",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              WhatsApp an Advisor
            </a>
          </div>

          {/* Markets column */}
          <div>
            <p
              className="text-[0.6875rem] tracking-[0.18em] uppercase mb-5 font-medium"
              style={{ color: "#5A5A58", fontFamily: "'DM Sans', sans-serif" }}
            >
              Markets
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "London", href: "/projects?market=London" },
                { label: "Abu Dhabi", href: "/projects?market=Abu+Dhabi" },
                { label: "Dubai", href: "/projects?market=Dubai" },
                { label: "Egypt", href: "/projects?market=Egypt" },
                { label: "All Projects", href: "/projects" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.875rem] transition-colors duration-200 hover:text-[#FAFAF8]"
                    style={{ color: "#9B9896", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information column */}
          <div>
            <p
              className="text-[0.6875rem] tracking-[0.18em] uppercase mb-5 font-medium"
              style={{ color: "#5A5A58", fontFamily: "'DM Sans', sans-serif" }}
            >
              Information
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "How It Works", href: "/how-it-works" },
                { label: "Trust & Transparency", href: "/trust" },
                { label: "Opportunities", href: "/current-opportunities" },
                { label: "Insights", href: "/blog" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.875rem] transition-colors duration-200 hover:text-[#FAFAF8]"
                    style={{ color: "#9B9896", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enquiries column */}
          <div>
            <p
              className="text-[0.6875rem] tracking-[0.18em] uppercase mb-5 font-medium"
              style={{ color: "#5A5A58", fontFamily: "'DM Sans', sans-serif" }}
            >
              Enquiries
            </p>
            <p
              className="text-[0.875rem] mb-5 leading-relaxed"
              style={{ color: "#9B9896", fontFamily: "'DM Sans', sans-serif" }}
            >
              By appointment only. Each engagement begins with a structured briefing call to understand your objectives. A curated shortlist is prepared in advance, alongside verified project materials — floor plans, payment structures, and yield projections — so your time is spent on decisions, not discovery.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[0.75rem] tracking-[0.06em] uppercase font-medium border px-5 py-3 transition-all duration-200 hover:text-[#FAFAF8]"
              style={{
                color: "#9B9896",
                fontFamily: "'DM Sans', sans-serif",
                borderColor: "#3A3A38",
                borderRadius: 2,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#FAFAF8")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#3A3A38")}
            >
              Begin an Enquiry
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #2A2A28" }}>
        <div className="container py-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p
              className="text-[0.75rem]"
              style={{ color: "#5A5A58", fontFamily: "'DM Sans', sans-serif" }}
            >
              © {year} Square Centimeter (CM2). All rights reserved.
            </p>
            <p
              className="text-[0.75rem] leading-relaxed max-w-md text-right"
              style={{ color: "#5A5A58", fontFamily: "'DM Sans', sans-serif" }}
            >
              CM2 is an authorised sales partner. Prices and availability subject to developer confirmation. Investment values can fall as well as rise.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
