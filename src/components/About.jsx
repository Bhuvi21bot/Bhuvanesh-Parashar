import { motion } from 'framer-motion'
import { MapPin, Target, Sparkles, Compass, Code2, BrainCircuit, Cloud } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import RevealText from './RevealText'

const facts = [
  { label: 'Based in', value: 'India', icon: MapPin },
  { label: 'Focus', value: 'Full Stack + AI/ML', icon: Target },
  { label: 'Currently', value: 'Open to internships & collabs', icon: Sparkles },
  { label: 'Approach', value: 'Systems thinking, clean execution', icon: Compass },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative section-padding px-6 max-w-[1400px] mx-auto tone-blue">
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="eyebrow"
      >
        {t('about_eyebrow')}
      </motion.span>

      <div className="mt-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="font-display text-section-heading text-ink leading-tight tracking-tight">
            <RevealText>{t('about_heading_1')}</RevealText>{' '}
            <RevealText delay={0.06} className="italic">{t('about_heading_2')}</RevealText>{' '}
            <RevealText delay={0.12}>{t('about_heading_3')}</RevealText>
          </h2>

          {/* EDIT ME — swap in your real bio */}
          <p className="mt-6 text-muted text-base sm:text-lg leading-relaxed max-w-xl">
            I'm Bhuvanesh Parashar, a Full Stack Developer and AI/ML enthusiast who likes turning
            complex problems into clean, usable products. I work across the stack — from
            interactive React frontends to scalable backends — and bring machine learning in
            wherever it adds real value, not just for show. Most of what I build comes out of
            campus incubation projects and a habit of picking apart how systems are designed
            before I build my own.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 max-w-xl">
            {facts.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.label} className="border-t hairline pt-3">
                  <div className="eyebrow flex items-center gap-1.5">
                    <Icon size={12} /> {f.label}
                  </div>
                  <div className="mt-1 text-ink text-sm sm:text-base">{f.value}</div>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative aspect-[4/5] rounded-2xl card-flat flex items-center justify-center overflow-hidden"
        >
          <span className="font-display text-7xl sm:text-8xl text-ink">
            B<span className="italic text-muted">P</span>
          </span>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-8 left-8 w-11 h-11 rounded-xl card-flat flex items-center justify-center"
          >
            <Code2 size={18} className="text-ink" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
            className="absolute top-10 right-8 w-11 h-11 rounded-xl card-flat flex items-center justify-center"
          >
            <BrainCircuit size={18} className="text-ink" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-8 left-10 w-11 h-11 rounded-xl card-flat flex items-center justify-center"
          >
            <Cloud size={18} className="text-ink" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
