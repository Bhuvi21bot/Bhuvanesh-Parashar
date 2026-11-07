import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

// Wraps a chunk of heading text in an overflow-hidden mask and slides it up
// into view. Uses a fixed pixel offset + opacity (not a percentage-only
// transform) since that combination is what reliably fires via whileInView.
export default function RevealText({ children, delay = 0, className = '' }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span
        className={`inline-block ${className}`}
        initial={{ y: 36, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.7, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}
