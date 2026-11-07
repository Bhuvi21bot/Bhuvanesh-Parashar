import { motion } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import projects from '../data/projects'
import thumbnails from './ProjectThumbnails'
import socials from '../data/socials'
import { useLanguage } from '../context/LanguageContext'
import RevealText from './RevealText'

function ProjectCaseStudy({ project, index }) {
  const { t } = useLanguage()
  const Thumb = thumbnails[project.id]
  const githubHref = project.links?.github || socials.github
  const hasDemo = Boolean(project.links?.demo)
  const imageRight = index % 2 === 1
  const toneClass = index % 2 === 0 ? 'tone-blue' : 'tone-orange'

  return (
    <section id={index === 0 ? 'projects' : undefined} className={`relative ${toneClass} border-t hairline`}>
      <div className="section-padding px-6 max-w-[1400px] mx-auto">
        <span className="eyebrow">
          {String(index + 1).padStart(2, '0')} / {t('projects_eyebrow').replace(/^[^A-Z]*/, '')}
        </span>

        <div className={`mt-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start`}>
          <div className={imageRight ? 'lg:order-2' : ''}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/3] rounded-2xl overflow-hidden card-flat"
            >
              {Thumb && <Thumb />}
            </motion.div>
          </div>

          <div className={imageRight ? 'lg:order-1' : ''}>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-mono text-muted">
                  #{tag.replace(/\s+/g, '').toUpperCase()}
                </span>
              ))}
            </div>

            <h3 className="mt-4 font-display text-section-heading text-ink tracking-tight leading-[1.05]">
              <RevealText>{project.name}</RevealText>
            </h3>
            <p className="mt-3 text-muted text-lg leading-relaxed">{project.tagline}</p>

            <p className="mt-6 text-ink/85 leading-relaxed">{project.overview}</p>
            <p className="mt-3 text-ink/85 leading-relaxed">{project.solution}</p>

            <div className="mt-8 grid sm:grid-cols-2 gap-6 border-t hairline pt-6">
              <div>
                <div className="eyebrow mb-2">{t('modal_tech')}</div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs text-accent2 border border-accent2/30 rounded-full px-2.5 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="eyebrow mb-2">{t('project_role').toUpperCase()}</div>
                <p className="text-sm text-ink/85">{project.role}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
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
                  className="flex items-center gap-2 rounded-full bg-orange2 px-5 py-2.5 text-sm text-white font-medium hover:opacity-90 transition-opacity"
                >
                  <ExternalLink size={15} /> {t('modal_demo')}
                </a>
              )}
              <span className="ml-auto hidden sm:flex w-10 h-10 rounded-lg border hairline items-center justify-center text-muted">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </div>

        {/* secondary detail grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t hairline pt-10">
          <div>
            <div className="eyebrow mb-3">{t('modal_problem')}</div>
            <p className="text-sm text-ink/80 leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <div className="eyebrow mb-3">{t('modal_features')}</div>
            <ul className="space-y-1.5">
              {project.features.slice(0, 4).map((f) => (
                <li key={f} className="text-sm text-ink/80 flex gap-2">
                  <span className="text-accent2 mt-0.5 shrink-0">—</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-3">{t('modal_architecture')}</div>
            <p className="text-sm text-ink/80 leading-relaxed">{project.architecture}</p>
          </div>
          <div>
            <div className="eyebrow mb-3">{t('modal_results')}</div>
            <p className="text-sm text-ink/80 leading-relaxed">{project.results}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Projects() {
  const { t } = useLanguage()

  return (
    <div>
      <div className="relative section-padding px-6 max-w-[1400px] mx-auto pb-0">
        <span className="eyebrow">{t('projects_eyebrow')}</span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-6 font-display text-section-heading text-ink tracking-tight"
        >
          <RevealText>{t('projects_heading_1')}</RevealText>{' '}
          <RevealText delay={0.06} className="italic">{t('projects_heading_2')}</RevealText>.
        </motion.h2>
      </div>

      {projects.map((p, i) => (
        <ProjectCaseStudy key={p.id} project={p} index={i} />
      ))}
    </div>
  )
}
