export function generateCopyText(exam, answers, production, subj) {
  const ui = subj.ui;
  const lines = [];

  lines.push(`=== ${ui.examLabel} ===`);
  if (exam.year) lines.push(`${subj.lang === 'ar' ? 'السنة' : 'Année'} : ${exam.year}`);
  if (exam.region) lines.push(`${subj.lang === 'ar' ? 'الجهة' : 'Région'} : ${exam.region}`);
  if (exam.work) {
    lines.push(`${subj.lang === 'ar' ? 'المؤلَّف' : 'Œuvre'} : ${exam.work.title}`);
    lines.push(`${subj.lang === 'ar' ? 'الكاتب' : 'Auteur'} : ${exam.work.author}`);
    lines.push(`${subj.lang === 'ar' ? 'النوع' : 'Genre'} : ${exam.work.genre}`);
  }
  if (exam.topic) {
    if (exam.topic.geography) lines.push(`${subj.lang === 'ar' ? 'الجغرافيا' : 'Géographie'} : ${exam.topic.geography}`);
    if (exam.topic.history) lines.push(`${subj.lang === 'ar' ? 'التاريخ' : 'Histoire'} : ${exam.topic.history}`);
  }
  lines.push('');

  if (exam.texte) {
    lines.push(`--- ${ui.textLabel} ---`);
    lines.push(exam.texte);
    lines.push('');
  }

  let currentSection = null;
  exam.questions.forEach((q, i) => {
    if (q.section && q.section !== currentSection) {
      currentSection = q.section;
      const meta = subj.sections[currentSection];
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
            const display = choice === true ? ui.trueLabel : choice === false ? ui.falseLabel : `(${ui.notAnsweredLabel})`;
            lines.push(`  - "${st.text}" → ${display}`);
          });
        }
        break;
      }
      case 'table': {
        if (q.fields) {
          q.fields.forEach((f, j) => {
            const val = answer?.value?.[j] || `(${ui.notAnsweredLabel})`;
            lines.push(`  - ${f.label} : ${val}`);
          });
        }
        break;
      }
      case 'short': {
        const val = answer?.value || `(${ui.notAnsweredLabel})`;
        lines.push(`  ${ui.yourAnswerLabel} ${val}`);
        break;
      }
      case 'input': {
        const val = answer?.value || `(${ui.notAnsweredLabel})`;
        lines.push(`  ${ui.yourAnswerLabel} ${val}`);
        break;
      }
    }
  });

  if (exam.production) {
    lines.push(`\n\n=== ${ui.productionLabel.toUpperCase()} ===`);
    lines.push(exam.production.sujet);
    lines.push('');
    lines.push(production || `(${ui.notAnsweredLabel})`);
  }

  lines.push('\n\n=== INSTRUCTION ===');
  lines.push(ui.aiInstruction);

  return lines.join('\n');
}
