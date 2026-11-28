import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import RouteMeta from './components/route-meta'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ProcessPage from './pages/ProcessPage'
import CategoryPage from './pages/CategoryPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ResumePage from './pages/ResumePage'

export default function App() {
  return (
    <HashRouter>
      <RouteMeta />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        {/* Retire the crashing all-projects grid: /projects/all redirects to /projects. */}
        <Route path="/projects/all" element={<Navigate to="/projects" replace />} />
        <Route path="/projects/:category" element={<CategoryPage />} />
        <Route path="/projects/:category/:slug" element={<ProjectDetailPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}