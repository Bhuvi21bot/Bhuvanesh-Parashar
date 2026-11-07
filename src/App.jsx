import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { setLenis } from './lib/scroll'

import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import Stats from './components/Stats'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GithubSection from './components/GithubSection'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import ScrollTopButton from './components/ScrollTopButton'
import CustomCursor from './components/CustomCursor'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15,
      smoothWheel: true,
      wheelMultiplier: 1.5,
      touchMultiplier: 2,
    })
    setLenis(lenis)

    const raf = (time) => lenis.raf(time)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Loader onComplete={() => setLoaded(true)} />
        <CustomCursor />

        <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
          <Navbar />
          <div className="sticky top-0 z-0">
            <Hero />
          </div>
          <main className="relative z-10 bg-bg rounded-t-[40px] shadow-[0_-40px_80px_-40px_rgba(0,0,0,0.5)]">
            <MarqueeStrip />
            <Stats />
            <About />
            <Skills />
            <Projects />
            <GithubSection />
            <Experience />
            <Contact />
          </main>
          <Footer />
          <Chatbot />
          <ScrollTopButton />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
