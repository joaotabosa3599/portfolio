import { MotionConfig } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { BlueprintField } from '@/components/atmosphere/BlueprintField'
import { Grain } from '@/components/atmosphere/Grain'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollManager } from '@/components/layout/ScrollManager'
import { HomePage } from '@/pages/HomePage'

// Rotas secundárias em chunks próprios: a home não carrega o código delas.
const ProjectCasePage = lazy(() => import('@/pages/ProjectCasePage').then((m) => ({ default: m.ProjectCasePage })))
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="fixed left-4 top-3 z-[80] -translate-y-20 rounded-full bg-text px-4 py-2 text-sm font-medium text-bg transition-transform focus:translate-y-0 print:hidden"
      >
        Pular para o conteúdo
      </a>
      <div className="flex min-h-screen flex-col bg-bg print:block print:min-h-0">
        <ScrollManager />
        <Navbar />
        <main id="conteudo" className="relative isolate flex-1">
          <BlueprintField />
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projetos/:slug" element={<ProjectCasePage />} />
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="/curriculo" element={<Navigate to="/perfil" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Grain />
      </div>
    </MotionConfig>
  )
}

export default App
