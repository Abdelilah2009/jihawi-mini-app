// ═══════════════════════════════════════════════════
//  JIHAWI QUIZ — App Engine (Tailwind + Lucide)
//  Correction only shows after ALL questions
// ═══════════════════════════════════════════════════

const $ = s => document.querySelector(s);
const app = $('#app');
const ic = (name, cls = 'w-4 h-4') => `<i data-lucide="${name}" class="${cls}"></i>`;
function refreshIcons() { if (window.lucide) lucide.createIcons(); }

// ── State ──────────────────────────────────────────
const state = {
  view: 'home',
  examId: null,
  currentQ: 0,
  answers: {},
  productions: {},
  bestScores: {},
  filter: 'all'
};

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem('jihawi_state'));
    if (s) { state.answers = s.answers || {}; state.productions = s.productions || {}; state.bestScores = s.bestScores || {}; }
  } catch {}
}
function saveState() {
  localStorage.setItem('jihawi_state', JSON.stringify({ answers: state.answers, productions: state.productions, bestScores: state.bestScores }));
}

// ── Theme ──────────────────────────────────────────
function initTheme() {
  const s = localStorage.getItem('jihawi_theme');
  if (s === 'dark' || (!s && window.matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark');
}
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('jihawi_theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

// ── Helpers ────────────────────────────────────────
function getExam(id) { return EXAMS.find(e => e.id === id); }
function normalize(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '').trim(); }
function checkShort(userAns, expected, alts) {
  const n = normalize(userAns); if (!n) return false;
  return [expected, ...(alts || [])].some(a => { const na = normalize(a); return n.includes(na) || na.includes(n); });
}

function getProgress(eid) {
  const exam = getExam(eid); if (!exam) return 0;
  const ans = state.answers[eid] || {};
  let done = 0;
  exam.questions.forEach((q, i) => { if (ans[i]) done++; });
  return Math.round((done / exam.questions.length) * 100);
}

function scoreAll(eid) {
  const exam = getExam(eid);
  const answers = state.answers[eid] || {};
  exam.questions.forEach((q, i) => {
    const a = answers[i];
    if (!a) return;
    switch (q.type) {
      case 'qcm': a.scored = a.value === q.correctIndex ? q.points : 0; break;
      case 'vf': {
        let c = 0;
        q.statements.forEach((s, j) => { if (a.value?.[j]?.choice === s.answer) c++; });
        a.scored = (c / q.statements.length) * q.points; break;
      }
      case 'table': {
        let c = 0;
        q.fields.forEach((f, j) => { if (checkShort(a.value?.[j] || '', f.answer, [])) c++; });
        a.scored = (c / q.fields.length) * q.points; break;
      }
      case 'short': a.scored = checkShort(a.value || '', q.answer, q.alternatives) ? q.points : 0; break;
      case 'input': break; // self-eval only
    }
  });
  state.answers[eid] = answers;
  saveState();
}

function calcScore(eid) {
  const exam = getExam(eid); if (!exam) return { score: 0, total: 0, inputPts: 0 };
  const ans = state.answers[eid] || {};
  let score = 0, total = 0, inputPts = 0;
  exam.questions.forEach((q, i) => {
    if (q.type === 'input') { inputPts += q.points; return; }
    total += q.points;
    if (ans[i]?.scored !== undefined) score += ans[i].scored;
  });
  return { score: Math.round(score * 100) / 100, total, inputPts };
}

const sectionMeta = {
  contextualisation: { label: 'Contextualisation', icon: 'clipboard-list' },
  comprehension: { label: 'Compréhension', icon: 'search' },
  langue: { label: 'Langue', icon: 'pen-tool' },
  reaction: { label: 'Réaction', icon: 'message-circle' }
};

// ── Style classes ──────────────────────────────────
const btnPrimary = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed';
const btnSecondary = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed';
const btnGhost = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed';
const inputCls = 'w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900/5 dark:focus:ring-white/5 focus:border-gray-300 dark:focus:border-gray-700 transition-colors';

// ═══════════════════════════════════════════════════
//  HOME
// ═══════════════════════════════════════════════════
function renderHome() {
  state.view = 'home'; state.examId = null;
  const works = [...new Set(EXAMS.map(e => e.work.title))];
  const filtered = state.filter === 'all' ? EXAMS : EXAMS.filter(e => e.work.title === state.filter);
  const totalQ = EXAMS.reduce((s, e) => s + e.questions.length, 0);
  const completed = EXAMS.filter(e => getProgress(e.id) === 100).length;

  app.innerHTML = `<div class="fade-in space-y-6">
    <div class="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div class="md:col-span-3 space-y-3">
          <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight">Prépare ton examen régional</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">Entraîne-toi avec des quiz basés sur les vrais sujets du jihawi. Réponds à toutes les questions, puis découvre la correction complète.</p>
          <div class="flex flex-wrap gap-2 pt-1">
            ${['QCM', 'Vrai / Faux', 'Figures de style', 'Réponses courtes', 'Production écrite'].map(t =>
              `<span class="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">${t}</span>`).join('')}
          </div>
        </div>
        <div class="md:col-span-2 grid grid-cols-2 gap-3">
          ${[
            { n: EXAMS.length, l: 'Examens', i: 'file-text' },
            { n: totalQ, l: 'Questions', i: 'help-circle' },
            { n: works.length, l: 'Œuvres', i: 'book-open' },
            { n: completed, l: 'Terminés', i: 'check-circle' }
          ].map(s => `
            <div class="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
              <div class="flex items-center gap-2 mb-1">${ic(s.i, 'w-3.5 h-3.5 text-gray-400')}<span class="text-xs text-gray-500 dark:text-gray-400">${s.l}</span></div>
              <div class="text-xl font-semibold tracking-tight">${s.n}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <div class="flex gap-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto">
      <button class="filter-tab px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${state.filter === 'all' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}" data-filter="all">Tous</button>
      ${works.map(w => `<button class="filter-tab px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${state.filter === w ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}" data-filter="${w}">${w}</button>`).join('')}
    </div>

    <div class="flex items-baseline justify-between px-1">
      <h3 class="text-sm font-semibold">Examens régionaux</h3>
      <span class="text-xs text-gray-400">${filtered.length} examen${filtered.length !== 1 ? 's' : ''}</span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ${filtered.map(e => {
        const prog = getProgress(e.id), best = state.bestScores[e.id];
        return `
        <div class="exam-card group cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:-translate-y-[1px]" data-exam="${e.id}">
          <div class="flex items-center gap-2 mb-3">
            <span class="px-2 py-0.5 text-xs font-semibold rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">${e.year}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">${e.region}</span>
          </div>
          <h4 class="text-sm font-semibold mb-1">Examen Régional — ${e.session}</h4>
          <p class="font-serif italic text-sm text-gray-500 dark:text-gray-400 mb-4">${e.work.title}</p>
          <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
            <span class="text-xs text-gray-400">${e.questions.length} questions</span>
            ${best ? `<span class="px-2 py-0.5 text-xs font-semibold rounded-md bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400">${best.score}/${best.total}</span>`
              : prog > 0 ? `<span class="px-2 py-0.5 text-xs font-semibold rounded-md bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400">${prog}%</span>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;

  app.querySelectorAll('.filter-tab').forEach(b => b.addEventListener('click', () => { state.filter = b.dataset.filter; renderHome(); }));
  app.querySelectorAll('.exam-card').forEach(c => c.addEventListener('click', () => openExam(c.dataset.exam)));
  refreshIcons();
}

// ═══════════════════════════════════════════════════
//  QUIZ (no feedback — just answer)
// ═══════════════════════════════════════════════════
function isExamScored(eid) {
  const ans = state.answers[eid] || {};
  return Object.values(ans).some(a => a.scored !== undefined);
}

function openExam(eid) {
  state.examId = eid;
  if (isExamScored(eid)) {
    state.view = 'correction';
    renderCorrection();
  } else {
    startQuiz(eid);
  }
}

function startQuiz(eid) {
  state.view = 'quiz'; state.examId = eid; state.currentQ = 0;
  if (!state.answers[eid]) state.answers[eid] = {};
  renderQuiz();
}

function renderQuiz() {
  const exam = getExam(state.examId), q = exam.questions[state.currentQ], total = exam.questions.length;
  const pct = ((state.currentQ + 1) / total) * 100;
  const sec = sectionMeta[q.section] || { label: q.section, icon: 'help-circle' };

  app.innerHTML = `<div class="fade-in space-y-4">
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h2 class="text-lg font-semibold tracking-tight">${exam.year} — ${exam.region}</h2>
        <p class="font-serif italic text-sm text-gray-500 dark:text-gray-400">${exam.work.title} — ${exam.work.author}</p>
      </div>
      <button class="${btnGhost}" id="backHome">${ic('arrow-left', 'w-4 h-4')} Quitter</button>
    </div>

    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-gray-900 dark:text-gray-100">Question ${state.currentQ + 1} / ${total}</span>
          <span class="flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">${ic(sec.icon, 'w-3 h-3')} ${sec.label}</span>
        </div>
        <span class="text-xs text-gray-400">${Math.round(pct)}%</span>
      </div>
      <div class="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div class="h-full bg-gray-900 dark:bg-white rounded-full transition-all duration-300" style="width:${pct}%"></div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
      <div class="lg:sticky lg:top-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6 max-h-[calc(100vh-120px)] overflow-y-auto custom-scroll">
        <div class="flex items-center gap-2 mb-1">
          ${ic('book-open', 'w-3.5 h-3.5 text-gray-400')}
          <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Texte</span>
        </div>
        <p class="font-serif italic text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">${exam.work.title} — ${exam.work.author} (${exam.work.year})</p>
        <div class="text-content font-serif text-[15px] leading-[1.8] text-gray-800 dark:text-gray-200">${exam.texte}</div>
        ${exam.footnotes ? `<div class="mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">${exam.footnotes}</div>` : ''}
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6" id="qPanel">
        ${renderQuizQuestion(q, state.currentQ)}
      </div>
    </div>
  </div>`;

  $('#backHome').addEventListener('click', () => { saveCurrentInput(); saveState(); renderHome(); });
  bindQuizEvents(q, state.currentQ);
  bindNav(exam);
  refreshIcons();
}

// ── Quiz Question (no feedback) ───────────────────
function renderQuizQuestion(q, idx) {
  const eid = state.examId, answer = (state.answers[eid] || {})[idx];
  const ptLabel = q.points === 1 ? '1 pt' : q.points + ' pts';
  const isLast = idx === getExam(eid).questions.length - 1;

  let html = `
    <div class="flex items-center gap-2 mb-1">
      <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Question ${idx + 1}</span>
      <span class="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">${ptLabel}</span>
    </div>
    <p class="text-[15px] font-medium leading-relaxed mb-4">${q.text}</p>
  `;

  switch (q.type) {
    case 'qcm': html += quizQCM(q, answer); break;
    case 'vf': html += quizVF(q, answer); break;
    case 'table': html += quizTable(q, answer); break;
    case 'short': html += quizShort(q, answer); break;
    case 'input': html += quizInput(q, answer); break;
  }

  html += `
    <div class="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
      <button class="${btnGhost}" id="prevQ" ${idx === 0 ? 'disabled' : ''}>${ic('chevron-left', 'w-4 h-4')} Précédent</button>
      <button class="${btnPrimary}" id="nextQ">${isLast ? 'Production écrite' : 'Suivant'} ${ic('chevron-right', 'w-4 h-4')}</button>
    </div>`;

  return html;
}

// ── Quiz QCM ──────────────────────────────────────
function quizQCM(q, answer) {
  let html = '<div class="space-y-2 mb-2">';
  q.options.forEach((opt, i) => {
    const sel = answer?.value === i;
    html += `<label class="opt flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${sel ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}" data-idx="${i}">
      ${sel
        ? `<span class="w-4 h-4 rounded-full border-2 border-gray-900 dark:border-white flex-shrink-0 flex items-center justify-center"><span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span></span>`
        : `<span class="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0"></span>`}
      <span class="text-sm ${sel ? 'font-medium' : ''}">${opt}</span>
    </label>`;
  });
  html += '</div>';
  return html;
}

// ── Quiz VF ───────────────────────────────────────
function quizVF(q, answer) {
  let html = '<div class="space-y-3 mb-2">';
  q.statements.forEach((stmt, i) => {
    const ans = answer?.value?.[i] || {};
    html += `<div class="p-4 rounded-lg border border-gray-200 dark:border-gray-800">
      <p class="text-sm font-medium mb-3">${i + 1}. ${stmt.text}</p>
      <div class="flex gap-2 mb-2">
        <button class="vf-btn flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-colors
          ${ans.choice === true ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}" data-stmt="${i}" data-val="true">Vrai</button>
        <button class="vf-btn flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-colors
          ${ans.choice === false ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'}" data-stmt="${i}" data-val="false">Faux</button>
      </div>
      ${stmt.justification ? `<textarea class="vf-justif ${inputCls} text-xs !py-2" data-stmt="${i}" placeholder="Justification (optionnel)...">${ans.justif || ''}</textarea>` : ''}
    </div>`;
  });
  html += '</div>';
  return html;
}

// ── Quiz Table ────────────────────────────────────
function quizTable(q, answer) {
  let html = '<div class="space-y-3 mb-2">';
  q.fields.forEach((f, i) => {
    const val = answer?.value?.[i] || '';
    html += `<div>
      <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">${f.label}</label>
      <input class="${inputCls}" data-field="${i}" value="${val}" placeholder="Votre réponse...">
    </div>`;
  });
  html += '</div>';
  return html;
}

// ── Quiz Short ────────────────────────────────────
function quizShort(q, answer) {
  return `
    <input class="${inputCls}" id="shortAns" value="${answer?.value || ''}" placeholder="Tapez votre réponse...">
    <p class="text-xs text-gray-400 mt-2">Écrivez votre réponse puis passez à la suite.</p>`;
}

// ── Quiz Input ────────────────────────────────────
function quizInput(q, answer) {
  return `
    <textarea class="${inputCls} min-h-[100px] resize-y" id="inputAns" placeholder="Écrivez votre réponse ici...">${answer?.value || ''}</textarea>
    <p class="text-xs text-gray-400 mt-2">Rédigez votre réponse puis passez à la suite.</p>`;
}

// ── Quiz Event Bindings ───────────────────────────
function bindQuizEvents(q, idx) {
  const eid = state.examId, panel = $('#qPanel');
  if (!panel) return;

  if (q.type === 'qcm') {
    panel.querySelectorAll('.opt').forEach(opt => {
      opt.addEventListener('click', () => {
        panel.querySelectorAll('.opt').forEach(o => {
          o.className = o.className.replace(/border-gray-900|dark:border-white|bg-gray-50|dark:bg-gray-800/g, '');
          if (!o.classList.contains('border-gray-200')) o.classList.add('border-gray-200');
          if (!o.classList.contains('dark:border-gray-800')) o.classList.add('dark:border-gray-800');
          o.querySelector('span:first-child').outerHTML = `<span class="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0"></span>`;
        });
        opt.classList.remove('border-gray-200', 'dark:border-gray-800');
        opt.classList.add('border-gray-900', 'dark:border-white', 'bg-gray-50', 'dark:bg-gray-800');
        opt.querySelector('span:first-child').outerHTML = `<span class="w-4 h-4 rounded-full border-2 border-gray-900 dark:border-white flex-shrink-0 flex items-center justify-center"><span class="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></span></span>`;
        if (!state.answers[eid]) state.answers[eid] = {};
        state.answers[eid][idx] = { value: parseInt(opt.dataset.idx) };
      });
    });
  }

  if (q.type === 'vf') {
    panel.querySelectorAll('.vf-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const si = parseInt(btn.dataset.stmt), val = btn.dataset.val === 'true';
        if (!state.answers[eid]) state.answers[eid] = {};
        if (!state.answers[eid][idx]) state.answers[eid][idx] = { value: {} };
        if (!state.answers[eid][idx].value[si]) state.answers[eid][idx].value[si] = {};
        state.answers[eid][idx].value[si].choice = val;
        const parent = btn.parentElement;
        parent.querySelectorAll('.vf-btn').forEach(b => {
          b.classList.remove('bg-gray-900', 'dark:bg-white', 'text-white', 'dark:text-gray-900', 'border-gray-900', 'dark:border-white');
          b.classList.add('border-gray-200', 'dark:border-gray-800');
        });
        btn.classList.remove('border-gray-200', 'dark:border-gray-800');
        btn.classList.add('bg-gray-900', 'dark:bg-white', 'text-white', 'dark:text-gray-900', 'border-gray-900', 'dark:border-white');
      });
    });
    panel.querySelectorAll('.vf-justif').forEach(ta => {
      ta.addEventListener('input', () => {
        const si = parseInt(ta.dataset.stmt);
        if (!state.answers[eid]) state.answers[eid] = {};
        if (!state.answers[eid][idx]) state.answers[eid][idx] = { value: {} };
        if (!state.answers[eid][idx].value[si]) state.answers[eid][idx].value[si] = {};
        state.answers[eid][idx].value[si].justif = ta.value;
      });
    });
  }

  if (q.type === 'table') {
    panel.querySelectorAll('input[data-field]').forEach(inp => {
      inp.addEventListener('input', () => {
        const fi = parseInt(inp.dataset.field);
        if (!state.answers[eid]) state.answers[eid] = {};
        if (!state.answers[eid][idx]) state.answers[eid][idx] = { value: {} };
        state.answers[eid][idx].value[fi] = inp.value;
      });
    });
  }

  // Short and input are saved on navigation (saveCurrentInput)
}

function saveCurrentInput() {
  const eid = state.examId; if (!eid) return;
  const exam = getExam(eid); if (!exam) return;
  const q = exam.questions[state.currentQ];
  if (!q) return;
  if (q.type === 'short') {
    const v = ($('#shortAns')?.value || '').trim();
    if (v) { if (!state.answers[eid]) state.answers[eid] = {}; state.answers[eid][state.currentQ] = { value: v }; }
  }
  if (q.type === 'input') {
    const v = ($('#inputAns')?.value || '').trim();
    if (v) { if (!state.answers[eid]) state.answers[eid] = {}; state.answers[eid][state.currentQ] = { value: v }; }
  }
}

function bindNav(exam) {
  const p = $('#prevQ'), n = $('#nextQ');
  if (p) p.addEventListener('click', () => { if (state.currentQ > 0) { saveCurrentInput(); state.currentQ--; renderQuiz(); } });
  if (n) n.addEventListener('click', () => {
    saveCurrentInput(); saveState();
    if (state.currentQ < exam.questions.length - 1) { state.currentQ++; renderQuiz(); }
    else renderProduction();
  });
}

// ═══════════════════════════════════════════════════
//  PRODUCTION ÉCRITE
// ═══════════════════════════════════════════════════
function renderProduction() {
  const exam = getExam(state.examId), prod = exam.production;
  const saved = state.productions[state.examId] || '';

  app.innerHTML = `<div class="fade-in space-y-4">
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h2 class="text-lg font-semibold tracking-tight">${exam.year} — ${exam.region}</h2>
        <p class="font-serif italic text-sm text-gray-500 dark:text-gray-400">${exam.work.title} — ${exam.work.author}</p>
      </div>
      <button class="${btnGhost}" id="backHome">${ic('arrow-left', 'w-4 h-4')} Quitter</button>
    </div>

    <div class="flex items-center gap-2">
      <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Production Écrite</span>
      <span class="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">${prod.points} pts</span>
    </div>
    <div class="h-1 bg-gray-900 dark:bg-white rounded-full"></div>

    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6 space-y-4">
      <div class="p-4 rounded-lg border-l-2 border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800/50">
        <p class="font-serif text-[15px] leading-[1.8] text-gray-800 dark:text-gray-200 whitespace-pre-line">${prod.sujet}</p>
      </div>

      <textarea class="${inputCls} min-h-[240px] resize-y" id="prodText" placeholder="Rédigez votre texte argumentatif ici... (~15 lignes)">${saved}</textarea>
      <div class="text-right text-xs text-gray-400" id="wordCount">0 mots</div>

      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
        <div class="flex items-center gap-1.5 mb-3">
          ${ic('list-checks', 'w-3.5 h-3.5 text-gray-400')}
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Critères d'évaluation</span>
        </div>
        <ul class="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
          ${prod.criteres.map(c => `<li class="flex items-start gap-2">${ic('minus', 'w-3 h-3 mt-1 flex-shrink-0 text-gray-300')} ${c}</li>`).join('')}
        </ul>
      </div>

      <div class="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <button class="${btnGhost}" id="backToQ">${ic('chevron-left', 'w-4 h-4')} Retour aux questions</button>
        <button class="${btnPrimary}" id="finishQuiz">${ic('check-circle', 'w-4 h-4')} Voir la correction</button>
      </div>
    </div>
  </div>`;

  const ta = $('#prodText'), wc = $('#wordCount');
  function updateWC() {
    const words = ta.value.trim().split(/\s+/).filter(Boolean).length;
    wc.textContent = `${words} mot${words !== 1 ? 's' : ''}`;
    if (words >= 80) { wc.classList.add('text-green-600', 'dark:text-green-400'); wc.classList.remove('text-gray-400'); }
    else { wc.classList.remove('text-green-600', 'dark:text-green-400'); wc.classList.add('text-gray-400'); }
    state.productions[state.examId] = ta.value; saveState();
  }
  ta.addEventListener('input', updateWC); updateWC();

  $('#backHome').addEventListener('click', () => { saveState(); renderHome(); });
  $('#backToQ').addEventListener('click', () => { state.currentQ = getExam(state.examId).questions.length - 1; renderQuiz(); });
  $('#finishQuiz').addEventListener('click', () => { scoreAll(state.examId); renderCorrection(); });
  refreshIcons();
}

// ═══════════════════════════════════════════════════
//  CORRECTION (all questions scored at once)
// ═══════════════════════════════════════════════════
function renderCorrection() {
  state.view = 'correction';
  const exam = getExam(state.examId);
  const { score, total, inputPts } = calcScore(state.examId);
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  if (!state.bestScores[state.examId] || score > state.bestScores[state.examId].score) {
    state.bestScores[state.examId] = { score, total, date: new Date().toLocaleDateString('fr-FR') };
    saveState();
  }

  let ringColor;
  if (pct >= 80) ringColor = '#16a34a';
  else if (pct >= 60) ringColor = '#0d9488';
  else if (pct >= 40) ringColor = '#d97706';
  else ringColor = '#dc2626';

  const sections = {};
  exam.questions.forEach((q, i) => {
    if (q.type === 'input') return;
    if (!sections[q.section]) sections[q.section] = { earned: 0, total: 0 };
    sections[q.section].total += q.points;
    const a = (state.answers[state.examId] || {})[i];
    if (a?.scored !== undefined) sections[q.section].earned += a.scored;
  });

  const C = 2 * Math.PI * 54, offset = C * (1 - pct / 100);

  app.innerHTML = `<div class="fade-in space-y-5">
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div>
        <h2 class="text-lg font-semibold tracking-tight">Correction — ${exam.year} ${exam.region}</h2>
        <p class="font-serif italic text-sm text-gray-500 dark:text-gray-400">${exam.work.title} — ${exam.work.author}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="${btnPrimary}" id="copyAll">${ic('copy', 'w-4 h-4')} <span id="copyLabel">Copier pour IA</span></button>
        <button class="${btnSecondary}" id="retryQuiz">${ic('rotate-ccw', 'w-4 h-4')} Recommencer</button>
        <button class="${btnGhost}" id="goHome">${ic('home', 'w-4 h-4')} Accueil</button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">
      <div class="lg:col-span-2 lg:sticky lg:top-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 max-h-[calc(100vh-120px)] overflow-y-auto custom-scroll">
        <div class="flex items-center gap-2 mb-1">
          ${ic('book-open', 'w-3.5 h-3.5 text-gray-400')}
          <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Texte</span>
        </div>
        <p class="font-serif italic text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">${exam.work.title} — ${exam.work.author} (${exam.work.year})</p>
        <div class="text-content font-serif text-sm leading-[1.75] text-gray-800 dark:text-gray-200">${exam.texte}</div>
        ${exam.footnotes ? `<div class="mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-800 text-xs text-gray-400 leading-relaxed">${exam.footnotes}</div>` : ''}
      </div>

      <div class="lg:col-span-3 space-y-4">
        <!-- Score -->
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 text-center">
          <div class="relative flex justify-center w-32 h-32 mx-auto mb-4">
            <svg class="w-32 h-32" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" class="stroke-gray-100 dark:stroke-gray-800" stroke-width="7"/>
              <circle cx="60" cy="60" r="54" fill="none" stroke="${ringColor}" stroke-width="7"
                stroke-dasharray="${C}" stroke-dashoffset="${offset}" stroke-linecap="round" transform="rotate(-90 60 60)" class="score-stroke"/>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-2xl font-bold tracking-tight" style="color:${ringColor}">${score}</span>
              <span class="text-xs text-gray-400">/ ${total} pts</span>
            </div>
          </div>
          ${inputPts > 0 ? `<p class="text-xs text-gray-400 mb-3">+ ${inputPts} pts de questions ouvertes — copie pour correction IA</p>` : ''}
          <div class="grid grid-cols-2 sm:grid-cols-${Object.keys(sections).length} gap-2 text-left">
            ${Object.entries(sections).map(([sec, d]) => {
              const m = sectionMeta[sec] || { label: sec, icon: 'help-circle' };
              return `<div class="p-2.5 rounded-lg border border-gray-100 dark:border-gray-800">
                <div class="flex items-center gap-1 mb-0.5">${ic(m.icon, 'w-3 h-3 text-gray-400')}<span class="text-[10px] text-gray-400">${m.label}</span></div>
                <div class="text-xs font-semibold">${Math.round(d.earned * 100) / 100} <span class="text-gray-400 font-normal">/ ${d.total}</span></div>
              </div>`;
            }).join('')}
          </div>
        </div>

        ${exam.questions.map((q, i) => renderCorrectionItem(q, i)).join('')}

        <!-- Copy CTA -->
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">${ic('sparkles', 'w-5 h-5 text-gray-400')}</div>
            <div class="flex-1">
              <p class="text-sm font-medium">Correction par IA</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Copie tes réponses et colle-les dans ChatGPT ou Claude ou Gemini pour une correction détaillée des questions ouvertes et de ta production écrite.</p>
            </div>
            <button class="${btnSecondary} flex-shrink-0" id="copyAll2">${ic('copy', 'w-4 h-4')} Copier</button>
          </div>
        </div>

        <div class="flex items-center justify-center gap-3 py-4">
          <button class="${btnSecondary}" id="retryQuiz2">${ic('rotate-ccw', 'w-4 h-4')} Recommencer</button>
          <button class="${btnGhost}" id="goHome2">${ic('home', 'w-4 h-4')} Accueil</button>
        </div>
      </div>
    </div>
  </div>`;

  // Copy handlers
  const doCopy = (labelEl) => {
    const text = generateCopyText();
    navigator.clipboard.writeText(text).then(() => {
      if (labelEl) { const prev = labelEl.textContent; labelEl.textContent = 'Copié !'; setTimeout(() => labelEl.textContent = prev, 2000); }
    });
  };
  $('#copyAll')?.addEventListener('click', () => doCopy($('#copyLabel')));
  $('#copyAll2')?.addEventListener('click', () => doCopy($('#copyAll2')));

  const retry = () => { delete state.answers[state.examId]; delete state.productions[state.examId]; saveState(); startQuiz(state.examId); };
  $('#retryQuiz')?.addEventListener('click', retry);
  $('#retryQuiz2')?.addEventListener('click', retry);
  $('#goHome')?.addEventListener('click', renderHome);
  $('#goHome2')?.addEventListener('click', renderHome);
  refreshIcons();
}

// ── Correction Item ───────────────────────────────
function renderCorrectionItem(q, idx) {
  const eid = state.examId, answer = (state.answers[eid] || {})[idx];
  const sec = sectionMeta[q.section] || { label: q.section, icon: 'help-circle' };
  const ptLabel = q.points === 1 ? '1 pt' : q.points + ' pts';

  let qScore = answer?.scored !== undefined ? answer.scored : null;
  let scoreColor = 'text-gray-400';
  if (qScore !== null) {
    if (qScore === q.points) scoreColor = 'text-green-600 dark:text-green-400';
    else if (qScore > 0) scoreColor = 'text-amber-600 dark:text-amber-400';
    else scoreColor = 'text-red-500 dark:text-red-400';
  }

  let body = '';
  switch (q.type) {
    case 'qcm': body = corQCM(q, answer); break;
    case 'vf': body = corVF(q, answer); break;
    case 'table': body = corTable(q, answer); break;
    case 'short': body = corShort(q, answer); break;
    case 'input': body = corInput(q, answer); break;
  }

  // For input type, show pts but no auto-score
  const scoreDisplay = q.type === 'input' ? ptLabel : (qScore !== null ? Math.round(qScore * 100) / 100 + '/' + q.points : ptLabel);
  const sColor = q.type === 'input' ? 'text-gray-400' : scoreColor;

  return `
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Q${idx + 1}</span>
          <span class="flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[10px] text-gray-500 dark:text-gray-400">${ic(sec.icon, 'w-3 h-3')} ${sec.label}</span>
          ${q.type === 'input' ? `<span class="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-[10px] text-amber-600 dark:text-amber-400 font-medium">Correction IA</span>` : ''}
        </div>
        <span class="text-xs font-semibold ${sColor}">${scoreDisplay}</span>
      </div>
      <p class="text-sm font-medium leading-relaxed mb-3">${q.text}</p>
      ${body}
    </div>`;
}

// ── Correction QCM ────────────────────────────────
function corQCM(q, answer) {
  let html = '<div class="space-y-1.5">';
  q.options.forEach((opt, i) => {
    const isCorrect = i === q.correctIndex;
    const isSelected = answer?.value === i;
    let cls, iconH;

    if (isCorrect) {
      cls = 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950';
      iconH = ic('check-circle', 'w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0');
    } else if (isSelected) {
      cls = 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950';
      iconH = ic('x-circle', 'w-4 h-4 text-red-500 dark:text-red-400 flex-shrink-0');
    } else {
      cls = 'border-gray-100 dark:border-gray-800 opacity-40';
      iconH = `<span class="w-4 h-4 flex-shrink-0"></span>`;
    }

    html += `<div class="flex items-center gap-3 px-3 py-2.5 rounded-lg border ${cls}">
      ${iconH}
      <span class="text-sm">${opt}</span>
      ${isSelected && !isCorrect ? '<span class="ml-auto text-[10px] text-red-400 font-medium">Votre choix</span>' : ''}
    </div>`;
  });
  html += '</div>';
  if (q.explanation) {
    html += `<div class="mt-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
      <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">${q.explanation}</p>
    </div>`;
  }
  return html;
}

// ── Correction VF ─────────────────────────────────
function corVF(q, answer) {
  let html = '<div class="space-y-2.5">';
  q.statements.forEach((stmt, i) => {
    const ans = answer?.value?.[i] || {};
    const userChoice = ans.choice;
    const isCorrect = userChoice === stmt.answer;
    const noAnswer = userChoice === undefined;

    html += `<div class="p-3 rounded-lg border border-gray-100 dark:border-gray-800">
      <p class="text-sm mb-2">${i + 1}. ${stmt.text}</p>
      <div class="flex items-center gap-3 text-xs">
        <span class="font-medium ${noAnswer ? 'text-gray-400' : isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}">
          ${noAnswer ? 'Non répondu' : `Vous : ${userChoice ? 'Vrai' : 'Faux'}`}
          ${!noAnswer ? (isCorrect ? ic('check', 'w-3 h-3 inline') : ic('x', 'w-3 h-3 inline')) : ''}
        </span>
        ${!isCorrect ? `<span class="text-gray-500">${ic('arrow-right', 'w-3 h-3 inline')} ${stmt.answer ? 'Vrai' : 'Faux'}</span>` : ''}
      </div>
      ${stmt.justification ? `<p class="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">${stmt.justification}</p>` : ''}
    </div>`;
  });
  html += '</div>';
  return html;
}

// ── Correction Table ──────────────────────────────
function corTable(q, answer) {
  let html = '<div class="space-y-2">';
  q.fields.forEach((f, i) => {
    const val = answer?.value?.[i] || '';
    const ok = val && checkShort(val, f.answer, []);
    const noAnswer = !val;

    html += `<div class="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
      <span class="text-xs font-medium text-gray-400 uppercase tracking-wider min-w-[100px]">${f.label}</span>
      <div class="flex-1">
        ${noAnswer
          ? `<span class="text-xs text-gray-400 italic">Non répondu</span>`
          : `<span class="text-sm ${ok ? 'text-green-700 dark:text-green-400' : 'text-red-500 dark:text-red-400'}">${val} ${ok ? ic('check', 'w-3 h-3 inline') : ic('x', 'w-3 h-3 inline')}</span>`}
        ${!ok ? `<span class="text-xs text-gray-500 ml-2">${ic('arrow-right', 'w-3 h-3 inline')} ${f.answer}</span>` : ''}
      </div>
    </div>`;
  });
  html += '</div>';
  return html;
}

// ── Correction Short ──────────────────────────────
function corShort(q, answer) {
  const val = answer?.value || '';
  const ok = val && answer?.scored > 0;
  const noAnswer = !val;

  let html = `<div class="p-3 rounded-lg border ${noAnswer ? 'border-gray-100 dark:border-gray-800' : ok ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950' : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950'}">`;
  if (noAnswer) {
    html += `<p class="text-xs text-gray-400 italic">Non répondu</p>`;
  } else {
    html += `<p class="text-sm ${ok ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
      ${ok ? ic('check-circle', 'w-4 h-4 inline') : ic('x-circle', 'w-4 h-4 inline')} ${val}
    </p>`;
  }
  html += `</div>
    <div class="mt-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
      <p class="text-xs font-medium text-gray-500 mb-1">Réponse attendue :</p>
      <p class="text-sm text-gray-700 dark:text-gray-300">${q.answer}</p>
      ${q.explanation ? `<p class="text-xs text-gray-500 mt-2 leading-relaxed">${q.explanation}</p>` : ''}
    </div>`;
  return html;
}

// ── Correction Input ──────────────────────────────
function corInput(q, answer) {
  const val = answer?.value || '';
  const noAnswer = !val;

  let html = '';
  if (noAnswer) {
    html += `<div class="p-3 rounded-lg border border-gray-100 dark:border-gray-800"><p class="text-xs text-gray-400 italic">Non répondu</p></div>`;
  } else {
    html += `<div class="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
      <p class="text-xs font-medium text-gray-500 mb-1">Votre réponse :</p>
      <p class="text-sm text-gray-700 dark:text-gray-300 italic">${val}</p>
    </div>`;
  }

  html += `<div class="mt-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800">
    <div class="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1.5">${ic('lightbulb', 'w-3.5 h-3.5')} Réponse modèle</div>
    <p class="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">${q.sampleAnswer}</p>
  </div>`;

  return html;
}

// ═══════════════════════════════════════════════════
//  COPY TEXT FOR AI CORRECTION
// ═══════════════════════════════════════════════════
function generateCopyText() {
  const exam = getExam(state.examId);
  const answers = state.answers[state.examId] || {};
  const prod = state.productions[state.examId] || '';

  let t = '';
  t += `EXAMEN REGIONAL DE FRANCAIS — ${exam.year} — ${exam.region}\n`;
  t += `Oeuvre : ${exam.work.title} — ${exam.work.author} (${exam.work.year})\n`;
  t += `Genre : ${exam.work.genre}\n\n`;

  t += `=== TEXTE ===\n${exam.texte}\n`;
  if (exam.footnotes) t += `\n[Notes] ${exam.footnotes}\n`;
  t += `\n=== MES REPONSES ===\n\n`;

  exam.questions.forEach((q, i) => {
    const sec = sectionMeta[q.section]?.label || q.section;
    t += `Q${i + 1} (${sec} — ${q.points}pt${q.points > 1 ? 's' : ''}) : ${q.text}\n`;

    const a = answers[i];
    switch (q.type) {
      case 'qcm':
        q.options.forEach((opt, j) => t += `  ${j === a?.value ? '>>>' : '   '} ${opt}\n`);
        break;
      case 'vf':
        q.statements.forEach((stmt, j) => {
          const choice = a?.value?.[j]?.choice;
          t += `  ${j + 1}. "${stmt.text}" -> ${choice === undefined ? '(non repondu)' : choice ? 'Vrai' : 'Faux'}\n`;
          if (a?.value?.[j]?.justif) t += `     Justification : ${a.value[j].justif}\n`;
        });
        break;
      case 'table':
        q.fields.forEach((f, j) => {
          t += `  ${f.label} : ${a?.value?.[j] || '(non repondu)'}\n`;
        });
        break;
      case 'short':
        t += `  -> ${a?.value || '(non repondu)'}\n`;
        break;
      case 'input':
        t += `  -> ${a?.value || '(non repondu)'}\n`;
        break;
    }
    t += '\n';
  });

  t += `=== PRODUCTION ECRITE (${exam.production.points} pts) ===\n`;
  t += `Sujet : ${exam.production.sujet}\n\n`;
  t += `Ma reponse :\n${prod || '(non redige)'}\n\n`;
  t += `Criteres : ${exam.production.criteres.join(' ; ')}\n\n`;

  t += `=== CONSIGNE ===\n`;
  t += `Corrige toutes mes reponses une par une. Pour chaque question :\n`;
  t += `- Dis si ma reponse est correcte, partiellement correcte, ou fausse\n`;
  t += `- Donne la reponse correcte avec explication\n`;
  t += `- Note chaque question sur le bareme indique\n`;
  t += `Pour la production ecrite, evalue selon les criteres donnes et donne une note detaillee.\n`;
  t += `Donne-moi un score total final sur 20.\n`;

  return t;
}

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
function init() {
  loadState();
  initTheme();
  $('#themeToggle').addEventListener('click', toggleTheme);
  $('#brandLink').addEventListener('click', e => { e.preventDefault(); renderHome(); });
  renderHome();
  refreshIcons();
}

init();
