import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { injectJsonLd, buildArticleSchema } from "@/lib/structuredData";

const LABEL = "text-[0.6875rem] tracking-[0.2em] uppercase";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="text-center">
          <p className="text-[#9B9B9B] mb-4">Article not found</p>
          <Link href="/blog">
            <button className="btn-secondary px-6 py-2 text-[0.8125rem]">Back to Blog</button>
          </Link>
        </div>
      </div>
    );
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // Inject Article schema for this post
  useEffect(() => {
    if (!post) return;
    return injectJsonLd(
      buildArticleSchema({
        title: post.title,
        description: post.excerpt,
        url: `https://www.thecm2.com/blog/${post.slug}`,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
      }),
      "json-ld-article"
    );
  }, [post]);

  // Inject per-post Open Graph and Twitter meta tags
  useEffect(() => {
    if (!post) return;

    const setMeta = (property: string, content: string, attr = "property") => {
      let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const url = `https://www.thecm2.com/blog/${post.slug}`;
    const title = `${post.title} | CM2 Insights`;

    // Open Graph
    setMeta("og:title", title);
    setMeta("og:description", post.excerpt);
    setMeta("og:url", url);
    setMeta("og:type", "article");
    if (post.thumbnail) setMeta("og:image", post.thumbnail);

    // Twitter / X
    setMeta("twitter:card", "summary_large_image", "name");
    setMeta("twitter:title", title, "name");
    setMeta("twitter:description", post.excerpt, "name");
    if (post.thumbnail) setMeta("twitter:image", post.thumbnail, "name");

    // Page title
    document.title = title;

    // Restore defaults on unmount
    return () => {
      document.title = "CM2 — Prime Property Investment Advisory";
      setMeta("og:title", "CM2 — Prime Property Investment Advisory");
      setMeta("og:description", "Curated Aldar and Aldar-backed developments across London, UAE, and Egypt.");
      setMeta("og:url", "https://www.thecm2.com");
      setMeta("og:type", "website");
      setMeta("og:image", "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-og-image.webp");
      setMeta("twitter:card", "summary_large_image", "name");
      setMeta("twitter:title", "CM2 — Prime Property Investment Advisory", "name");
      setMeta("twitter:description", "Curated Aldar and Aldar-backed developments across London, UAE, and Egypt.", "name");
      setMeta("twitter:image", "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-og-image.webp", "name");
    };
  }, [post]);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Back nav */}
      <div className="pt-28 pb-8 border-b border-[#E0DDD8]">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/blog">
            <button className="flex items-center gap-2 text-[0.8125rem] text-[#9B9B9B] hover:text-[#C9A96E] transition-colors mb-6">
              <ArrowLeft size={13} strokeWidth={1.5} /> Back to Insights
            </button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className={`${LABEL} text-[#C9A96E]`}>{post.category}</span>
            <span className="text-[#E0DDD8]">·</span>
            <span className="flex items-center gap-1 text-[0.75rem] text-[#9B9B9B]">
              <Clock size={11} strokeWidth={1.5} />
              {post.readingTime}
            </span>
            <span className="text-[#E0DDD8]">·</span>
            <span className="text-[0.75rem] text-[#9B9B9B]">
              {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
          <h1
            className="text-[#111111] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1.15 }}
          >
            {post.title}
          </h1>
          <p className="text-[1rem] text-[#6B6B6B] leading-relaxed max-w-2xl">{post.subtitle}</p>
        </div>
      </div>

      {/* Article body */}
      <article className="py-12">
        <div
          className="max-w-4xl mx-auto px-6 prose-cm2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* CTA strip */}
      <section className="py-12 border-t border-b border-[#E0DDD8] bg-[#F7F5F2]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className={`${LABEL} text-[#C9A96E] mb-2`}>Ready to invest?</p>
              <p className="text-[0.9375rem] text-[#111111]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "1.25rem" }}>
                Speak with a CM2 advisor
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/london-investment-brief">
                <button className="btn-primary px-6 py-2.5 text-[0.8125rem] tracking-[0.1em] uppercase whitespace-nowrap">
                  Download London Brief
                </button>
              </Link>
              <Link href="/current-opportunities">
                <button className="btn-secondary px-6 py-2.5 text-[0.8125rem] tracking-[0.1em] uppercase whitespace-nowrap">
                  View Opportunities
                </button>
              </Link>
              <Link href="/contact">
                <button className="btn-secondary px-6 py-2.5 text-[0.8125rem] tracking-[0.1em] uppercase whitespace-nowrap">
                  Speak to an Advisor
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {otherPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <p className={`${LABEL} text-[#9B9B9B] mb-8`}>More Insights</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`}>
                  <article className="group border border-[#E0DDD8] hover:border-[#C9A96E] transition-colors p-5 cursor-pointer h-full flex flex-col">
                    <span className={`${LABEL} text-[#C9A96E] mb-3 block`}>{related.category}</span>
                    <h3
                      className="text-[#111111] mb-3 group-hover:text-[#C9A96E] transition-colors flex-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "1.0625rem", lineHeight: 1.3 }}
                    >
                      {related.title}
                    </h3>
                    <span className="flex items-center gap-1 text-[0.75rem] text-[#C9A96E] mt-auto group-hover:gap-2 transition-all">
                      Read <ArrowRight size={11} strokeWidth={1.5} />
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
