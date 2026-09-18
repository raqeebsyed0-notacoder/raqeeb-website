import PageLayout from '../components/PageLayout'
import { getProjectsByCategory, categories } from '../data/portfolio'
import { Link } from 'react-router-dom'

export default function CatalogPage() {
  const allProjects = categories.flatMap((cat) =>
    getProjectsByCategory(cat.slug).map((p) => ({ ...p, category: cat.slug, categoryTitle: cat.title }))
  )

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-4">
            Archive
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase font-normal leading-[0.9] mb-4">
            Visual
            <br />
            <span className="font-pixel font-normal text-[1.1em]">Catalog</span>
          </h1>
          <p className="text-sm text-white/60 max-w-xl">
            Uncurated archive of logos, posters, brand marks, illustrations, and visual explorations.
          </p>
        </div>

        {/* Dense visual grid */}
        <div className="columns-2 sm:columns-3 md:columns-4 gap-3 space-y-3">
          {allProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.category}/${project.slug}`}
              className="group block break-inside-avoid"
            >
              <div className="relative overflow-hidden bg-[#0a0a0a]">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[10px] text-white uppercase tracking-widest truncate">
                    {project.title}
                  </p>
                  <p className="text-[9px] text-white/60 truncate">{project.categoryTitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}