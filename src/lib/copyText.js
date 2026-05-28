import { sectionMeta } from './constants';

export function generateCopyText(exam, answers, production) {
  const lines = [];

  // --- Header ---
  lines.push('=== EXAMEN RÉGIONAL ===');
  if (exam.year) lines.push(`Année : ${exam.year}`);
  if (exam.region) lines.push(`Région : ${exam.region}`);
  if (exam.work) {
    lines.push(`Œuvre : ${exam.work.title}`);
    lines.push(`Auteur : ${exam.work.author}`);
    lines.push(`Genre : ${exam.work.genre}`);
  }
  lines.push('');

  // --- Texte de support ---
  if (exam.texte) {
    lines.push('--- TEXTE ---');
    lines.push(exam.texte);
    lines.push('');
  }

  // --- Questions grouped by section ---
  let currentSection = null;

  exam.questions.forEach((q, i) => {
    // Section header
    if (q.section && q.section !== currentSection) {
      currentSection = q.section;
      const meta = sectionMeta[currentSection];
      const label = meta ? meta.label : currentSection;
      lines.push(`\n=== ${label.toUpperCase()} ===`);
    }

    const answer = answers?.[i];
    const pts = q.points ? ` (${q.points} pt${q.points > 1 ? 's' : ''})` : '';
    lines.push(`\nQ${i + 1}${pts} : ${q.text}`);

    switch (q.type) {
      case 'qcm': {
        if (q.options) {
          q.options.forEach((opt, j) => {
            const marker = answer?.value === j ? '>>>' : '   ';
            lines.push(`  ${marker} ${String.fromCharCode(65 + j)}) ${opt}`);
          });
        }
        break;
      }

      case 'vf': {
        if (q.statements) {
          q.statements.forEach((st, j) => {
            const choice = answer?.value?.[j]?.choice;
            const display = choice === true ? 'Vrai' : choice === false ? 'Faux' : '(non répondu)';
            lines.push(`  - "${st.text}" → ${display}`);
          });
        }
        break;
      }

      case 'table': {
        if (q.fields) {
          q.fields.forEach((f, j) => {
            const val = answer?.value?.[j] || '(vide)';
            lines.push(`  - ${f.label} : ${val}`);
          });
        }
        break;
      }

      case 'short': {
        const val = answer?.value || '(non répondu)';
        lines.push(`  Réponse : ${val}`);
        break;
      }

      case 'input': {
        const val = answer?.value || '(non répondu)';
        lines.push(`  Réponse : ${val}`);
        break;
      }
    }
  });

  // --- Production écrite ---
  if (exam.production) {
    lines.push('\n\n=== PRODUCTION ÉCRITE ===');
    lines.push(`Sujet : ${exam.production.sujet}`);
    lines.push('');
    lines.push(production || '(non répondu)');
  }

  // --- Instruction pour l'IA ---
  lines.push('\n\n=== INSTRUCTION ===');
  lines.push(
    'Corrige toutes les réponses ci-dessus. Pour chaque question, indique si la réponse est correcte ou incorrecte, donne la bonne réponse le cas échéant, et attribue une note. À la fin, donne une note globale sur 20.'
  );

  return lines.join('\n');
}
