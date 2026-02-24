/**
 * LEXICON — script.js
 * Fully self-contained — data embedded inline as fallback.
 * All DOM IDs match index.html exactly.
 */

/* ── INLINE DATA FALLBACK ────────────────────────────────────
   Used when fetch('data.json') fails (local file:// protocol).
   Identical structure to data.json.
───────────────────────────────────────────────────────────── */
const INLINE_DATA = [
  {id:1,word:"Algorithm",letter:"A",category:"Tech",phonetic:"/ˈælɡərɪðəm/",pos:"noun",short:"A step-by-step procedure for solving a problem or accomplishing a task.",full:"An algorithm is a finite sequence of well-defined instructions used to solve a class of problems or perform a computation. Algorithms are used as specifications for performing calculations and data processing. In mathematics and computer science, an algorithm is a method expressed in finite space and time, in a well-defined formal language, for calculating a function. Starting from an initial state and input, the instructions describe a computation that proceeds through a finite number of successive states, eventually producing an output.",example:"\"The search algorithm returned results in milliseconds.\"",origin:"From Arabic al-Khwārizmī, after mathematician Muhammad ibn Musa al-Khwarizmi (c. 780–850 CE).",tags:["Data Structure","Recursion","Complexity"]},
  {id:2,word:"Axiom",letter:"A",category:"Science",phonetic:"/ˈæksiəm/",pos:"noun",short:"A statement taken to be self-evidently true, requiring no proof.",full:"An axiom is a statement taken to be true, serving as a premise or starting point for further reasoning. The word comes from Greek ἀξίωμα (axíōma), meaning 'that which is thought worthy or fit.' In classical logic and axiomatic systems, an axiom is a foundational principle upon which other truths are built. Axioms are not proven — they are the bedrock assumptions that make a formal system coherent and functional.",example:"\"In Euclidean geometry, the parallel postulate is a foundational axiom.\"",origin:"From Latin axioma, from Greek axiōma, from axios (worthy).",tags:["Postulate","Theorem","Logic"]},
  {id:3,word:"Bandwidth",letter:"B",category:"Tech",phonetic:"/ˈbændwɪdθ/",pos:"noun",short:"The maximum rate of data transfer across a network connection.",full:"Bandwidth refers to the maximum rate at which data can be transferred over a network connection in a given time. It is measured in bits per second (bps), kilobits (Kbps), megabits (Mbps), or gigabits per second (Gbps). In modern colloquial use, bandwidth also describes a person's cognitive or emotional capacity to handle tasks.",example:"\"The server upgrade doubled our available bandwidth.\"",origin:"From band (a range of frequencies) + width, coined in early 20th-century radio engineering.",tags:["Latency","Throughput","Network"]},
  {id:4,word:"Byzantine",letter:"B",category:"History",phonetic:"/ˈbɪzəntiːn/",pos:"adjective",short:"Excessively complicated, often with devious or underhand motives.",full:"Byzantine refers to anything relating to Byzantium or the Eastern Roman Empire (330–1453 CE), known for its intricate political intrigues and elaborate ceremonial practices. In modern English, byzantine (lowercase) describes systems that are excessively complicated, convoluted, or secretive — often implying unnecessary complexity or underhand political maneuver.",example:"\"Navigating the company's byzantine approval process took weeks.\"",origin:"From Late Latin Byzantinus, from Byzantium (modern Istanbul).",tags:["Constantinople","Eastern Roman Empire","Labyrinthine"]},
  {id:5,word:"Cognition",letter:"C",category:"Science",phonetic:"/kɒɡˈnɪʃən/",pos:"noun",short:"The mental action of acquiring knowledge through thought and experience.",full:"Cognition is the mental process of acquiring knowledge and understanding through thought, experience, and the senses. It encompasses attention, memory, judgment, reasoning, problem-solving, decision-making, and language production. Cognitive science studies these processes across linguistics, psychology, neuroscience, philosophy, and artificial intelligence.",example:"\"Sleep deprivation significantly impairs cognition and decision-making.\"",origin:"From Latin cognitio, from cognoscere (to get to know).",tags:["Perception","Memory","Consciousness"]},
  {id:6,word:"Corpus",letter:"C",category:"Language",phonetic:"/ˈkɔːpəs/",pos:"noun",short:"A collection of written or spoken texts used for linguistic analysis.",full:"A corpus (plural: corpora) is a large structured collection of texts used for linguistic analysis, natural language processing, and computational linguistics. A corpus provides real-world language data to study grammar patterns, word frequency, collocations, and language change over time. Modern language models are trained on corpora containing billions of words.",example:"\"Researchers analyzed a 10-million-word corpus to study language evolution.\"",origin:"From Latin corpus, meaning 'body'. The linguistic sense emerged in the 20th century.",tags:["Linguistics","Lexicography","NLP"]},
  {id:7,word:"Dialectic",letter:"D",category:"Language",phonetic:"/ˌdaɪəˈlɛktɪk/",pos:"noun",short:"The art of investigating truth through logical discussion and reasoned argument.",full:"Dialectic is a form of logical argumentation at the center of philosophy since antiquity. In classical philosophy it referred to the Socratic method of eliciting truth through question and answer. In Hegelian philosophy, the dialectic describes thesis → antithesis → synthesis. Broadly, it refers to any structured debate intended to discover truth through reasoned discourse.",example:"\"The Socratic dialectic exposed the contradictions in his opponent's reasoning.\"",origin:"From Latin dialectica, from Greek dialektikē (the art of debate).",tags:["Logic","Rhetoric","Epistemology"]},
  {id:8,word:"Entropy",letter:"E",category:"Science",phonetic:"/ˈɛntrəpi/",pos:"noun",short:"A thermodynamic quantity representing disorder or randomness in a system.",full:"Entropy is most commonly associated with disorder, randomness, or uncertainty. In thermodynamics it was defined as a state function. In statistical mechanics, entropy is defined by S = k ln W (Boltzmann's equation). The second law of thermodynamics states entropy of an isolated system can only increase. Information theory extended the concept — Shannon defined information entropy as uncertainty in a message.",example:"\"The broken coffee cup illustrates entropy — disorder increases naturally.\"",origin:"Coined by Rudolf Clausius in 1865, from Greek entropē, meaning 'a turning toward'.",tags:["Thermodynamics","Information Theory","Chaos"]},
  {id:9,word:"Epistemology",letter:"E",category:"Science",phonetic:"/ɪˌpɪstɪˈmɒlədʒi/",pos:"noun",short:"The branch of philosophy concerned with the nature and scope of knowledge.",full:"Epistemology is the philosophical theory of knowledge. It studies the nature of knowledge, justification, and the rationality of belief. Central questions: What is knowledge? How is it acquired? What are its limits? Major positions include empiricism (knowledge from experience), rationalism (knowledge from reason), constructivism, and skepticism.",example:"\"Descartes' Meditations is a cornerstone of modern epistemology.\"",origin:"From Greek episteme (knowledge) + logos (study), coined in the 19th century.",tags:["Philosophy","Ontology","Metaphysics"]},
  {id:10,word:"Fibonacci",letter:"F",category:"Science",phonetic:"/ˌfɪbəˈnɑːtʃi/",pos:"noun",short:"A sequence where each number is the sum of the two preceding: 0, 1, 1, 2, 3, 5, 8…",full:"The Fibonacci sequence, introduced to the West by Leonardo of Pisa (Fibonacci) in 1202, appears throughout nature — in leaf arrangements, sunflower seeds, and tree branching. The ratio of consecutive Fibonacci numbers converges to the golden ratio (φ ≈ 1.618), which has deep aesthetic and mathematical significance.",example:"\"The spiral of a nautilus shell mirrors the Fibonacci sequence.\"",origin:"Named after Leonardo Bonacci (Fibonacci), 13th-century Italian mathematician.",tags:["Golden Ratio","Number Theory","Pattern"]},
  {id:11,word:"Gestalt",letter:"G",category:"Science",phonetic:"/ɡəˈʃtɑːlt/",pos:"noun",short:"An organized whole perceived as more than the sum of its parts.",full:"Gestalt (German: 'shape' or 'form') refers to the psychological concept that the mind processes information as a unified whole. Founded by Max Wertheimer, Wolfgang Köhler, and Kurt Koffka, Gestalt psychology proposed humans perceive patterns as wholes. Its principles — proximity, similarity, continuity, and closure — describe how we naturally group visual elements.",example:"\"The logo worked due to gestalt — each element contributed to a unified impression.\"",origin:"German Gestalt, meaning 'form'. Entered English in the 1920s.",tags:["Psychology","Perception","Design"]},
  {id:12,word:"Heuristic",letter:"H",category:"Tech",phonetic:"/hjʊˈrɪstɪk/",pos:"noun / adjective",short:"A practical problem-solving approach that is efficient but not guaranteed optimal.",full:"A heuristic is any approach to problem-solving that employs a practical method not guaranteed to be perfect but sufficient for reaching an immediate goal. In cognitive psychology, heuristics are simple rules the brain uses to judge quickly. In computer science, heuristic algorithms trade optimality for speed. In everyday use, a heuristic is a rule of thumb.",example:"\"'If it sounds too good to be true' is a common heuristic for detecting scams.\"",origin:"From Greek heuriskein (to find or discover), related to Archimedes' 'Eureka!'",tags:["Algorithm","Bias","Optimization"]},
  {id:13,word:"Iconoclast",letter:"I",category:"History",phonetic:"/aɪˈkɒnəklæst/",pos:"noun",short:"A person who attacks or criticizes cherished beliefs and institutions.",full:"An iconoclast challenges established beliefs, customs, and institutions — often to replace them with something new. The word originates from Byzantine iconoclasm of the 8th–9th centuries, when religious authorities destroyed sacred images. In contemporary usage, an iconoclast disrupts entrenched norms in art, politics, science, or technology.",example:"\"Steve Jobs was celebrated as a tech iconoclast who reimagined personal computing.\"",origin:"From Greek eikonoklastēs, from eikon (image) + klan (to break). Entered English 17th century.",tags:["Heretic","Revolutionary","Orthodoxy"]},
  {id:14,word:"Juxtaposition",letter:"J",category:"Language",phonetic:"/ˌdʒʌkstəpəˈzɪʃən/",pos:"noun",short:"Placing two things side by side to highlight contrast or comparison.",full:"Juxtaposition places two elements side by side to highlight contrast or draw comparison. As a literary and rhetorical device, contrasting ideas or images are placed together to create striking effect or reveal irony. In visual arts, it is central to collage, montage, and graphic design. In literature, it develops character and heightens dramatic tension.",example:"\"The film used juxtaposition to contrast wealth and poverty in adjacent scenes.\"",origin:"From Latin juxta (near) + positio (placing), entering English in the 17th century.",tags:["Contrast","Foil","Antithesis"]},
  {id:15,word:"Kernel",letter:"K",category:"Tech",phonetic:"/ˈkɜːrnəl/",pos:"noun",short:"The core component of an operating system, managing system resources.",full:"In computing, the kernel is the core of an operating system, managing resources and communication between hardware and software. It handles memory management, process scheduling, device drivers, system calls, and security. Kernels are classified as monolithic (Linux), microkernels, or hybrid (macOS's XNU). The kernel runs at the highest privilege level — ring 0 — with direct hardware access.",example:"\"The Linux kernel is one of the most widely deployed pieces of software in the world.\"",origin:"Old English cyrnel, diminutive of corn (grain). Computing sense coined mid-20th century.",tags:["Operating System","Memory Management","Linux"]},
  {id:16,word:"Laconic",letter:"L",category:"Language",phonetic:"/ləˈkɒnɪk/",pos:"adjective",short:"Using very few words; brief and concise in speech or expression.",full:"Laconic means using very few words to express much — brief, terse, and to the point. The word derives from Laconia (Sparta), whose inhabitants were famously known for pithy speech. Spartans believed economy of words reflected strength. The most famous laconic exchange: when Philip of Macedon threatened to level Laconia, the Spartans replied with a single word: 'If.'",example:"\"His laconic reply — 'No' — ended the negotiation immediately.\"",origin:"From Latin Laconicus, from Greek Lakōnikos, relating to Laconia (ancient Sparta).",tags:["Terse","Succinct","Spartan"]},
  {id:17,word:"Metonymy",letter:"M",category:"Language",phonetic:"/mɪˈtɒnɪmi/",pos:"noun",short:"A figure of speech where something is referred to by something closely associated with it.",full:"Metonymy substitutes one word or phrase for another with which it is closely associated. Unlike metaphor (similarity), metonymy substitutes based on a real-world relationship. Examples: 'the Crown' for monarchy, 'the press' for journalism, 'Washington' for the U.S. government. Metonymy is a fundamental cognitive mechanism for understanding abstract concepts through concrete ones.",example:"\"'The pen is mightier than the sword' uses metonymy for writing and warfare.\"",origin:"From Latin metonymia, from Greek metōnumia, from meta (change) + onyma (name).",tags:["Metaphor","Synecdoche","Rhetoric"]},
  {id:18,word:"Nihilism",letter:"N",category:"History",phonetic:"/ˈnaɪɪlɪzəm/",pos:"noun",short:"The rejection of all religious and moral principles as meaningless.",full:"Nihilism is the philosophical doctrine that life has no intrinsic meaning, purpose, or value. Nietzsche's 'God is dead' was a diagnosis of nihilism — not an endorsement — warning that losing transcendent frameworks would create a crisis of meaning. Forms include metaphysical, epistemological, moral, and existential nihilism.",example:"\"His political nihilism left him indifferent to every ideology and institution.\"",origin:"From Latin nihil (nothing) + -ism. Popularized in 19th-century Russia as a political movement.",tags:["Existentialism","Absurdism","Nietzsche"]},
  {id:19,word:"Ontology",letter:"O",category:"Science",phonetic:"/ɒnˈtɒlədʒi/",pos:"noun",short:"The branch of philosophy dealing with the nature of being and existence.",full:"Ontology studies being, existence, and reality. It asks: What kinds of things exist? What are the most basic features of reality? In information science and AI, an ontology is a formal representation of concepts, categories, and their relationships within a domain — used to structure knowledge for machines.",example:"\"The ontology of the database mapped relationships between all medical concepts.\"",origin:"From Greek ontologia, from ontos (being) + logos (study). Coined 17th century.",tags:["Metaphysics","Epistemology","Philosophy"]},
  {id:20,word:"Paradigm",letter:"P",category:"Science",phonetic:"/ˈpærədaɪm/",pos:"noun",short:"A framework of assumptions and practices constituting a way of viewing reality.",full:"A paradigm is a framework of assumptions, concepts, values, and practices constituting a way of viewing reality. Thomas Kuhn (The Structure of Scientific Revolutions, 1962) argued science progresses through periodic 'paradigm shifts' — revolutionary changes that fundamentally alter understanding. Examples: the Copernican revolution, Darwinian evolution, Einsteinian relativity.",example:"\"The invention of the internet represented a paradigm shift in communication.\"",origin:"From Late Latin paradigma, from Greek paradeigma (pattern).",tags:["Kuhn","Framework","Revolution"]},
  {id:21,word:"Recursion",letter:"R",category:"Tech",phonetic:"/rɪˈkɜːrʒən/",pos:"noun",short:"The process of a function calling itself as a step in its own execution.",full:"Recursion is a method where the solution to a problem depends on solutions to smaller instances of the same problem. A recursive function calls itself in its own definition and must have a base case to prevent infinite loops. Common examples: computing factorials, traversing tree structures, merge sort and quicksort. Recursion also appears in linguistics and mathematics.",example:"\"To understand recursion, you must first understand recursion.\"",origin:"From Latin recursio, from recurrere (to run back), from re- + currere (to run).",tags:["Algorithm","Stack","Iteration"]},
  {id:22,word:"Semiotics",letter:"S",category:"Language",phonetic:"/ˌsiːmiˈɒtɪks/",pos:"noun",short:"The study of signs and symbols and their interpretation and use.",full:"Semiotics is the philosophical study of signs, symbols, and signification — how meaning is created and communicated. Developed independently by Ferdinand de Saussure and Charles Sanders Peirce. Saussure distinguished between the signifier (sound-image) and the signified (the concept). Semiotics extends to language, cinema, fashion, advertising, and architecture.",example:"\"The red octagon is a semiotic symbol understood globally without words.\"",origin:"From Greek sēmeiōtikos (of signs), from sēmeion (sign).",tags:["Linguistics","Structuralism","Symbol"]},
  {id:23,word:"Tautology",letter:"T",category:"Language",phonetic:"/tɔːˈtɒlədʒi/",pos:"noun",short:"A statement that is necessarily true; or, unnecessary repetition of an idea.",full:"A tautology is a statement true by virtue of its logical form — it cannot be false (e.g., 'It will either rain or not rain'). In rhetoric, tautology is unnecessary repetition (e.g., 'free gift'). While rhetoric views it as a flaw, logic treats tautologies as foundational — the basis of propositional logic.",example:"\"'The car is either moving or not moving' is a logical tautology.\"",origin:"From Late Latin tautologia, from Greek, from tauto (the same) + logos (word).",tags:["Logic","Redundancy","Pleonasm"]},
  {id:24,word:"Turing Test",letter:"T",category:"Tech",phonetic:"/ˈtjʊərɪŋ tɛst/",pos:"noun",short:"A test of a machine's ability to exhibit intelligent behavior indistinguishable from a human.",full:"The Turing Test, proposed by Alan Turing in 1950 ('Computing Machinery and Intelligence'), tests whether a machine can exhibit behavior indistinguishable from a human. In the 'Imitation Game,' a human evaluator converses with both a machine and a human. If the evaluator cannot reliably distinguish them, the machine passes. The test remains enormously influential but has been widely criticized as insufficient for defining true intelligence.",example:"\"GPT-4 is widely considered to have passed informal versions of the Turing Test.\"",origin:"Named after Alan Turing (1912–1954), British mathematician and pioneer of theoretical computer science.",tags:["AI","Consciousness","Alan Turing"]},
  {id:25,word:"Zeitgeist",letter:"Z",category:"History",phonetic:"/ˈzaɪtɡaɪst/",pos:"noun",short:"The defining spirit or mood of a particular period of history.",full:"Zeitgeist (German: Zeit 'time' + Geist 'spirit') refers to the intellectual, cultural, ethical, and political climate of an era — the invisible framework of shared beliefs that define a historical period. Popularized by Hegel and Herder, who argued each epoch has its own spirit shaping events, art, and thought.",example:"\"Social media surveillance anxiety has become the defining zeitgeist of the 2020s.\"",origin:"German compound: Zeit (time) + Geist (spirit). Popularized by Hegel (1770–1831).",tags:["Culture","Hegelian","Historical Period"]}
];

/* ── STATE ────────────────────────────────────────────────── */
const state = {
  allWords:     [],   // from data.json (or inline fallback)
  userWords:    [],   // from localStorage
  filtered:     [],   // currently rendered
  query:        '',
  category:     'All',
  activeLetter: null,
  sort:         'alpha',
};

/* ── DOM REFS ─────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const $$ = sel => [...document.querySelectorAll(sel)];

const el = {
  loader:      $('loader'),
  navbar:      $('navbar'),
  searchInput: $('search-input'),
  searchClear: $('search-clear'),
  cardGrid:    $('card-grid'),
  emptyState:  $('empty-state'),
  resultsBar:  $('results-bar'),
  alphaNav:    $('alpha-nav'),
  themeTgl:    $('theme-toggle'),
  iconMoon:    $('icon-moon'),
  iconSun:     $('icon-sun'),
  menuToggle:  $('menu-toggle'),
  mobileNav:   $('mobile-nav'),
  resetBtn:    $('reset-btn'),
  scrollTop:   $('scroll-top'),
  wordCount:   $('word-count'),
  catCount:    $('cat-count'),
  modalOverlay:$('modal-overlay'),
  modalClose:  $('modal-close'),
  modalContent:$('modal-content'),
  submitForm:  $('submit-form'),
  formStatus:  $('form-status'),
  subSection:  $('submitted-words-section'),
  subList:     $('submitted-list'),
};

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const STORE_WORDS = 'lex-user-words';
const STORE_THEME = 'lex-theme';

/* ══════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════ */
async function init() {
  // Restore theme (also done inline in HTML to prevent flash)
  applyTheme(localStorage.getItem(STORE_THEME) || 'light');

  // Try fetch first (works on GitHub Pages / local server),
  // fall back to inline data when opening as file://
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error('not ok');
    state.allWords = await res.json();
  } catch(_) {
    state.allWords = INLINE_DATA;
  }

  // Load user submissions from localStorage
  try { state.userWords = JSON.parse(localStorage.getItem(STORE_WORDS) || '[]'); }
  catch(_) { state.userWords = []; }

  // Update hero stats
  updateCounts();

  // Build UI controls
  buildAlphaNav();
  renderSubmittedList();

  // First render
  applyFilters();

  // Wire all events
  wireEvents();

  // Dismiss loader and reveal hero
  setTimeout(() => {
    el.loader.classList.add('hidden');
    $$('.reveal').forEach((e, i) => {
      setTimeout(() => e.classList.add('visible'), i * 80);
    });
    animateCards();
  }, 1100);
}

/* ══════════════════════════════════════════════════════════
   EVENTS
══════════════════════════════════════════════════════════ */
function wireEvents() {
  // Search
  el.searchInput.addEventListener('input', () => {
    state.query = el.searchInput.value.trim().toLowerCase();
    el.searchClear.hidden = !state.query;
    state.activeLetter = null;
    updateAlphaActive();
    applyFilters();
  });
  el.searchClear.addEventListener('click', () => clearSearch(true));

  // Category pills (delegated)
  $$('[data-category]').forEach(btn =>
    btn.addEventListener('click', () => {
      state.category = btn.dataset.category;
      $$('[data-category]').forEach(b => b.classList.toggle('active', b.dataset.category === state.category));
      state.activeLetter = null;
      updateAlphaActive();
      showResetIfNeeded();
      applyFilters();
    })
  );

  // Sort pills
  $$('[data-sort]').forEach(btn =>
    btn.addEventListener('click', () => {
      state.sort = btn.dataset.sort;
      $$('[data-sort]').forEach(b => b.classList.toggle('active', b.dataset.sort === state.sort));
      applyFilters();
    })
  );

  // Reset
  el.resetBtn.addEventListener('click', resetAll);

  // Theme
  el.themeTgl.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(STORE_THEME, next);
  });

  // Mobile menu
  el.menuToggle.addEventListener('click', () => {
    const open = el.mobileNav.classList.toggle('open');
    el.menuToggle.setAttribute('aria-expanded', String(open));
    el.mobileNav.setAttribute('aria-hidden', String(!open));
  });
  $$('.mobile-link').forEach(l => l.addEventListener('click', () => {
    el.mobileNav.classList.remove('open');
    el.menuToggle.setAttribute('aria-expanded','false');
    el.mobileNav.setAttribute('aria-hidden','true');
  }));
  document.addEventListener('click', e => {
    if (!el.navbar.contains(e.target)) {
      el.mobileNav.classList.remove('open');
      el.menuToggle.setAttribute('aria-expanded','false');
    }
  });

  // Scroll
  window.addEventListener('scroll', () => {
    el.navbar.classList.toggle('scrolled', window.scrollY > 20);
    if (window.scrollY > 400) el.scrollTop.removeAttribute('hidden');
    else el.scrollTop.setAttribute('hidden','');
  }, { passive: true });
  el.scrollTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  // Modal
  el.modalClose.addEventListener('click', closeModal);
  el.modalOverlay.addEventListener('click', e => { if (e.target === el.modalOverlay) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      el.searchInput.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Submit form
  el.submitForm.addEventListener('submit', handleSubmit);
}

/* ══════════════════════════════════════════════════════════
   FILTER & RENDER
══════════════════════════════════════════════════════════ */
function applyFilters() {
  let results = [...state.allWords, ...state.userWords];

  if (state.category !== 'All')
    results = results.filter(w => w.category === state.category);

  if (state.query)
    results = results.filter(w =>
      w.word.toLowerCase().includes(state.query) ||
      w.short.toLowerCase().includes(state.query) ||
      (w.full && w.full.toLowerCase().includes(state.query)) ||
      (w.tags && w.tags.some(t => t.toLowerCase().includes(state.query)))
    );

  if (state.activeLetter)
    results = results.filter(w => w.word[0].toUpperCase() === state.activeLetter);

  if (state.sort === 'alpha')
    results.sort((a, b) => a.word.localeCompare(b.word));
  else
    results.sort((a, b) => {
      if (a._user && !b._user) return -1;
      if (!a._user && b._user) return 1;
      return (b.id || 0) - (a.id || 0);
    });

  state.filtered = results;
  updateResultsBar();
  renderCards();
  showResetIfNeeded();
}

function updateResultsBar() {
  const total = state.allWords.length + state.userWords.length;
  const n = state.filtered.length;
  const isFiltered = state.query || state.category !== 'All' || state.activeLetter;
  el.resultsBar.textContent = isFiltered
    ? `Showing ${n} of ${total} definition${total !== 1 ? 's' : ''}`
    : `${total} definition${total !== 1 ? 's' : ''}`;
}

function renderCards() {
  // Brief fade during swap
  el.cardGrid.classList.remove('visible');
  el.cardGrid.classList.add('filtering');

  setTimeout(() => {
    el.cardGrid.innerHTML = '';

    if (!state.filtered.length) {
      el.emptyState.removeAttribute('hidden');
      el.cardGrid.classList.remove('filtering');
      el.cardGrid.classList.add('visible');
      return;
    }
    el.emptyState.setAttribute('hidden','');

    const showLetterHeadings = state.sort === 'alpha' && !state.activeLetter && !state.query;
    const frag = document.createDocumentFragment();
    let currentLetter = '';

    state.filtered.forEach(word => {
      const firstLetter = word.word[0].toUpperCase();

      if (showLetterHeadings && firstLetter !== currentLetter) {
        currentLetter = firstLetter;
        const h = document.createElement('div');
        h.className = 'letter-heading';
        h.id = `letter-${currentLetter}`;
        h.textContent = currentLetter;
        frag.appendChild(h);
      }

      frag.appendChild(makeCard(word));
    });

    el.cardGrid.appendChild(frag);
    el.cardGrid.classList.remove('filtering');
    el.cardGrid.classList.add('visible');
    animateCards();
  }, 120);
}

/* ── CARD DOM BUILDER ──────────────────────────────────── */
function makeCard(word) {
  const card = document.createElement('div');
  card.className = 'word-card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Open definition of ${word.word}`);

  const tagsHtml = (word.tags || [])
    .map(t => `<span class="tag">${esc(t)}</span>`)
    .join('');

  card.innerHTML = `
    <div class="card-top">
      <div class="card-left">
        <div class="card-word">${highlightQuery(word.word)}</div>
        <div class="card-meta-line">
          ${word.phonetic ? `<span class="card-phonetic">${esc(word.phonetic)}</span>` : ''}
          ${word.pos      ? `<span class="card-pos">${esc(word.pos)}</span>` : ''}
        </div>
      </div>
      <span class="card-badge">${esc(word.category)}</span>
    </div>
    <p class="card-short">${highlightQuery(word.short)}</p>
    ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ''}
    <div class="card-footer">
      <button class="card-expand-btn" tabindex="-1" aria-hidden="true">
        Read more
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>
      ${word._user ? '<span class="card-submitted-badge">User</span>' : ''}
    </div>`;

  const open = () => openModal(word);
  card.addEventListener('click', open);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });

  // Tag search
  card.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', e => {
      e.stopPropagation();
      el.searchInput.value = tag.textContent;
      state.query = tag.textContent.toLowerCase();
      el.searchClear.hidden = false;
      state.activeLetter = null;
      updateAlphaActive();
      applyFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  return card;
}

/* ── CARD ANIMATIONS ──────────────────────────────────── */
function animateCards() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('card-visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.04, rootMargin: '0px 0px -10px 0px' });
  $$('.word-card').forEach(c => io.observe(c));
}

/* ══════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════ */
function openModal(word) {
  const tagsHtml = (word.tags || [])
    .map(t => `<span class="tag" style="cursor:pointer">${esc(t)}</span>`)
    .join('');

  el.modalContent.innerHTML = `
    <p class="modal-eyebrow">${esc(word.category)}</p>
    <h2 class="modal-word" id="modal-word-title">${esc(word.word)}</h2>
    <span class="modal-category-badge">${esc(word.letter || word.word[0])} &mdash; ${esc(word.category)}</span>
    ${word.phonetic ? `<span class="modal-category-badge" style="margin-left:8px">${esc(word.phonetic)}</span>` : ''}
    ${word.pos      ? `<span class="modal-category-badge" style="margin-left:8px;font-style:italic">${esc(word.pos)}</span>` : ''}

    <hr class="modal-divider"/>
    <p class="modal-short">${esc(word.short)}</p>

    ${word.full ? `<hr class="modal-divider"/><p class="modal-full">${esc(word.full)}</p>` : ''}

    ${word.example ? `
    <hr class="modal-divider"/>
    <p class="modal-detail-label">Example</p>
    <p class="modal-example">${esc(word.example)}</p>` : ''}

    ${word.origin ? `
    <hr class="modal-divider"/>
    <p class="modal-detail-label">Etymology</p>
    <p class="modal-origin">${esc(word.origin)}</p>` : ''}

    ${tagsHtml ? `
    <hr class="modal-divider"/>
    <p class="modal-tags-label">Related topics</p>
    <div class="modal-tags">${tagsHtml}</div>` : ''}

    ${word._user ? '<hr class="modal-divider"/><p style="font-family:var(--font-mono);font-size:.7rem;color:var(--text-3);letter-spacing:.08em">USER SUBMISSION</p>' : ''}`;

  el.modalOverlay.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => el.modalClose.focus());

  // Tag clicks within modal
  el.modalContent.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => {
      closeModal();
      el.searchInput.value = tag.textContent;
      state.query = tag.textContent.toLowerCase();
      el.searchClear.hidden = false;
      state.activeLetter = null;
      updateAlphaActive();
      applyFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function closeModal() {
  el.modalOverlay.setAttribute('hidden','');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════════════════════
   ALPHABET NAV
══════════════════════════════════════════════════════════ */
function buildAlphaNav() {
  const used = new Set([...state.allWords, ...state.userWords].map(w => w.word[0].toUpperCase()));
  el.alphaNav.innerHTML = '';
  const frag = document.createDocumentFragment();

  ALPHA.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'alpha-btn';
    btn.textContent = letter;
    btn.dataset.letter = letter;
    btn.setAttribute('aria-label', `Filter by ${letter}`);
    if (!used.has(letter)) btn.disabled = true;
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      state.activeLetter = state.activeLetter === letter ? null : letter;
      if (state.activeLetter) clearSearch(false);
      updateAlphaActive();
      showResetIfNeeded();
      applyFilters();
      if (state.activeLetter) {
        setTimeout(() => {
          const sec = document.getElementById(`letter-${letter}`);
          sec && sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 180);
      }
    });
    frag.appendChild(btn);
  });
  el.alphaNav.appendChild(frag);
}

function updateAlphaActive() {
  $$('.alpha-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.letter === state.activeLetter)
  );
}

/* ══════════════════════════════════════════════════════════
   THEME
══════════════════════════════════════════════════════════ */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  el.iconMoon.classList.toggle('hidden', theme === 'dark');
  el.iconSun.classList.toggle('hidden', theme === 'light');
}

/* ══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════ */
function esc(s) {
  return String(s || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function highlightQuery(text) {
  if (!state.query) return esc(text);
  const safe = state.query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return esc(text).replace(new RegExp(`(${safe})`, 'gi'),
    '<mark style="background:transparent;border-bottom:1.5px solid currentColor;font-weight:600">$1</mark>');
}

function clearSearch(rerender) {
  state.query = '';
  el.searchInput.value = '';
  el.searchClear.hidden = true;
  if (rerender) applyFilters();
}

function resetAll() {
  clearSearch(false);
  state.category     = 'All';
  state.activeLetter = null;
  state.sort         = 'alpha';
  $$('[data-category]').forEach(b => b.classList.toggle('active', b.dataset.category === 'All'));
  $$('[data-sort]').forEach(b => b.classList.toggle('active', b.dataset.sort === 'alpha'));
  updateAlphaActive();
  el.resetBtn.setAttribute('hidden','');
  applyFilters();
}

function showResetIfNeeded() {
  const active = state.query || state.category !== 'All' || state.activeLetter;
  if (active) el.resetBtn.removeAttribute('hidden');
  else el.resetBtn.setAttribute('hidden','');
}

function updateCounts() {
  const total = state.allWords.length + state.userWords.length;
  if (el.wordCount) el.wordCount.textContent = total;
  if (el.catCount)  el.catCount.textContent  = new Set(state.allWords.map(w => w.category)).size;
}

/* ══════════════════════════════════════════════════════════
   SUBMIT FORM
══════════════════════════════════════════════════════════ */
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const word     = (form.word.value || '').trim();
  const category = (form.category.value || '').trim();
  const short    = (form.short.value || '').trim();
  const full     = (form.full.value || '').trim();

  // Validation
  let ok = true;
  [form.word, form.category, form.short].forEach(f => {
    f.classList.remove('error');
    if (!f.value.trim()) { f.classList.add('error'); ok = false; }
  });
  if (!ok) return setStatus('Please fill in all required fields.', 'error');

  // Duplicate check
  const all = [...state.allWords, ...state.userWords];
  if (all.some(w => w.word.toLowerCase() === word.toLowerCase()))
    return setStatus(`"${word}" already exists in the dictionary.`, 'error');

  const entry = {
    id:       Date.now(),
    word,
    letter:   word[0].toUpperCase(),
    category,
    phonetic: '',
    pos:      '',
    short,
    full:     full || null,
    example:  null,
    origin:   null,
    tags:     [],
    _user:    true,
  };

  state.userWords.unshift(entry);
  localStorage.setItem(STORE_WORDS, JSON.stringify(state.userWords));
  updateCounts();
  buildAlphaNav();
  updateAlphaActive();
  applyFilters();
  renderSubmittedList();
  form.reset();
  setStatus(`"${word}" added successfully!`, 'success');
}

function setStatus(msg, type) {
  el.formStatus.textContent = msg;
  el.formStatus.className   = `form-status ${type}`;
  setTimeout(() => { el.formStatus.textContent = ''; el.formStatus.className = 'form-status'; }, 4000);
}

function renderSubmittedList() {
  if (!el.subSection) return;
  if (!state.userWords.length) { el.subSection.setAttribute('hidden',''); return; }
  el.subSection.removeAttribute('hidden');
  el.subList.innerHTML = '';

  state.userWords.forEach(w => {
    const item = document.createElement('div');
    item.className = 'submitted-item';
    item.innerHTML = `
      <div>
        <div class="submitted-word-title">${esc(w.word)}</div>
        <div class="submitted-word-def">${esc(w.short)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
        <span class="submitted-word-cat">${esc(w.category)}</span>
        <button class="submitted-delete" aria-label="Delete ${esc(w.word)}">&#10005;</button>
      </div>`;
    item.querySelector('.submitted-delete').addEventListener('click', () => {
      state.userWords = state.userWords.filter(u => u.id !== w.id);
      localStorage.setItem(STORE_WORDS, JSON.stringify(state.userWords));
      updateCounts();
      buildAlphaNav();
      updateAlphaActive();
      applyFilters();
      renderSubmittedList();
    });
    el.subList.appendChild(item);
  });
}

/* ══════════════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', init);
