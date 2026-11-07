import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight, User, MessageSquare } from 'lucide-react'
import socials from '../data/socials'
import { useLanguage } from '../context/LanguageContext'
import RevealText from './RevealText'

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${socials.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative section-padding px-6 max-w-[1400px] mx-auto tone-blue">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="eyebrow"
      >
        {t('contact_eyebrow')}
      </motion.span>

      <div className="mt-8 grid lg:grid-cols-[1fr_0.9fr] gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="font-display text-section-heading text-ink leading-tight tracking-tight">
            <RevealText>{t('contact_heading_1')}</RevealText>{' '}
            <RevealText delay={0.06} className="italic">{t('contact_heading_2')}</RevealText>.
          </h2>
          <p className="mt-5 text-muted max-w-md leading-relaxed">{t('contact_sub')}</p>

          <a
            href={`mailto:${socials.email}`}
            className="mt-8 inline-flex items-center gap-2 font-display text-2xl sm:text-3xl text-ink hover:underline transition-colors break-all"
          >
            <Mail size={20} className="text-accent2 shrink-0" /> {socials.email}
          </a>

          <div className="mt-10 flex gap-3">
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-ink border hairline rounded-full px-5 py-2.5 hover:bg-ink/5 transition-colors"
            >
              <Github size={15} /> GitHub <ArrowUpRight size={13} />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-ink border hairline rounded-full px-5 py-2.5 hover:bg-ink/5 transition-colors"
            >
              <Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="rounded-2xl card-flat p-7 sm:p-8 space-y-5"
        >
          <Field
            label={t('contact_name')}
            icon={User}
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            required
          />
          <Field
            label={t('contact_email')}
            icon={Mail}
            type="email"
            value={form.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            required
          />
          <div>
            <label className="eyebrow !text-muted flex items-center gap-1.5">
              <MessageSquare size={12} /> {t('contact_message').toUpperCase()}
            </label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="mt-2 w-full bg-ink/5 border border-ink/10 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink/40 resize-none"
              placeholder="What are you building?"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-accent2 text-white font-medium text-sm py-3 flex items-center justify-center gap-2 shadow-glow hover:opacity-90 transition-opacity"
          >
            <Mail size={15} /> {t('contact_send')}
          </button>
        </motion.form>
      </div>
    </section>
  )
}

function Field({ label, value, onChange, type = 'text', required, icon: Icon }) {
  return (
    <div>
      <label className="eyebrow !text-muted flex items-center gap-1.5">
        {Icon && <Icon size={12} />} {label.toUpperCase()}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-ink/5 border border-ink/10 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink/40"
      />
    </div>
  )
}
