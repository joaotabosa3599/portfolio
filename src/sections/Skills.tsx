import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SkillBadge } from '@/components/ui/SkillBadge'
import { skillCategories } from '@/data/skills'

export function Skills() {
  return (
    <section id="skills" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-content px-6 sm:px-8">
        <SectionHeading
          eyebrow="Caixa de ferramentas"
          title="Skills"
          description="Tecnologias e fundamentos que uso no dia a dia para transformar ideias em produtos completos."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-lg font-semibold text-text">{category.title}</h3>
              <p className="mt-1.5 text-sm text-text-secondary">{category.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill} label={skill} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
