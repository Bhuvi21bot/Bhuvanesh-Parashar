import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'

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

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Loader onComplete={() => setLoaded(true)} />
        <CustomCursor />

        <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
          <Navbar />
          <Hero />
          <main className="relative bg-bg">
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
