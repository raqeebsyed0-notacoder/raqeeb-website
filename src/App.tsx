import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import CategoryPage from './pages/CategoryPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import CatalogPage from './pages/CatalogPage'
import ResumePage from './pages/ResumePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:category" element={<CategoryPage />} />
        <Route path="/projects/:category/:slug" element={<ProjectDetailPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}