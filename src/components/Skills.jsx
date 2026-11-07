import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2,
  LayoutTemplate,
  Server,
  Database,
  BrainCircuit,
  Cloud,
  Wrench,
  RotateCw,
  Sparkles,
  Layers,
} from 'lucide-react'
import skillGroups from '../data/skills'
import { useLanguage } from '../context/LanguageContext'
import RevealText from './RevealText'
import Features10OrbitMap from './Features10OrbitMap'

const iconMap = {
  Code2,
  LayoutTemplate,
  Server,
  Database,
  BrainCircuit,
  Cloud,
  Wrench,
}

function SkillCard({ skill }) {
  const [flipped, setFlipped] = useState(false)
  const { t } = useLanguage()
  const isAI = skill.category === 'AI / ML'

  return (
    <div
      onClick={() => setFlipped((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped((prev) => !prev)
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${skill.name} skill card. ${flipped ? t('skill_flip_back') : t('skill_flip_front')}`}
      className="group h-[250px] w-full [perspective:1000px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent2 rounded-2xl"
      data-cursor
    >
      <div
        className={`relative w-full h-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 [backface-visibility:hidden] card-flat rounded-2xl p-5 flex flex-col justify-between hover:border-accent2/50 transition-all shadow-sm bg-card">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span
                className={`tag-mono text-[11px] px-2.5 py-0.5 rounded-full border ${
                  isAI ? 'text-orange1 border-orange2/30 bg-orange2/10' : 'text-muted border-ink/10 bg-ink/5'
                }`}
              >
                {skill.category}
              </span>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                  isAI
                    ? 'text-orange1 bg-orange2/15 border border-orange2/30'
                    : 'text-accent2 bg-accent2/10 border border-accent2/25'
                }`}
              >
                {skill.level}
              </span>
            </div>

            <h3 className="text-ink font-semibold text-lg tracking-tight group-hover:text-accent2 transition-colors">
              {skill.name}
            </h3>
            <p className="text-muted text-xs font-mono mt-1">{skill.tagline}</p>

            <p className="text-ink/75 text-xs mt-3 line-clamp-3 leading-relaxed">
              {skill.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t hairline text-[11px] text-muted">
            <span className="flex items-center gap-1.5 font-medium text-accent2 group-hover:text-ink transition-colors">
              <RotateCw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
              {t('skill_flip_front')}
            </span>
            <span className="text-ink/60 font-mono text-[11px]">{skill.experience}</span>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] card-flat rounded-2xl p-5 flex flex-col justify-between bg-surface border-accent2/50 shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-accent2 font-semibold text-base flex items-center gap-1.5">
                <Sparkles size={14} className="text-accent1" />
                {skill.name}
              </h4>
              <span className="text-[10px] tag-mono text-muted bg-ink/5 px-2 py-0.5 rounded-full border hairline">
                DEEP-DIVE
              </span>
            </div>

            <p className="text-ink/85 text-xs leading-relaxed mt-2">
              {skill.backInfo}
            </p>

            {skill.useCase && (
              <div className="mt-3 p-2 rounded-lg bg-ink/5 border hairline">
                <span className="text-[10px] font-semibold tracking-wider text-muted block uppercase">
                  Application
                </span>
                <span className="text-xs text-ink/90 font-medium block mt-0.5">
                  {skill.useCase}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t hairline text-[11px]">
            <span className="flex items-center gap-1 text-muted hover:text-ink font-medium">
              <RotateCw size={11} /> {t('skill_flip_back')}
            </span>
            <span className="text-accent2 text-[10px] font-mono font-medium">↺ Click to rotate</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const categories = ['ALL', ...skillGroups.map((g) => g.category)]

  const allSkills = skillGroups.flatMap((g) => g.skills)
  const displayedSkills =
    selectedCategory === 'ALL'
      ? allSkills
      : skillGroups.find((g) => g.category === selectedCategory)?.skills || []

  return (
    <section id="skills" className="relative section-padding px-6 max-w-[1400px] mx-auto tone-orange">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
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
            className="mt-4 font-display text-section-heading text-ink tracking-tight"
          >
            <RevealText>{t('skills_heading_1')}</RevealText>{' '}
            <RevealText delay={0.06} className="italic">
              {t('skills_heading_2')}
            </RevealText>{' '}
            <RevealText delay={0.12}>{t('skills_heading_3')}</RevealText>
          </motion.h2>
        </div>

        {/* Tip pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full card-flat text-xs text-muted border hairline"
        >
          <RotateCw size={13} className="text-accent2 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{t('skills_hint')}</span>
        </motion.div>
      </div>

      {/* React Bits Pro Features 10: Integration map with orbiting nodes */}
      <Features10OrbitMap />

      {/* Category filter pills */}
      <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isAll = cat === 'ALL'
          const group = isAll ? null : skillGroups.find((g) => g.category === cat)
          const Icon = group ? iconMap[group.icon] ?? Layers : Layers
          const active = selectedCategory === cat
          const count = isAll ? allSkills.length : group?.skills.length || 0

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              data-cursor
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                active
                  ? 'bg-ink text-bg shadow-sm'
                  : 'card-flat text-muted hover:text-ink hover:border-ink/20'
              }`}
            >
              <Icon size={13} />
              <span>{isAll ? t('skills_all') : cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  active ? 'bg-bg/20 text-bg' : 'bg-ink/5 text-muted'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Cards Grid */}
      <motion.div
        layout
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        <AnimatePresence>
          {displayedSkills.map((skill) => (
            <motion.div
              layout
              key={skill.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35 }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
