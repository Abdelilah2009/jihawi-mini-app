import { CheckCircle, XCircle, Check, X, ArrowRight, Lightbulb } from 'lucide-react'
import { checkShort } from '../lib/scoring'

// ── Correction QCM ────────────────────────────────
export function CorrQCM({ question, answer, labels }) {
  return (
    <>
      <div className="space-y-1.5">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex
          const isSelected = answer?.value === i
          let cls, icon
          if (isCorrect) {
            cls = 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950'
            icon = <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
          } else if (isSelected) {
            cls = 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950'
            icon = <XCircle className="w-4 h-4 text-red-500 dark:text-red-400 flex-shrink-0" />
          } else {
            cls = 'border-gray-100 dark:border-gray-800 opacity-40'
            icon = <span className="w-4 h-4 flex-shrink-0" />
          }
          return (
            <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${cls}`}>
              {icon}
              <span className="text-sm">{opt}</span>
              {isSelected && !isCorrect && <span className="ms-auto text-[10px] text-red-400 font-medium">{labels?.yourChoiceLabel || 'Votre choix'}</span>}
            </div>
          )
        })}
      </div>
      {question.explanation && (
        <div className="mt-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </>
  )
}

// ── Correction VF ─────────────────────────────────
export function CorrVF({ question, answer, labels }) {
  const trueLabel = labels?.trueLabel || 'Vrai'
  const falseLabel = labels?.falseLabel || 'Faux'
  const notAnswered = labels?.notAnsweredLabel || 'Non répondu'
  return (
    <div className="space-y-2.5">
      {question.statements.map((stmt, i) => {
        const ans = answer?.value?.[i] || {}
        const userChoice = ans.choice
        const isCorrect = userChoice === stmt.answer
        const noAnswer = userChoice === undefined
        return (
          <div key={i} className="p-3 rounded-lg border border-gray-100 dark:border-gray-800">
            <p className="text-sm mb-2">{i + 1}. {stmt.text}</p>
            <div className="flex items-center gap-3 text-xs">
              <span className={`font-medium inline-flex items-center gap-1 ${noAnswer ? 'text-gray-400' : isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {noAnswer ? notAnswered : `${labels?.yourChoiceLabel || 'Vous'} : ${userChoice ? trueLabel : falseLabel}`}
                {!noAnswer && (isCorrect ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />)}
              </span>
              {!isCorrect && <span className="text-gray-500 inline-flex items-center gap-1"><ArrowRight className="w-3 h-3" /> {stmt.answer ? trueLabel : falseLabel}</span>}
            </div>
            {stmt.justification && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{stmt.justification}</p>}
          </div>
        )
      })}
    </div>
  )
}

// ── Correction Table ──────────────────────────────
export function CorrTable({ question, answer, labels }) {
  const notAnswered = labels?.notAnsweredLabel || 'Non répondu'
  return (
    <div className="space-y-2">
      {question.fields.map((f, i) => {
        const val = answer?.value?.[i] || ''
        const ok = val && checkShort(val, f.answer, [])
        const noAnswer = !val
        return (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider min-w-[100px]">{f.label}</span>
            <div className="flex-1">
              {noAnswer
                ? <span className="text-xs text-gray-400 italic">{notAnswered}</span>
                : <span className={`text-sm inline-flex items-center gap-1 ${ok ? 'text-green-700 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{val} {ok ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}</span>}
              {!ok && <span className="text-xs text-gray-500 ms-2 inline-flex items-center gap-1"><ArrowRight className="w-3 h-3" /> {f.answer}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Correction Short ──────────────────────────────
export function CorrShort({ question, answer, labels }) {
  const val = answer?.value || ''
  const ok = val && answer?.scored > 0
  const noAnswer = !val
  const notAnswered = labels?.notAnsweredLabel || 'Non répondu'
  const expectedLabel = labels?.expectedLabel || 'Réponse attendue :'
  return (
    <>
      <div className={`p-3 rounded-lg border ${noAnswer ? 'border-gray-100 dark:border-gray-800' : ok ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950' : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950'}`}>
        {noAnswer
          ? <p className="text-xs text-gray-400 italic">{notAnswered}</p>
          : <p className={`text-sm inline-flex items-center gap-1 ${ok ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {ok ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />} {val}
            </p>}
      </div>
      <div className="mt-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
        <p className="text-xs font-medium text-gray-500 mb-1">{expectedLabel}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">{question.answer}</p>
        {question.explanation && <p className="text-xs text-gray-500 mt-2 leading-relaxed">{question.explanation}</p>}
      </div>
    </>
  )
}

// ── Correction Skip ──────────────────────────────
export function CorrSkip({ question, labels }) {
  const modelLabel = labels?.modelAnswerLabel || 'Réponse modèle'
  return (
    <>
      <div className="p-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-xs text-gray-400 italic">{labels?.notAnsweredLabel || 'Non répondu'} — {question.skipLabel || 'يتطلب الرسم على الورق'}</p>
      </div>
      {question.sampleAnswer && (
        <div className="mt-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1.5"><Lightbulb className="w-3.5 h-3.5" /> {modelLabel}</div>
          <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">{question.sampleAnswer}</p>
        </div>
      )}
    </>
  )
}

// ── Correction Input ──────────────────────────────
export function CorrInput({ question, answer, labels }) {
  const val = answer?.value || ''
  const noAnswer = !val
  const notAnswered = labels?.notAnsweredLabel || 'Non répondu'
  const yourAnswer = labels?.yourAnswerLabel || 'Votre réponse :'
  const modelLabel = labels?.modelAnswerLabel || 'Réponse modèle'
  return (
    <>
      {noAnswer
        ? <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-800"><p className="text-xs text-gray-400 italic">{notAnswered}</p></div>
        : <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs font-medium text-gray-500 mb-1">{yourAnswer}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">{val}</p>
          </div>}
      <div className="mt-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1.5"><Lightbulb className="w-3.5 h-3.5" /> {modelLabel}</div>
        <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">{question.sampleAnswer}</p>
      </div>
    </>
  )
}
