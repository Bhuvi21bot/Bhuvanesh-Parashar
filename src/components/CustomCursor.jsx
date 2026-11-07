import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40 })
  const springY = useSpring(y, { stiffness: 500, damping: 40 })

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    setEnabled(isFine)
    if (!isFine) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onOver = (e) => {
      if (e.target.closest && e.target.closest('a, button, [data-cursor]')) setHovering(true)
    }
    const onOut = (e) => {
      if (e.target.closest && e.target.closest('a, button, [data-cursor]')) setHovering(false)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.documentElement.classList.add('custom-cursor')

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full bg-ink mix-blend-difference"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: hovering ? 38 : 8, height: hovering ? 38 : 8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}
