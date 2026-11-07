import { motion } from 'framer-motion'
import { Code2, BrainCircuit, Rocket } from 'lucide-react'
import experience from '../data/experience'
import { useLanguage } from '../context/LanguageContext'
import RevealText from './RevealText'

const iconMap = { Code2, BrainCircuit, Rocket }

export default function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="relative section-padding px-6 max-w-[1400px] mx-auto tone-orange">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="eyebrow text-orange1"
      >
        {t('experience_eyebrow')}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-6 font-display text-section-heading text-ink tracking-tight"
      >
        <RevealText>{t('experience_heading_1')}</RevealText>{' '}
        <RevealText delay={0.06} className="italic">{t('experience_heading_2')}</RevealText>.
      </motion.h2>

      <div className="mt-14 relative pl-8 sm:pl-10">
        <div className="absolute left-[5px] sm:left-[7px] top-2 bottom-2 w-px bg-ink/10" />

        <div className="space-y-6">
          {experience.map((exp, i) => {
            const Icon = iconMap[exp.icon] ?? Code2
            return (
              <motion.div
                key={`${exp.org}-${i}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -2 }}
                className="relative rounded-2xl card-flat p-6 hover:border-ink/30 border hairline transition-colors duration-300"
              >
                <span className="absolute -left-8 sm:-left-10 top-7 w-2.5 h-2.5 rounded-full bg-ink" />

                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-ink flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-bg" />
                    </div>
                    <div>
                      <h3 className="text-ink font-medium text-lg">{exp.role}</h3>
                      <p className="text-muted text-sm">{exp.org}</p>
                    </div>
                  </div>
                  <span className="eyebrow !text-muted shrink-0">{exp.period}</span>
                </div>

                <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">{exp.summary}</p>

                <ul className="mt-3 space-y-1.5">
                  {exp.bullets.map((b) => (
                    <li key={b} className="text-sm text-ink/85 flex gap-2">
                      <span className="text-orange1 mt-1 shrink-0">—</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tech.map((tech) => (
                    <span key={tech} className="text-xs text-orange1 border border-orange2/30 rounded-full px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
