/* Design: Quiet Modernism — Project detail page */
import { Link } from "wouter";
import { MessageCircle, ArrowLeft, CheckCircle } from "lucide-react";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";
import { useSEO } from "@/hooks/useSEO";

const WA_LINK = "https://wa.me/447424447658";
const projects: Project[] = projectsData as Project[];

interface ProjectDetailProps {
  slug: string;
  onOpenGPT?: () => void;
}

const galleryImages = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-interior-U2mRNRb4kGQ6KNxz9aEqx4.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-saadiyat-GQfCMJtdqqYiMJwScZCBac.webp",
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031253658/68KcWAaMsChVyE7UijVTrv/cm2-dubai-6mTCaHghHh4QYamqCPpzL3.webp",
];

export default function ProjectDetail({ slug, onOpenGPT }: ProjectDetailProps) {
  const project = projects.find((p) => p.slug === slug);

  useSEO({
    title: project
      ? `${project.name} | ${project.market} Property Investment — CM2`
      : "Project Not Found | CM2",
    description: project
      ? `${project.oneLiner} Discover ${project.name} with CM2 — your private property investment concierge.`
      : "This project could not be found. Browse all CM2 investment opportunities.",
    canonical: project ? `https://www.thecm2.com/projects/${project.slug}` : undefined,
    ogImage: project?.image,
  });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="cm2-label mb-3">Not Found</p>
          <h1 className="text-[2rem] text-[#111111] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            Project not found.
          </h1>
          <Link href="/projects" className="btn-primary">
            View all projects
          </Link>
        </div>
      </div>
    );
  }

  const images = [project.image, ...galleryImages.filter((img) => img !== project.image)].slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Back nav */}
      <div className="border-b border-[#E0DDD8] py-4">
        <div className="container">
          <Link href="/projects" className="flex items-center gap-2 text-[0.8125rem] text-[#6B6B6B] hover:text-[#111111] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <ArrowLeft size={14} /> All projects
          </Link>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-[50vh] overflow-hidden bg-[#F4F2EE]">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container">
            <span className="cm2-label bg-[#FAFAF8]/90 backdrop-blur-sm px-2 py-1 text-[#6B6B6B]">{project.market}</span>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar — shown first on mobile via order */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="sticky top-24 space-y-4">
              <div className="border border-[#E0DDD8] p-6">
                <h3 className="text-[1.125rem] text-[#111111] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  Confirm live availability
                </h3>
                <p className="text-[0.8125rem] text-[#6B6B6B] mb-5 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  A CM2 advisor will confirm current availability, pricing, and payment plans on WhatsApp.
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center mb-3"
                >
                  <MessageCircle size={15} /> WhatsApp an Advisor
                </a>
                <button onClick={onOpenGPT} className="btn-secondary w-full justify-center">
                  Ask CM2 GPT
                </button>
              </div>
              <div className="bg-[#F4F2EE] p-4">
                <p className="text-[0.75rem] text-[#9B9B9B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  CM2 is an Aldar partner. Pricing is indicative and subject to availability and confirmation. Not financial advice.
                </p>
              </div>
            </div>
          </div>
          {/* Main content */}
          <div className="lg:col-span-2 order-last lg:order-first">
            <div className="cm2-label text-[#9B9B9B] mb-2">{project.typeLabel}</div>
            <h1 className="text-[2.5rem] sm:text-[3rem] text-[#111111] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
              {project.name}
            </h1>
            <p className="text-[1rem] text-[#6B6B6B] leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {project.oneLiner}
            </p>

            {/* Key facts */}
            <div className="mb-10">
              <p className="cm2-label mb-4">Key Facts</p>
              <ul className="space-y-2">
                {project.facts.map((fact: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[0.875rem] text-[#6B6B6B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C0BDB8] flex-shrink-0" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            <div className="mb-10">
              <p className="cm2-label mb-4">Gallery</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative overflow-hidden bg-[#F4F2EE]" style={{ aspectRatio: "4/3" }}>
                    <img src={img} alt={`${project.name} — view ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            {/* Layouts */}
            <div className="mb-10 border border-[#E0DDD8] p-6">
              <p className="cm2-label mb-2">Floor Plans &amp; Layouts</p>
              <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Ask CM2 GPT for available floor plans and sizes. Our concierge will provide detailed layouts and unit availability based on your requirements.
              </p>
              <button onClick={onOpenGPT} className="btn-primary mt-4">
                Ask CM2 GPT
              </button>
            </div>

            {/* Pricing */}
            <div className="mb-10 bg-[#F4F2EE] p-6">
              <p className="cm2-label mb-2">Indicative Pricing</p>
              <p className="text-[0.875rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Indicative pricing and ranges are available in CM2 GPT and are subject to availability and confirmation. Last updated: {project.lastUpdated}.
              </p>
              <p className="text-[0.75rem] text-[#9B9B9B] mt-2 italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Not financial advice. Pricing subject to change. Always confirm with a CM2 advisor before making decisions.
              </p>
            </div>

            {/* Why this project */}
            <div className="mb-10">
              <p className="cm2-label mb-4">Why This Project</p>
              <ul className="space-y-3">
                {project.why.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[0.875rem] text-[#6B6B6B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <CheckCircle size={15} className="mt-0.5 flex-shrink-0 text-[#111111]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Final CTA */}
      <div className="border-t border-[#E0DDD8] bg-[#F4F2EE] py-16">
        <div className="container text-center">
          <h2 className="text-[2rem] text-[#111111] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            Ready to take the next step?
          </h2>
          <p className="text-[0.875rem] text-[#6B6B6B] mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Speak with a CM2 advisor to confirm live availability and arrange a private conversation.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle size={15} /> WhatsApp an Advisor
            </a>
            <button onClick={onOpenGPT} className="btn-secondary">
              Ask CM2 GPT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
