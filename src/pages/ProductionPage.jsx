import { useMemo } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, CheckCircle, ListChecks, Minus } from 'lucide-react'
import { EXAMS } from '../data/exams'
import { useApp } from '../App'
import { BTN_PRIMARY, BTN_GHOST, INPUT_CLS } from '../lib/constants'

export default function ProductionPage() {
  const { examId, productions, updateProduction, goHome, setCurrentQ, goToCorrection, subj } = useApp()
  const exam = useMemo(() => EXAMS.find(e => e.id === examId), [examId])
  if (!exam) return null

  const ui = subj.ui
  const isRTL = subj.dir === 'rtl'
  const prod = exam.production
  const text = productions[examId] || ''
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const BackIcon = isRTL ? ArrowRight : ArrowLeft
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft

  return (
    <div className={`fade-in space-y-4 ${isRTL ? 'font-arabic' : ''}`} dir={subj.dir}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{exam.year} — {exam.region}</h2>
          {exam.work ? (
            <p className={`${isRTL ? 'font-arabic' : 'font-serif italic'} text-sm text-gray-500 dark:text-gray-400`}>{exam.work.title} — {exam.work.author}</p>
          ) : exam.topic ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">{exam.topic.text || exam.topic.history || exam.topic.geography}</p>
          ) : null}
        </div>
        <button className={BTN_GHOST} onClick={goHome}><BackIcon className="w-4 h-4" /> {ui.quitLabel}</button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{ui.productionLabel}</span>
        <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">{prod.points} pts</span>
      </div>
      <div className="h-1 bg-gray-900 dark:bg-white rounded-full" />

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="p-4 rounded-lg border-s-2 border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800/50">
          <p className={`${isRTL ? 'font-arabic' : 'font-serif'} text-[15px] leading-[1.8] text-gray-800 dark:text-gray-200 whitespace-pre-line`}>{prod.sujet}</p>
        </div>

        <textarea className={`${INPUT_CLS} min-h-[240px] resize-y`} placeholder={ui.writePlaceholder}
          value={text} onChange={e => updateProduction(examId, e.target.value)} />
        <div className={`text-xs text-end ${words >= 80 ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
          {words} {words !== 1 ? ui.wordsLabel : ui.wordLabel}
        </div>

        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5 mb-3"><ListChecks className="w-3.5 h-3.5 text-gray-400" /><span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{ui.criteriaLabel}</span></div>
          <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
            {prod.criteres.map((c, i) => <li key={i} className="flex items-start gap-2"><Minus className="w-3 h-3 mt-1 flex-shrink-0 text-gray-300" /> {c}</li>)}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button className={BTN_GHOST} onClick={goHome}><PrevIcon className="w-4 h-4" /> {ui.homeLabel}</button>
          <button className={BTN_PRIMARY} onClick={goToCorrection}><CheckCircle className="w-4 h-4" /> {ui.seeCorrection}</button>
        </div>
      </div>
    </div>
  )
}
