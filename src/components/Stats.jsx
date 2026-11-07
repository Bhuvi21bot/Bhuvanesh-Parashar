import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import projects from '../data/projects'
import experience from '../data/experience'
import skillGroups from '../data/skills'
import { useLanguage } from '../context/LanguageContext'

function CountUp({ target, suffix = '', pad = true, duration = 1.1 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start
    let raf
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min(1, (ts - start) / (duration * 1000))
      setDisplay(Math.round(progress * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  const text = pad ? String(display).padStart(2, '0') : String(display)
  return <span ref={ref}>{text}{suffix}</span>
}

export default function Stats() {
  const { t } = useLanguage()
  const techCount = new Set(skillGroups.flatMap((g) => g.skills)).size

  const stats = [
    { target: projects.length, label: t('stats_1_label') },
    { target: experience.length, label: t('stats_2_label') },
    { target: techCount, suffix: '+', pad: false, label: t('stats_3_label') },
    { target: 1, label: t('stats_4_label') },
  ]

  return (
    <section className="relative py-16 sm:py-20 px-6 max-w-[1400px] mx-auto tone-orange border-y hairline">
      <motion.span
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="eyebrow block mb-10 text-orange1"
      >
        {t('stats_eyebrow')}
      </motion.span>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`pl-5 ${i > 0 ? 'sm:border-l hairline' : ''}`}
          >
            <div className="font-display text-5xl sm:text-6xl text-ink tracking-tight">
              <CountUp target={s.target} suffix={s.suffix} pad={s.pad !== false} />
            </div>
            <p className="mt-2 text-xs sm:text-sm text-muted leading-snug">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
