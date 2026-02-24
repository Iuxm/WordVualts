/**
 * LEXICON — script.js
 * Pure vanilla JavaScript dictionary platform
 * Features: live search, category/alpha filters, expandable cards,
 *   dark/light toggle, word submission (localStorage), scroll animations
 */

/* ─── STATE ────────────────────────────────────────────────── */
const state = {
  allWords:  [],      // Words from data.json
  userWords: [],      // Words from localStorage
  filtered:  [],      // Currently displayed
  query:     '',
  category:  'All',
  activeLetter: null,
  sort:      'alpha', // 'alpha' | 'recent'
};

/* ─── DOM HELPERS ──────────────────────────────────────────── */
const $ = sel => document.querySelector(sel);
const $$ = sel => [...document.querySelectorAll(sel)];

const els = {
  loader:           $('#loader'),
  navbar:           $('#navbar'),
  searchInput:      $('#search-input'),
  searchClear:      $('#search-clear'),
  cardGrid:         $('#card-grid'),
  emptyState:       $('#empty-state'),
  resultsBar:       $('#results-bar'),
  alphaNav:         $('#alpha-nav'),
  themeToggle:      $('#theme-toggle'),
  menuToggle:       $('#menu-toggle'),
  mobileNav:        $('#mobile-nav'),
  resetBtn:         $('#reset-btn'),
  scrollTop:        $('#scroll-top'),
  wordCount:        $('#word-count'),
  modalOverlay:     $('#modal-overlay'),
  modalClose:       $('#modal-close'),
  modalContent:     $('#modal-content'),
  submitForm:       $('#submit-form'),
  formStatus:       $('#form-status'),
  submittedSection: $('#submitted-words-section'),
  submittedList:    $('#submitted-list'),
};

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/* ─── INIT ─────────────────────────────────────────────────── */
async function init() {
  // Restore theme
  const theme = localStorage.getItem('lexicon-theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);

  // Load definitions
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error('fetch failed');
    state.allWords = await res.json();
  } catch(e) {
    console.error('Could not load data.json:', e);
    state.allWords = [];
  }

  // Load user submissions
  loadUserWords();

  // Build alphabet nav
  buildAlphaNav();

  // First render
  applyFilters();

  // Update word count in hero
  updateWordCount();

  // Attach all event listeners
  setupEvents();

  // Dismiss loader
  setTimeout(() => {
    els.loader && els.loader.classList.add('hidden');
    initScrollReveal();
    animateVisibleCards();
  }, 1600);
}

/* ─── EVENTS ────────────────────────────────────────────────── */
function setupEvents() {
  // Live search
  els.searchInput.addEventListener('input', () => {
    state.query = els.searchInput.value.trim().toLowerCase();
    els.searchClear.hidden = !state.query;
    state.activeLetter = null;
    updateAlphaNav();
    applyFilters();
  });

  // Clear search
  els.searchClear.addEventListener('click', () => clearSearch(true));

  // Category pills
  $$('[data-category]').forEach(btn =>
    btn.addEventListener('click', () => {
      state.category = btn.dataset.category;
      $$('[data-category]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeLetter = null;
      updateAlphaNav();
      applyFilters();
    })
  );

  // Sort pills
  $$('[data-sort]').forEach(btn =>
    btn.addEventListener('click', () => {
      state.sort = btn.dataset.sort;
      $$('[data-sort]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    })
  );

  // Reset
  els.resetBtn?.addEventListener('click', resetAll);

  // Theme toggle
  els.themeToggle.addEventListener('click', toggleTheme);

  // Mobile menu
  els.menuToggle.addEventListener('click', toggleMenu);
  $$('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('click', e => {
    if (!els.navbar.contains(e.target)) closeMenu();
  });

  // Scroll events
  window.addEventListener('scroll', onScroll, { passive: true });
  els.scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Modal
  els.modalClose.addEventListener('click', closeModal);
  els.modalOverlay.addEventListener('click', e => { if (e.target === els.modalOverlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Keyboard search shortcut
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      els.searchInput.focus(); els.searchInput.select();
    }
    if (e.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      els.searchInput.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Submit form
  els.submitForm.addEventListener('submit', handleSubmit);
}

/* ─── SCROLL ────────────────────────────────────────────────── */
function onScroll() {
  els.navbar.classList.toggle('scrolled', window.scrollY > 20);
  const showTop = window.scrollY > 400;
  if (showTop) els.scrollTop.removeAttribute('hidden');
  else         els.scrollTop.setAttribute('hidden', '');
}

/* ─── FILTER & RENDER ───────────────────────────────────────── */
function applyFilters() {
  let results = [...state.allWords, ...state.userWords];

  if (state.category !== 'All')
    results = results.filter(w => w.category === state.category);

  if (state.query)
    results = results.filter(w =>
      w.word.toLowerCase().includes(state.query) ||
      w.short.toLowerCase().includes(state.query) ||
      (w.full  && w.full.toLowerCase().includes(state.query)) ||
      (w.tags  && w.tags.some(t => t.toLowerCase().includes(state.query)))
    );

  if (state.activeLetter)
    results = results.filter(w => w.word[0].toUpperCase() === state.activeLetter);

  if (state.sort === 'alpha')
    results.sort((a, b) => a.word.localeCompare(b.word));
  else
    results.sort((a, b) => {
      if (a._user && !b._user) return -1;
      if (!a._user && b._user) return 1;
      return b.id - a.id;
    });

  state.filtered = results;
  updateResultsBar();
  renderCards();
}

function updateResultsBar() {
  const total = state.allWords.length + state.userWords.length;
  const count = state.filtered.length;
  const filtered = state.query || state.category !== 'All' || state.activeLetter;
  els.resultsBar.textContent = filtered
    ? `Showing ${count} of ${total} definitions`
    : `${total} definitions`;
}

function renderCards() {
  // Quick fade-out
  els.cardGrid.classList.remove('visible');
  els.cardGrid.classList.add('filtering');

  setTimeout(() => {
    els.cardGrid.innerHTML = '';

    if (!state.filtered.length) {
      els.emptyState.removeAttribute('hidden');
      els.cardGrid.classList.remove('filtering');
      return;
    }
    els.emptyState.setAttribute('hidden', '');

    const showHeadings = state.sort === 'alpha' && !state.activeLetter && !state.query;
    const frag = document.createDocumentFragment();
    let currentLetter = '';

    state.filtered.forEach((word, i) => {
      const fl = word.word[0].toUpperCase();
      if (showHeadings && fl !== currentLetter) {
        currentLetter = fl;
        const h = document.createElement('div');
        h.className = 'letter-section-heading';
        h.textContent = fl;
        h.id = `letter-${fl}`;
        h.setAttribute('aria-hidden', 'true');
        frag.appendChild(h);
      }
      frag.appendChild(createCard(word, i));
    });

    els.cardGrid.appendChild(frag);
    els.cardGrid.classList.remove('filtering');
    els.cardGrid.classList.add('visible');
    animateVisibleCards();
  }, 120);
}

/* ─── CARD ──────────────────────────────────────────────────── */
function createCard(word, index) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${word.word}: ${word.short}`);
  card.style.animationDelay = `${Math.min(index * 40, 400)}ms`;

  const tagsHtml = (word.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('');

  card.innerHTML = `
    <div class="card-header">
      <h3 class="card-word">${esc(word.word)}</h3>
      <div class="card-meta">
        <span class="card-category">${esc(word.category)}</span>
        <span class="card-letter">${esc((word.letter || word.word[0]).toUpperCase())}</span>
      </div>
    </div>
    <p class="card-short">${esc(word.short)}</p>
    ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ''}
    <div class="card-footer">
      <button class="card-expand-btn" tabindex="-1" aria-hidden="true">
        Read more
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>
      ${word._user ? '<span class="card-submitted-badge">User</span>' : ''}
    </div>`;

  const open = () => openModal(word);
  card.addEventListener('click', open);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  return card;
}

function animateVisibleCards() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('card-visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  $$('.card').forEach(c => io.observe(c));
}

/* ─── MODAL ─────────────────────────────────────────────────── */
function openModal(word) {
  const tagsHtml = (word.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('');
  els.modalContent.innerHTML = `
    <p class="modal-eyebrow">${esc(word.category)}</p>
    <h2 class="modal-word">${esc(word.word)}</h2>
    <span class="modal-category-badge">${esc((word.letter || word.word[0]).toUpperCase())} — ${esc(word.category)}</span>
    <hr class="modal-divider"/>
    <p class="modal-short">${esc(word.short)}</p>
    ${word.full ? `<hr class="modal-divider"/><p class="modal-full">${esc(word.full)}</p>` : ''}
    ${tagsHtml ? `<hr class="modal-divider"/><p class="modal-tags-label">Related topics</p><div class="modal-tags">${tagsHtml}</div>` : ''}
    ${word._user ? '<hr class="modal-divider"/><p style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-3);letter-spacing:0.08em">USER SUBMISSION</p>' : ''}`;
  els.modalOverlay.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => els.modalClose.focus());
}

function closeModal() {
  els.modalOverlay.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

/* ─── ALPHA NAV ─────────────────────────────────────────────── */
function buildAlphaNav() {
  const all = [...state.allWords, ...state.userWords];
  const used = new Set(all.map(w => w.word[0].toUpperCase()));
  els.alphaNav.innerHTML = '';
  const frag = document.createDocumentFragment();

  ALPHABET.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'alpha-btn';
    btn.textContent = letter;
    btn.dataset.letter = letter;
    btn.setAttribute('aria-label', `Filter by ${letter}`);
    if (!used.has(letter)) { btn.disabled = true; btn.setAttribute('aria-disabled', 'true'); }
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      state.activeLetter = state.activeLetter === letter ? null : letter;
      if (state.activeLetter) clearSearch(false);
      updateAlphaNav();
      applyFilters();
      if (state.activeLetter) {
        setTimeout(() => {
          const sec = $(`#letter-${letter}`);
          sec && sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    });
    frag.appendChild(btn);
  });
  els.alphaNav.appendChild(frag);
}

function updateAlphaNav() {
  $$('.alpha-btn').forEach(b => b.classList.toggle('active', b.dataset.letter === state.activeLetter));
}

/* ─── THEME ─────────────────────────────────────────────────── */
function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('lexicon-theme', next);
}

/* ─── MOBILE MENU ───────────────────────────────────────────── */
function toggleMenu() {
  const open = els.mobileNav.classList.toggle('open');
  els.menuToggle.setAttribute('aria-expanded', String(open));
  els.mobileNav.setAttribute('aria-hidden', String(!open));
}
function closeMenu() {
  els.mobileNav.classList.remove('open');
  els.menuToggle.setAttribute('aria-expanded', 'false');
  els.mobileNav.setAttribute('aria-hidden', 'true');
}

/* ─── SEARCH HELPERS ────────────────────────────────────────── */
function clearSearch(rerender) {
  state.query = '';
  els.searchInput.value = '';
  els.searchClear.hidden = true;
  if (rerender) applyFilters();
}

function resetAll() {
  clearSearch(false);
  state.category = 'All'; state.activeLetter = null; state.sort = 'alpha';
  $$('[data-category]').forEach(b => b.classList.toggle('active', b.dataset.category === 'All'));
  $$('[data-sort]').forEach(b => b.classList.toggle('active', b.dataset.sort === 'alpha'));
  updateAlphaNav();
  applyFilters();
}

/* ─── SCROLL REVEAL ─────────────────────────────────────────── */
function initScrollReveal() {
  const targets = $$('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => io.observe(el));
}

/* ─── WORD SUBMISSION ───────────────────────────────────────── */
const STORAGE_KEY = 'lexicon-user-words';

function loadUserWords() {
  try { state.userWords = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { state.userWords = []; }
  renderSubmittedList();
}

function saveUserWords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.userWords));
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const word     = form.word.value.trim();
  const category = form.category.value;
  const short    = form.short.value.trim();
  const full     = form.full.value.trim();

  // Validate
  let ok = true;
  [form.word, form.category, form.short].forEach(f => {
    f.classList.remove('error');
    if (!f.value.trim()) { f.classList.add('error'); ok = false; }
  });
  if (!ok) return showStatus('Please fill in all required fields.', 'error');

  // Duplicate check
  const all = [...state.allWords, ...state.userWords];
  if (all.some(w => w.word.toLowerCase() === word.toLowerCase()))
    return showStatus(`"${word}" already exists in the dictionary.`, 'error');

  const newWord = { id: Date.now(), word, category, short, full: full || null, letter: word[0].toUpperCase(), tags: [], _user: true };
  state.userWords.unshift(newWord);
  saveUserWords();
  updateWordCount();
  buildAlphaNav();
  updateAlphaNav();
  applyFilters();
  renderSubmittedList();
  form.reset();
  showStatus(`"${word}" submitted successfully!`, 'success');
}

function showStatus(msg, type) {
  els.formStatus.textContent = msg;
  els.formStatus.className = `form-status ${type}`;
  setTimeout(() => { els.formStatus.textContent = ''; els.formStatus.className = 'form-status'; }, 4000);
}

function renderSubmittedList() {
  if (!els.submittedSection) return;
  if (!state.userWords.length) { els.submittedSection.setAttribute('hidden', ''); return; }
  els.submittedSection.removeAttribute('hidden');
  els.submittedList.innerHTML = '';
  state.userWords.forEach(w => {
    const item = document.createElement('div');
    item.className = 'submitted-item';
    item.innerHTML = `
      <div>
        <div class="submitted-word-title">${esc(w.word)}</div>
        <div class="submitted-word-def">${esc(w.short)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
        <span class="submitted-word-cat">${esc(w.category)}</span>
        <button class="submitted-delete" aria-label="Delete ${esc(w.word)}">✕</button>
      </div>`;
    item.querySelector('.submitted-delete').addEventListener('click', () => deleteWord(w.id));
    els.submittedList.appendChild(item);
  });
}

function deleteWord(id) {
  state.userWords = state.userWords.filter(w => w.id !== id);
  saveUserWords();
  updateWordCount();
  buildAlphaNav();
  updateAlphaNav();
  applyFilters();
  renderSubmittedList();
}

function updateWordCount() {
  if (els.wordCount) els.wordCount.textContent = state.allWords.length + state.userWords.length;
}

/* ─── UTILITY ───────────────────────────────────────────────── */
function esc(s) {
  return String(s || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/* ─── BOOT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', init);
