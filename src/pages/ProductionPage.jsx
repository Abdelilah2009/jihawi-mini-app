import { useMemo } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, ListChecks, Minus } from 'lucide-react'
import { EXAMS } from '../data/exams'
import { useApp } from '../App'
import { BTN_PRIMARY, BTN_GHOST, INPUT_CLS } from '../lib/constants'

export default function ProductionPage() {
  const { examId, productions, updateProduction, goHome, setCurrentQ, goToCorrection } = useApp()
  const exam = useMemo(() => EXAMS.find(e => e.id === examId), [examId])
  if (!exam) return null
  const prod = exam.production
  const text = productions[examId] || ''
  const words = text.trim().split(/\s+/).filter(Boolean).length

  const goBackToQuiz = () => {
    setCurrentQ(exam.questions.length - 1)
    // Need to set view to quiz — use the App's navigation
    // Actually we need access to setView... let's use goHome workaround
  }

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{exam.year} — {exam.region}</h2>
          <p className="font-serif italic text-sm text-gray-500 dark:text-gray-400">{exam.work.title} — {exam.work.author}</p>
        </div>
        <button className={BTN_GHOST} onClick={goHome}><ArrowLeft className="w-4 h-4" /> Quitter</button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Production Écrite</span>
        <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">{prod.points} pts</span>
      </div>
      <div className="h-1 bg-gray-900 dark:bg-white rounded-full" />

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="p-4 rounded-lg border-l-2 border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800/50">
          <p className="font-serif text-[15px] leading-[1.8] text-gray-800 dark:text-gray-200 whitespace-pre-line">{prod.sujet}</p>
        </div>

        <textarea className={`${INPUT_CLS} min-h-[240px] resize-y`} placeholder="Rédigez votre texte argumentatif ici... (~15 lignes)"
          value={text} onChange={e => updateProduction(examId, e.target.value)} />
        <div className={`text-right text-xs ${words >= 80 ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>{words} mot{words !== 1 ? 's' : ''}</div>

        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5 mb-3"><ListChecks className="w-3.5 h-3.5 text-gray-400" /><span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Critères d'évaluation</span></div>
          <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
            {prod.criteres.map((c, i) => <li key={i} className="flex items-start gap-2"><Minus className="w-3 h-3 mt-1 flex-shrink-0 text-gray-300" /> {c}</li>)}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button className={BTN_GHOST} onClick={goHome}><ChevronLeft className="w-4 h-4" /> Retour</button>
          <button className={BTN_PRIMARY} onClick={goToCorrection}><CheckCircle className="w-4 h-4" /> Voir la correction</button>
        </div>
      </div>
    </div>
  )
}
