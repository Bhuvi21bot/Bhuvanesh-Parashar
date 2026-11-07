import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, LayoutTemplate, Server, Database, BrainCircuit, Cloud, Wrench } from 'lucide-react'
import skillGroups from '../data/skills'
import { useLanguage } from '../context/LanguageContext'
import RevealText from './RevealText'

const iconMap = { Code2, LayoutTemplate, Server, Database, BrainCircuit, Cloud, Wrench }

export default function Skills() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const group = skillGroups[active]
  const Icon = iconMap[group.icon] ?? Wrench
  const isAI = group.category === 'AI / ML'

  return (
    <section id="skills" className="relative section-padding px-6 max-w-[1400px] mx-auto tone-orange">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="eyebrow"
      >
        {t('skills_eyebrow')}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-6 font-display text-section-heading text-ink tracking-tight"
      >
        <RevealText>{t('skills_heading_1')}</RevealText>{' '}
        <RevealText delay={0.06} className="italic">{t('skills_heading_2')}</RevealText>{' '}
        <RevealText delay={0.12}>{t('skills_heading_3')}</RevealText>
      </motion.h2>

      <div className="mt-14 grid sm:grid-cols-[200px_1fr] gap-10 sm:gap-16">
        {/* tab list — mirrors the reference's vertical category switcher */}
        <div className="flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible">
          {skillGroups.map((g, i) => (
            <button
              key={g.category}
              onClick={() => setActive(i)}
              data-cursor
              className={`shrink-0 text-left px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                i === active ? 'text-ink bg-ink/5 font-medium' : 'text-muted hover:text-ink'
              }`}
            >
              {g.category}
            </button>
          ))}
        </div>

        {/* active category panel */}
        <div className="border-t hairline pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="eyebrow">{String(active + 1).padStart(2, '0')}</span>
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  isAI ? 'bg-orange2' : 'border hairline'
                }`}
              >
                <Icon size={16} className={isAI ? 'text-white' : 'text-ink'} />
              </div>
              <h3 className="text-ink font-medium text-lg">{group.category}</h3>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-6 flex flex-wrap gap-2.5"
            >
              {group.skills.map((s) => (
                <span
                  key={s}
                  className={`tag-mono rounded-full px-3.5 py-2 border ${
                    isAI ? 'text-orange1 border-orange2/40' : 'text-muted hairline'
                  }`}
                >
                  {s}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
