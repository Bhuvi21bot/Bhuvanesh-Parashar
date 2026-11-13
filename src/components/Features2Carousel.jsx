import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Play,
  Pause,
  Layers,
  CheckCircle2,
} from 'lucide-react'
import projects from '../data/projects'
import thumbnails from './ProjectThumbnails'
import socials from '../data/socials'
import { useLanguage } from '../context/LanguageContext'

export default function Features2Carousel({ onOpenModal }) {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const duration = 5000 // 5 seconds per slide

  const count = projects.length
  const currentProject = projects[active]
  const Thumb = thumbnails[currentProject.id]
  const githubHref = currentProject.links?.github || socials.github
  const hasDemo = Boolean(currentProject.links?.demo)

  // Smooth auto-cycling timer with real-time progress bar
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

  const selectSlide = (index) => {
    setActive(index)
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
      className="relative w-full rounded-3xl overflow-hidden p-6 sm:p-10 my-8 card-flat border hairline bg-surface/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
    >
      {/* Ambient background light glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent2/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange2/15 blur-[120px] pointer-events-none" />

      {/* Top Header / Meta Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b hairline">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tag-mono text-xs uppercase tracking-wider text-muted font-medium">
            React Bits Pro • Features 2 Carousel
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-ink/5 border hairline text-accent2">
            0{active + 1} / 0{count}
          </span>
        </div>

        {/* Carousel controls */}
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
            aria-label="Previous slide"
            className="w-8 h-8 rounded-full border hairline flex items-center justify-center text-muted hover:text-ink hover:bg-ink/5 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            data-cursor
            aria-label="Next slide"
            className="w-8 h-8 rounded-full border hairline flex items-center justify-center text-muted hover:text-ink hover:bg-ink/5 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Tab Switcher with Real-time Auto-Filling Progress Indicators */}
      <div className="relative z-10 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {projects.map((proj, idx) => {
          const isCurrent = active === idx
          return (
            <button
              key={proj.id}
              onClick={() => selectSlide(idx)}
              data-cursor
              className={`relative text-left p-3 rounded-2xl border transition-all duration-300 overflow-hidden ${
                isCurrent
                  ? 'bg-ink/10 border-accent2/50 shadow-sm'
                  : 'bg-ink/5 border-ink/10 hover:border-ink/20 opacity-70 hover:opacity-100'
              }`}
            >
              {/* Animated Progress Bar */}
              {isCurrent && (
                <div
                  className="absolute bottom-0 left-0 h-[2px] bg-accent2 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              )}

              <div className="flex items-center justify-between gap-1">
                <span className="tag-mono text-[10px] text-muted font-medium">0{idx + 1}</span>
                {isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent2" />
                )}
              </div>
              <h4 className="font-display font-medium text-xs sm:text-sm text-ink truncate mt-1">
                {proj.name}
              </h4>
              <p className="text-[10px] text-muted truncate mt-0.5">{proj.tags[0]} • {proj.tags[1]}</p>
            </button>
          )
        })}
      </div>

      {/* Main Glass Card Slide Content */}
      <div className="relative z-10 mt-8 min-h-[360px] sm:min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center"
          >
            {/* Left Column: Project Overview & Specs */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {currentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-mono text-[11px] text-accent2 bg-accent2/10 border border-accent2/25 rounded-full px-2.5 py-0.5"
                  >
                    #{tag.toUpperCase()}
                  </span>
                ))}
                <span className="text-[11px] tag-mono text-muted border hairline rounded-full px-2.5 py-0.5">
                  {currentProject.role}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl text-ink font-semibold tracking-tight">
                {currentProject.name}
              </h3>
              <p className="text-muted text-base font-medium">{currentProject.tagline}</p>

              <p className="text-ink/80 text-sm leading-relaxed max-w-xl">
                {currentProject.overview}
              </p>

              {/* Key Features Quick Bullets */}
              <div className="grid sm:grid-cols-2 gap-2 pt-1">
                {currentProject.features.slice(0, 2).map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs text-ink/75">
                    <CheckCircle2 size={13} className="text-accent2 shrink-0" />
                    <span className="truncate">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-2 flex flex-wrap gap-2">
                {currentProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full text-ink/85 bg-ink/5 border hairline"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenModal(currentProject)}
                  data-cursor
                  className="flex items-center gap-1.5 text-xs font-semibold px-5 py-2.5 rounded-full bg-accent2 text-white hover:opacity-90 transition-opacity shadow-sm"
                >
                  <Sparkles size={14} className="text-white" />
                  {t('project_view_details')}
                </button>
                <a
                  href={githubHref}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="flex items-center gap-2 rounded-full border hairline px-4 py-2.5 text-xs text-ink hover:bg-ink/5 transition-colors"
                >
                  <Github size={14} /> {t('modal_github')}
                </a>
                {hasDemo && (
                  <a
                    href={currentProject.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor
                    className="flex items-center gap-2 rounded-full bg-orange2 px-4 py-2.5 text-xs text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink size={14} /> {t('modal_demo')}
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Glass Preview Frame with Zoom & Hover Reveal */}
            <div
              onClick={() => onOpenModal(currentProject)}
              data-cursor
              className="group aspect-[16/11] rounded-2xl overflow-hidden card-flat border hairline relative bg-bg/90 cursor-pointer shadow-xl transition-all duration-300 hover:border-accent2/50"
            >
              <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                {Thumb && <Thumb />}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                  <ArrowUpRight size={14} /> Click for architecture & deep dive
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
