import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { Skeleton } from '@/components/ui/Skeleton'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { GradientCursor } from '@/components/ui/GradientCursor'

// Lazy-loaded routes
const HomePage = lazy(() => import('@/pages/HomePage'))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const ResumePage = lazy(() => import('@/pages/ResumePage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col gap-4 p-8 pt-28">
      <Skeleton variant="block" className="h-64 max-w-4xl mx-auto w-full" />
      <Skeleton variant="line" lines={3} className="max-w-2xl mx-auto w-full" />
    </div>
  )
}

export default function App() {
  // Initialize theme (applies class to <html> and persists)
  useTheme()

  return (
    <BrowserRouter>
      {/* Skip to content – accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/resume/:type" element={<ResumePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <CommandPalette />
      <GradientCursor />
      </ErrorBoundary>
    </BrowserRouter>
  )
}
