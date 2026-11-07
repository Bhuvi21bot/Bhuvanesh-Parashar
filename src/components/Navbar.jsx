import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Languages } from 'lucide-react'
import { scrollToId } from '../lib/scroll'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

const navItems = [
  { id: 'about', key: 'nav_about' },
  { id: 'skills', key: 'nav_skills' },
  { id: 'projects', key: 'nav_projects' },
  { id: 'experience', key: 'nav_experience' },
  { id: 'contact', key: 'nav_contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('hero')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['hero', ...navItems.map((n) => n.id)]
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed top-4 sm:top-5 inset-x-0 z-50 flex justify-center px-4"
      >
        <motion.div
          animate={{
            paddingLeft: scrolled ? 16 : 22,
            paddingRight: scrolled ? 8 : 10,
            paddingTop: scrolled ? 6 : 9,
            paddingBottom: scrolled ? 6 : 9,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-full flex items-center gap-6"
        >
          <button onClick={() => go('hero')} className="font-display font-semibold text-lg text-ink shrink-0">
            Bhuvanesh<span className="text-gradient">.</span>
          </button>

          <ul className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className="group relative text-sm py-1 text-muted hover:text-ink transition-colors"
                >
                  <span className={active === item.id ? 'text-ink' : ''}>{t(item.key)}</span>
                  <span
                    className={`absolute left-0 -bottom-0.5 h-px bg-accent-gradient transition-all duration-300 ${
                      active === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-ink hover:bg-ink/10 transition-colors"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              aria-label="Toggle language"
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-ink hover:bg-ink/10 transition-colors text-xs font-medium"
            >
              {lang === 'en' ? 'हि' : 'EN'}
            </button>
            <button
              onClick={() => go('contact')}
              className="ml-1 text-sm px-4 py-2 rounded-full bg-accent2 text-white font-medium hover:opacity-90 transition-opacity"
            >
              {t('nav_cta')}
            </button>
          </div>

          <button className="md:hidden text-ink" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-80 md:hidden glass-strong rounded-3xl p-4"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm ${
                      active === item.id ? 'text-ink bg-ink/10' : 'text-muted'
                    }`}
                  >
                    {t(item.key)}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-ink/10 flex items-center justify-between">
              <button onClick={toggleTheme} className="flex items-center gap-2 text-sm text-muted">
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />} Theme
              </button>
              <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} className="flex items-center gap-2 text-sm text-muted">
                <Languages size={15} /> {lang === 'en' ? 'हिंदी' : 'English'}
              </button>
            </div>
            <button
              onClick={() => go('contact')}
              className="mt-3 w-full text-sm px-4 py-2.5 rounded-full bg-accent2 text-white font-medium"
            >
              {t('nav_cta')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
