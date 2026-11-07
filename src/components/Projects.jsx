import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  X,
  Layers,
  AlertCircle,
  CheckCircle2,
  Cpu,
  Trophy,
  UserCheck,
  Sparkles,
} from 'lucide-react'
import projects from '../data/projects'
import thumbnails from './ProjectThumbnails'
import socials from '../data/socials'
import { useLanguage } from '../context/LanguageContext'
import RevealText from './RevealText'
import Features2Carousel from './Features2Carousel'

function ProjectModal({ project, onClose }) {
  const { t } = useLanguage()
  const Thumb = thumbnails[project.id]
  const githubHref = project.links?.github || socials.github
  const hasDemo = Boolean(project.links?.demo)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto card-flat bg-surface border border-ink/15 rounded-3xl p-6 sm:p-9 shadow-2xl my-auto text-ink"
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label={t('modal_close')}
          data-cursor
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 rounded-full card-flat border hairline flex items-center justify-center text-muted hover:text-ink hover:border-ink/40 transition-colors z-20"
        >
          <X size={18} />
        </button>

        {/* Tags & Role */}
        <div className="flex flex-wrap items-center gap-2 pr-12">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="tag-mono text-[11px] text-accent2 bg-accent2/10 border border-accent2/25 rounded-full px-2.5 py-0.5"
            >
              #{tag.toUpperCase()}
            </span>
          ))}
          <span className="text-[11px] tag-mono text-muted border hairline rounded-full px-2.5 py-0.5">
            {project.role}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="mt-4 font-display text-3xl sm:text-4xl text-ink font-semibold tracking-tight">
          {project.name}
        </h3>
        <p className="mt-2 text-muted text-base sm:text-lg">{project.tagline}</p>

        {/* Visual Banner */}
        <div className="mt-6 aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden card-flat border hairline">
          {Thumb && <Thumb />}
        </div>

        {/* Overview & Solution */}
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-ink/5 border hairline">
            <h4 className="eyebrow flex items-center gap-2 mb-2 text-accent2">
              <Sparkles size={14} /> {t('modal_solution')}
            </h4>
            <p className="text-sm text-ink/85 leading-relaxed">{project.overview}</p>
            <p className="text-sm text-ink/85 leading-relaxed mt-3">{project.solution}</p>
          </div>

          <div className="p-5 rounded-2xl bg-ink/5 border hairline">
            <h4 className="eyebrow flex items-center gap-2 mb-2 text-orange1">
              <AlertCircle size={14} /> {t('modal_problem')}
            </h4>
            <p className="text-sm text-ink/85 leading-relaxed">{project.problem}</p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-6 p-5 rounded-2xl card-flat border hairline">
          <h4 className="eyebrow flex items-center gap-2 mb-3">
            <CheckCircle2 size={14} className="text-accent2" /> {t('modal_features')}
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.features.map((f) => (
              <div key={f} className="text-sm text-ink/85 flex items-start gap-2.5">
                <span className="text-accent2 font-bold mt-0.5 shrink-0">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture & Tech Stack */}
        <div className="mt-6 grid sm:grid-cols-[1.4fr_1fr] gap-6">
          <div className="p-5 rounded-2xl card-flat border hairline">
            <h4 className="eyebrow flex items-center gap-2 mb-2.5">
              <Cpu size={14} className="text-accent2" /> {t('modal_architecture')}
            </h4>
            <p className="text-sm text-ink/80 leading-relaxed">{project.architecture}</p>
          </div>

          <div className="p-5 rounded-2xl card-flat border hairline">
            <h4 className="eyebrow flex items-center gap-2 mb-3">
              <Layers size={14} className="text-accent2" /> {t('modal_tech')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-full text-ink/85 bg-ink/5 border hairline"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges & Results */}
        <div className="mt-6 p-5 rounded-2xl bg-ink/5 border hairline">
          <h4 className="eyebrow flex items-center gap-2 mb-2 text-accent2">
            <Trophy size={14} /> {t('modal_challenges')}
          </h4>
          <p className="text-sm text-ink/80 leading-relaxed">
            <strong className="text-ink">Challenges: </strong>
            {project.challenges}
          </p>
          <p className="text-sm text-ink/80 leading-relaxed mt-2.5">
            <strong className="text-ink">Outcome: </strong>
            {project.results}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t hairline flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            <a
              href={githubHref}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="flex items-center gap-2 rounded-full border hairline px-5 py-2.5 text-sm text-ink hover:bg-ink/5 transition-colors"
            >
              <Github size={15} /> {t('modal_github')}
            </a>
            {hasDemo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                data-cursor
                className="flex items-center gap-2 rounded-full bg-accent2 px-5 py-2.5 text-sm text-white font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={15} /> {t('modal_demo')}
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            data-cursor
            className="px-5 py-2.5 rounded-full border hairline text-sm text-muted hover:text-ink transition-colors ml-auto"
          >
            {t('modal_close')}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function ProjectCard({ project, onOpenModal, index }) {
  const { t } = useLanguage()
  const Thumb = thumbnails[project.id]
  const githubHref = project.links?.github || socials.github
  const hasDemo = Boolean(project.links?.demo)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-3xl card-flat overflow-hidden flex flex-col justify-between border hairline hover:border-accent2/40 transition-all duration-300 shadow-sm"
    >
      <div>
        {/* Interactive Thumbnail */}
        <div
          onClick={() => onOpenModal(project)}
          className="aspect-[16/10] overflow-hidden bg-bg relative cursor-pointer"
          data-cursor
        >
          <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
            {Thumb && <Thumb />}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full">
              <Sparkles size={12} className="text-accent1" /> {t('project_view_details')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-mono text-[11px] text-muted">
                #{tag.toUpperCase()}
              </span>
            ))}
          </div>

          <h3
            onClick={() => onOpenModal(project)}
            className="font-display text-2xl text-ink font-semibold tracking-tight group-hover:text-accent2 transition-colors cursor-pointer"
          >
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-muted font-medium">{project.tagline}</p>

          <p className="mt-3 text-ink/75 text-sm leading-relaxed line-clamp-2">
            {project.overview}
          </p>

          {/* Tech Stack Preview */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] text-accent2 border border-accent2/25 bg-accent2/5 rounded-full px-2.5 py-0.5"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-[11px] text-muted border hairline rounded-full px-2 py-0.5">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-6 sm:p-7 pt-0 flex flex-wrap items-center justify-between gap-3 border-t hairline pt-4 mt-2">
        <button
          onClick={() => onOpenModal(project)}
          data-cursor
          className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-accent2 text-white hover:opacity-90 transition-opacity"
        >
          {t('project_view_details')}
          <ArrowUpRight size={14} />
        </button>

        <div className="flex items-center gap-2 text-muted">
          <a
            href={githubHref}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repo"
            data-cursor
            className="w-8 h-8 rounded-full border hairline flex items-center justify-center hover:text-ink hover:border-ink/40 transition-colors"
          >
            <Github size={14} />
          </a>
          {hasDemo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              aria-label="Live Demo"
              data-cursor
              className="w-8 h-8 rounded-full border hairline flex items-center justify-center hover:text-ink hover:border-ink/40 transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const [activeProject, setActiveProject] = useState(null)

  return (
    <section id="projects" className="relative section-padding px-6 max-w-[1400px] mx-auto tone-blue border-t hairline">
      <div>
        <span className="eyebrow">{t('projects_eyebrow')}</span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-4 font-display text-section-heading text-ink tracking-tight"
        >
          <RevealText>{t('projects_heading_1')}</RevealText>{' '}
          <RevealText delay={0.06} className="italic">
            {t('projects_heading_2')}
          </RevealText>
          .
        </motion.h2>
        <p className="mt-3 text-muted text-sm sm:text-base max-w-xl">
          {t('projects_sub')}
        </p>
      </div>

      {/* React Bits Pro Features 2: Auto-cycling carousel with glass cards */}
      <Features2Carousel onOpenModal={(proj) => setActiveProject(proj)} />

      {/* Projects Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onOpenModal={(proj) => setActiveProject(proj)}
          />
        ))}
      </div>

      {/* Pop-Up Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
