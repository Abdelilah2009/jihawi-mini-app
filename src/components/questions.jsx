import { INPUT_CLS } from '../lib/constants'

// ── QCM ───────────────────────────────────────────
export function QCM({ question, answer, onChange }) {
  const selected = answer?.value
  return (
    <div className="space-y-2 mb-2">
      {question.options.map((opt, i) => {
        const sel = selected === i
        return (
          <label key={i} onClick={() => onChange({ value: i })}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${sel ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
            {sel
              ? <span className="w-4 h-4 rounded-full border-2 border-gray-900 dark:border-white flex-shrink-0 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white" /></span>
              : <span className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0" />}
            <span className={`text-sm ${sel ? 'font-medium' : ''}`}>{opt}</span>
          </label>
        )
      })}
    </div>
  )
}

// ── Vrai/Faux ─────────────────────────────────────
export function VF({ question, answer, onChange, labels }) {
  const vals = answer?.value || {}
  const trueLabel = labels?.trueLabel || 'Vrai'
  const falseLabel = labels?.falseLabel || 'Faux'
  const update = (si, key, val) => {
    const next = { ...vals, [si]: { ...(vals[si] || {}), [key]: val } }
    onChange({ value: next })
  }
  return (
    <div className="space-y-3 mb-2">
      {question.statements.map((stmt, i) => {
        const ans = vals[i] || {}
        return (
          <div key={i} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            <p className="text-sm font-medium mb-3">{i + 1}. {stmt.text}</p>
            <div className="flex gap-2 mb-2">
              {[{ val: true, label: trueLabel }, { val: false, label: falseLabel }].map(({ val, label }) => (
                <button key={String(val)} onClick={() => update(i, 'choice', val)}
                  className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${ans.choice === val ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}`}>
                  {label}
                </button>
              ))}
            </div>
            {stmt.justification && (
              <textarea className={`${INPUT_CLS} text-xs !py-2 min-h-[36px] resize-y`}
                placeholder={labels?.placeholder || 'Justification (optionnel)...'} value={ans.justif || ''}
                onChange={e => update(i, 'justif', e.target.value)} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Table ─────────────────────────────────────────
export function TableQ({ question, answer, onChange, placeholder }) {
  const vals = answer?.value || {}
  const update = (fi, val) => {
    const next = { ...vals, [fi]: val }
    onChange({ value: next })
  }
  return (
    <div className="space-y-3 mb-2">
      {question.fields.map((f, i) => (
        <div key={i}>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">{f.label}</label>
          <input className={INPUT_CLS} value={vals[i] || ''} placeholder={placeholder || 'Votre réponse...'}
            onChange={e => update(i, e.target.value)} />
        </div>
      ))}
    </div>
  )
}

// ── Short Answer ──────────────────────────────────
export function ShortQ({ answer, onChange, placeholder }) {
  return (
    <>
      <input className={INPUT_CLS} value={answer?.value || ''} placeholder={placeholder || 'Tapez votre réponse...'}
        onChange={e => onChange({ value: e.target.value })} />
      <p className="text-xs text-gray-400 mt-2">{placeholder ? '' : 'Écrivez votre réponse puis passez à la suite.'}</p>
    </>
  )
}

// ── Skip (placeholder for drawing/chart questions) ─
export function SkipQ({ answer, onChange, label }) {
  const skipped = answer?.value === '__skipped__'
  return (
    <div className="p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-center space-y-3">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label || 'هذا السؤال يتطلب الرسم على الورق'}</p>
      <button onClick={() => onChange({ value: '__skipped__' })}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${skipped ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'}`}>
        {skipped ? '✓ ' : ''}{label ? (skipped ? 'تم التخطي' : 'تخطي') : (skipped ? 'Passé' : 'Passer')}
      </button>
    </div>
  )
}

// ── Free Input ────────────────────────────────────
export function InputQ({ answer, onChange, placeholder }) {
  return (
    <>
      <textarea className={`${INPUT_CLS} min-h-[100px] resize-y`} value={answer?.value || ''}
        placeholder={placeholder || 'Écrivez votre réponse ici...'}
        onChange={e => onChange({ value: e.target.value })} />
      <p className="text-xs text-gray-400 mt-2">{placeholder ? '' : 'Rédigez votre réponse puis passez à la suite.'}</p>
    </>
  )
}
