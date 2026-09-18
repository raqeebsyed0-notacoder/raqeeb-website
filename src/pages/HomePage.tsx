import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import PageLayout from '../components/PageLayout'
import { projects } from '../data/portfolio'

export default function HomePage() {
  const shuffledProjects = useMemo(() => {
    return [...projects].sort(() => Math.random() - 0.5)
  }, [])

  return (
    <PageLayout>
      <div className="py-12">
        <h1 className="text-3xl sm:text-4xl font-normal tracking-wide uppercase mb-12">
          Portfolio Selected Work
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shuffledProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.category}/${project.slug}`}
              className="group relative overflow-hidden rounded-lg bg-[#0B0B0B] transition-transform hover:scale-[1.02]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
                />
              </div>
              <div className="p-4">
                <h2 className="text-sm font-normal text-white/90 truncate">
                  {project.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
