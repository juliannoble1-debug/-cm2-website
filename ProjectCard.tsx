/* Design: Quiet Modernism — fine 1px border, minimal card, no decorative elements
 * Used in: Projects hub, Home featured section, CM2 GPT shortlist
 */
import { Link } from "wouter";
import type { Project } from "@/types/project";

const WA_LINK = "https://wa.me/447424457658";

interface ProjectCardProps {
  project: Project;
  onOpenGPT?: () => void;
  compact?: boolean;
}

export default function ProjectCard({ project, onOpenGPT, compact }: ProjectCardProps) {
  return (
    <div className="project-card flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F4F2EE]" style={{ aspectRatio: "16/9" }}>
        <img
          src={project.image}
          alt={`${project.name} — ${project.market} property investment | CM2`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="cm2-label bg-[#FAFAF8]/90 backdrop-blur-sm px-2 py-1 text-[#6B6B6B]">
            {project.market}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-1">
          <span className="cm2-label text-[#9B9B9B]">{project.typeLabel}</span>
        </div>
        <h3
          className="text-[1.125rem] text-[#111111] mb-2 leading-snug"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
        >
          {project.name}
        </h3>
        <p className="text-[0.8125rem] text-[#6B6B6B] leading-relaxed mb-4 flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {project.oneLiner}
        </p>

        {!compact && (
          <ul className="space-y-1 mb-4">
            {project.facts.slice(0, 3).map((fact: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-[0.75rem] text-[#6B6B6B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#C0BDB8] flex-shrink-0" />
                {fact}
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-2 mt-auto">
          <Link
            href={`/projects/${project.slug}`}
            className="btn-primary text-[0.75rem] py-2 px-3 flex-1 justify-center"
          >
            View project
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
