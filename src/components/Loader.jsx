import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf
    const start = performance.now()
    const duration = 1400

    const tick = (now) => {
      const elapsed = now - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 300)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl sm:text-6xl text-ink tracking-tight"
          >
            Bhuvanesh<span className="text-accent2">.</span>
          </motion.div>

          <div className="mt-8 w-48 sm:w-64 h-px bg-ink/10 overflow-hidden">
            <motion.div className="h-full bg-ink" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-3 eyebrow">{String(progress).padStart(3, '0')}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
