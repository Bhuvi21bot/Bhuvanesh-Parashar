import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { scrollToTop } from '../lib/scroll'
import { useLanguage } from '../context/LanguageContext'

export default function ScrollTopButton() {
  const [show, setShow] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          whileHover={{ scale: 1.08 }}
          onClick={scrollToTop}
          aria-label={t('scroll_top')}
          title={t('scroll_top')}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-ink text-bg flex items-center justify-center hover:opacity-85 transition-opacity"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
