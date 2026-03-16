/**
 * InvestorLeadForm — Standardised investor qualification form
 *
 * Used across: Homepage, Project pages, Contact page, London Brief,
 *              Current Opportunities, and SEO landing pages.
 *
 * Submits to trpc.investorLead.submit, stores to investorLeads DB table,
 * sends notification to invest@thecm2.com, and sends auto-response to investor.
 */

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { trackEvent, trackFormSubmit } from "@/lib/analytics";

// ── Types ─────────────────────────────────────────────────────────────────────

interface InvestorLeadFormProps {
  /** The page/source identifier stored with the lead */
  pageSource?: string;
  /** Optional title shown above the form */
  title?: string;
  /** Optional subtitle shown below the title */
  subtitle?: string;
  /** Optional label for the submit button */
  submitLabel?: string;
  /** Whether to show the Notes field */
  showNotes?: boolean;
  /** Whether to show the Timeline field */
  showTimeline?: boolean;
  /** Callback fired on successful submission (before redirect) */
  onSuccess?: () => void;
  /** CSS class applied to the outer wrapper */
  className?: string;
  /** Optional project slug for project-specific leads */
  projectSlug?: string;
}

// ── UTM helpers ───────────────────────────────────────────────────────────────

function getUtmParams() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utmSource: p.get("utm_source") ?? undefined,
    utmMedium: p.get("utm_medium") ?? undefined,
    utmCampaign: p.get("utm_campaign") ?? undefined,
  };
}

// ── Constants ─────────────────────────────────────────────────────────────────

const INVESTOR_TYPES = ["Capital Deployment", "End User"] as const;
const BUDGET_OPTIONS = ["Under £500k", "£500k – £1M", "£1M – £3M", "£3M+"] as const;
const INVESTMENT_INTEREST_OPTIONS = ["London", "UAE", "Egypt", "Multiple markets"] as const;
const TIMELINE_OPTIONS = [
  "Immediately",
  "Within 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "12 months+",
] as const;

const INPUT_CLASS =
  "w-full px-4 py-3 bg-white border border-[#E0DDD8] text-[0.875rem] text-[#111111] placeholder-[#9B9B9B] focus:outline-none focus:border-[#C9A96E] transition-colors";
const SELECT_CLASS =
  "w-full px-4 py-3 bg-white border border-[#E0DDD8] text-[0.875rem] text-[#111111] focus:outline-none focus:border-[#C9A96E] transition-colors appearance-none cursor-pointer";
const LABEL_CLASS =
  "block text-[0.6875rem] tracking-[0.15em] uppercase text-[#6B6B6B] mb-1.5";
const ERROR_CLASS = "text-[0.75rem] text-red-500 mt-1";

// ── Component ─────────────────────────────────────────────────────────────────

export default function InvestorLeadForm({
  pageSource,
  title,
  subtitle,
  submitLabel = "Submit Enquiry",
  showNotes = true,
  showTimeline = true,
  onSuccess,
  className = "",
}: InvestorLeadFormProps) {
  const [, navigate] = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    country: "",
    investorType: "" as "" | "Capital Deployment" | "End User",
    investmentBudget: "" as "" | "Under £500k" | "£500k – £1M" | "£1M – £3M" | "£3M+",
    investmentInterest: "" as "" | "London" | "UAE" | "Both",
    timeline: "",
    notes: "",
    // Honeypot — must stay empty
    website: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.investorLead.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      trackFormSubmit("enquiry", pageSource ?? window.location.pathname);
      trackEvent({ type: "lead_submit", metadata: { source: pageSource ?? window.location.pathname } });
      onSuccess?.();
      navigate("/thank-you");
    },
  });

  // Validate individual field
  function validateField(name: keyof typeof form, value: string): string {
    if (name === "website") return ""; // honeypot — never show error
    if (["name", "email", "whatsapp", "country", "investorType", "investmentInterest"].includes(name)) {
      if (!value.trim()) return "This field is required.";
    }
    if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address.";
    }
    if (name === "whatsapp" && value && !/^[\d\s\+\-\(\)]{6,20}$/.test(value)) {
      return "Please enter a valid phone number.";
    }
    return "";
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof form]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof typeof form, value) }));
    }
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof typeof form, value) }));
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof typeof form, string>> = {};
    (Object.keys(form) as (keyof typeof form)[]).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const utm = getUtmParams();
    submitMutation.mutate({
      pageSource: pageSource ?? window.location.pathname,
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      country: form.country,
      investorType: form.investorType as "Capital Deployment" | "End User",
      investmentBudget: form.investmentBudget as "Under £500k" | "£500k – £1M" | "£1M – £3M" | "£3M+",
      investmentInterest: form.investmentInterest as "London" | "UAE" | "Both" || undefined,
      timeline: form.timeline || undefined,
      notes: form.notes || undefined,
      website: form.website || undefined,
      ...utm,
    });
  }

  if (submitted) return null;

  return (
    <div className={className}>
      {title && (
        <div className="mb-6">
          <p className="text-[0.6875rem] tracking-[0.2em] uppercase text-[#C9A96E] mb-2">
            Private Enquiry
          </p>
          <h3
            className="text-[#111111] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "1.5rem" }}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-[0.875rem] text-[#6B6B6B]">{subtitle}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — hidden from real users */}
        <div style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
          <label htmlFor="website">Leave this empty</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label htmlFor="ilf-name" className={LABEL_CLASS}>
              Full Name <span className="text-[#C9A96E]">*</span>
            </label>
            <input
              id="ilf-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={INPUT_CLASS}
            />
            {errors.name && <p className={ERROR_CLASS}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="ilf-email" className={LABEL_CLASS}>
              Email Address <span className="text-[#C9A96E]">*</span>
            </label>
            <input
              id="ilf-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={INPUT_CLASS}
            />
            {errors.email && <p className={ERROR_CLASS}>{errors.email}</p>}
          </div>

          {/* WhatsApp */}
          <div>
            <label htmlFor="ilf-whatsapp" className={LABEL_CLASS}>
              WhatsApp Number <span className="text-[#C9A96E]">*</span>
            </label>
            <input
              id="ilf-whatsapp"
              name="whatsapp"
              type="tel"
              autoComplete="tel"
              placeholder="+44 7xxx xxxxxx"
              value={form.whatsapp}
              onChange={handleChange}
              onBlur={handleBlur}
              className={INPUT_CLASS}
            />
            {errors.whatsapp && <p className={ERROR_CLASS}>{errors.whatsapp}</p>}
          </div>

          {/* Country of Residence */}
          <div>
            <label htmlFor="ilf-country" className={LABEL_CLASS}>
              Country of Residence <span className="text-[#C9A96E]">*</span>
            </label>
            <input
              id="ilf-country"
              name="country"
              type="text"
              autoComplete="country-name"
              placeholder="e.g. United Arab Emirates"
              value={form.country}
              onChange={handleChange}
              onBlur={handleBlur}
              className={INPUT_CLASS}
            />
            {errors.country && <p className={ERROR_CLASS}>{errors.country}</p>}
          </div>

          {/* Investor Type */}
          <div>
            <label htmlFor="ilf-investorType" className={LABEL_CLASS}>
              Investor Type <span className="text-[#C9A96E]">*</span>
            </label>
            <div className="relative">
              <select
                id="ilf-investorType"
                name="investorType"
                value={form.investorType}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${SELECT_CLASS} ${!form.investorType ? "text-[#9B9B9B]" : ""}`}
              >
                <option value="" disabled>Select investor type</option>
                {INVESTOR_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9B9B9B]">▾</div>
            </div>
            {errors.investorType && <p className={ERROR_CLASS}>{errors.investorType}</p>}
          </div>

          {/* Investment Interest */}
          <div>
            <label htmlFor="ilf-investmentInterest" className={LABEL_CLASS}>
              Investment Interest <span className="text-[#C9A96E]">*</span>
            </label>
            <div className="relative">
              <select
                id="ilf-investmentInterest"
                name="investmentInterest"
                value={form.investmentInterest}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${SELECT_CLASS} ${!form.investmentInterest ? "text-[#9B9B9B]" : ""}`}
              >
                <option value="" disabled>Select market</option>
                {INVESTMENT_INTEREST_OPTIONS.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9B9B9B]">▾</div>
            </div>
            {errors.investmentInterest && <p className={ERROR_CLASS}>{errors.investmentInterest}</p>}
          </div>

          {/* Investment Budget — optional, last */}
          <div>
            <label htmlFor="ilf-investmentBudget" className={LABEL_CLASS}>
              Investment Budget
            </label>
            <div className="relative">
              <select
                id="ilf-investmentBudget"
                name="investmentBudget"
                value={form.investmentBudget}
                onChange={handleChange}
                className={`${SELECT_CLASS} ${!form.investmentBudget ? "text-[#9B9B9B]" : ""}`}
              >
                <option value="">Select budget range (optional)</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9B9B9B]">▾</div>
            </div>
          </div>

          {/* Investment Timeline (optional) */}
          {showTimeline && (
            <div>
              <label htmlFor="ilf-timeline" className={LABEL_CLASS}>
                Investment Timeline
              </label>
              <div className="relative">
                <select
                  id="ilf-timeline"
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                  className={`${SELECT_CLASS} ${!form.timeline ? "text-[#9B9B9B]" : ""}`}
                >
                  <option value="">Select timeline (optional)</option>
                  {TIMELINE_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9B9B9B]">▾</div>
              </div>
            </div>
          )}

          {/* Notes (optional) */}
          {showNotes && (
            <div className={showTimeline ? "" : "sm:col-span-2"}>
              <label htmlFor="ilf-notes" className={LABEL_CLASS}>
                Notes
              </label>
              <textarea
                id="ilf-notes"
                name="notes"
                rows={3}
                placeholder="Any specific requirements or questions (optional)"
                value={form.notes}
                onChange={handleChange}
                className={`${INPUT_CLASS} resize-none`}
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={submitMutation.isPending}
            className="w-full btn-primary py-3.5 text-[0.8125rem] tracking-[0.15em] uppercase disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitMutation.isPending ? "Submitting…" : submitLabel}
          </button>
          {submitMutation.isError && (
            <p className="mt-3 text-[0.8125rem] text-red-500 text-center">
              {submitMutation.error?.message ?? "Something went wrong. Please try again."}
            </p>
          )}
          <p className="mt-3 text-[0.6875rem] text-[#9B9B9B] text-center">
            By appointment only. Your details are never shared.
          </p>
        </div>
      </form>
    </div>
  );
}
