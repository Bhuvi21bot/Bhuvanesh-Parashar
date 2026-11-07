import { Github, Linkedin, Mail } from 'lucide-react'
import socials from '../data/socials'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative px-6 py-10 max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4 border-t border-ink/10">
      <span className="font-display text-lg text-ink">
        BP<span className="text-gradient">.</span>
      </span>

      <p className="text-xs text-muted text-center">
        © {new Date().getFullYear()} Bhuvanesh Parashar. {t('footer_credit')}
      </p>

      <div className="flex gap-4 text-muted">
        <a href={`mailto:${socials.email}`} aria-label="Email" className="hover:text-ink transition-colors">
          <Mail size={16} />
        </a>
        <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-ink transition-colors">
          <Github size={16} />
        </a>
        <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-ink transition-colors">
          <Linkedin size={16} />
        </a>
      </div>
    </footer>
  )
}
