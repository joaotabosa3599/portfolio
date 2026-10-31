/**
 * As três camadas da escultura do hero — e da página. Mesma numeração e
 * mesmos nomes na seção de stack, para que o começo e o meio do site falem
 * a mesma língua. O conteúdo de cada plano é um corte real do Mapa DISC.
 */
export interface Layer {
  id: 'data' | 'application' | 'experience'
  index: string
  name: string
  meta: string
  caption: string
}

export const LAYERS: Layer[] = [
  {
    id: 'data',
    index: '01',
    name: 'Data layer',
    meta: 'postgres · schema disc',
    caption: 'Schema próprio, sem grants para fora: acesso direto responde 42501, por desenho.',
  },
  {
    id: 'application',
    index: '02',
    name: 'Application layer',
    meta: 'rpc · auth · webhooks',
    caption: 'Consumidores só falam por RPC: API key na emissão, webhook HMAC na conclusão.',
  },
  {
    id: 'experience',
    index: '03',
    name: 'Experience layer',
    meta: '/teste/<token>',
    caption: 'A pessoa responde sem login: o token do link é a única credencial.',
  },
]

export const SCULPTURE_SOURCE = 'Corte do Mapa DISC, em produção na RF Group'
