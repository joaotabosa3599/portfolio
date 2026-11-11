import { startTransition, useEffect, useState } from 'react'
import { About } from '@/sections/About'
import { Automations } from '@/sections/Automations'
import { Capabilities } from '@/sections/Capabilities'
import { Contact } from '@/sections/Contact'
import { Experience } from '@/sections/Experience'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'

/**
 * Ritmo da página — a composição muda de seção para seção:
 *   HERO        texto + escultura (alta intensidade)
 *   PROJETOS    galeria editorial: destaque, alternados, par (alta)
 *   AUTOMAÇÕES  bots e robôs, alternados como os projetos, fundo secundário (alta)
 *   SOBRE       ficha + texto + citação (pausa)
 *   STACK       grade técnica de três camadas (média)
 *   EXPERIÊNCIA timeline com título preso (média)
 *
 * Cores em 60-30-10: 60 é o fundo quase preto, 30 é o grafite das seções
 * secundárias, dos cartões e do texto neutro, e 10 é o roxo, o único destaque
 * (ação, item ativo, palavra-chave). O verde só marca "no ar".
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
          <Automations />
          <About />
          <Capabilities />
          <Experience />
          <Contact />
        </>
      )}
    </>
  )
}
