import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import projects from '../data/projects'
import skillGroups from '../data/skills'
import experience from '../data/experience'
import socials from '../data/socials'
import { useLanguage } from '../context/LanguageContext'

// Simple keyword-matched assistant — no backend/API key required, so it
// works the moment this site is deployed. Swap getReply() for a real
// LLM call (e.g. your own API route) later if you want freeform answers.
function getReply(raw) {
  const msg = raw.toLowerCase()

  const project = projects.find((p) => msg.includes(p.name.toLowerCase()))
  if (project) {
    return `${project.name} — ${project.overview} Tech: ${project.techStack.slice(0, 4).join(', ')}. Ask me about another project, or check the Projects section for the full case study.`
  }

  if (/(project|work|built|build)/.test(msg)) {
    const names = projects.map((p) => p.name).join(', ')
    return `Bhuvanesh has built ${names}. Ask me about any one of these by name, or scroll to the Projects section for full case studies.`
  }

  if (/(skill|tech|stack|language|tool)/.test(msg)) {
    const cats = skillGroups.map((g) => `${g.category} (${g.skills.slice(0, 3).join(', ')})`).join('; ')
    return `Bhuvanesh works across: ${cats}.`
  }

  if (/(experience|job|intern|work history|company)/.test(msg)) {
    const roles = experience.map((e) => `${e.role} at ${e.org}`).join(', ')
    return `Experience: ${roles}. Scroll to the Experience section for the full breakdown of each role.`
  }

  if (/(resume|cv)/.test(msg)) {
    return 'You can grab the resume from the "Resume" button in the navbar / hero section.'
  }

  if (/(contact|email|hire|reach|connect)/.test(msg)) {
    return `Best way to reach Bhuvanesh is email: ${socials.email}, or LinkedIn: ${socials.linkedin}. There's also a contact form at the bottom of the page.`
  }

  if (/(github|repo|code)/.test(msg)) {
    return `Bhuvanesh's GitHub is ${socials.github} — also check the GitHub section on this page for live stats and recent repos.`
  }

  if (/^(hi|hello|hey|namaste|yo)\b/.test(msg)) {
    return "Hey! I'm a simple assistant for this portfolio. Ask me about Bhuvanesh's skills, projects, or experience."
  }

  if (/(thank|thanks)/.test(msg)) {
    return "You're welcome! Anything else you'd like to know?"
  }

  return `I'm just a simple assistant for now, so I might not catch everything. For anything specific, email Bhuvanesh directly at ${socials.email} or use the contact form below.`
}

export default function Chatbot() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi, I'm a quick assistant for Bhuvanesh's portfolio. Ask me about his skills, projects, or experience!" },
  ])
  const listRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const send = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    const reply = getReply(text)
    setMessages((m) => [...m, { role: 'user', text }, { role: 'bot', text: reply }])
    setInput('')
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.04 }}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-ink text-bg pl-4 pr-5 py-3.5 hover:opacity-85 transition-opacity"
        aria-label={t('chat_title')}
      >
        {open ? <X size={18} /> : <MessageCircle size={18} />}
        <span className="text-sm font-medium hidden sm:inline">{t('chat_title')}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-6 z-40 w-[88vw] max-w-sm card-flat rounded-2xl flex flex-col overflow-hidden"
            style={{ height: 'min(70vh, 460px)' }}
          >
            <div className="px-5 py-4 border-b border-ink/10 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center">
                <Bot size={15} className="text-bg" />
              </div>
              <div>
                <div className="text-ink text-sm font-medium">{t('chat_title')}</div>
                <div className="text-muted text-xs">{t('chat_sub')}</div>
              </div>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-ink/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={12} className="text-ink" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user' ? 'bg-ink text-bg' : 'bg-ink/5 text-ink'
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-ink/10 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={12} className="text-ink" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={send} className="p-3 border-t border-ink/10 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat_placeholder')}
                className="flex-1 bg-ink/5 border border-ink/10 rounded-full px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink/40"
              />
              <button
                type="submit"
                aria-label="Send"
                className="w-10 h-10 rounded-full bg-ink text-bg flex items-center justify-center shrink-0 hover:opacity-85 transition-opacity"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
