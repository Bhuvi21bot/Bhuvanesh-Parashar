import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import socials from '../data/socials'
import { scrollToId } from '../lib/scroll'
import { useMagnetic } from '../lib/magnetic'
import { useLanguage } from '../context/LanguageContext'
import TechText from './TechText'

export default function Hero() {
  const { t } = useLanguage()
  const roles = t('hero_roles')
  const [index, setIndex] = useState(0)
  const mag1 = useMagnetic(0.25)
  const mag2 = useMagnetic(0.25)

  useEffect(() => {
    setIndex(0)
  }, [roles])

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2400)
    return () => clearInterval(id)
  }, [roles])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col px-6 pt-16">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-4"
        >
          {t('hero_eyebrow')}
        </motion.span>

        <h1 className="sr-only">Bhuvanesh Parashar</h1>

        <div className="w-full h-[180px] sm:h-[260px] md:h-[340px] lg:h-[420px] relative max-w-[1300px] mx-auto text-ink">
          <TechText
            text="Bhuvanesh Parashar"
            fontWeight={600}
            fontSize={150}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            intro="none"
            introDuration={2}
            clickKick
            guides={false}
            fontFamily=""
            letterSpacing={-0.05}
            accentColor="#4E85BF"
            reach={200}
            softness={0.7}
            lineStyle="dashed"
            strokeWidth={1.5}
            speed={1}
            bounce={0.4}
            selection
            labels
            color="currentColor"
            align="center"
            draggable
            sweep
          />
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 font-mono text-sm sm:text-base text-muted">
          <span>&gt;</span>
          <span className="inline-block text-center text-ink" style={{ minWidth: '15ch' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[index]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                {roles[index]}
              </motion.span>
            </AnimatePresence>
          </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          >
            _
          </motion.span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <motion.button
            ref={mag1.ref}
            style={mag1.style}
            onMouseMove={mag1.onMouseMove}
            onMouseLeave={mag1.onMouseLeave}
            onClick={() => scrollToId('projects')}
            data-cursor
            whileHover={{ scale: 1.03 }}
            className="group px-6 py-3 rounded-full bg-accent2 text-white font-medium text-sm tracking-wide flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            {t('hero_cta_projects')}
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
          <motion.a
            ref={mag2.ref}
            style={mag2.style}
            onMouseMove={mag2.onMouseMove}
            onMouseLeave={mag2.onMouseLeave}
            href={socials.resume}
            target="_blank"
            rel="noreferrer"
            data-cursor
            whileHover={{ scale: 1.03 }}
            className="px-6 py-3 rounded-full border hairline text-ink font-medium text-sm tracking-wide flex items-center gap-2 hover:border-accent2/50 transition-colors"
          >
            {t('hero_cta_resume')} <Download size={15} />
          </motion.a>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToId('about')}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="mx-auto mb-8 text-muted hover:text-ink transition-colors"
        aria-label="Scroll down"
        data-cursor
      >
        <ArrowDown size={20} />
      </motion.button>
    </section>
  )
}
