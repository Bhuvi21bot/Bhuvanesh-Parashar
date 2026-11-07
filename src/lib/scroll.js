// Tiny singleton so any component can drive the same Lenis instance
// instead of mixing native scrollIntoView with Lenis (which caused jumpiness).
let lenisInstance = null

export function setLenis(instance) {
  lenisInstance = instance
}

export function scrollToId(id, offset = -90) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset, duration: 1.3 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.3 })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
