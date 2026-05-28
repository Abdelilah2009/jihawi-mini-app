import { useState } from 'react'
import { FileText, HelpCircle, BookOpen, CheckCircle } from 'lucide-react'
import { EXAMS } from '../data/exams'
import { useApp } from '../App'
import { getProgress } from '../lib/scoring'

const statIcons = { 'file-text': FileText, 'help-circle': HelpCircle, 'book-open': BookOpen, 'check-circle': CheckCircle }

export default function HomePage() {
  const { answers, bestScores, openExam } = useApp()
  const [filter, setFilter] = useState('all')
  const works = [...new Set(EXAMS.map(e => e.work.title))]
  const filtered = filter === 'all' ? EXAMS : EXAMS.filter(e => e.work.title === filter)
  const totalQ = EXAMS.reduce((s, e) => s + e.questions.length, 0)
  const completed = EXAMS.filter(e => getProgress(e, answers[e.id]) === 100).length

  const stats = [
    { n: EXAMS.length, l: 'Examens', i: 'file-text' },
    { n: totalQ, l: 'Questions', i: 'help-circle' },
    { n: works.length, l: 'Œuvres', i: 'book-open' },
    { n: completed, l: 'Terminés', i: 'check-circle' },
  ]

  return (
    <div className="fade-in space-y-6">
      {/* Hero */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Prépare ton examen régional</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">Entraîne-toi avec des quiz basés sur les vrais sujets du jihawi. Réponds à toutes les questions, puis découvre la correction complète.</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['QCM', 'Vrai / Faux', 'Figures de style', 'Réponses courtes', 'Production écrite'].map(t => (
                <span key={t} className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{t}</span>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {stats.map(s => {
              const Icon = statIcons[s.i]
              return (
                <div key={s.l} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="flex items-center gap-2 mb-1"><Icon className="w-3.5 h-3.5 text-gray-400" /><span className="text-xs text-gray-500 dark:text-gray-400">{s.l}</span></div>
                  <div className="text-xl font-semibold tracking-tight">{s.n}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto">
        {['all', ...works].map(w => (
          <button key={w} onClick={() => setFilter(w)} className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${filter === w ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            {w === 'all' ? 'Tous' : w}
          </button>
        ))}
      </div>

      <div className="flex items-baseline justify-between px-1">
        <h3 className="text-sm font-semibold">Examens régionaux</h3>
        <span className="text-xs text-gray-400">{filtered.length} examen{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(e => {
          const prog = getProgress(e, answers[e.id])
          const best = bestScores[e.id]
          return (
            <div key={e.id} onClick={() => openExam(e.id)} className="group cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:-translate-y-[1px]">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{e.year}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{e.region}</span>
              </div>
              <h4 className="text-sm font-semibold mb-1">Examen Régional — {e.session}</h4>
              <p className="font-serif italic text-sm text-gray-500 dark:text-gray-400 mb-4">{e.work.title}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                <span className="text-xs text-gray-400">{e.questions.length} questions</span>
                {best ? <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400">{best.score}/{best.total}</span>
                  : prog > 0 ? <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400">{prog}%</span> : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
