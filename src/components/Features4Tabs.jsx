import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  BrainCircuit,
  Rocket,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Briefcase,
  Terminal,
  Sparkles,
} from 'lucide-react'
import experience from '../data/experience'
import { useLanguage } from '../context/LanguageContext'

const iconMap = {
  Code2,
  BrainCircuit,
  Rocket,
}

export default function Features4Tabs() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const duration = 6000 // 6 seconds per tab

  const count = experience.length
  const currentExp = experience[active]
  const Icon = iconMap[currentExp.icon] ?? Briefcase

  // Auto-cycling timer with real-time filling progress line
  useEffect(() => {
    if (paused) return

    const intervalTime = 50
    const step = (intervalTime / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActive((curr) => (curr + 1) % count)
          return 0
        }
        return prev + step
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [paused, duration, count, active])

  const selectTab = (idx) => {
    setActive(idx)
    setProgress(0)
  }

  const next = () => {
    setActive((prev) => (prev + 1) % count)
    setProgress(0)
  }

  const prev = () => {
    setActive((prev) => (prev - 1 + count) % count)
    setProgress(0)
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full rounded-3xl overflow-hidden p-6 sm:p-10 my-10 card-flat border hairline bg-surface/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
    >
      {/* Ambient background glows */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-orange2/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-accent2/15 blur-[120px] pointer-events-none" />

      {/* Top Meta Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b hairline">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-orange1 animate-pulse" />
          <span className="tag-mono text-xs uppercase tracking-wider text-muted font-medium">
            React Bits Pro • Features 4 Tabs
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-ink/5 border hairline text-orange1">
            0{active + 1} / 0{count}
          </span>
        </div>

        {/* Play/Pause & Nav Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPaused((p) => !p)}
            data-cursor
            aria-label={paused ? 'Resume auto-cycle' : 'Pause auto-cycle'}
            className="w-8 h-8 rounded-full border hairline flex items-center justify-center text-muted hover:text-ink hover:bg-ink/5 transition-all text-xs"
            title={paused ? 'Resume auto-cycle' : 'Pause auto-cycle'}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
          <button
            onClick={prev}
            data-cursor
            aria-label="Previous role"
            className="w-8 h-8 rounded-full border hairline flex items-center justify-center text-muted hover:text-ink hover:bg-ink/5 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            data-cursor
            aria-label="Next role"
            className="w-8 h-8 rounded-full border hairline flex items-center justify-center text-muted hover:text-ink hover:bg-ink/5 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout: Tabs on the Left, Feature List on the Right */}
      <div className="relative z-10 mt-8 grid lg:grid-cols-[1.05fr_1.35fr] gap-8 items-start">
        {/* Left: Auto-Cycling Tab Cards */}
        <div className="space-y-3">
          {experience.map((exp, idx) => {
            const isSelected = active === idx
            const TabIcon = iconMap[exp.icon] ?? Briefcase

            return (
              <button
                key={`${exp.org}-${idx}`}
                onClick={() => selectTab(idx)}
                data-cursor
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? 'bg-ink/10 border-orange2/50 shadow-md'
                    : 'bg-ink/5 border-ink/10 hover:border-ink/20 opacity-70 hover:opacity-100'
                }`}
              >
                {/* Live Progress Bar for Active Tab */}
                {isSelected && (
                  <div
                    className="absolute bottom-0 left-0 h-[2px] bg-orange1 transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                )}

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-orange2 text-white shadow-sm'
                          : 'bg-ink/10 text-muted group-hover:text-ink'
                      }`}
                    >
                      <TabIcon size={16} />
                    </div>
                    <div>
                      <h4 className="font-display font-medium text-sm sm:text-base text-ink">
                        {exp.role}
                      </h4>
                      <p className="text-xs text-muted font-medium">{exp.org}</p>
                    </div>
                  </div>

                  <span className="tag-mono text-[10px] text-muted border hairline rounded-full px-2 py-0.5 shrink-0">
                    {exp.period}
                  </span>
                </div>

                <p className="mt-2 text-xs text-ink/70 line-clamp-2 leading-relaxed">
                  {exp.summary}
                </p>
              </button>
            )
          })}
        </div>

        {/* Right: Detailed Feature List Card */}
        <div className="min-h-[380px] sm:min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExp.org + currentExp.role}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-2xl card-flat border hairline bg-surface/80 backdrop-blur-xl shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Header Tag and Role */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b hairline">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange2/20 flex items-center justify-center text-orange1">
                      <Icon size={16} />
                    </div>
                    <div>
                      <span className="eyebrow text-orange1 !text-[11px] block">
                        {currentExp.org}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl text-ink font-semibold tracking-tight">
                        {currentExp.role}
                      </h3>
                    </div>
                  </div>
                  <span className="tag-mono text-xs text-muted border hairline rounded-full px-3 py-1">
                    {currentExp.period}
                  </span>
                </div>

                {/* Role Summary */}
                <p className="mt-5 text-sm sm:text-base text-ink/85 leading-relaxed">
                  {currentExp.summary}
                </p>

                {/* Feature / Bullet Accomplishments List */}
                <div className="mt-6 space-y-3">
                  <span className="tag-mono text-[11px] text-muted uppercase tracking-wider block font-semibold">
                    Key Deliverables & Responsibilities:
                  </span>
                  <div className="space-y-2.5">
                    {currentExp.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-start gap-3 p-3 rounded-xl bg-ink/5 border hairline"
                      >
                        <CheckCircle2 size={16} className="text-orange1 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-ink/85 leading-relaxed">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies Used Footer */}
              <div className="mt-8 pt-5 border-t hairline flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="tag-mono text-[10px] text-muted uppercase">Tech Stack:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentExp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-0.5 rounded-full text-orange1 bg-orange2/10 border border-orange2/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="text-xs text-muted font-mono flex items-center gap-1">
                  <Sparkles size={13} className="text-orange1" /> Active Experience
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

