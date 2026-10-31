import { startTransition, useEffect, useState } from 'react'
import { About } from '@/sections/About'
import { Capabilities } from '@/sections/Capabilities'
import { Contact } from '@/sections/Contact'
import { Experience } from '@/sections/Experience'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'

/**
 * Ritmo da página — a composição muda de seção para seção:
 *   HERO        texto + escultura (alta intensidade)
 *   PROJETOS    galeria editorial: destaque, alternados, par (alta)
 *   SOBRE       ficha + texto + citação, fundo secundário (pausa)
 *   STACK       grade técnica de três camadas (média)
 *   EXPERIÊNCIA timeline com título preso, fundo secundário (média)
 *   CONTATO     tipografia grande + a escultura montada (encerramento)
 *
 * O hero renderiza no primeiro quadro; o resto da página entra numa
 * transição, que o React fatia em pedaços pequenos. Assim a primeira dobra
 * não espera pelo render de ~1.300 nós que ainda estão fora da tela.
 */
export function HomePage() {
  const [rest, setRest] = useState(false)

  useEffect(() => {
    startTransition(() => setRest(true))
  }, [])

  return (
    <>
      <Hero />
      {rest && (
        <>
          <Projects />
          <About />
          <Capabilities />
          <Experience />
          <Contact />
        </>
      )}
    </>
  )
}
