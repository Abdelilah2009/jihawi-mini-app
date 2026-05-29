import { SUBJECTS } from './subjects'

export function normalize(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

export function normalizeAr(s) {
  if (!s) return '';
  return s
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim();
}

export function checkShort(userAns, expected, alts, lang) {
  const norm = lang === 'ar' ? normalizeAr : normalize;
  const n = norm(userAns);
  if (!n) return false;
  return [expected, ...(alts || [])].some(a => {
    const na = norm(a);
    return n.includes(na) || na.includes(n);
  });
}

export function scoreAll(exam, answers) {
  const lang = SUBJECTS[exam.subject]?.lang || 'fr';
  const scored = { ...answers };
  exam.questions.forEach((q, i) => {
    const a = scored[i];
    if (!a) return;
    switch (q.type) {
      case 'qcm':
        a.scored = a.value === q.correctIndex ? q.points : 0;
        break;
      case 'vf': {
        let c = 0;
        q.statements.forEach((s, j) => {
          if (a.value?.[j]?.choice === s.answer) c++;
        });
        a.scored = (c / q.statements.length) * q.points;
        break;
      }
      case 'table': {
        let c = 0;
        q.fields.forEach((f, j) => {
          if (checkShort(a.value?.[j] || '', f.answer, [], lang)) c++;
        });
        a.scored = (c / q.fields.length) * q.points;
        break;
      }
      case 'short':
        a.scored = checkShort(a.value || '', q.answer, q.alternatives, lang) ? q.points : 0;
        break;
      case 'input':
      case 'skip':
        break;
    }
  });
  return scored;
}

export function calcScore(exam, answers) {
  let score = 0, total = 0, inputPts = 0;
  exam.questions.forEach((q, i) => {
    if (q.type === 'input' || q.type === 'skip') { inputPts += q.points; return; }
    total += q.points;
    if (answers?.[i]?.scored !== undefined) score += answers[i].scored;
  });
  return { score: Math.round(score * 100) / 100, total, inputPts };
}

export function getProgress(exam, answers) {
  if (!exam || !answers) return 0;
  let done = 0;
  exam.questions.forEach((q, i) => { if (answers[i]) done++; });
  return Math.round((done / exam.questions.length) * 100);
}

export function isExamScored(answers) {
  if (!answers) return false;
  return Object.values(answers).some(a => a.scored !== undefined);
}
