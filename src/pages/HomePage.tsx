import { Intro } from '@/components/intro/Intro'
import { useIntroStatus } from '@/lib/intro'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Editorial } from '@/sections/Editorial'
import { Experience } from '@/sections/Experience'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'

/**
 * Ritmo da página: HERO (alta) → PROJETOS (alta) → EDITORIAL (pausa) →
 * SOBRE (baixa) → STACK (média) → EXPERIÊNCIA (média) → CONTATO (alta).
 */
export function HomePage() {
  const introStatus = useIntroStatus()
  const introVisible = introStatus === 'playing' || introStatus === 'landing'

  return (
    <>
      {introVisible && <Intro />}
      <Hero />
      <Projects />
      <Editorial />
      <About />
      <Skills />
      <Experience />
      <Contact />
    </>
  )
}
