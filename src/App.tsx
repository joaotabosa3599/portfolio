import { MotionConfig } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import { Grain } from '@/components/atmosphere/Grain'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollManager } from '@/components/layout/ScrollManager'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProjectCasePage } from '@/pages/ProjectCasePage'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-bg">
        <ScrollManager />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projetos/:slug" element={<ProjectCasePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <Grain />
      </div>
    </MotionConfig>
  )
}

export default App
