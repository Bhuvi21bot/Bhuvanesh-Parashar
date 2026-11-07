// Native smooth scrolling helper with navbar offset support

export function setLenis() {
  // Kept for backward compatibility
}

export function scrollToId(id, offset = -80) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
