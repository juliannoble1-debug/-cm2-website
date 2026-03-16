/* CM2 Analytics Helper
 * Sends events to /api/lead with type="event" (existing CM2 system)
 * AND fires GA4 custom events via window.gtag
 * Falls back to console.log if the request fails
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type CM2EventType =
  | "chat_open"
  | "qualified_complete"
  | "whatsapp_click"
  | "lead_submit"
  | "page_view";

export interface CM2Event {
  type: CM2EventType;
  metadata?: Record<string, unknown>;
}

/** Fire a raw GA4 event */
function fireGA4(eventName: string, params?: Record<string, string | number | boolean>): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params ?? {});
  }
}

/** Existing CM2 event tracker — also fires matching GA4 event */
export async function trackEvent(event: CM2Event): Promise<void> {
  // Fire GA4 event in parallel
  fireGA4(event.type, event.metadata as Record<string, string | number | boolean> | undefined);

  try {
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType: event.type, eventKind: "event", metadata: event.metadata }),
    });
  } catch {
    console.log("[CM2 Analytics]", event.type, event.metadata);
  }
}

/** Track a page view on route change */
export function trackPageView(path: string, title?: string): void {
  fireGA4("page_view", {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}

/** Track a lead form submission */
export function trackFormSubmit(
  formName: "enquiry" | "brief_request" | "consultation",
  sourcePage?: string
): void {
  fireGA4("form_submit", {
    form_name: formName,
    source_page: sourcePage ?? window.location.pathname,
  });
  // GA4 recommended event for lead generation
  fireGA4("generate_lead", { form_name: formName });
}

/** Track the London Brief PDF download / request */
export function trackBriefDownload(sourcePage?: string): void {
  fireGA4("brief_download", {
    source_page: sourcePage ?? window.location.pathname,
  });
  fireGA4("generate_lead", { form_name: "brief_request" });
}

/** Track a CTA button click */
export function trackCTAClick(ctaLabel: string, destination?: string): void {
  fireGA4("cta_click", {
    cta_label: ctaLabel,
    destination: destination ?? "",
    source_page: window.location.pathname,
  });
}

/** Track a WhatsApp button click */
export function trackWhatsAppClick(sourcePage?: string): void {
  fireGA4("whatsapp_click", {
    source_page: sourcePage ?? window.location.pathname,
  });
}

/** Track a project page view */
export function trackProjectView(projectName: string, market: string): void {
  fireGA4("project_view", { project_name: projectName, market });
}
