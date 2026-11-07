import { createContext, useContext, useState } from 'react'
import translations from '../data/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => window.localStorage.getItem('bp-lang') || 'en')

  const setLang = (l) => {
    setLangState(l)
    window.localStorage.setItem('bp-lang', l)
  }

  const t = (key) => translations[lang]?.[key] ?? translations.en[key] ?? key

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
