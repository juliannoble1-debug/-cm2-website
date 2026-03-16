import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { useSEO } from "@/hooks/useSEO";

const LABEL = "text-[0.6875rem] tracking-[0.2em] uppercase";

export default function Blog() {
  useSEO({
    title: "London Property Investment Intelligence | CM2 Insights",
    description: "Expert analysis and guides for international investors buying London property. Covering GCC, Asia-Pacific, and European buyer perspectives.",
    canonical: "https://www.thecm2.com/blog",
  });

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-[#E0DDD8]">
        <div className="max-w-6xl mx-auto px-6">
          <p className={`${LABEL} text-[#C9A96E] mb-4`}>London Property Intelligence</p>
          <h1
            className="text-[#111111] mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Investment Insights
          </h1>
          <p className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed max-w-xl">
            Analysis, guides, and market intelligence for international investors approaching the London residential market.
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group border border-[#E0DDD8] hover:border-[#C9A96E] transition-colors duration-300 cursor-pointer h-full flex flex-col">
                  {post.thumbnail && (
                    <div className="overflow-hidden" style={{ height: "180px" }}>
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`${LABEL} text-[#C9A96E]`}>{post.category}</span>
                      <span className="text-[#E0DDD8]">·</span>
                      <span className="flex items-center gap-1 text-[0.75rem] text-[#9B9B9B]">
                        <Clock size={11} strokeWidth={1.5} />
                        {post.readingTime}
                      </span>
                    </div>
                    <h2
                      className="text-[#111111] mb-3 group-hover:text-[#C9A96E] transition-colors"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "1.25rem", lineHeight: 1.3 }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed flex-1 mb-5">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E0DDD8]">
                      <span className="text-[0.75rem] text-[#9B9B9B]">
                        {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1 text-[0.75rem] text-[#C9A96E] group-hover:gap-2 transition-all">
                        Read <ArrowRight size={11} strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-[#E0DDD8] bg-[#F7F5F2]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className={`${LABEL} text-[#C9A96E] mb-4`}>Ready to invest?</p>
          <h2
            className="text-[#111111] mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
          >
            Speak with a CM2 advisor
          </h2>
          <p className="text-[0.9375rem] text-[#6B6B6B] mb-8 max-w-md mx-auto">
            Get a curated shortlist of London investment opportunities matched to your budget and objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/london-investment-brief">
              <button className="btn-primary px-8 py-3 text-[0.8125rem] tracking-[0.1em] uppercase">
                Download London Brief
              </button>
            </Link>
            <Link href="/contact">
              <button className="btn-secondary px-8 py-3 text-[0.8125rem] tracking-[0.1em] uppercase">
                Contact an Advisor
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
