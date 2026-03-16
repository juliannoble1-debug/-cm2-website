import { useEffect } from "react";

/**
 * useSEO — sets document.title, meta description, OG tags, and canonical URL on mount.
 *
 * IMPORTANT: The server (ssrMeta.ts) already injects exactly ONE <link rel="canonical">
 * into the HTML before it is served. This hook must ONLY update that existing tag —
 * it must NEVER create a second canonical element. Creating a second canonical is the
 * root cause of the "Duplicate — Google chose different canonical than user" GSC issue.
 *
 * Rules enforced here:
 *  1. Always use HTTPS.
 *  2. Always use www.thecm2.com (no mixed www/non-www).
 *  3. Canonical URL must be the final, self-referencing URL for the current page.
 *  4. Only one <link rel="canonical"> may exist in <head> at any time.
 *
 * Restores the default CM2 title/description/canonical on unmount so navigating
 * back to the homepage doesn't retain a project-specific title.
 */

const DEFAULT_TITLE = "CM2 | Prime London Property Advisory — UK, UAE & Egypt";
const DEFAULT_DESC =
  "CM2 is a private property investment advisory providing curated access to prime residential opportunities across the UK, UAE, and Egypt. London-first. Aldar-backed. By appointment only.";
const DEFAULT_CANONICAL = "https://www.thecm2.com/";

/**
 * Ensure the canonical URL is absolute, uses HTTPS, and uses www.thecm2.com.
 * Converts bare paths like "/projects/foo" → "https://www.thecm2.com/projects/foo".
 */
function normaliseCanonical(url: string): string {
  if (!url) return DEFAULT_CANONICAL;
  // Already absolute — enforce https and www
  if (url.startsWith("http")) {
    return url
      .replace(/^http:\/\//, "https://")
      .replace(/^https:\/\/thecm2\.com/, "https://www.thecm2.com");
  }
  // Relative path — prepend base
  return `https://www.thecm2.com${url.startsWith("/") ? url : `/${url}`}`;
}

/**
 * Get or create the single canonical <link> element.
 * If multiple canonical tags exist (should never happen), removes extras and keeps one.
 */
function getCanonicalElement(): HTMLLinkElement {
  const all = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]')
  );

  if (all.length === 0) {
    // Create the element — this path should rarely be hit because the server injects one
    const el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
    return el;
  }

  if (all.length > 1) {
    // Remove duplicates — keep only the first
    for (let i = 1; i < all.length; i++) {
      all[i].parentNode?.removeChild(all[i]);
    }
  }

  return all[0];
}

export function useSEO({
  title,
  description,
  ogImage,
  canonical,
}: {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}) {
  useEffect(() => {
    const resolvedCanonical = normaliseCanonical(canonical || DEFAULT_CANONICAL);

    // ── Title ────────────────────────────────────────────────────────────────
    document.title = title;

    // ── Meta description ─────────────────────────────────────────────────────
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);

    // ── OG title ─────────────────────────────────────────────────────────────
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);

    // ── OG description ───────────────────────────────────────────────────────
    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    // ── OG image ─────────────────────────────────────────────────────────────
    if (ogImage) {
      const ogImg = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute("content", ogImage);
    }

    // ── Canonical URL — update the SINGLE existing tag, never create a second ──
    const canonicalEl = getCanonicalElement();
    canonicalEl.setAttribute("href", resolvedCanonical);

    // ── OG URL — keep in sync with canonical ─────────────────────────────────
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", resolvedCanonical);

    // ── Cleanup: restore homepage defaults on unmount ─────────────────────────
    return () => {
      document.title = DEFAULT_TITLE;
      if (metaDesc) metaDesc.setAttribute("content", DEFAULT_DESC);
      if (ogTitle) ogTitle.setAttribute("content", DEFAULT_TITLE);
      if (ogDesc) ogDesc.setAttribute("content", DEFAULT_DESC);

      const canonicalElCleanup = getCanonicalElement();
      canonicalElCleanup.setAttribute("href", DEFAULT_CANONICAL);

      const ogUrlCleanup = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
      if (ogUrlCleanup) ogUrlCleanup.setAttribute("content", DEFAULT_CANONICAL);
    };
  }, [title, description, ogImage, canonical]);
}
