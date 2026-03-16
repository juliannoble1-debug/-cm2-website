/* Design: Quiet Modernism — modal panel, step-by-step qualification UI
 * Features: 4-question guided flow, shortlist generation, lead capture form
 * Disclaimer: CM2 GPT is a guided concierge experience, not a real AI
 */
import { useState, useEffect } from "react";
import { X, ChevronRight, MessageCircle, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";
import { trackEvent } from "@/lib/analytics";
import { trpc } from "@/lib/trpc";

const WA_LINK = "https://wa.me/447424447658";

const projects: Project[] = projectsData as Project[];

interface CM2GPTModalProps {
  open: boolean;
  onClose: () => void;
}

type Step = "intro" | "q1" | "q2" | "q3" | "q4" | "shortlist" | "lead" | "success";

interface Answers {
  purpose: string;
  market: string;
  unitType: string;
  timeline: string;
}

const PURPOSES = [
  { value: "investor", label: "Investment", sub: "Capital growth, rental yield, or preservation" },
  { value: "end-user", label: "Own Use", sub: "Primary or secondary residence" },
  { value: "both", label: "Both", sub: "Lifestyle and investment combined" },
];

const MARKETS = [
  { value: "London", label: "London" },
  { value: "Abu Dhabi", label: "Abu Dhabi" },
  { value: "Dubai", label: "Dubai" },
  { value: "Egypt", label: "Egypt" },
  { value: "any", label: "Open to all markets" },
];

const UNIT_TYPES = [
  { value: "apartment", label: "Apartment", sub: "1–3 beds" },
  { value: "townhouse", label: "Townhouse", sub: "3–4 beds" },
  { value: "villa", label: "Villa", sub: "4–6 beds" },
  { value: "any", label: "Open to options" },
];

const TIMELINES = [
  { value: "immediate", label: "Immediate", sub: "Ready to proceed now" },
  { value: "3-6months", label: "3–6 months", sub: "Evaluating options" },
  { value: "6-12months", label: "6–12 months", sub: "Early research stage" },
  { value: "12months+", label: "12+ months", sub: "Long-term planning" },
];

function getShortlist(answers: Answers): Project[] {
  const scored = projects.map((p) => {
    let score = 0;
    const tags = p.tags.join(" ").toLowerCase();

    // Market preference
    if (answers.market !== "any" && p.market === answers.market) score += 4;
    if (answers.market === "any") score += 1;

    // Purpose
    if (answers.purpose === "investor") {
      if (tags.includes("capital resilience") || tags.includes("liquidity") || tags.includes("premium positioning")) score += 3;
    }
    if (answers.purpose === "end-user") {
      if (tags.includes("family") || tags.includes("lifestyle") || tags.includes("wellness")) score += 3;
    }
    if (answers.purpose === "both") score += 1;

    // Unit type
    if (answers.unitType === "villa" && (tags.includes("villas") || p.typeLabel.toLowerCase().includes("villa"))) score += 2;
    if (answers.unitType === "apartment" && (tags.includes("apartments") || p.typeLabel.toLowerCase().includes("apartment"))) score += 2;
    if (answers.unitType === "townhouse" && (tags.includes("townhouse") || p.typeLabel.toLowerCase().includes("townhouse"))) score += 2;
    if (answers.unitType === "any") score += 1;

    return { project: p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.project);
}

export default function CM2GPTModal({ open, onClose }: CM2GPTModalProps) {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Answers>({ purpose: "", market: "", unitType: "", timeline: "" });
  const [shortlist, setShortlist] = useState<Project[]>([]);
  const [form, setForm] = useState({ name: "", whatsapp: "", email: "", notes: "" });
  const [submitError, setSubmitError] = useState("");

  const submitLead = trpc.lead.submit.useMutation({
    onSuccess: () => {
      trackEvent({ type: "lead_submit", metadata: { source: "cm2gpt_modal" } });
      setStep("success");
    },
    onError: () => setSubmitError("Something went wrong. Please try WhatsApp directly."),
  });

  useEffect(() => {
    if (open) {
      trackEvent({ type: "chat_open" });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const reset = () => {
    setStep("intro");
    setAnswers({ purpose: "", market: "", unitType: "", timeline: "" });
    setShortlist([]);
    setForm({ name: "", whatsapp: "", email: "", notes: "" });
    setSubmitError("");
  };

  const handleClose = () => { reset(); onClose(); };

  const select = (key: keyof Answers, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    const stepMap: Record<keyof Answers, Step> = {
      purpose: "q2",
      market: "q3",
      unitType: "q4",
      timeline: "shortlist",
    };
    if (key === "timeline") {
      const sl = getShortlist(newAnswers);
      setShortlist(sl);
      trackEvent({ type: "qualified_complete", metadata: { answers: newAnswers, shortlistSlugs: sl.map(p => p.slug) } });
    }
    setStep(stepMap[key]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    submitLead.mutate({
      name: form.name,
      whatsapp: form.whatsapp,
      email: form.email || undefined,
      notes: form.notes,
      objective: answers.purpose,
      market: answers.market,
      unitType: answers.unitType,
      timeline: answers.timeline,
      shortlist: shortlist.map((p) => p.slug),
      source: "cm2gpt_modal",
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#111111]/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] bg-[#FAFAF8] border border-[#E0DDD8] sm:rounded-sm shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0DDD8] flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="cm2-label text-[#6B6B6B]">CM2 GPT</span>
              <span className="text-[0.625rem] bg-[#F4F2EE] text-[#9B9B9B] px-1.5 py-0.5 rounded-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Advisory
              </span>
            </div>
            <p className="text-[0.75rem] text-[#9B9B9B] mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Guided property shortlist — not financial advice
            </p>
          </div>
          <button onClick={handleClose} className="p-1.5 text-[#9B9B9B] hover:text-[#111111] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {/* Intro */}
          {step === "intro" && (
            <div className="stagger-children">
              <h2 className="text-[1.75rem] text-[#111111] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                Your private property advisory.
              </h2>
              <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Answer four brief questions and CM2 GPT will generate a curated shortlist from our Aldar and Aldar-backed portfolio across London, UAE, and Egypt. A CM2 advisor will then confirm live availability on WhatsApp.
              </p>
              <div className="bg-[#F4F2EE] border border-[#E0DDD8] p-4 rounded-sm mb-6">
                <p className="text-[0.75rem] text-[#9B9B9B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  CM2 GPT is a guided advisory experience. Indicative pricing only. Subject to availability and confirmation. Not financial advice. Do not share sensitive personal documents in this chat.
                </p>
              </div>
              <button onClick={() => setStep("q1")} className="btn-primary w-full justify-center">
                Begin <ChevronRight size={15} />
              </button>
              {/* Embed placeholder */}
              <div id="cm2gpt-embed" className="mt-6 hidden">
                <textarea placeholder="Embed real CM2 GPT widget here" className="w-full border border-[#E0DDD8] p-3 text-sm" />
              </div>
            </div>
          )}

          {/* Q1: Purpose */}
          {step === "q1" && (
            <div className="stagger-children">
              <p className="cm2-label mb-1">Question 1 of 4</p>
              <h3 className="text-[1.375rem] text-[#111111] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                What is your primary objective?
              </h3>
              <div className="space-y-3">
                {PURPOSES.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => select("purpose", opt.value)}
                    className="w-full text-left border border-[#E0DDD8] p-4 hover:border-[#111111] hover:bg-[#F4F2EE] transition-all group"
                  >
                    <div className="text-[0.9375rem] text-[#111111] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{opt.label}</div>
                    <div className="text-[0.8125rem] text-[#9B9B9B] mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q2: Market */}
          {step === "q2" && (
            <div className="stagger-children">
              <p className="cm2-label mb-1">Question 2 of 4</p>
              <h3 className="text-[1.375rem] text-[#111111] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                Which market interests you?
              </h3>
              <div className="space-y-3">
                {MARKETS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => select("market", opt.value)}
                    className="w-full text-left border border-[#E0DDD8] p-4 hover:border-[#111111] hover:bg-[#F4F2EE] transition-all"
                  >
                    <div className="text-[0.9375rem] text-[#111111] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{opt.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q3: Unit type */}
          {step === "q3" && (
            <div className="stagger-children">
              <p className="cm2-label mb-1">Question 3 of 4</p>
              <h3 className="text-[1.375rem] text-[#111111] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                What unit type are you considering?
              </h3>
              <div className="space-y-3">
                {UNIT_TYPES.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => select("unitType", opt.value)}
                    className="w-full text-left border border-[#E0DDD8] p-4 hover:border-[#111111] hover:bg-[#F4F2EE] transition-all"
                  >
                    <div className="text-[0.9375rem] text-[#111111] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{opt.label}</div>
                    <div className="text-[0.8125rem] text-[#9B9B9B] mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Q4: Timeline */}
          {step === "q4" && (
            <div className="stagger-children">
              <p className="cm2-label mb-1">Question 4 of 4</p>
              <h3 className="text-[1.375rem] text-[#111111] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                What is your decision timeline?
              </h3>
              <div className="space-y-3">
                {TIMELINES.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => select("timeline", opt.value)}
                    className="w-full text-left border border-[#E0DDD8] p-4 hover:border-[#111111] hover:bg-[#F4F2EE] transition-all"
                  >
                    <div className="text-[0.9375rem] text-[#111111] font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{opt.label}</div>
                    <div className="text-[0.8125rem] text-[#9B9B9B] mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Shortlist */}
          {step === "shortlist" && (
            <div>
              <p className="cm2-label mb-1">Your shortlist</p>
              <h3 className="text-[1.5rem] text-[#111111] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                {shortlist.length} curated opportunities.
              </h3>
              <p className="text-[0.8125rem] text-[#9B9B9B] mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Based on your preferences. Indicative only. Subject to availability and confirmation.
              </p>

              <div className="space-y-4 mb-6 stagger-children">
                {shortlist.map((p) => (
                  <div key={p.slug} className="border border-[#E0DDD8] overflow-hidden">
                    <div className="relative" style={{ aspectRatio: "16/7" }}>
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute top-2 left-2">
                        <span className="cm2-label bg-[#FAFAF8]/90 px-2 py-0.5">{p.market}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="cm2-label text-[#9B9B9B] mb-1">{p.typeLabel}</div>
                      <h4 className="text-[1rem] text-[#111111] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                        {p.name}
                      </h4>
                      <p className="text-[0.8125rem] text-[#6B6B6B] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p.oneLiner}</p>
                      <div className="text-[0.75rem] text-[#9B9B9B] mb-3 italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Indicative pricing available on request. Subject to availability and confirmation.
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/projects/${p.slug}`}
                          onClick={handleClose}
                          className="btn-primary text-[0.75rem] py-1.5 px-3 flex-1 justify-center"
                        >
                          View project
                        </Link>
                        <a
                          href={WA_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent({ type: "whatsapp_click", metadata: { slug: p.slug, source: "shortlist" } })}
                          className="btn-secondary text-[0.75rem] py-1.5 px-3 flex-1 justify-center"
                        >
                          WhatsApp to confirm
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cm2-rule mb-5" />
              <button onClick={() => setStep("lead")} className="btn-primary w-full justify-center mb-3">
                Send my request to CM2
              </button>
              <button onClick={reset} className="w-full text-center text-[0.8125rem] text-[#9B9B9B] hover:text-[#111111] transition-colors py-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Start over
              </button>
            </div>
          )}

          {/* Lead form */}
          {step === "lead" && (
            <div className="stagger-children">
              <p className="cm2-label mb-1">Send your request</p>
              <h3 className="text-[1.375rem] text-[#111111] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                A CM2 advisor will follow up.
              </h3>
              <p className="text-[0.8125rem] text-[#9B9B9B] mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                We will confirm live availability and arrange a private conversation at your convenience.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="cm2-label block mb-1.5">Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-[#E0DDD8] px-3 py-2.5 text-[0.875rem] bg-white focus:outline-none focus:border-[#111111] transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="cm2-label block mb-1.5">WhatsApp *</label>
                  <input
                    required
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    className="w-full border border-[#E0DDD8] px-3 py-2.5 text-[0.875rem] bg-white focus:outline-none focus:border-[#111111] transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    placeholder="+44 7xxx xxxxxx"
                  />
                </div>
                <div>
                  <label className="cm2-label block mb-1.5">Email (optional)</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-[#E0DDD8] px-3 py-2.5 text-[0.875rem] bg-white focus:outline-none focus:border-[#111111] transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="cm2-label block mb-1.5">Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    className="w-full border border-[#E0DDD8] px-3 py-2.5 text-[0.875rem] bg-white focus:outline-none focus:border-[#111111] transition-colors resize-none"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                    placeholder="Any additional context or questions"
                  />
                </div>
                {submitError && (
                  <p className="text-[0.8125rem] text-red-600" style={{ fontFamily: "'DM Sans', sans-serif" }}>{submitError}</p>
                )}
                <button type="submit" disabled={submitLead.isPending} className="btn-primary w-full justify-center">
                  {submitLead.isPending ? "Sending..." : "Send request"}
                </button>
                <button type="button" onClick={() => setStep("shortlist")} className="w-full text-center text-[0.8125rem] text-[#9B9B9B] hover:text-[#111111] transition-colors py-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Back to shortlist
                </button>
              </form>
            </div>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="text-center py-8 stagger-children">
              <CheckCircle size={40} className="mx-auto text-[#111111] mb-4" />
              <h3 className="text-[1.5rem] text-[#111111] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                Request received.
              </h3>
              <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed mb-6 max-w-sm mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A CM2 advisor will be in touch to confirm live availability and arrange a private conversation.
              </p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex mx-auto mb-4">
                <MessageCircle size={15} /> WhatsApp us directly
              </a>
              <div>
                <button onClick={handleClose} className="text-[0.8125rem] text-[#9B9B9B] hover:text-[#111111] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
