import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ArrowUpRight, Star, GitFork } from 'lucide-react'
import socials from '../data/socials'
import { useLanguage } from '../context/LanguageContext'
import RevealText from './RevealText'

const username = 'Bhuvi21bot'
const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&bg_color=00000000&title_color=89AACC&icon_color=4E85BF&text_color=A1A1AA`
const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&hide_border=true&bg_color=00000000&title_color=89AACC&text_color=A1A1AA`
const chartUrl = `https://ghchart.rshah.org/4E85BF/${username}`

export default function GithubSection() {
  const { t } = useLanguage()
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('loading')
  const [imgError, setImgError] = useState({ stats: false, langs: false, chart: false })

  const markError = (key) => setImgError((s) => ({ ...s, [key]: true }))

  useEffect(() => {
    let active = true
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`)
      .then((res) => {
        if (!res.ok) throw new Error('request failed')
        return res.json()
      })
      .then((data) => {
        if (active) {
          setRepos(Array.isArray(data) ? data : [])
          setStatus('ready')
        }
      })
      .catch(() => {
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="relative section-padding px-6 max-w-[1400px] mx-auto tone-blue">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="eyebrow"
      >
        {t('github_eyebrow')}
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-6 flex flex-wrap items-end justify-between gap-4"
      >
        <h2 className="font-display text-section-heading text-ink tracking-tight">
          <RevealText>{t('github_heading_1')}</RevealText>{' '}
          <RevealText delay={0.06} className="italic">{t('github_heading_2')}</RevealText>.
        </h2>
        <a
          href={socials.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-sm text-ink border hairline rounded-full px-5 py-2.5 hover:bg-ink/5 transition-colors"
        >
          <Github size={15} /> @{username} <ArrowUpRight size={14} />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-12 rounded-2xl card-flat overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b hairline">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          <span className="ml-2 font-mono text-xs text-muted">github-stats.sh</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 p-5">
          {imgError.stats ? (
            <FallbackCard label="GitHub stats" username={username} />
          ) : (
            <img src={statsUrl} alt="GitHub stats" className="w-full" loading="lazy" onError={() => markError('stats')} />
          )}
          {imgError.langs ? (
            <FallbackCard label="Top languages" username={username} />
          ) : (
            <img src={langsUrl} alt="Top languages" className="w-full" loading="lazy" onError={() => markError('langs')} />
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-5 rounded-2xl card-flat p-5 overflow-x-auto"
      >
        {imgError.chart ? (
          <FallbackCard label="Contribution graph" username={username} />
        ) : (
          <img src={chartUrl} alt="Contribution graph" className="min-w-[600px] w-full" loading="lazy" onError={() => markError('chart')} />
        )}
      </motion.div>

      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        {status === 'loading' &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl card-flat p-5 h-28 animate-pulse-soft" />
          ))}

        {status === 'error' && (
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="sm:col-span-2 rounded-2xl card-flat p-5 text-sm text-muted hover:text-ink transition-colors flex items-center justify-center gap-2"
          >
            {t('github_repos_fallback')} <ArrowUpRight size={14} />
          </a>
        )}

        {status === 'ready' &&
          repos.map((repo) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl card-flat p-5 hover:border-ink/30 hover:bg-ink/[0.02] transition-all duration-300 group border hairline"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-ink font-medium text-sm flex items-center gap-1.5 truncate">
                  {repo.name}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </span>
                {repo.language && (
                  <span className="text-xs text-accent2 border border-accent2/30 rounded-full px-2 py-0.5 shrink-0">
                    {repo.language}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-muted line-clamp-2">{repo.description || 'No description yet.'}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Star size={12} /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} /> {repo.forks_count}
                </span>
              </div>
            </motion.a>
          ))}
      </div>
    </section>
  )
}

function FallbackCard({ label, username }) {
  return (
    <div className="flex items-center justify-center h-32 text-xs text-muted/70 text-center px-4">
      {label} unavailable right now — view live on{' '}
      <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="text-accent2 ml-1 hover:underline">
        github.com/{username}
      </a>
    </div>
  )
}
