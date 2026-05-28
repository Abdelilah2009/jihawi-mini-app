// ═══════════════════════════════════════════════════
//  JIHAWI QUIZ — Data for 7 Regional French Exams
// ═══════════════════════════════════════════════════

export const EXAMS = [

// ──────────────────────────────────────────────────
// 1) 2021 — Région de l'Oriental — Session Normale
// ──────────────────────────────────────────────────
{
  id: "oriental-2021",
  year: 2021,
  region: "L'Oriental",
  session: "Normale",
  work: { title: "La Boîte à merveilles", author: "Ahmed Sefrioui", genre: "Roman autobiographique", year: 1954 },
  texte: `Mon père demanda d'une voix placide :
— Avec qui t'es-tu encore disputée ?
Ma mère se moucha bruyamment et commença :
— Je me disputerai tant que Dieu me prêtera vie avec cette Rahma, fille de je ne sais qui. C'est une souillonne. Elle ne se lave jamais. Elle porte des haillons et ses enfants sont plus sales que les mendiants. Cette pouilleuse ose élever la voix en ma présence. Je suis Lalla Zoubida, fille de sidi El Arafi...
La voix de Rahma troua la nuit :
— Et toi, tu te crois au-dessus des autres ? Tu n'es qu'une fille de la campagne.
La querelle reprit de plus belle. Je ne comprenais pas grand-chose à cette dispute. Les voix montaient, les gestes devenaient menaçants, les insultes fusaient de part et d'autre. Les deux femmes se jetèrent des regards pleins de haine. Le bruit devint intolérable, une tempête, un tremblement de terre. Je m'effondrai aux pieds de ma mère et perdis connaissance.`,
  footnotes: "souillonne : femme très sale · haillons : vieux vêtements usés · pouilleuse : personne très sale",
  questions: [
    {
      type: "table",
      text: "Complétez le tableau suivant :",
      points: 1,
      section: "contextualisation",
      fields: [
        { label: "Titre de l'œuvre", answer: "La Boîte à merveilles" },
        { label: "Auteur", answer: "Ahmed Sefrioui" },
        { label: "Genre littéraire", answer: "Roman autobiographique" },
        { label: "Personnage principal", answer: "Sidi Mohammed" }
      ]
    },
    {
      type: "vf",
      text: "Dites si les affirmations suivantes sont vraies ou fausses :",
      points: 1,
      section: "contextualisation",
      statements: [
        { text: "Lalla Aïcha est la mère du narrateur.", answer: false, justification: "La mère du narrateur est Lalla Zoubida. Lalla Aïcha est une amie de la famille." },
        { text: "La famille du narrateur habite à Rabat.", answer: false, justification: "La famille habite à Fès, dans la médina (Dar Chouafa)." },
        { text: "Rahma est la voisine du narrateur.", answer: true, justification: "Rahma, la femme du fabricant de charrues, est la voisine du narrateur dans la maison de Dar Chouafa." },
        { text: "Maâlem Abdeslam est le père du narrateur.", answer: true, justification: "Maâlem Abdeslam est le père du narrateur (Sidi Mohammed). Il est tisserand de profession." }
      ]
    },
    {
      type: "short",
      text: "Relevez une phrase montrant que la mère avait l'habitude de se quereller avec les voisins.",
      points: 1,
      section: "comprehension",
      answer: "Avec qui t'es-tu encore disputée ?",
      alternatives: ["Avec qui t'es-tu encore disputée", "t'es-tu encore disputée"],
      explanation: "Le mot « encore » dans la question du père montre que la dispute n'est pas un événement isolé mais une habitude."
    },
    {
      type: "qcm",
      text: "Avec qui la mère du narrateur s'est-elle disputée ?",
      points: 0.5,
      section: "comprehension",
      options: ["Lalla Aïcha", "Rahma", "Fatma Bziouya", "La fille du fqih"],
      correctIndex: 1,
      explanation: "La mère (Lalla Zoubida) s'est disputée avec Rahma, la femme du fabricant de charrues et voisine dans Dar Chouafa."
    },
    {
      type: "input",
      text: "Pourquoi la mère s'est-elle disputée avec sa voisine ? Justifiez à partir du texte.",
      points: 0.5,
      section: "comprehension",
      sampleAnswer: "La mère méprise Rahma qu'elle considère comme une femme sale, mal habillée et de condition inférieure. Elle supporte mal que Rahma ose élever la voix en sa présence car elle se considère supérieure."
    },
    {
      type: "short",
      text: "Relevez deux indices montrant que la mère décrit sa voisine de manière dévalorisante.",
      points: 1,
      section: "comprehension",
      answer: "souillonne / pouilleuse",
      alternatives: ["souillonne", "pouilleuse", "elle ne se lave jamais", "elle porte des haillons", "ses enfants sont plus sales que les mendiants"],
      explanation: "La mère utilise des termes péjoratifs comme « souillonne », « pouilleuse », « haillons » et compare les enfants de Rahma aux mendiants."
    },
    {
      type: "qcm",
      text: "Quel est l'effet de la dispute sur le narrateur ?",
      points: 1,
      section: "comprehension",
      options: [
        "Il s'enfuit de la maison",
        "Il s'effondre et perd connaissance",
        "Il pleure et crie",
        "Il prend le parti de sa mère"
      ],
      correctIndex: 1,
      explanation: "Le bruit devient intolérable et le narrateur s'effondre aux pieds de sa mère et perd connaissance, ce qui montre sa sensibilité et sa fragilité face à la violence."
    },
    {
      type: "input",
      text: "Transformez au discours indirect : Ma mère dit : « Tu connais ma patience. »",
      points: 1,
      section: "langue",
      sampleAnswer: "Ma mère dit qu'il connaissait sa patience. / Ma mère a dit qu'il connaissait sa patience."
    },
    {
      type: "qcm",
      text: "Identifiez la figure de style dans : « La voix de Rahma troua la nuit ».",
      points: 0.5,
      section: "langue",
      options: ["Comparaison", "Hyperbole", "Personnification", "Métaphore"],
      correctIndex: 3,
      explanation: "C'est une métaphore : la voix est comparée implicitement à un objet qui perce/troue, sans outil de comparaison. Elle montre la puissance et l'agressivité de la voix de Rahma."
    },
    {
      type: "input",
      text: "Quel est l'effet recherché par cette figure de style (« La voix de Rahma troua la nuit ») ?",
      points: 0.5,
      section: "langue",
      sampleAnswer: "Cette métaphore met en valeur la puissance et la violence de la voix de Rahma qui déchire le silence de la nuit. Elle rend la scène plus dramatique et souligne l'intensité de la querelle."
    },
    {
      type: "input",
      text: "Que pensez-vous des voisins qui se disputent et qui crient ? Justifiez votre point de vue avec un argument.",
      points: 1,
      section: "reaction",
      sampleAnswer: "Je pense que se disputer et crier avec ses voisins est un comportement négatif car cela crée une atmosphère de tension et d'hostilité. Les voisins devraient résoudre leurs conflits par le dialogue et le respect mutuel, car la cohabitation exige la tolérance."
    },
    {
      type: "input",
      text: "Que pensez-vous de l'attitude de la mère qui se croit supérieure à sa voisine ? Justifiez.",
      points: 1,
      section: "reaction",
      sampleAnswer: "L'attitude de la mère qui se croit supérieure est condamnable car tous les êtres humains sont égaux en dignité. Se considérer au-dessus des autres à cause de son origine familiale est une forme d'orgueil injustifié. Le respect mutuel est la base de toute cohabitation."
    }
  ],
  production: {
    sujet: "« Dans nos quartiers, certains voisins recourent parfois à la violence pour régler leurs problèmes. »\n\nComment jugez-vous ce comportement ? Rédigez un texte argumentatif dans lequel vous présentez votre point de vue appuyé d'arguments et d'exemples.",
    points: 10,
    criteres: [
      "Respect de la consigne (sujet argumentatif) — 2 pts",
      "Cohérence et structure du texte (intro, développement, conclusion) — 3 pts",
      "Qualité de la langue (vocabulaire, syntaxe, orthographe, conjugaison, ponctuation) — 5 pts"
    ]
  }
},

// ──────────────────────────────────────────────────
// 2) 2018 — Marrakech-Safi — Session Normale
// ──────────────────────────────────────────────────
{
  id: "marrakech-2018",
  year: 2018,
  region: "Marrakech-Safi",
  session: "Normale",
  work: { title: "La Boîte à merveilles", author: "Ahmed Sefrioui", genre: "Roman autobiographique", year: 1954 },
  texte: `Rahma, femme du fabricant de charrues, rentra chez elle en criant. Sa fille Zineb avait disparu dans la foule. Les lamentations de Rahma, ses cris et les coups qu'elle se donnait sur les joues alertèrent toute la maison. Ma mère, oubliant tout dédain pour sa voisine, se précipita pour la consoler.
Toutes les femmes de la maison accoururent. Le drame fut bientôt connu de tout le quartier. Des femmes inconnues traversèrent les terrasses pour compatir au chagrin de Rahma. Chacune se croyait obligée d'émettre une idée sur la disparition de Zineb. Certaines assuraient qu'elle avait été enlevée par des mendiants, d'autres qu'on la retrouverait morte.
Les pleurs redoublèrent. Je me joignis au concert. Je pleurais, je pleurais parce que ma mère pleurait, je pleurais parce que j'avais envie de pleurer, et finalement je pleurais parce que j'avais faim.
Je n'aimais pas Zineb. Il m'arrivait même de souhaiter sa disparition. J'étais, en vérité, très content qu'elle eût disparu.`,
  footnotes: "dédain : mépris · compatir : partager la souffrance · concert : ici, ensemble de voix",
  questions: [
    {
      type: "table",
      text: "Complétez le tableau suivant :",
      points: 1,
      section: "contextualisation",
      fields: [
        { label: "Titre de l'œuvre", answer: "La Boîte à merveilles" },
        { label: "Nom complet de l'auteur", answer: "Ahmed Sefrioui" },
        { label: "Genre littéraire", answer: "Roman autobiographique" },
        { label: "Siècle de publication", answer: "XXe siècle" }
      ]
    },
    {
      type: "qcm",
      text: "Laquelle de ces œuvres n'est PAS d'Ahmed Sefrioui ?",
      points: 1,
      section: "contextualisation",
      options: ["Le Chapelet d'ambre", "Les Misérables", "La Maison de servitude"],
      correctIndex: 1,
      explanation: "Les Misérables est un roman de Victor Hugo. Le Chapelet d'ambre et La Maison de servitude sont des œuvres d'Ahmed Sefrioui."
    },
    {
      type: "qcm",
      text: "Quel événement se produit AVANT l'extrait étudié ?",
      points: 1,
      section: "contextualisation",
      options: [
        "Le père perd son emploi et part à la campagne",
        "La famille se rend au souk pour les préparatifs de l'Achoura",
        "Le narrateur tombe malade et reste alité pendant des jours"
      ],
      correctIndex: 1,
      explanation: "Avant la disparition de Zineb, la famille se rendait au souk pour les préparatifs de l'Achoura (la fête)."
    },
    {
      type: "vf",
      text: "Dites si les affirmations sont vraies ou fausses. Justifiez chaque réponse.",
      points: 1,
      section: "comprehension",
      statements: [
        { text: "Les femmes du quartier viennent aider Rahma.", answer: true, justification: "Le texte dit : « Des femmes inconnues traversèrent les terrasses pour compatir au chagrin de Rahma. »" },
        { text: "Tout le monde s'occupe de Sidi Mohammed pendant le drame.", answer: false, justification: "Personne ne s'occupe de lui. Il pleure seul et avoue qu'il pleure surtout parce qu'il a faim." }
      ]
    },
    {
      type: "short",
      text: "Dans « tu nous déchires le cœur », à qui renvoient « tu » et « nous » ?",
      points: 1,
      section: "comprehension",
      answer: "« tu » renvoie à Rahma / « nous » renvoie aux femmes présentes",
      alternatives: ["tu = Rahma", "nous = les femmes", "tu désigne Rahma", "nous désigne les femmes"],
      explanation: "« Tu » désigne Rahma qui pleure et se lamente, et « nous » désigne les femmes venues la consoler, touchées par sa douleur."
    },
    {
      type: "short",
      text: "Relevez une phrase montrant le changement d'attitude de la mère envers Rahma.",
      points: 1,
      section: "comprehension",
      answer: "Ma mère, oubliant tout dédain pour sa voisine, se précipita pour la consoler.",
      alternatives: ["oubliant tout dédain pour sa voisine", "se précipita pour la consoler", "oubliant tout dédain"],
      explanation: "Alors que la mère méprisait habituellement Rahma, la disparition de Zineb provoque un élan de solidarité qui efface le dédain."
    },
    {
      type: "qcm",
      text: "Quelle figure de style est utilisée dans : « je pleurais... je pleurais... je pleurais » ?",
      points: 1,
      section: "langue",
      options: ["Comparaison", "Répétition (anaphore)", "Métaphore", "Antithèse"],
      correctIndex: 1,
      explanation: "La répétition (anaphore) de « je pleurais » insiste sur la durée et l'intensité des pleurs du narrateur, tout en créant un effet de rythme et de comique."
    },
    {
      type: "short",
      text: "Relevez quatre mots ou expressions appartenant au champ lexical des sentiments.",
      points: 1,
      section: "langue",
      answer: "pleurs / chagrin / cris / lamentations",
      alternatives: ["pleurs", "chagrin", "cris", "lamentations", "pleurais", "dédain", "content", "envie", "drame"],
      explanation: "Le champ lexical des sentiments est très riche dans ce passage : pleurs, chagrin, cris, lamentations, dédain, content..."
    },
    {
      type: "qcm",
      text: "Quel est le registre littéraire dominant dans ce texte ?",
      points: 1,
      section: "langue",
      options: ["Réaliste et tragique", "Pathétique et comique", "Tragique et fantastique"],
      correctIndex: 1,
      explanation: "Le passage mêle le registre pathétique (les pleurs, le drame de la disparition) et le registre comique (le narrateur pleure parce qu'il a faim et est content de la disparition de Zineb)."
    },
    {
      type: "input",
      text: "Trouvez-vous le comportement de Rahma (se frapper les joues, crier) normal dans cette situation ? Justifiez.",
      points: 1,
      section: "reaction",
      sampleAnswer: "Le comportement de Rahma est compréhensible car elle vient de perdre sa fille et la peur et le désespoir peuvent provoquer des réactions excessives. Cependant, se frapper les joues est un geste extrême qui montre l'intensité de sa détresse mais qui ne l'aide pas à retrouver Zineb."
    },
    {
      type: "input",
      text: "Le narrateur dit qu'il était content de la disparition de Zineb. Que pensez-vous de sa réaction ? Justifiez.",
      points: 1,
      section: "reaction",
      sampleAnswer: "La réaction du narrateur est celle d'un enfant égoïste qui ne mesure pas la gravité de la situation. Cependant, on peut comprendre que c'est une réaction enfantine innocente : il n'aimait pas Zineb et ne comprenait pas la gravité d'une disparition. C'est un regard naïf et sincère typique du regard enfantin dans le roman."
    }
  ],
  production: {
    sujet: "« De plus en plus de parents viennent attendre leurs enfants devant les écoles de peur qu'il leur arrive un malheur (enlèvement, agression, vol...). »\n\nPensez-vous que ces parents aient raison de s'inquiéter ainsi ? Rédigez un texte argumentatif d'environ 15 lignes dans lequel vous présentez votre point de vue.",
    points: 10,
    criteres: [
      "Respect de la consigne (texte argumentatif, ~15 lignes) — 2 pts",
      "Cohérence de l'argumentation et liens logiques — 3 pts",
      "Correction de la langue (syntaxe, vocabulaire, orthographe, conjugaison, ponctuation) — 5 pts"
    ]
  }
},

// ──────────────────────────────────────────────────
// 3) 2023 — Casablanca-Settat
// ──────────────────────────────────────────────────
{
  id: "casablanca-2023",
  year: 2023,
  region: "Casablanca-Settat",
  session: "Normale",
  work: { title: "Le Dernier Jour d'un Condamné", author: "Victor Hugo", genre: "Roman à thèse", year: 1829 },
  texte: `J'ai pris le parti d'écrire, heure par heure, minute par minute, supplice par supplice, le journal de mes souffrances. Si j'ai le courage de le mener jusqu'au moment où il me sera physiquement impossible de continuer, ces notes pourront peut-être un jour servir à quelque chose.
Peut-être ce journal, publié un jour, arrêtera-t-il un moment l'attention de ceux qui disent : « Les condamnés à mort, mais c'est de la vermine ; on n'a pas besoin de les écouter. » Peut-être cette lecture les rendra-t-elle moins légers la prochaine fois qu'il s'agira de jeter une tête qui pense, une tête qui sent, une tête qui souffre, dans ce qu'ils appellent la balance de la justice.
Ces feuilles les détromperont. Publiées peut-être un jour, elles fixeront leur esprit sur les souffrances de l'esprit ; car ce sont celles-là qu'ils ne soupçonnent pas. Ils sont triomphants de pouvoir tuer sans presque faire souffrir le corps. Hé ! c'est bien de cela qu'il s'agit ! Qu'est-ce que la douleur physique près de la douleur morale !`,
  footnotes: "supplice : grande souffrance · la balance de la justice : image symbolisant la justice · détromper : corriger une erreur de jugement",
  questions: [
    {
      type: "table",
      text: "Complétez le tableau suivant :",
      points: 1,
      section: "contextualisation",
      fields: [
        { label: "Auteur", answer: "Victor Hugo" },
        { label: "Titre de l'œuvre", answer: "Le Dernier Jour d'un Condamné" },
        { label: "Genre littéraire", answer: "Roman à thèse" },
        { label: "Siècle", answer: "XIXe siècle" }
      ]
    },
    {
      type: "qcm",
      text: "Où se trouvait le condamné juste avant d'être à Bicêtre ?",
      points: 1,
      section: "contextualisation",
      options: ["Au tribunal", "À l'hôtel de ville", "À la place de Grève", "Chez lui"],
      correctIndex: 0,
      explanation: "Le condamné se trouvait au tribunal (au Palais de Justice) où il a été jugé et condamné à mort, avant d'être transféré à la prison de Bicêtre."
    },
    {
      type: "qcm",
      text: "Le narrateur croit-il en l'utilité de son écriture ?",
      points: 1,
      section: "comprehension",
      options: [
        "Oui, il est convaincu que son journal changera les mentalités",
        "Oui, mais avec une certaine incertitude (il emploie « peut-être »)",
        "Non, il écrit uniquement pour passer le temps",
        "Non, il pense que personne ne le lira"
      ],
      correctIndex: 1,
      explanation: "Le narrateur espère que son journal sera utile, mais il répète le mot « peut-être » cinq fois, ce qui montre son incertitude et son espoir fragile."
    },
    {
      type: "vf",
      text: "Dites si les affirmations suivantes sont vraies ou fausses :",
      points: 1,
      section: "comprehension",
      statements: [
        { text: "Le narrateur parle de la souffrance morale.", answer: true, justification: "Il dit : « Qu'est-ce que la douleur physique près de la douleur morale ! » — la souffrance morale est son sujet central." },
        { text: "Le narrateur veut que son journal serve à une autopsie médicale.", answer: false, justification: "Le journal vise à changer les mentalités sur la peine de mort, pas à servir la médecine." },
        { text: "Le narrateur espère que ses écrits influenceront les juges.", answer: true, justification: "Il espère que la lecture « les rendra moins légers la prochaine fois qu'il s'agira de jeter une tête. »" },
        { text: "Le narrateur montre la force de l'écriture comme arme contre l'injustice.", answer: true, justification: "Il dit : « Ces feuilles les détromperont » — l'écriture devient un moyen de révéler la vérité et de combattre l'injustice." }
      ]
    },
    {
      type: "input",
      text: "Qu'exprime le narrateur en répétant « peut-être » cinq fois dans le texte ?",
      points: 1,
      section: "comprehension",
      sampleAnswer: "La répétition de « peut-être » exprime le doute et l'incertitude du narrateur quant à l'impact réel de son journal. Elle traduit aussi un espoir fragile : il ne sait pas si son écriture aura un effet, mais il s'accroche à cette possibilité comme dernière action utile."
    },
    {
      type: "input",
      text: "Quel est l'impact attendu du « journal des souffrances » sur les lecteurs ?",
      points: 1,
      section: "comprehension",
      sampleAnswer: "Le narrateur espère que son journal fera prendre conscience aux lecteurs (et aux juges) de la souffrance morale que subit un condamné à mort. Il souhaite que cela les pousse à reconsidérer la peine de mort et à être moins « légers » dans leurs jugements."
    },
    {
      type: "short",
      text: "Relevez quatre mots appartenant au champ lexical de l'écriture.",
      points: 1,
      section: "langue",
      answer: "écrire / journal / notes / publié",
      alternatives: ["écrire", "journal", "notes", "publié", "lecture", "feuilles", "pages", "mener"],
      explanation: "Le champ lexical de l'écriture est omniprésent : écrire, journal, notes, publié, lecture, feuilles."
    },
    {
      type: "qcm",
      text: "Identifiez la figure de style dans : « Ces feuilles les détromperont ».",
      points: 0.5,
      section: "langue",
      options: ["Comparaison", "Métonymie", "Personnification", "Hyperbole"],
      correctIndex: 2,
      explanation: "C'est une personnification : les feuilles (objet inanimé) sont dotées de la capacité humaine de « détromper » (corriger les erreurs de jugement)."
    },
    {
      type: "input",
      text: "Quel est l'effet recherché par cette figure de style ?",
      points: 0.5,
      section: "langue",
      sampleAnswer: "La personnification donne un pouvoir aux feuilles écrites, comme si l'écriture était vivante et capable d'agir sur les esprits. Cela renforce l'idée que l'écriture est une arme puissante contre l'injustice."
    },
    {
      type: "input",
      text: "Ce passage vous fait-il ressentir de la sympathie pour le condamné ? Justifiez votre réponse.",
      points: 1,
      section: "reaction",
      sampleAnswer: "Oui, ce passage suscite de la sympathie car le narrateur apparaît comme un être humain qui pense, qui sent et qui souffre. Son désespoir face à la mort et son espoir fragile que ses mots puissent servir à quelque chose nous touchent. Hugo réussit à humaniser le condamné pour mieux dénoncer la peine de mort."
    },
    {
      type: "input",
      text: "Partagez-vous la conviction du narrateur selon laquelle la douleur physique n'est rien à côté de la douleur morale ? Justifiez.",
      points: 1,
      section: "reaction",
      sampleAnswer: "Je partage cette conviction car la souffrance morale (l'angoisse, la peur, le regret, l'attente de la mort) est une torture permanente et invisible qui accompagne le condamné chaque seconde. La douleur physique est temporaire, mais la douleur morale ronge l'esprit sans répit."
    }
  ],
  production: {
    sujet: "« Victor Hugo met en valeur l'écriture comme un moyen pour changer les mentalités sur la question de la peine de mort. »\n\nCroyez-vous vraiment que l'écriture comme moyen d'expression (romans, journaux, réseaux sociaux...) est capable de changer les personnes et les sociétés ? Rédigez un texte argumentatif d'environ 15 lignes.",
    points: 10,
    criteres: [
      "Respect de la consigne (texte argumentatif) — 1 pt",
      "Texte argumentatif cohérent et bien structuré — 4 pts",
      "Correction de la langue (syntaxe, vocabulaire, orthographe, conjugaison, ponctuation) — 5 pts"
    ]
  }
},

// ──────────────────────────────────────────────────
// 4) 2023 — Fès-Meknès — Antigone
// ──────────────────────────────────────────────────
{
  id: "fes-2023",
  year: 2023,
  region: "Fès-Meknès",
  session: "Normale",
  work: { title: "Antigone", author: "Jean Anouilh", genre: "Tragédie moderne", year: 1944 },
  texte: `CRÉON (la regarde et murmure, fatigué) :
— Tu ne sais pas ce que c'est que de gouverner. Moi non plus d'ailleurs, je ne le savais pas. C'est comme quand on prend la barre d'un bateau en pleine tempête. Tout craque autour de toi, le vent déchire les voiles, l'eau monte de partout. L'équipage ne pense qu'à piller la cale. Les officiers construisent déjà un radeau confortable, rien que pour eux. Le mât craque et le vent siffle. Crois-tu qu'on a le temps de faire le raffiné, de savoir s'il faut dire « oui » ou « non » ?
Crois-tu qu'on peut encore les appeler par leur nom ? On prend le bout de bois, on redresse devant la montagne d'eau, on gueule un ordre et on tire dans le tas, sur le premier qui s'avance. Dans le tas ! Cela n'a pas de nom. C'est comme la vague qui vient de s'abattre sur le pont devant vous ; le vent qui vous gifle : est-ce que cela a un nom ? Il n'y a plus de noms, ma petite.
Il n'y a plus que le bateau, la tempête et la mer. Tu comprends cela ?`,
  footnotes: "la barre : gouvernail du bateau · la cale : partie inférieure du bateau où sont stockées les marchandises · raffiné : ici, réfléchi et délicat · gueule : crie très fort",
  questions: [
    {
      type: "table",
      text: "Complétez le tableau suivant :",
      points: 1,
      section: "contextualisation",
      fields: [
        { label: "Nom de l'auteur", answer: "Jean Anouilh" },
        { label: "Titre de la pièce", answer: "Antigone" },
        { label: "Genre théâtral", answer: "Tragédie moderne" },
        { label: "Siècle de parution", answer: "XXe siècle" }
      ]
    },
    {
      type: "qcm",
      text: "Quelle obligation Antigone veut-elle accomplir ?",
      points: 0.5,
      section: "contextualisation",
      options: [
        "Prendre le pouvoir à Thèbes",
        "Enterrer son frère Polynice",
        "Se marier avec Hémon",
        "Quitter la ville de Thèbes"
      ],
      correctIndex: 1,
      explanation: "Antigone veut enterrer son frère Polynice malgré l'interdiction de Créon qui a décrété que le corps de Polynice resterait sans sépulture."
    },
    {
      type: "qcm",
      text: "Quel autre personnage de la famille de Créon s'oppose aussi à Antigone ?",
      points: 0.5,
      section: "contextualisation",
      options: ["Hémon", "Ismène", "Eurydice", "Le garde"],
      correctIndex: 1,
      explanation: "Ismène, la sœur d'Antigone, s'oppose à son projet en lui conseillant de ne pas braver l'interdit de Créon. Elle représente la prudence face à la révolte d'Antigone."
    },
    {
      type: "qcm",
      text: "Quel sentiment Créon éprouve-t-il dans la didascalie d'ouverture ?",
      points: 1,
      section: "comprehension",
      options: ["La colère", "La fatigue et la lassitude", "La joie", "La peur"],
      correctIndex: 1,
      explanation: "La didascalie indique que Créon « la regarde et murmure, fatigué ». Il exprime de la lassitude face à la situation et essaie de faire comprendre à Antigone la difficulté de gouverner."
    },
    {
      type: "qcm",
      text: "Pour expliquer la situation, Créon utilise l'image de :",
      points: 0.5,
      section: "comprehension",
      options: [
        "Un capitaine d'un bateau qui sauve un navire en train de couler",
        "Un roi qui gouverne son peuple avec sagesse",
        "Un père qui protège sa famille d'un danger",
        "Un professeur qui enseigne à ses élèves"
      ],
      correctIndex: 0,
      explanation: "Créon compare la gouvernance de Thèbes à un capitaine de bateau en pleine tempête qui doit prendre des décisions difficiles et rapides pour sauver le navire."
    },
    {
      type: "qcm",
      text: "Quelle figure de style Créon utilise-t-il pour cette comparaison ?",
      points: 0.5,
      section: "langue",
      options: ["Comparaison", "Métaphore filée", "Hyperbole", "Personnification"],
      correctIndex: 1,
      explanation: "Créon utilise une métaphore filée : il développe longuement l'image du bateau en tempête pour représenter l'État en crise. La métaphore se poursuit sur tout le passage (bateau, équipage, voiles, mât, vagues...)."
    },
    {
      type: "short",
      text: "Citez deux exemples de comportements dangereux des citoyens de Thèbes selon Créon.",
      points: 1,
      section: "comprehension",
      answer: "L'équipage pille la cale / Les officiers construisent un radeau pour eux",
      alternatives: ["piller la cale", "construisent un radeau", "le premier qui s'avance", "équipage pille", "officiers construisent"],
      explanation: "L'équipage (le peuple) veut piller la cale (profiter de la crise) et les officiers (les élites) construisent un radeau confortable rien que pour eux (sauvent leur propre intérêt)."
    },
    {
      type: "short",
      text: "Relevez un mot dévalorisant que Créon utilise pour désigner les citoyens.",
      points: 0.5,
      section: "comprehension",
      answer: "le tas",
      alternatives: ["tas", "dans le tas", "gueule"],
      explanation: "Le mot « tas » déshumanise les citoyens — ils ne sont plus des individus mais une masse anonyme. Créon justifie ainsi la violence nécessaire du pouvoir."
    },
    {
      type: "input",
      text: "Transformez au discours indirect : « Crois-tu qu'on a le temps de faire le raffiné ? » demanda Créon à Antigone.",
      points: 1,
      section: "langue",
      sampleAnswer: "Créon demanda à Antigone si elle croyait qu'on avait le temps de faire le raffiné."
    },
    {
      type: "qcm",
      text: "D'après cette tirade, comment Créon se présente-t-il en tant que dirigeant ?",
      points: 0.5,
      section: "comprehension",
      options: ["Souple et compréhensif", "Flexible et tolérant", "Exigeant et autoritaire"],
      correctIndex: 2,
      explanation: "Créon se présente comme un dirigeant autoritaire qui n'hésite pas à tirer « dans le tas » et à sacrifier des individus pour maintenir l'ordre. Il justifie cette dureté par l'urgence de la situation."
    },
    {
      type: "input",
      text: "Pensez-vous que Créon a raison de sacrifier ses proches au nom de la loi ? Justifiez avec un argument.",
      points: 0.5,
      section: "reaction",
      sampleAnswer: "Créon n'a pas raison car un dirigeant doit savoir concilier la loi et la compassion. Sacrifier ses proches au nom de la loi est inhumain et montre les limites d'un pouvoir trop rigide. La justice doit être humaine et non aveugle."
    },
    {
      type: "input",
      text: "Faut-il placer les intérêts personnels au-dessus de l'intérêt général de la société ? Justifiez votre point de vue.",
      points: 0.5,
      section: "reaction",
      sampleAnswer: "L'intérêt général doit primer sur les intérêts personnels, mais sans écraser les libertés individuelles. Une société équilibrée est celle qui respecte à la fois le bien commun et les droits de chacun. Le sacrifice aveugle de l'individu au nom du collectif mène à la tyrannie."
    }
  ],
  production: {
    sujet: "« Dans La Boîte à merveilles, Ahmed Sefrioui évoque plusieurs métiers artisanaux (tisserand, babouchier, fabricant de charrues...) ; aujourd'hui, d'autres métiers modernes ont vu le jour (médecin, informaticien, responsable de marketing, youtubeur, etc.). »\n\nEt vous, quel métier préféreriez-vous exercer à l'avenir ? Rédigez un texte argumentatif avec des arguments et des exemples.",
    points: 10,
    criteres: [
      "Respect de la consigne (texte argumentatif) — 1 pt",
      "Structure du texte (introduction, développement, conclusion) — 1 pt",
      "Qualité des arguments et liens logiques — 3 pts",
      "Correction de la langue (syntaxe, vocabulaire, orthographe, conjugaison, ponctuation) — 5 pts"
    ]
  }
},

// ──────────────────────────────────────────────────
// 5) 2024 — Beni Mellal-Khénifra
// ──────────────────────────────────────────────────
{
  id: "benimellal-2024",
  year: 2024,
  region: "Beni Mellal-Khénifra",
  session: "Normale",
  work: { title: "La Boîte à merveilles", author: "Ahmed Sefrioui", genre: "Roman autobiographique", year: 1954 },
  texte: `Nous cheminâmes en silence. Au niveau de la boutique de Bin Lamdoun, un marchand de grenades s'était installé. Les grenades n'étaient pas encore mûres, leur écorce était encore verte. Je me plantai devant.
Ma mère me tira par la manche :
— Tu peux prendre racine à cet endroit, tu n'auras pas de grenades. Allons, viens !
Je résistai. Elle m'en offrit une à goûter, mais j'en voulais d'autres. Elle me saisit par le bras et m'entraîna malgré ma résistance. Je me mis à pleurer, m'essuyant les yeux dans les manches de ma djellaba.
Nous marchâmes longtemps. Le spectacle de la rue me captiva. Je criais à voix haute mes réflexions. Ma mère me fit taire, me menaçant de me ramener à la maison.
Ma mère me raconta qu'elle rendait visite à des voisines. Elle parla de Lalla Aïcha, de Sidi El Arafi. Les pratiques de Kanza la voyante, disait-elle, relevaient du démoniaque.`,
  footnotes: "grenades : fruits du grenadier · prendre racine : rester immobile très longtemps · démoniaque : lié aux démons/djinns",
  questions: [
    {
      type: "table",
      text: "Complétez le tableau suivant :",
      points: 1,
      section: "contextualisation",
      fields: [
        { label: "Titre de l'œuvre", answer: "La Boîte à merveilles" },
        { label: "Genre littéraire", answer: "Roman autobiographique" },
        { label: "Auteur", answer: "Ahmed Sefrioui" },
        { label: "Date de publication", answer: "1954" }
      ]
    },
    {
      type: "qcm",
      text: "Au moment des événements du texte, le père du narrateur :",
      points: 1,
      section: "contextualisation",
      options: [
        "Passe la journée comme d'habitude dans son atelier de tisserand",
        "Est à la campagne en train de travailler dans les moissons",
        "Est parti en voyage pour acheter de la laine"
      ],
      correctIndex: 1,
      explanation: "À ce moment du roman, le père est parti travailler aux moissons à la campagne, c'est pourquoi la mère et l'enfant se débrouillent seuls."
    },
    {
      type: "qcm",
      text: "Que demande le narrateur à sa mère devant le marchand de grenades ?",
      points: 0.5,
      section: "comprehension",
      options: [
        "De lui acheter des grenades",
        "De rentrer à la maison",
        "De lui donner de l'argent",
        "De le laisser jouer"
      ],
      correctIndex: 0,
      explanation: "Le narrateur se plante devant le marchand de grenades et résiste quand sa mère veut l'emmener. Il veut des grenades."
    },
    {
      type: "qcm",
      text: "Comment réagit la mère face à la demande de l'enfant ?",
      points: 0.5,
      section: "comprehension",
      options: [
        "Elle accepte et lui achète beaucoup de grenades",
        "Elle lui en offre une puis le force à partir",
        "Elle le punit et le ramène à la maison",
        "Elle ignore complètement sa demande"
      ],
      correctIndex: 1,
      explanation: "La mère lui offre une grenade à goûter mais refuse de céder à tous ses caprices. Elle le saisit par le bras et l'entraîne malgré sa résistance."
    },
    {
      type: "qcm",
      text: "Identifiez la figure de style dans : « Tu peux prendre racine à cet endroit ».",
      points: 0.5,
      section: "langue",
      options: ["Comparaison", "Métaphore", "Hyperbole", "Personnification"],
      correctIndex: 1,
      explanation: "C'est une métaphore : l'enfant est comparé implicitement à une plante qui prend racine. La mère exprime de façon imagée que l'enfant reste planté là sans bouger."
    },
    {
      type: "qcm",
      text: "Cette figure de style montre quel trait de caractère de l'enfant ?",
      points: 0.5,
      section: "langue",
      options: ["La souplesse", "La détermination (l'entêtement)", "La gentillesse"],
      correctIndex: 1,
      explanation: "La métaphore « prendre racine » souligne la détermination et l'entêtement de l'enfant qui refuse de bouger devant le marchand de grenades."
    },
    {
      type: "short",
      text: "Relevez deux mots montrant le sentiment de Sidi Mohammed face à la réaction de sa mère.",
      points: 1,
      section: "comprehension",
      answer: "résistance / pleurer",
      alternatives: ["résistance", "pleurer", "résistai", "pleurer", "malgré ma résistance", "me mis à pleurer"],
      explanation: "Les mots « résistance » et « pleurer » montrent le mécontentement et la frustration de l'enfant face au refus de sa mère."
    },
    {
      type: "vf",
      text: "Dites si les affirmations sont vraies ou fausses :",
      points: 1,
      section: "comprehension",
      statements: [
        { text: "La mère ne raconte pas aux voisines la visite de Sidi El Arafi.", answer: false, justification: "Au contraire, elle parle de Lalla Aïcha et de Sidi El Arafi aux voisines." },
        { text: "La mère croit aux talents de Kanza la voyante.", answer: false, justification: "La mère dit que les pratiques de Kanza « relevaient du démoniaque » — elle les désapprouve." }
      ]
    },
    {
      type: "input",
      text: "Le narrateur est-il d'accord avec les rituels de Kanza ? Relevez un indice pour justifier.",
      points: 1,
      section: "comprehension",
      sampleAnswer: "Non, le narrateur n'est pas d'accord avec les rituels de Kanza. L'indice est le mot « démoniaque » qui montre que ces pratiques sont perçues négativement, comme relevant du monde des démons."
    },
    {
      type: "input",
      text: "La peur de la mère que ses secrets soient révélés est-elle justifiée ? Donnez votre avis.",
      points: 1,
      section: "reaction",
      sampleAnswer: "La peur de la mère est compréhensible car dans la société traditionnelle marocaine, les secrets de famille sont importants et leur révélation peut nuire à la réputation. Cependant, cette peur excessive montre aussi les limites d'une société où l'image sociale prime sur la liberté individuelle."
    },
    {
      type: "input",
      text: "« Elle me saisit par le bras et m'entraîna malgré ma résistance. » Le comportement de la mère face au désir de l'enfant est-il normal ou déplacé ? Justifiez.",
      points: 1,
      section: "reaction",
      sampleAnswer: "Le comportement de la mère est normal et responsable. Un parent doit savoir dire non aux caprices de son enfant. Céder à toutes ses demandes le rendrait gâté et incapable de gérer la frustration. La mère lui a offert une grenade mais a su poser des limites."
    }
  ],
  production: {
    sujet: "« Aujourd'hui, de plus en plus de jeunes ont des exigences (des demandes) qui dépassent le pouvoir d'achat (les capacités financières) de leurs parents : smartphones, vêtements signés, argent de poche exagéré... »\n\nQue pensez-vous de l'attitude de ces jeunes ? Rédigez un texte argumentatif avec des arguments et des exemples.",
    points: 10,
    criteres: [
      "Respect de la consigne + cohérence + structure — 5 pts",
      "Qualité de la langue (syntaxe, vocabulaire, ponctuation, orthographe, conjugaison) — 5 pts"
    ]
  }
},

// ──────────────────────────────────────────────────
// 6) 2024 — Fès-Meknès
// ──────────────────────────────────────────────────
{
  id: "fes-2024",
  year: 2024,
  region: "Fès-Meknès",
  session: "Normale",
  work: { title: "La Boîte à merveilles", author: "Ahmed Sefrioui", genre: "Roman autobiographique", year: 1954 },
  texte: `Je rentrai chez moi épuisé mais fier. Je racontai mes exploits à mes parents. Mon père me félicita. Ma mère me dit d'aller me coucher. Pendant mon sommeil, elle me couvrit, me prodigua des gestes tendres et des paroles affectueuses.
Le matin, je me préparai pour l'école mais ma mère m'arrêta :
— Aujourd'hui tu ne vas pas à l'école. Tu vas m'accompagner à la kissaria. Nous allons préparer la fête de l'Achoura.
J'applaudis d'enthousiasme. Elle me promit une chemise neuve, un gilet avec des soutaches.
— Est-ce que je porterai un gilet avec des soutaches ?
— Bien sûr !
Je me dressai de toute ma taille, je bombai le torse ; j'esquissai même quelques pas d'une danse barbare. Même Fatma Bziouya riait de bon cœur. Mon hilarité ne gênait personne.`,
  footnotes: "kissaria : marché couvert pour les tissus et vêtements · soutaches : galons décoratifs cousus sur un vêtement · se dressant : se levant de toute sa hauteur · torse : poitrine",
  questions: [
    {
      type: "table",
      text: "Complétez le tableau suivant :",
      points: 1,
      section: "contextualisation",
      fields: [
        { label: "Nom de l'auteur", answer: "Ahmed Sefrioui" },
        { label: "Titre de l'œuvre", answer: "La Boîte à merveilles" },
        { label: "Date de publication", answer: "1954" },
        { label: "Nom du narrateur", answer: "Sidi Mohammed" }
      ]
    },
    {
      type: "qcm",
      text: "Quelle activité le fqih avait-il fait faire aux élèves pour préparer l'Achoura ?",
      points: 0.5,
      section: "contextualisation",
      options: [
        "Le nettoyage du msid (l'école coranique)",
        "L'apprentissage d'une sourate spéciale",
        "La préparation de la nourriture de fête",
        "La collecte d'argent dans le quartier"
      ],
      correctIndex: 0,
      explanation: "Pour préparer la fête de l'Achoura, le fqih avait chargé les élèves du nettoyage du msid (l'école coranique)."
    },
    {
      type: "qcm",
      text: "Quel était l'état physique du narrateur à son retour à la maison ?",
      points: 0.5,
      section: "comprehension",
      options: ["Énergique et en forme", "Épuisé mais fier", "Triste et fatigué", "En colère"],
      correctIndex: 1,
      explanation: "Le texte dit : « Je rentrai chez moi épuisé mais fier. » Il est fatigué par le travail au msid mais fier de ses exploits."
    },
    {
      type: "qcm",
      text: "Quelle figure de style est utilisée pour décrire l'état du narrateur (« épuisé mais fier ») ?",
      points: 0.5,
      section: "langue",
      options: ["Métaphore", "Antithèse", "Hyperbole", "Comparaison"],
      correctIndex: 1,
      explanation: "C'est une antithèse qui oppose deux états contradictoires : l'épuisement (négatif) et la fierté (positif). Elle montre la complexité des émotions de l'enfant."
    },
    {
      type: "input",
      text: "« Le petit enfant est épuisé ; il est très content de sa journée. » Reliez les deux propositions en utilisant « bien que ».",
      points: 0.5,
      section: "langue",
      sampleAnswer: "Bien que le petit enfant soit épuisé, il est très content de sa journée. / Le petit enfant est très content de sa journée bien qu'il soit épuisé."
    },
    {
      type: "qcm",
      text: "Quel sentiment le narrateur éprouve-t-il quand sa mère lui annonce la sortie à la kissaria ?",
      points: 0.5,
      section: "comprehension",
      options: ["L'indifférence", "L'enthousiasme", "La peur", "La tristesse"],
      correctIndex: 1,
      explanation: "Le narrateur « applaudit d'enthousiasme » et exécute une « danse barbare » — il est très enthousiaste à l'idée d'aller à la kissaria et d'avoir de nouveaux vêtements."
    },
    {
      type: "short",
      text: "Relevez deux gestes exécutés par l'enfant pour exprimer son enthousiasme.",
      points: 1,
      section: "comprehension",
      answer: "il applaudit / il esquissa des pas d'une danse barbare",
      alternatives: ["applaudis", "danse barbare", "bombai le torse", "me dressai de toute ma taille", "applaudit", "esquissai quelques pas"],
      explanation: "L'enfant exprime son enthousiasme par plusieurs gestes : il applaudit, se dresse de toute sa taille, bombe le torse et esquisse une danse barbare."
    },
    {
      type: "input",
      text: "Transformez au discours indirect : « L'enfant demanda à sa mère : Est-ce que je porterai un gilet avec des soutaches ? »",
      points: 1,
      section: "langue",
      sampleAnswer: "L'enfant demanda à sa mère s'il porterait un gilet avec des soutaches."
    },
    {
      type: "qcm",
      text: "Quel est l'équivalent en français standard du mot marocain « kissaria » ?",
      points: 0.5,
      section: "comprehension",
      options: ["Boulangerie", "Marché couvert de tissus et vêtements", "Grande mosquée", "Place publique"],
      correctIndex: 1,
      explanation: "La « kissaria » est un marché couvert spécialisé dans les tissus et les vêtements. Le narrateur l'explique pour le lecteur francophone étranger."
    },
    {
      type: "qcm",
      text: "Quel registre/tonalité domine dans ce texte ?",
      points: 1,
      section: "langue",
      options: ["Tragique", "Lyrique", "Comique", "Pathétique"],
      correctIndex: 1,
      explanation: "Le registre lyrique domine : le texte exprime les sentiments personnels du narrateur (fierté, tendresse maternelle, enthousiasme, joie) avec une intensité poétique."
    },
    {
      type: "input",
      text: "Pensez-vous que les parents qui félicitent et valorisent leur enfant jouent un rôle positif dans son épanouissement ? Justifiez.",
      points: 1,
      section: "reaction",
      sampleAnswer: "Oui, les parents qui félicitent leur enfant jouent un rôle très positif. L'encouragement renforce la confiance en soi de l'enfant et le motive à bien faire. Dans le texte, les félicitations du père et la tendresse de la mère rendent Sidi Mohammed fier et heureux, ce qui favorise son développement émotionnel."
    }
  ],
  production: {
    sujet: "« Aujourd'hui, certains lycéens et lycéennes se plaignent de plus en plus de l'École et s'y ennuient : programmes trop chargés, activités d'épanouissement et de créativité rares ou absentes, nombre souvent épuisant de contrôles, etc. Ils rêvent, au contraire, d'une école capable de répondre à leurs besoins, à leurs attentes et à leurs espoirs. »\n\nEt vous, partagez-vous l'avis de ces élèves ? Rédigez un texte argumentatif.",
    points: 10,
    criteres: [
      "Conformité au sujet — 1 pt",
      "Cohérence de l'argumentation — 1 pt",
      "Structure du texte et progression des idées — 3 pts",
      "Vocabulaire — 1 pt, Syntaxe — 1 pt, Ponctuation — 1 pt, Orthographe — 1 pt, Conjugaison — 1 pt"
    ]
  }
},

// ──────────────────────────────────────────────────
// 7) 2024 — Marrakech-Safi
// ──────────────────────────────────────────────────
{
  id: "marrakech-2024",
  year: 2024,
  region: "Marrakech-Safi",
  session: "Normale",
  work: { title: "La Boîte à merveilles", author: "Ahmed Sefrioui", genre: "Roman autobiographique", year: 1954 },
  texte: `Le soir, à la lumière d'une bougie, Sidi Mohammed découvrit le monde de son père. Il ouvrit la boîte à merveilles et en sortit ses trésors. Il y avait des boutons de toutes les couleurs, des perles de verre, des anneaux de cuivre, des clous à tête dorée, des billes, un minuscule cadenas sans clef et des chaînettes.
Pour l'enfant, ces objets n'étaient pas de simples choses. Chacun avait une âme, une personnalité. Les boutons étaient des princes, les billes des guerriers, les chaînettes des serpents apprivoisés.
La mère ne comprenait pas cette passion. Elle trouvait absurde qu'un enfant puisse se passionner pour des bouts de verre et de métal. Mais pour Sidi Mohammed, la boîte représentait un refuge, un monde parallèle où il pouvait s'évader loin des querelles des adultes et de la monotonie du msid.
Rahma lui avait offert un bracelet de perles bleues. Il l'accepta avec joie et le plaça délicatement dans sa boîte à merveilles, parmi ses autres trésors.`,
  footnotes: "cuivre : métal de couleur rougeâtre · cadenas : petit verrou portable · msid : école coranique traditionnelle",
  questions: [
    {
      type: "table",
      text: "Complétez le tableau suivant :",
      points: 1,
      section: "contextualisation",
      fields: [
        { label: "Prénom et nom de l'auteur", answer: "Ahmed Sefrioui" },
        { label: "Titre de l'œuvre", answer: "La Boîte à merveilles" },
        { label: "Genre littéraire", answer: "Roman autobiographique" },
        { label: "Prénom de la mère du narrateur", answer: "Zoubida" }
      ]
    },
    {
      type: "qcm",
      text: "Citez une autre œuvre du même auteur :",
      points: 1,
      section: "contextualisation",
      options: ["Le Petit Prince", "Le Chapelet d'ambre", "L'Étranger", "Candide"],
      correctIndex: 1,
      explanation: "Le Chapelet d'ambre (1949) est une autre œuvre d'Ahmed Sefrioui. Il a aussi écrit La Maison de servitude."
    },
    {
      type: "short",
      text: "Relevez dans le texte quatre mots appartenant au champ lexical du corps/des objets précieux.",
      points: 1,
      section: "langue",
      answer: "boutons / perles / anneaux / billes",
      alternatives: ["boutons", "perles", "anneaux", "billes", "chaînettes", "bracelet", "trésors", "cuivre", "clous", "cadenas"],
      explanation: "Le texte est riche en vocabulaire d'objets précieux : boutons, perles, anneaux, billes, chaînettes, bracelet, clous dorés, cadenas..."
    },
    {
      type: "vf",
      text: "Dites si les affirmations suivantes sont vraies ou fausses. Justifiez.",
      points: 1,
      section: "comprehension",
      statements: [
        { text: "La mère comprend la passion de son fils pour les objets de la boîte.", answer: false, justification: "La mère « ne comprenait pas cette passion » et « trouvait absurde qu'un enfant puisse se passionner pour des bouts de verre et de métal »." },
        { text: "Sidi Mohammed considère les objets de sa boîte comme des êtres vivants.", answer: true, justification: "Le texte dit que « chacun avait une âme, une personnalité » et compare les boutons à des princes, les billes à des guerriers." }
      ]
    },
    {
      type: "qcm",
      text: "Quelle figure de style est utilisée dans : « Les boutons étaient des princes, les billes des guerriers, les chaînettes des serpents apprivoisés » ?",
      points: 1,
      section: "langue",
      options: ["Comparaison", "Métaphore", "Hyperbole", "Personnification"],
      correctIndex: 1,
      explanation: "C'est une métaphore : les objets sont identifiés directement à des êtres vivants (princes, guerriers, serpents) sans outil de comparaison. Elle montre l'imagination débordante de l'enfant."
    },
    {
      type: "input",
      text: "Que représente la boîte à merveilles pour Sidi Mohammed ? Répondez en vous appuyant sur le texte.",
      points: 1,
      section: "comprehension",
      sampleAnswer: "La boîte à merveilles représente un refuge pour Sidi Mohammed, « un monde parallèle où il pouvait s'évader loin des querelles des adultes et de la monotonie du msid ». C'est son espace intime où chaque objet a une âme et une personnalité."
    },
    {
      type: "input",
      text: "Pourquoi Sidi Mohammed accepte-t-il le bracelet que Rahma lui offre ? Justifiez.",
      points: 1,
      section: "comprehension",
      sampleAnswer: "Sidi Mohammed accepte le bracelet avec joie car tout objet est précieux à ses yeux — il enrichit sa collection de trésors dans la boîte à merveilles. Le bracelet de perles bleues devient un nouveau compagnon dans son monde imaginaire."
    },
    {
      type: "qcm",
      text: "Quel événement se produit avant cet extrait dans le roman ?",
      points: 1,
      section: "contextualisation",
      options: [
        "La visite de Lalla Aïcha à la famille",
        "La mort du père du narrateur",
        "Le départ de Rahma de la maison",
        "Le mariage du narrateur"
      ],
      correctIndex: 0,
      explanation: "Avant cet extrait, Lalla Aïcha rend visite à la famille du narrateur. C'est une amie proche de la mère."
    },
    {
      type: "input",
      text: "« La mère ne comprenait pas cette passion pour des bouts de verre et de métal. » Pensez-vous que les adultes comprennent toujours les passions des enfants ? Justifiez.",
      points: 1,
      section: "reaction",
      sampleAnswer: "Non, les adultes ne comprennent pas toujours les passions des enfants car ils voient le monde de manière rationnelle et pratique, tandis que les enfants ont une imagination riche qui transforme les objets banals en trésors. Les adultes devraient respecter le monde intérieur de l'enfant et l'encourager plutôt que le juger."
    },
    {
      type: "input",
      text: "Que pensez-vous de l'imagination de Sidi Mohammed qui donne vie aux objets de sa boîte ? Est-ce positif ou négatif ? Justifiez.",
      points: 1,
      section: "reaction",
      sampleAnswer: "L'imagination de Sidi Mohammed est très positive car elle l'aide à s'évader d'un quotidien difficile (querelles des adultes, école coranique monotone). C'est un mécanisme sain qui développe sa créativité et sa sensibilité. Chaque enfant a besoin d'un espace imaginaire pour grandir."
    }
  ],
  production: {
    sujet: "« Même si une personne ne fait du mal à personne, ne pose jamais la main sur toi, tu peux en faire une grande méchante. »\n\nPartagez-vous l'affirmation de cette mère ? Rédigez un texte argumentatif d'environ 15 lignes dans lequel vous présentez votre point de vue.",
    points: 10,
    criteres: [
      "Respect de la consigne (texte argumentatif) — 2 pts",
      "Cohérence et structure (introduction, développement, conclusion) — 3 pts",
      "Correction de la langue (vocabulaire, syntaxe, orthographe, conjugaison, ponctuation) — 5 pts"
    ]
  }
}

// ──────────────────────────────────────────────────
// 8) 2017 — Marrakech-Safi — Session Normale
// ──────────────────────────────────────────────────
,{
  id: "marrakech-2017",
  year: 2017,
  region: "Marrakech-Safi",
  session: "Normale",
  work: { title: "La Boîte à merveilles", author: "Ahmed Sefrioui", genre: "Roman autobiographique", year: 1954 },
  texte: `La voix de ma mère me tira des profondeurs du sommeil. Je nageai, un bon moment, dans une lumière rouge parcourue d'étincelles et d'astres errants, puis, j'ouvris les yeux. Vite, je les refermai, espérant retrouver le noir si reposant et si frais. La voix insistait :
— Réveille-toi, il est trois heures du matin. Je t'ai préparé ton beau gilet, ta chemise neuve et ta sacoche. Tu n'as pas encore vu ta belle sacoche brodée. Ouvre les yeux ! Réveille-toi donc !
Je pleurnichais, je me frottai énergiquement les paupières de mes poings fermés. Je tentai plusieurs fois de me recoucher, mais ma mère fut impitoyable. Elle se mouilla la main et me la passa sur la figure. Mes oreilles cessèrent de bourdonner. J'entrouvris mes cils avec précaution. Mon père, habillé d'une djellaba de laine fine, me souriait.
— Prépare-toi pour fêter l'Achoura au Msid avec tes camarades. Du courage ! Du courage !
Ce fut dans un état de somnambule que je me lavai les yeux, me rinçai la bouche, me rafraîchis les membres. Je retrouvai ma lucidité lorsque ma mère me passa, à même la peau, ma chemise neuve, craquante d'apprêt. Elle me grattait horriblement. À chaque mouvement, je remplissais la pièce d'un bruit de papier froissé. Je mis mon gilet rouge aux dessins compliqués et bien en relief. Ma sacoche en bandoulière, je complétai cet ensemble très élégant par la djellaba blanche qui dormait au fond du coffre de ma mère. Elle sentait la fleur d'oranger et la rose séchée.
Me voilà devenu un autre homme ! J'étais complètement réveillé. J'avais hâte de partir à l'école. Les vêtements, les chaussures, tout était neuf. Plein de dignité et d'assurance, je précédai mon père dans l'escalier.
La lumière brillait à toutes les fenêtres de la maison. Hommes et femmes commençaient l'année dans l'activité. Ceux qui restaient au lit un matin comme celui-ci se sentiraient, durant douze mois, indolents, paresseux.
L'appel d'un mendiant nous arrivait de la rue. J'entendais le bruit de sa canne. C'était sûrement un aveugle.
Je perdais mes babouches tous les trois pas. Mes parents voyaient grand. Ni les vêtements, ni les chaussures n'étaient à ma taille. Mais j'étais heureux.`,
  footnotes: "somnambule : personne qui agit en dormant · apprêt : traitement qui rend le tissu rigide · babouches : chaussures traditionnelles marocaines",
  questions: [
    {
      type: "table",
      text: "Complétez le tableau suivant :",
      points: 1,
      section: "contextualisation",
      fields: [
        { label: "Titre de l'œuvre", answer: "La Boîte à merveilles" },
        { label: "Nom et prénom de l'auteur", answer: "Ahmed Sefrioui" },
        { label: "Genre littéraire", answer: "Roman autobiographique" },
        { label: "Date de publication", answer: "1954" }
      ]
    },
    {
      type: "qcm",
      text: "Parmi les faits suivants, lequel a eu lieu AVANT ce texte ?",
      points: 1,
      section: "contextualisation",
      options: [
        "Au Msid, les élèves fêtent l'Achoura en récitant des versets coraniques",
        "Lalla Aïcha rend visite à la mère de Sidi Mohammed",
        "Le narrateur accompagne son père chez le coiffeur"
      ],
      correctIndex: 2,
      explanation: "Avant la matinée de l'Achoura, le narrateur avait accompagné son père chez le coiffeur pour se préparer à la fête. Lalla Aïcha rend visite plus tôt dans le récit, et la fête au Msid a lieu après ce passage."
    },
    {
      type: "vf",
      text: "Dites si les affirmations suivantes sont vraies ou fausses. Justifiez chaque réponse par une phrase du texte.",
      points: 1,
      section: "comprehension",
      statements: [
        { text: "Sidi Mohammed n'est pas pressé d'aller à l'école.", answer: false, justification: "Faux — le texte dit : « J'avais hâte de partir à l'école. » Il est très pressé d'y aller." },
        { text: "Sidi Mohammed doute fort que le mendiant soit aveugle.", answer: false, justification: "Faux — le texte dit : « C'était sûrement un aveugle. » Le mot « sûrement » montre qu'il n'en doute pas." }
      ]
    },
    {
      type: "qcm",
      text: "« L'appel d'un mendiant nous arrivait de la rue. » Le pronom « nous » remplace :",
      points: 1,
      section: "comprehension",
      options: [
        "Le narrateur et sa mère",
        "Le narrateur et son père",
        "Le narrateur et un de ses camarades du Msid"
      ],
      correctIndex: 1,
      explanation: "Le « nous » désigne Sidi Mohammed et son père, car la fin du texte indique que le narrateur descend l'escalier avec son père pour aller au Msid."
    },
    {
      type: "short",
      text: "Relevez dans le texte quatre mots ou expressions appartenant au champ lexical du sommeil.",
      points: 1,
      section: "langue",
      answer: "sommeil / somnambule / se recoucher / réveille-toi",
      alternatives: ["sommeil", "somnambule", "recoucher", "réveille-toi", "dormait", "reposant", "profondeurs du sommeil", "réveillé", "refermai", "cils"],
      explanation: "Le champ lexical du sommeil est très présent au début du texte : sommeil, somnambule, se recoucher, réveille-toi, dormait, reposant, réveillé..."
    },
    {
      type: "qcm",
      text: "Quel argument la mère emploie-t-elle pour encourager son fils à se réveiller ?",
      points: 1,
      section: "comprehension",
      options: [
        "Porter de nouveaux habits à l'occasion de la fête de l'Achoura",
        "Participer à la fête de l'Achoura en compagnie de ses camarades",
        "Se frotter violemment la figure et les paupières"
      ],
      correctIndex: 0,
      explanation: "La mère dit : « Je t'ai préparé ton beau gilet, ta chemise neuve et ta sacoche. Tu n'as pas encore vu ta belle sacoche brodée. » Elle attire son attention sur les beaux habits neufs pour le motiver."
    },
    {
      type: "short",
      text: "Trouvez dans le texte deux phrases montrant le caractère comique des habits portés par Sidi Mohammed.",
      points: 1,
      section: "comprehension",
      answer: "Je perdais mes babouches tous les trois pas. / Ni les vêtements, ni les chaussures n'étaient à ma taille.",
      alternatives: ["je perdais mes babouches", "ni les vêtements ni les chaussures n'étaient à ma taille", "je remplissais la pièce d'un bruit de papier froissé", "elle me grattait horriblement", "mes parents voyaient grand"],
      explanation: "Le comique vient du décalage entre l'élégance des habits neufs et leur taille inadaptée : il perd ses babouches, ses vêtements ne sont pas à sa taille, la chemise craque comme du papier froissé."
    },
    {
      type: "qcm",
      text: "Identifiez la figure de style dans : « Je nageai, un bon moment, dans une lumière rouge... »",
      points: 0.5,
      section: "langue",
      options: ["Comparaison", "Métaphore", "Personnification", "Hyperbole"],
      correctIndex: 1,
      explanation: "C'est une métaphore : le narrateur est décrit comme nageant dans la lumière, sans outil de comparaison (comme, tel). Elle traduit l'état entre sommeil et éveil."
    },
    {
      type: "qcm",
      text: "Identifiez la figure de style dans : « ...la djellaba blanche qui dormait au fond du coffre de ma mère. »",
      points: 0.5,
      section: "langue",
      options: ["Comparaison", "Métaphore", "Personnification", "Hyperbole"],
      correctIndex: 2,
      explanation: "C'est une personnification : la djellaba est dotée de la qualité humaine de « dormir ». L'enfant donne vie aux objets, ce qui est un trait central de son imaginaire."
    },
    {
      type: "input",
      text: "« Me voilà devenu un autre homme ! » Pensez-vous que porter des habits neufs et élégants puisse changer un individu et lui donner plus de valeur ? Justifiez en une phrase ou deux.",
      points: 1,
      section: "reaction",
      sampleAnswer: "Les habits neufs peuvent renforcer la confiance en soi et donner un sentiment de dignité, comme le montre l'enthousiasme de Sidi Mohammed. Cependant, la vraie valeur d'une personne ne dépend pas de son apparence mais de ses qualités intérieures et de son comportement."
    },
    {
      type: "input",
      text: "« Si Sidi Mohammed a de la difficulté à se réveiller, c'est parce qu'il est un rêveur. » Êtes-vous d'accord avec cette observation ? Justifiez.",
      points: 1,
      section: "reaction",
      sampleAnswer: "Je suis partiellement d'accord. Sidi Mohammed est effectivement un rêveur — il « nage dans une lumière rouge » et vit dans un monde imaginaire (sa boîte à merveilles). Mais sa difficulté à se réveiller s'explique aussi simplement : il est trois heures du matin, un horaire très tôt pour un enfant."
    }
  ],
  production: {
    sujet: "« On entend dire assez souvent que les gens qui se lèvent tard sont des paresseux et des fainéants qui n'arriveront jamais à réussir dans leur vie. »\n\nPartagez-vous cette opinion ? Rédigez un texte d'une quinzaine de lignes dans lequel vous exprimerez votre point de vue appuyé par des arguments et des exemples.",
    points: 10,
    criteres: [
      "Respect de la consigne (répondre au sujet) — 2 pts",
      "Organisation cohérente (introduction, développement, conclusion) — 2 pts",
      "Précision des arguments, exemples et liens logiques — 2 pts",
      "Correction de la langue (syntaxe, vocabulaire, orthographe, conjugaison, ponctuation) — 4 pts"
    ]
  }
},

// ──────────────────────────────────────────────────
// 9) 2017 — Marrakech-Safi — Session Rattrapage — Antigone
// ──────────────────────────────────────────────────
{
  id: "marrakech-2017-rattrapage",
  year: 2017,
  region: "Marrakech-Safi",
  session: "Rattrapage",
  work: { title: "Antigone", author: "Jean Anouilh", genre: "Tragédie moderne", year: 1944 },
  texte: `CRÉON, entre avec son page.
Je les ai fait coucher l'un près de l'autre, enfin ! Ils sont lavés, maintenant, reposés. Ils sont seulement un peu pâles, mais si calmes. Deux amants au lendemain de la première nuit. Ils ont fini, eux.

LE CHŒUR
Pas toi, Créon. Il te reste encore quelque chose à apprendre. Eurydice, la reine, ta femme...

CRÉON
Une bonne femme parlant toujours de son jardin, de ses tricots, de ses éternels tricots pour les pauvres. C'est drôle comme les pauvres gens ont éternellement besoin de tricots. On dirait qu'ils n'ont besoin que de tricots...

LE CHŒUR
Les pauvres de Thèbes auront froid, cet hiver, Créon. En apprenant la mort de son fils, la reine a posé ses aiguilles, sagement, après avoir terminé son rang, posément, comme tout ce qu'elle fait, un peu plus tranquillement peut-être que d'habitude. Et puis elle est passée dans sa chambre, sa chambre à l'odeur de lavande, aux petits napperons brodés et aux cadres de peluche, pour s'y couper la gorge, Créon. Elle est étendue maintenant sur un des petits lits jumeaux démodés, à la même place où tu l'as vue jeune fille un soir, et avec le même sourire, à peine un peu plus triste. Et s'il n'y avait pas cette large tache rouge sur les linges autour de son cou, on pourrait croire qu'elle dort.

CRÉON
Elle aussi. Ils dorment tous. C'est bien. La journée a été rude. (Un temps. Il dit sourdement) Cela doit être bon de dormir.

LE CHŒUR
Et tu es tout seul maintenant, Créon ?

CRÉON
Tout seul, oui. (Un silence. Il pose sa main sur l'épaule de son page.) Petit...

LE PAGE
Monsieur ?

CRÉON
Je vais te dire, à toi. Ils ne savent pas, les autres ; on est là, devant l'ouvrage, on ne peut pourtant pas se croiser les bras. Ils disent que c'est une sale besogne, mais si on ne la fait pas, qui la fera ?

LE PAGE
Je ne sais pas, monsieur.

CRÉON
Bien sûr, tu ne sais pas. Tu en as de la chance ! Ce qu'il faudrait, c'est ne jamais savoir. Il te tarde d'être grand, toi ?

LE PAGE
Oh oui, monsieur !

CRÉON
Tu es fou, petit. Il faudrait ne jamais devenir grand. (L'heure sonne au loin, il murmure) Cinq heures. Qu'est-ce que nous avons aujourd'hui, à cinq heures ?

LE PAGE
Conseil, monsieur.

CRÉON
Eh bien, si nous avons conseil, petit, nous allons y aller.

Ils sortent, Créon s'appuyant sur le page.`,
  footnotes: "sourdement : d'une voix sourde, étouffée · sale besogne : travail ingrat et difficile · il te tarde : tu as hâte",
  questions: [
    {
      type: "table",
      text: "Complétez le tableau suivant :",
      points: 1,
      section: "contextualisation",
      fields: [
        { label: "Titre de l'œuvre", answer: "Antigone" },
        { label: "Nom et prénom de l'auteur", answer: "Jean Anouilh" },
        { label: "Genre littéraire", answer: "Tragédie moderne" },
        { label: "Siècle de publication", answer: "XXe siècle" }
      ]
    },
    {
      type: "qcm",
      text: "Le pronom « les » dans la première réplique de Créon (« Je les ai fait coucher ») remplace :",
      points: 0.5,
      section: "contextualisation",
      options: ["Ismène et Hémon", "Antigone et Hémon", "Œdipe et Jocaste"],
      correctIndex: 1,
      explanation: "« Les » désigne Antigone et Hémon. Créon a fait coucher leurs corps l'un près de l'autre après leur mort. Hémon s'est suicidé après avoir trouvé Antigone morte."
    },
    {
      type: "qcm",
      text: "« Ils ont fini, eux. » (Première réplique de Créon) Cette affirmation signifie :",
      points: 0.5,
      section: "contextualisation",
      options: ["Ils se sont mariés", "Ils ont trouvé la mort", "Ils se sont séparés"],
      correctIndex: 1,
      explanation: "Créon parle d'Antigone et Hémon qui sont morts. « Ils ont fini » signifie que leur souffrance est terminée — contrairement à Créon qui doit continuer à vivre et à gouverner."
    },
    {
      type: "short",
      text: "Relevez dans le texte un exemple de didascalie montrant la fatigue de Créon.",
      points: 1,
      section: "comprehension",
      answer: "Un temps. Il dit sourdement",
      alternatives: ["il dit sourdement", "un silence", "il murmure", "Créon s'appuyant sur le page", "s'appuyant sur le page", "Un temps"],
      explanation: "Plusieurs didascalies montrent l'épuisement de Créon : « Il dit sourdement » (voix étouffée), « il murmure », et surtout « Créon s'appuyant sur le page » — il a besoin de s'appuyer sur un enfant pour marcher."
    },
    {
      type: "qcm",
      text: "Eurydice est présentée par Créon comme :",
      points: 0.5,
      section: "comprehension",
      options: ["Une femme égoïste", "Une femme généreuse", "Une femme orgueilleuse"],
      correctIndex: 1,
      explanation: "Créon décrit Eurydice comme généreuse : elle fait « ses éternels tricots pour les pauvres ». Malgré son ton ironique, il reconnaît son dévouement envers les démunis."
    },
    {
      type: "qcm",
      text: "Le Chœur apprend à Créon qu'Eurydice est morte :",
      points: 0.5,
      section: "comprehension",
      options: ["Suite à une crise cardiaque", "Suite à un suicide"],
      correctIndex: 1,
      explanation: "Eurydice s'est suicidée : le Chœur dit qu'elle est passée dans sa chambre « pour s'y couper la gorge ». Elle s'est donné la mort en apprenant la mort de son fils Hémon."
    },
    {
      type: "qcm",
      text: "« C'est une sale besogne... » Cet énoncé veut dire :",
      points: 1,
      section: "comprehension",
      options: ["C'est un travail très reposant", "C'est une tâche très difficile", "C'est une occupation très amusante"],
      correctIndex: 1,
      explanation: "« Sale besogne » signifie un travail ingrat, difficile et désagréable. Créon parle du pouvoir et de la responsabilité de gouverner — un fardeau que personne d'autre ne veut assumer."
    },
    {
      type: "short",
      text: "Relevez dans la deuxième réplique du Chœur quatre mots appartenant au champ lexical du sommeil.",
      points: 1,
      section: "langue",
      answer: "dort / étendue / lits / calmes",
      alternatives: ["dort", "étendue", "lits", "calmes", "coucher", "reposés", "dorment", "dormir", "tranquillement"],
      explanation: "Le champ lexical du sommeil/repos est omniprésent : dort, étendue, lits, coucher, reposés, dorment, dormir, calmes, tranquillement. Il crée une ambiguïté entre le sommeil et la mort."
    },
    {
      type: "qcm",
      text: "La figure de style dominante dans la deuxième réplique de Créon (« ses tricots, de ses éternels tricots... tricots ») est :",
      points: 1,
      section: "langue",
      options: ["Une antithèse", "Une répétition", "Un oxymore"],
      correctIndex: 1,
      explanation: "Le mot « tricots » est répété trois fois dans la réplique de Créon. Cette répétition traduit l'ironie et l'agacement de Créon, mais aussi l'absurdité de la situation face à la mort."
    },
    {
      type: "input",
      text: "Transposez au discours indirect : « Les pauvres de Thèbes auront froid cet hiver. » en commençant par : Le Chœur affirma...",
      points: 1,
      section: "langue",
      sampleAnswer: "Le Chœur affirma que les pauvres de Thèbes auraient froid cet hiver-là."
    },
    {
      type: "input",
      text: "« Créon est un personnage terriblement seul qui parvient à vivre malgré la perte de ses proches. » Partagez-vous cette observation ? Justifiez.",
      points: 0.5,
      section: "reaction",
      sampleAnswer: "Oui, Créon est terriblement seul : il a perdu Antigone, Hémon et Eurydice. Pourtant, il continue à assumer son rôle de roi — il va au Conseil à cinq heures. Sa solitude est le prix du pouvoir et du devoir. Il « s'appuie sur le page » comme seul compagnon, ce qui rend sa situation encore plus tragique."
    },
    {
      type: "input",
      text: "« Ils dorment tous. C'est bien. » Êtes-vous d'accord avec cette affirmation de Créon ? Justifiez.",
      points: 0.5,
      section: "reaction",
      sampleAnswer: "Créon utilise le sommeil comme euphémisme pour la mort. En disant « c'est bien », il exprime un mélange de résignation et d'envie — les morts n'ont plus à souffrir, contrairement à lui. On peut comprendre sa lassitude, mais affirmer que la mort est « bien » est tragique et montre l'ampleur de son désespoir."
    }
  ],
  production: {
    sujet: "« Amusez-vous bien comme vous pouvez, sachez que devenir adulte implique beaucoup de responsabilités. »\n\nPartagez-vous l'opinion de cet écrivain ? Rédigez un texte d'une quinzaine de lignes dans lequel vous exposerez votre point de vue appuyé d'arguments et d'exemples.",
    points: 10,
    criteres: [
      "Respect de la consigne (répondre au sujet) — 2 pts",
      "Organisation cohérente (introduction, développement, conclusion) — 2 pts",
      "Précision des arguments, exemples et liens logiques — 2 pts",
      "Correction de la langue (syntaxe, vocabulaire, orthographe, conjugaison, ponctuation) — 4 pts"
    ]
  }
}

]; // end EXAMS
