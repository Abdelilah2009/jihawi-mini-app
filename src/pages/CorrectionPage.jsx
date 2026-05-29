import { useMemo, useState } from 'react'
import { Copy, RotateCcw, Home, BookOpen, PenLine, Sparkles } from 'lucide-react'
import * as icons from 'lucide-react'
import { EXAMS } from '../data/exams'
import { useApp } from '../App'
import { BTN_PRIMARY, BTN_SECONDARY, BTN_GHOST } from '../lib/constants'
import { calcScore } from '../lib/scoring'
import { generateCopyText } from '../lib/copyText'
import { CorrQCM, CorrVF, CorrTable, CorrShort, CorrInput, CorrSkip } from '../components/corrections'
import TextContent from '../components/TextContent'

export default function CorrectionPage() {
  const { examId, answers, productions, bestScores, updateBestScore, retryExam, goHome, subj } = useApp()
  const exam = useMemo(() => EXAMS.find(e => e.id === examId), [examId])
  const [copyLabel, setCopyLabel] = useState(null)

  if (!exam) return null

  const ui = subj.ui
  const isRTL = subj.dir === 'rtl'
  const examAnswers = answers[examId] || {}
  const { score, total, inputPts } = calcScore(exam, examAnswers)
  const pct = total > 0 ? Math.round((score / total) * 100) : 0

  useMemo(() => {
    if (!bestScores[examId] || score > bestScores[examId].score) {
      updateBestScore(examId, { score, total, date: new Date().toLocaleDateString('fr-FR') })
    }
  }, [score, total, examId])

  let ringColor
  if (pct >= 80) ringColor = '#16a34a'
  else if (pct >= 60) ringColor = '#0d9488'
  else if (pct >= 40) ringColor = '#d97706'
  else ringColor = '#dc2626'

  const sections = {}
  exam.questions.forEach((q, i) => {
    if (q.type === 'input') return
    if (!sections[q.section]) sections[q.section] = { earned: 0, total: 0 }
    sections[q.section].total += q.points
    if (examAnswers[i]?.scored !== undefined) sections[q.section].earned += examAnswers[i].scored
  })

  const C = 2 * Math.PI * 54
  const offset = C * (1 - pct / 100)

  const doCopy = () => {
    const text = generateCopyText(exam, examAnswers, productions[examId] || '', subj)
    navigator.clipboard.writeText(text).then(() => {
      setCopyLabel(ui.copiedLabel)
      setTimeout(() => setCopyLabel(null), 2000)
    })
  }

  return (
    <div className={`fade-in space-y-5 ${isRTL ? 'font-arabic' : ''}`} dir={subj.dir}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{ui.correctionLabel} — {exam.year} {exam.region}</h2>
          {exam.work ? (
            <p className={`${isRTL ? 'font-arabic' : 'font-serif italic'} text-sm text-gray-500 dark:text-gray-400`}>{exam.work.title} — {exam.work.author}</p>
          ) : exam.topic ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">{exam.topic.text || exam.topic.geography}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <button className={BTN_PRIMARY} onClick={doCopy}><Copy className="w-4 h-4" /> <span>{copyLabel || ui.copyLabel}</span></button>
          <button className={BTN_SECONDARY} onClick={retryExam}><RotateCcw className="w-4 h-4" /> {ui.retryLabel}</button>
          <button className={BTN_GHOST} onClick={goHome}><Home className="w-4 h-4" /> {ui.homeLabel}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">
        {/* Text */}
        <div className="lg:col-span-2 lg:sticky lg:top-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 max-h-[calc(100vh-120px)] overflow-y-auto custom-scroll">
          <div className="flex items-center gap-2 mb-1"><BookOpen className="w-3.5 h-3.5 text-gray-400" /><span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{ui.textLabel}</span></div>
          {exam.work && (
            <p className={`${isRTL ? 'font-arabic' : 'font-serif italic'} text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800`}>{exam.work.title} — {exam.work.author} ({exam.work.year})</p>
          )}
          <TextContent text={exam.texte} className={`${isRTL ? 'font-arabic' : 'font-serif'} text-sm`} />
          {exam.footnotes && <div className="mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-800 text-xs text-gray-400 leading-relaxed">{exam.footnotes}</div>}
        </div>

        {/* Corrections */}
        <div className="lg:col-span-3 space-y-4">
          {/* Score */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-center">
            <div className="relative flex justify-center w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" className="stroke-gray-100 dark:stroke-gray-800" strokeWidth="7" />
                <circle cx="60" cy="60" r="54" fill="none" stroke={ringColor} strokeWidth="7"
                  strokeDasharray={C} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 60 60)" className="score-stroke" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold tracking-tight" style={{ color: ringColor }}>{score}</span>
                <span className="text-xs text-gray-400">/ {total} pts</span>
              </div>
            </div>
            {inputPts > 0 && <p className="text-xs text-gray-400 mb-3">+ {inputPts} pts — {ui.aiCorrectionTag}</p>}
            <div className={`grid grid-cols-2 sm:grid-cols-${Math.min(Object.keys(sections).length, 4)} gap-2 text-start`} dir={subj.dir}>
              {Object.entries(sections).map(([sec, d]) => {
                const m = subj.sections[sec] || { label: sec, icon: 'HelpCircle' }
                const SIcon = icons[m.icon] || icons.HelpCircle
                return (
                  <div key={sec} className="p-2.5 rounded-lg border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-1 mb-0.5"><SIcon className="w-3 h-3 text-gray-400" /><span className="text-[10px] text-gray-400">{m.label}</span></div>
                    <div className="text-xs font-semibold">{Math.round(d.earned * 100) / 100} <span className="text-gray-400 font-normal">/ {d.total}</span></div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Questions */}
          {exam.questions.map((q, i) => <CorrectionItem key={i} question={q} index={i} answer={examAnswers[i]} subj={subj} />)}

          {/* Copy CTA */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0"><Sparkles className="w-5 h-5 text-gray-400" /></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{ui.aiCopyTitle}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{ui.aiCopyDesc}</p>
              </div>
              <button className={BTN_SECONDARY + ' flex-shrink-0'} onClick={doCopy}><Copy className="w-4 h-4" /> {copyLabel || ui.copyLabel}</button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 py-4">
            <button className={BTN_SECONDARY} onClick={retryExam}><RotateCcw className="w-4 h-4" /> {ui.retryLabel}</button>
            <button className={BTN_GHOST} onClick={goHome}><Home className="w-4 h-4" /> {ui.homeLabel}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CorrectionItem({ question: q, index: idx, answer, subj }) {
  const ui = subj.ui
  const sec = subj.sections[q.section] || { label: q.section, icon: 'HelpCircle' }
  const SIcon = icons[sec.icon] || icons.HelpCircle
  const ptLabel = q.points === 1 ? '1 pt' : q.points + ' pts'

  let qScore = answer?.scored !== undefined ? answer.scored : null
  let scoreColor = 'text-gray-400'
  if (qScore !== null) {
    if (qScore === q.points) scoreColor = 'text-green-600 dark:text-green-400'
    else if (qScore > 0) scoreColor = 'text-amber-600 dark:text-amber-400'
    else scoreColor = 'text-red-500 dark:text-red-400'
  }

  const scoreDisplay = q.type === 'input' ? ptLabel : (qScore !== null ? Math.round(qScore * 100) / 100 + '/' + q.points : ptLabel)
  const sColor = q.type === 'input' ? 'text-gray-400' : scoreColor

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Q{idx + 1}</span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] text-gray-500 dark:text-gray-400"><SIcon className="w-3 h-3" /> {sec.label}</span>
          {q.type === 'input' && <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-[10px] text-amber-600 dark:text-amber-400 font-medium">{ui.aiCorrectionTag}</span>}
        </div>
        <span className={`text-xs font-semibold ${sColor}`}>{scoreDisplay}</span>
      </div>
      <p className="text-sm font-medium leading-relaxed mb-3">{q.text}</p>
      {q.type === 'qcm' && <CorrQCM question={q} answer={answer} labels={ui} />}
      {q.type === 'vf' && <CorrVF question={q} answer={answer} labels={ui} />}
      {q.type === 'table' && <CorrTable question={q} answer={answer} labels={ui} />}
      {q.type === 'short' && <CorrShort question={q} answer={answer} labels={ui} />}
      {q.type === 'input' && <CorrInput question={q} answer={answer} labels={ui} />}
      {q.type === 'skip' && <CorrSkip question={q} labels={ui} />}
    </div>
  )
}
