import { useMemo } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import * as icons from 'lucide-react'
import { EXAMS } from '../data/exams'
import { useApp } from '../App'
import { sectionMeta, BTN_PRIMARY, BTN_GHOST } from '../lib/constants'
import { QCM, VF, TableQ, ShortQ, InputQ } from '../components/questions'

export default function QuizPage() {
  const { examId, currentQ, setCurrentQ, answers, updateAnswer, goHome, goToProduction } = useApp()
  const exam = useMemo(() => EXAMS.find(e => e.id === examId), [examId])
  if (!exam) return null
  const q = exam.questions[currentQ]
  const total = exam.questions.length
  const pct = ((currentQ + 1) / total) * 100
  const sec = sectionMeta[q.section] || { label: q.section, icon: 'HelpCircle' }
  const SectionIcon = icons[sec.icon] || icons.HelpCircle
  const isLast = currentQ === total - 1
  const answer = answers[examId]?.[currentQ]

  const handleChange = (val) => updateAnswer(examId, currentQ, val)
  const handlePrev = () => { if (currentQ > 0) setCurrentQ(currentQ - 1) }
  const handleNext = () => { if (isLast) goToProduction(); else setCurrentQ(currentQ + 1) }

  const ptLabel = q.points === 1 ? '1 pt' : q.points + ' pts'

  return (
    <div className="fade-in space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{exam.year} — {exam.region}</h2>
          <p className="font-serif italic text-sm text-gray-500 dark:text-gray-400">{exam.work.title} — {exam.work.author}</p>
        </div>
        <button className={BTN_GHOST} onClick={goHome}><ArrowLeft className="w-4 h-4" /> Quitter</button>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-900 dark:text-gray-100">Question {currentQ + 1} / {total}</span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400"><SectionIcon className="w-3 h-3" /> {sec.label}</span>
          </div>
          <span className="text-xs text-gray-400">{Math.round(pct)}%</span>
        </div>
        <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gray-900 dark:bg-white rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        {/* Text */}
        <div className="lg:sticky lg:top-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6 max-h-[calc(100vh-120px)] overflow-y-auto custom-scroll">
          <div className="flex items-center gap-2 mb-1"><BookOpen className="w-3.5 h-3.5 text-gray-400" /><span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Texte</span></div>
          <p className="font-serif italic text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">{exam.work.title} — {exam.work.author} ({exam.work.year})</p>
          <div className="text-content font-serif text-[15px] leading-[1.8] text-gray-800 dark:text-gray-200">{exam.texte}</div>
          {exam.footnotes && <div className="mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">{exam.footnotes}</div>}
        </div>

        {/* Question */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Question {currentQ + 1}</span>
            <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">{ptLabel}</span>
          </div>
          <p className="text-[15px] font-medium leading-relaxed mb-4">{q.text}</p>

          {q.type === 'qcm' && <QCM question={q} answer={answer} onChange={handleChange} />}
          {q.type === 'vf' && <VF question={q} answer={answer} onChange={handleChange} />}
          {q.type === 'table' && <TableQ question={q} answer={answer} onChange={handleChange} />}
          {q.type === 'short' && <ShortQ answer={answer} onChange={handleChange} />}
          {q.type === 'input' && <InputQ answer={answer} onChange={handleChange} />}

          {/* Nav */}
          <div className="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
            <button className={BTN_GHOST} onClick={handlePrev} disabled={currentQ === 0}><ChevronLeft className="w-4 h-4" /> Précédent</button>
            <button className={BTN_PRIMARY} onClick={handleNext}>{isLast ? 'Production écrite' : 'Suivant'} <ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
