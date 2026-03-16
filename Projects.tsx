/* Design: Quiet Modernism — Projects hub, grouped by market
 * London section: named projects first, then Investment Zones grid
 */
import { Link } from "wouter";
import { FileText } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";
import { useSEO } from "@/hooks/useSEO";

const projects: Project[] = projectsData as Project[];
const markets = ["London", "Abu Dhabi", "Dubai", "Egypt"];

// Investment zones — these are area-level opportunities, not single named developments
const INVESTMENT_ZONE_SLUGS = new Set([
  "wandsworth-common",
  "twickenham",
  "brook-green",
  "woolwich",
  "croydon",
]);

const WA_LINK = "https://wa.me/447424447658";

interface InvestmentZoneCardProps {
  project: Project;
}

function InvestmentZoneCard({ project }: InvestmentZoneCardProps) {
  return (
    <div className="group relative overflow-hidden border border-[#E0DDD8] bg-[#FAFAF8] hover:border-[#111111] transition-colors duration-300">
      {/* Image strip */}
      <div className="relative overflow-hidden bg-[#F4F2EE]" style={{ aspectRatio: "3/2" }}>
        <img
          src={project.image}
          alt={`${project.name} — London investment zone | CM2`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3
            className="text-white text-[1.0625rem] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
          >
            {project.name}
          </h3>
          <p className="text-white/70 text-[0.6875rem] mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {project.facts[0]}
          </p>
        </div>
      </div>

      {/* Copy */}
      <div className="p-4">
        <p className="text-[0.8125rem] text-[#6B6B6B] leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {project.oneLiner}
        </p>
        <div className="flex gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="btn-primary text-[0.75rem] py-2 px-3 flex-1 justify-center"
          >
            View zone
          </Link>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-[0.75rem] py-2 px-3 flex-1 justify-center"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

interface ProjectsProps {
  onOpenGPT?: () => void;
}

export default function Projects({ onOpenGPT }: ProjectsProps) {
  useSEO({
    title: "Property Investment Projects — London, Dubai, Abu Dhabi & Egypt | CM2",
    description: "Browse curated property investment projects across London, Dubai, Abu Dhabi, and Egypt. Exclusively through Aldar Properties and London Square.",
    canonical: "https://www.thecm2.com/projects",
  });

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="cm2-label mb-3">Projects</p>
          <h1 className="text-[2.5rem] sm:text-[3rem] text-[#111111] mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            Curated opportunities across three markets.
          </h1>
          <p className="text-[0.9375rem] text-[#6B6B6B] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            A curated selection of Aldar and Aldar-backed opportunities across London, UAE, and Egypt. Use CM2 GPT to request plans, layouts, and indicative pricing, then confirm live availability with an advisor.
          </p>
        </div>

        {/* Grouped by market */}
        {markets.map((market) => {
          const allMarketProjects = projects.filter((p) => p.market === market);
          if (!allMarketProjects.length) return null;

          if (market === "London") {
            const namedProjects = allMarketProjects.filter((p) => !INVESTMENT_ZONE_SLUGS.has(p.slug));
            const investmentZones = allMarketProjects.filter((p) => INVESTMENT_ZONE_SLUGS.has(p.slug));

            return (
              <div key={market} className="mb-20">
                {/* Market header */}
                <div className="flex items-center gap-4 mb-7">
                  <p className="cm2-label">{market}</p>
                  <div className="flex-1 cm2-rule" />
                </div>

                {/* Named developments */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
                  {namedProjects.map((p) => (
                    <ProjectCard key={p.slug} project={p} onOpenGPT={onOpenGPT} />
                  ))}
                </div>

                {/* Investment Zones sub-section */}
                {investmentZones.length > 0 && (
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <p className="cm2-label text-[#9B9B9B]">London — Investment Zones</p>
                      <div className="flex-1 border-t border-dashed border-[#E0DDD8]" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
                      <p className="text-[0.8125rem] text-[#9B9B9B] max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        High-conviction London postcodes selected for price accessibility, rental demand, connectivity, and capital growth potential.
                      </p>
                      <Link
                        href="/london-investment-brief"
                        className="btn-secondary flex-none"
                        style={{ borderColor: "rgba(201,169,110,0.55)", color: "#C9A96E", fontSize: "0.75rem", padding: "0.5rem 1rem" }}
                      >
                        <FileText size={13} strokeWidth={1.5} />
                        Download London Brief
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {investmentZones.map((p) => (
                        <InvestmentZoneCard key={p.slug} project={p} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <div key={market} className="mb-16">
              <div className="flex items-center gap-4 mb-7">
                <p className="cm2-label">{market}</p>
                <div className="flex-1 cm2-rule" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {allMarketProjects.map((p) => (
                  <ProjectCard key={p.slug} project={p} onOpenGPT={onOpenGPT} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Bottom CTA */}
        <div className="border-t border-[#E0DDD8] pt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-[0.875rem] text-[#6B6B6B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Not sure where to start? CM2 GPT will generate a personalised shortlist in under two minutes.
          </p>
          <button onClick={onOpenGPT} className="btn-primary flex-shrink-0">
            Ask CM2 GPT
          </button>
        </div>
      </div>
    </div>
  );
}
