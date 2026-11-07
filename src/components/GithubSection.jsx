import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Github,
  ArrowUpRight,
  Star,
  GitFork,
  BookOpen,
  Users,
  Code,
  Activity,
} from 'lucide-react'
import socials from '../data/socials'
import { useLanguage } from '../context/LanguageContext'
import RevealText from './RevealText'

const username = 'Bhuvi21bot'
const chartUrl = `https://ghchart.rshah.org/4E85BF/${username}`

const languageColors = {
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  TypeScript: '#3178C6',
  'C++': '#F34B7D',
  HTML: '#E34F26',
  CSS: '#563D7C',
  Java: '#B07219',
}

const defaultStats = {
  repos: 10,
  stars: 4,
  forks: 2,
  followers: 3,
  languages: [
    { name: 'JavaScript', percent: 45, color: '#F7DF1E' },
    { name: 'Python', percent: 30, color: '#3776AB' },
    { name: 'C++', percent: 15, color: '#F34B7D' },
    { name: 'HTML / CSS', percent: 10, color: '#E34F26' },
  ],
}

export default function GithubSection() {
  const { t } = useLanguage()
  const [repos, setRepos] = useState([])
  const [stats, setStats] = useState(defaultStats)
  const [status, setStatus] = useState('loading')
  const [chartError, setChartError] = useState(false)

  useEffect(() => {
    let active = true

    // Fetch user profile stats & repositories directly from GitHub's official REST API
    Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
    ])
      .then(async ([userRes, reposRes]) => {
        if (!active) return

        let userData = null
        let reposData = null

        if (userRes.ok) {
          userData = await userRes.json()
        }
        if (reposRes.ok) {
          reposData = await reposRes.json()
        }

        if (Array.isArray(reposData)) {
          setRepos(reposData.slice(0, 4))

          // Calculate stars, forks, and language distribution across repos
          let totalStars = 0
          let totalForks = 0
          const langCounts = {}

          reposData.forEach((repo) => {
            totalStars += repo.stargazers_count || 0
            totalForks += repo.forks_count || 0
            if (repo.language) {
              langCounts[repo.language] = (langCounts[repo.language] || 0) + 1
            }
          })

          const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0)
          const computedLanguages = Object.entries(langCounts)
            .map(([name, count]) => ({
              name,
              percent: totalLangRepos > 0 ? Math.round((count / totalLangRepos) * 100) : 0,
              color: languageColors[name] || '#89AACC',
            }))
            .sort((a, b) => b.percent - a.percent)
            .slice(0, 5)

          setStats({
            repos: userData?.public_repos ?? reposData.length,
            stars: totalStars,
            forks: totalForks,
            followers: userData?.followers ?? defaultStats.followers,
            languages: computedLanguages.length > 0 ? computedLanguages : defaultStats.languages,
          })
          setStatus('ready')
        } else {
          setStatus('ready')
        }
      })
      .catch(() => {
        if (active) {
          setStatus('ready') // Use graceful fallback stats
        }
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
          <RevealText delay={0.06} className="italic">
            {t('github_heading_2')}
          </RevealText>
          .
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

      {/* Terminal Stats & Languages Window (Native React — zero 503 external errors) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-12 rounded-2xl card-flat overflow-hidden border hairline"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b hairline bg-ink/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          <span className="ml-2 font-mono text-xs text-muted">github-stats.sh</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 p-6">
          {/* Left: Key Metrics */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b hairline">
                <span className="font-mono text-xs text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Activity size={13} className="text-accent2" /> Overall Stats
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  ● Active Builder
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-ink/5 border hairline">
                  <div className="text-xs text-muted flex items-center gap-1.5">
                    <BookOpen size={13} className="text-accent2" /> Public Repos
                  </div>
                  <div className="text-2xl font-bold font-display text-ink mt-1">
                    {stats.repos}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-ink/5 border hairline">
                  <div className="text-xs text-muted flex items-center gap-1.5">
                    <Star size={13} className="text-accent2" /> Total Stars
                  </div>
                  <div className="text-2xl font-bold font-display text-ink mt-1">
                    {stats.stars}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-ink/5 border hairline">
                  <div className="text-xs text-muted flex items-center gap-1.5">
                    <GitFork size={13} className="text-accent2" /> Total Forks
                  </div>
                  <div className="text-2xl font-bold font-display text-ink mt-1">
                    {stats.forks}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-ink/5 border hairline">
                  <div className="text-xs text-muted flex items-center gap-1.5">
                    <Users size={13} className="text-accent2" /> Followers
                  </div>
                  <div className="text-2xl font-bold font-display text-ink mt-1">
                    {stats.followers}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs font-mono text-muted/70">
              $ gh api /users/{username} --metrics loaded
            </p>
          </div>

          {/* Right: Top Languages Breakdown */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b hairline mb-4">
              <span className="font-mono text-xs text-muted uppercase tracking-wider flex items-center gap-1.5">
                <Code size={13} className="text-accent2" /> Top Languages
              </span>
              <span className="text-[11px] font-mono text-muted">by codebase share</span>
            </div>

            {/* Multi-segment percentage bar */}
            <div className="h-2.5 w-full rounded-full overflow-hidden flex bg-ink/10 mb-4">
              {stats.languages.map((lang) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  title={`${lang.name}: ${lang.percent}%`}
                />
              ))}
            </div>

            {/* Language list */}
            <div className="space-y-3">
              {stats.languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-ink font-medium">{lang.name}</span>
                  </div>
                  <span className="font-mono text-muted">{lang.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contribution graph */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-5 rounded-2xl card-flat p-5 overflow-x-auto border hairline"
      >
        {chartError ? (
          <div className="flex items-center justify-center h-28 text-xs text-muted/70 text-center px-4">
            Contribution graph available live on{' '}
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="text-accent2 ml-1 hover:underline"
            >
              github.com/{username}
            </a>
          </div>
        ) : (
          <img
            src={chartUrl}
            alt="GitHub Contribution Graph"
            className="min-w-[600px] w-full"
            loading="lazy"
            onError={() => setChartError(true)}
          />
        )}
      </motion.div>

      {/* Repositories Grid */}
      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        {status === 'loading' &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl card-flat p-5 h-28 animate-pulse-soft" />
          ))}

        {repos.map((repo) => (
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
                <ArrowUpRight
                  size={12}
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                />
              </span>
              {repo.language && (
                <span className="text-xs text-accent2 border border-accent2/30 rounded-full px-2 py-0.5 shrink-0">
                  {repo.language}
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-muted line-clamp-2">
              {repo.description || 'Public GitHub repository by Bhuvanesh.'}
            </p>
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
