import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center pb-20 pt-32">
      <p className="font-mono text-xs text-brand-light">404</p>
      <h1 className="display mt-5 text-section text-text">
        Esta página
        <br />
        não existe.
      </h1>
      <p className="mt-6 max-w-md text-base text-text-secondary">O endereço pode ter mudado ou nunca ter existido.</p>
      <div className="mt-10">
        <Button to="/" variant="secondary" leadingIcon={<ArrowLeft size={16} />}>
          Voltar para o início
        </Button>
      </div>
    </section>
  )
}
