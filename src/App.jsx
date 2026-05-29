import { createContext, useContext, useState, useCallback } from 'react'
import { Moon, Sun } from 'lucide-react'
import { EXAMS } from './data/exams'
import { SUBJECTS, getSubject } from './lib/subjects'
import useTheme from './hooks/useTheme'
import useLocalStorage from './hooks/useLocalStorage'
import { scoreAll, isExamScored } from './lib/scoring'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import ProductionPage from './pages/ProductionPage'
import CorrectionPage from './pages/CorrectionPage'

const AppContext = createContext()
export const useApp = () => useContext(AppContext)

export default function App() {
  const { dark, toggle: toggleTheme } = useTheme()
  const [saved, setSaved] = useLocalStorage('jihawi_state', { answers: {}, productions: {}, bestScores: {} })
  const [view, setView] = useState('home')
  const [examId, setExamId] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [currentSubject, setCurrentSubject] = useState('francais')

  const answers = saved.answers || {}
  const productions = saved.productions || {}
  const bestScores = saved.bestScores || {}

  const currentExam = examId ? EXAMS.find(e => e.id === examId) : null
  const subj = currentExam ? getSubject(currentExam) : SUBJECTS[currentSubject]

  const updateAnswer = useCallback((eid, qi, val) => {
    setSaved(p => ({ ...p, answers: { ...p.answers, [eid]: { ...(p.answers?.[eid] || {}), [qi]: val } } }))
  }, [setSaved])

  const updateProduction = useCallback((eid, text) => {
    setSaved(p => ({ ...p, productions: { ...p.productions, [eid]: text } }))
  }, [setSaved])

  const updateBestScore = useCallback((eid, obj) => {
    setSaved(p => ({ ...p, bestScores: { ...p.bestScores, [eid]: obj } }))
  }, [setSaved])

  const setExamAnswers = useCallback((eid, newAnswers) => {
    setSaved(p => ({ ...p, answers: { ...p.answers, [eid]: newAnswers } }))
  }, [setSaved])

  const goHome = useCallback(() => { setView('home'); setExamId(null) }, [])

  const startQuiz = useCallback((eid) => {
    setView('quiz'); setExamId(eid); setCurrentQ(0)
  }, [])

  const openExam = useCallback((eid) => {
    const exam = EXAMS.find(e => e.id === eid)
    if (exam) setCurrentSubject(exam.subject || 'francais')
    setExamId(eid)
    if (isExamScored(answers[eid])) { setView('correction') }
    else { startQuiz(eid) }
  }, [answers, startQuiz])

  const goToProduction = useCallback(() => setView('production'), [])

  const goToCorrection = useCallback(() => {
    const exam = EXAMS.find(e => e.id === examId)
    if (exam) {
      const scored = scoreAll(exam, answers[examId] || {})
      setExamAnswers(examId, scored)
    }
    setView('correction')
  }, [examId, answers, setExamAnswers])

  const retryExam = useCallback(() => {
    setSaved(p => {
      const { [examId]: _a, ...restAns } = p.answers || {}
      const { [examId]: _p, ...restProd } = p.productions || {}
      return { ...p, answers: restAns, productions: restProd }
    })
    startQuiz(examId)
  }, [examId, setSaved, startQuiz])

  const ctx = {
    answers, productions, bestScores,
    updateAnswer, updateProduction, updateBestScore, setExamAnswers,
    view, examId, currentQ, setCurrentQ,
    currentSubject, setCurrentSubject, subj,
    goHome, startQuiz, openExam, goToProduction, goToCorrection, retryExam,
  }

  return (
    <AppContext.Provider value={ctx}>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button onClick={goHome} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-gray-900 text-xs font-bold tracking-tight">JQ</div>
            <div className="text-left">
              <h1 className="text-sm font-semibold leading-tight tracking-tight">Jihawi Quiz</h1>
              <p className="text-[11px] text-gray-500 leading-tight">{subj.ui.subtitle}</p>
            </div>
          </button>
          <button onClick={toggleTheme} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors" aria-label="Thème">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {view === 'home' && <HomePage />}
        {view === 'quiz' && <QuizPage />}
        {view === 'production' && <ProductionPage />}
        {view === 'correction' && <CorrectionPage />}
      </main>

      <footer className="text-center py-8 px-4 text-xs text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-gray-900">
        developed by Abdelilah Eddalil | Bonne chance fl jihawi
      </footer>
    </AppContext.Provider>
  )
}
