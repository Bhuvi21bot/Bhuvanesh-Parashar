import { useRef } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

// Reusable "magnetic" hover effect: the element nudges slightly toward the
// cursor while hovered, snapping back on leave. Used on primary buttons.
export function useMagnetic(strength = 0.25) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 })

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }
  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave }
}
