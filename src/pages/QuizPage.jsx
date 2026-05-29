import { useMemo } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import * as icons from 'lucide-react'
import { EXAMS } from '../data/exams'
import { useApp } from '../App'
import { BTN_PRIMARY, BTN_GHOST } from '../lib/constants'
import { QCM, VF, TableQ, ShortQ, InputQ, SkipQ } from '../components/questions'
import TextContent from '../components/TextContent'

export default function QuizPage() {
  const { examId, currentQ, setCurrentQ, answers, updateAnswer, goHome, goToProduction, goToCorrection, subj } = useApp()
  const exam = useMemo(() => EXAMS.find(e => e.id === examId), [examId])
  if (!exam) return null

  const ui = subj.ui
  const isRTL = subj.dir === 'rtl'
  const q = exam.questions[currentQ]
  const total = exam.questions.length
  const pct = ((currentQ + 1) / total) * 100
  const sec = subj.sections[q.section] || { label: q.section, icon: 'HelpCircle' }
  const SectionIcon = icons[sec.icon] || icons.HelpCircle
  const isLast = currentQ === total - 1
  const answer = answers[examId]?.[currentQ]

  const handleChange = (val) => updateAnswer(examId, currentQ, val)
  const handlePrev = () => { if (currentQ > 0) setCurrentQ(currentQ - 1) }
  const handleNext = () => { if (isLast) { exam.production ? goToProduction() : goToCorrection() } else setCurrentQ(currentQ + 1) }

  const ptLabel = q.points === 1 ? '1 pt' : q.points + ' pts'
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft
  const NextIcon = isRTL ? ChevronLeft : ChevronRight
  const BackIcon = isRTL ? ArrowRight : ArrowLeft

  return (
    <div className={`fade-in space-y-4 ${isRTL ? 'font-arabic' : ''}`} dir={subj.dir}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{exam.year} — {exam.region}</h2>
          {exam.work ? (
            <p className={`${isRTL ? 'font-arabic' : 'font-serif italic'} text-sm text-gray-500 dark:text-gray-400`}>{exam.work.title} — {exam.work.author}</p>
          ) : exam.topic ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">{exam.topic.text || exam.topic.geography}</p>
          ) : null}
        </div>
        <button className={BTN_GHOST} onClick={goHome}><BackIcon className="w-4 h-4" /> {ui.quitLabel}</button>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">{ui.questionLabel} {currentQ + 1} / {total}</span>
            <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400"><SectionIcon className="w-3 h-3" /> {sec.label}</span>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">{Math.round(pct)}%</span>
        </div>
        <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gray-900 dark:bg-white rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        {/* Text */}
        <div className="lg:sticky lg:top-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6 max-h-[50vh] lg:max-h-[calc(100vh-120px)] overflow-y-auto custom-scroll">
          <div className="flex items-center gap-2 mb-1"><BookOpen className="w-3.5 h-3.5 text-gray-400" /><span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{ui.textLabel}</span></div>
          {exam.work && (
            <p className={`${isRTL ? 'font-arabic' : 'font-serif italic'} text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800`}>{exam.work.title} — {exam.work.author} ({exam.work.year})</p>
          )}
          <TextContent text={exam.texte} className={`${isRTL ? 'font-arabic' : 'font-serif'} text-[15px]`} />
          {exam.footnotes && <div className="mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">{exam.footnotes}</div>}
        </div>

        {/* Question */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{ui.questionLabel} {currentQ + 1}</span>
            <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">{ptLabel}</span>
          </div>
          <p className="text-[15px] font-medium leading-relaxed mb-4">{q.text}</p>

          {q.type === 'qcm' && <QCM question={q} answer={answer} onChange={handleChange} />}
          {q.type === 'vf' && <VF question={q} answer={answer} onChange={handleChange} labels={ui} />}
          {q.type === 'table' && <TableQ question={q} answer={answer} onChange={handleChange} placeholder={ui.placeholder} />}
          {q.type === 'short' && <ShortQ answer={answer} onChange={handleChange} placeholder={ui.placeholder} />}
          {q.type === 'input' && <InputQ answer={answer} onChange={handleChange} placeholder={ui.placeholder} />}
          {q.type === 'skip' && <SkipQ answer={answer} onChange={handleChange} label={q.skipLabel} />}

          {/* Nav */}
          <div className="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
            <button className={BTN_GHOST} onClick={handlePrev} disabled={currentQ === 0}><PrevIcon className="w-4 h-4" /> {ui.prevLabel}</button>
            <button className={BTN_PRIMARY} onClick={handleNext}>{isLast ? (exam.production ? ui.productionLabel : ui.seeCorrection) : ui.nextLabel} <NextIcon className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
