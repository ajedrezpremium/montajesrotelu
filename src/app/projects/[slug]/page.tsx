import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/supabase";
import { Calendar, MapPin, Ruler, Weight, Award, ArrowLeft } from "lucide-react";
import ProjectGallery from "./gallery";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange text-sm transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <ProjectGallery images={project.images} title={project.title} />
          </div>

          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-orange/10 text-orange text-xs uppercase tracking-wider">
                {project.sector}
              </span>
              <span className="text-zinc-500 text-xs flex items-center gap-1">
                <Calendar size={12} />
                {project.year}
              </span>
              {project.client && (
                <span className="text-zinc-500 text-xs">{project.client}</span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-6">{project.title}</h1>

            <p className="text-zinc-400 leading-relaxed mb-8">{project.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <MapPin size={14} className="text-orange/60 shrink-0" />
                {project.country}
              </div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <Ruler size={14} className="text-orange/60 shrink-0" />
                {project.dimensions}
              </div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <Weight size={14} className="text-orange/60 shrink-0" />
                {project.weight}
              </div>
              <div className="text-zinc-400 text-sm">
                <span className="text-orange/60">Material:</span> {project.material}
              </div>
            </div>

            {project.highlights.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-zinc-300 mb-3">Key Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-800/80 text-zinc-400 text-[11px] border border-zinc-700/50"
                    >
                      <Award size={11} className="text-orange/60" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-zinc-800/50">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white text-sm font-medium hover:bg-orange/90 transition-colors"
              >
                Inquire About This Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
