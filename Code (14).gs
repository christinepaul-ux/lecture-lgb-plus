// ============================================================
//  LGB Primaire — Outil de lecture enregistrée
//  Google Apps Script — Backend
// ============================================================

const SHEET_NAME = 'Lectures';

// ── Web App entry point ──────────────────────────────────────
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Outil de lecture — LGB Primaire')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// ── Include helper for HTML templates ───────────────────────
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ── Save reading report to Google Sheets ────────────────────
function saveReport(report) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Date', 'Élève', 'Langue', 'Niveau',
      'Titre du texte', 'Mots total', 'Erreurs',
      '% précision', 'Détail erreurs', 'Texte annoté'
    ]);
    sheet.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#4a90d9').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  const accuracy = report.totalWords > 0
    ? Math.round(((report.totalWords - report.errorCount) / report.totalWords) * 100)
    : 100;

  sheet.appendRow([
    new Date(),
    report.studentName || '—',
    report.lang === 'fr' ? 'Français' : 'English',
    report.level || '—',
    report.textTitle || '—',
    report.totalWords,
    report.errorCount,
    accuracy + '%',
    report.errorDetails,
    report.annotatedText
  ]);

  return { success: true, accuracy };
}

// ── Predefined text library ──────────────────────────────────
function getTextLibrary() {
  return [
    // ── Français ────────────────────────────────────────────
    {
      id: 'fr_1a',
      lang: 'fr',
      level: '1A',
      title: 'Le chat et la souris',
      text: 'Le chat dort sur le tapis. La petite souris sort de son trou. Elle regarde le chat. Le chat ouvre un œil. La souris court très vite et se cache.'
    },
    {
      id: 'fr_1b',
      lang: 'fr',
      level: '1B',
      title: 'La pluie',
      text: 'Il pleut aujourd\'hui. Les enfants restent à la maison. Maman fait un gâteau au chocolat. Papa lit son journal. Le chien dort devant la cheminée. Tout le monde est bien au chaud.'
    },
    {
      id: 'fr_2a',
      lang: 'fr',
      level: '2A',
      title: 'Une journée à la ferme',
      text: 'Ce matin, Léa visite la ferme de son oncle. Elle voit des poules, des vaches et deux chevaux. Son oncle lui montre comment traire une vache. Le lait est encore chaud. Léa aime beaucoup la ferme. Elle voudrait y revenir bientôt.'
    },
    {
      id: 'fr_2b',
      lang: 'fr',
      level: '2B',
      title: 'L\'automne dans le parc',
      text: 'En automne, les feuilles des arbres changent de couleur. Elles deviennent jaunes, oranges et rouges. Le vent les emporte dans les airs. Les enfants adorent marcher dessus et entendre le bruit qu\'elles font. Les écureuils ramassent des noisettes pour l\'hiver. La nature se prépare au repos.'
    },
    {
      id: 'fr_3a',
      lang: 'fr',
      level: '3A',
      title: 'Le voyage de Marco',
      text: 'Marco rêve de voyager autour du monde depuis qu\'il est tout petit. Un jour, son père lui offre un atlas. Chaque soir, Marco l\'ouvre et choisit un pays imaginaire. Il s\'invente des aventures extraordinaires dans des jungles mystérieuses, sur des mers agitées ou dans des déserts brûlants. Ses rêves sont son plus beau voyage.'
    },
    {
      id: 'fr_3b',
      lang: 'fr',
      level: '3B',
      title: 'Les planètes',
      text: 'Notre système solaire est composé de huit planètes qui tournent autour du Soleil. La Terre est la seule planète où l\'on connaît la présence de la vie. Jupiter est la plus grande des planètes : elle est si immense qu\'on pourrait y faire tenir mille Terres. Saturne est célèbre pour ses magnifiques anneaux composés de glace et de roches.'
    },
    // ── English ─────────────────────────────────────────────
    {
      id: 'en_1a',
      lang: 'en',
      level: '1A',
      title: 'My dog',
      text: 'I have a dog. His name is Max. Max is brown and white. He likes to run and play. He eats from a big red bowl. Max sleeps next to my bed. I love my dog.'
    },
    {
      id: 'en_1b',
      lang: 'en',
      level: '1B',
      title: 'The garden',
      text: 'There is a big garden behind our house. Mum grows carrots, tomatoes and beans. Dad cuts the grass every Saturday. My little sister waters the flowers. We also have an apple tree. In autumn, we make apple pie together.'
    },
    {
      id: 'en_2a',
      lang: 'en',
      level: '2A',
      title: 'A rainy afternoon',
      text: 'It was a rainy afternoon. Tom could not play outside. He sat by the window and watched the drops run down the glass. His mother suggested reading a book. Tom chose a story about a young explorer. He read for two hours and forgot all about the rain.'
    },
    {
      id: 'en_2b',
      lang: 'en',
      level: '2B',
      title: 'The ocean',
      text: 'The ocean covers more than half of our planet. It is home to millions of animals, from tiny fish to the enormous blue whale. Coral reefs are like underwater cities full of colour and life. Sadly, pollution and rising temperatures are damaging these fragile ecosystems. We must protect our oceans for future generations.'
    },
    {
      id: 'en_3a',
      lang: 'en',
      level: '3A',
      title: 'A trip to the museum',
      text: 'Last week, our class visited the Natural History Museum. We saw dinosaur skeletons that were millions of years old. A guide explained how scientists discover fossils buried deep underground. My favourite exhibit was a model of a T-Rex that moved its head. I learnt so much and I want to become a palaeontologist one day.'
    },
    {
      id: 'en_3b',
      lang: 'en',
      level: '3B',
      title: 'The invention of the printing press',
      text: 'Before the printing press was invented, books had to be copied by hand, which took months or even years. In the fifteenth century, Johannes Gutenberg developed a machine that could print pages quickly using moveable metal letters. This invention transformed the world: knowledge could be shared widely for the first time. Books became cheaper, and more people learned to read.'
    }
  ];
}
