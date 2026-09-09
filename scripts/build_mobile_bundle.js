const fs = require('fs');
const path = require('path');

function buildOfflineApp() {
  const data = JSON.parse(fs.readFileSync('src/lib/mobileData.json', 'utf8'));

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  <title>ZIABL Trade Academy</title>
  <style>
    :root {
      --bg: #0b0f19;
      --surface: #111827;
      --surface-light: #1f2937;
      --border: rgba(255, 255, 255, 0.08);
      --accent: #00e5b3;
      --accent-dim: rgba(0, 229, 179, 0.15);
      --accent-hover: #00ffc7;
      --text-main: #f9fafb;
      --text-muted: #9ca3af;
      --safe-bottom: env(safe-area-inset-bottom, 16px);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text-main);
      min-height: 100vh;
      padding-bottom: calc(76px + var(--safe-bottom));
      user-select: none;
      -webkit-user-select: none;
    }
    .header {
      position: sticky; top: 0; z-index: 30;
      background: rgba(17, 24, 39, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      padding: 12px 16px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .brand { display: flex; align-items: center; gap: 10px; }
    .brand img { width: 32px; height: 32px; border-radius: 9px; border: 1px solid rgba(0, 229, 179, 0.3); }
    .brand-title { font-weight: 800; font-size: 15px; letter-spacing: -0.3px; }
    .brand-title span { color: var(--accent); }
    .cbr-badge {
      background: rgba(0, 229, 179, 0.1);
      border: 1px solid rgba(0, 229, 179, 0.25);
      color: var(--accent);
      padding: 4px 10px; border-radius: 999px;
      font-size: 11px; font-weight: 700; font-family: monospace;
    }
    .view-container { padding: 16px; max-width: 640px; margin: 0 auto; }
    .hidden { display: none !important; }
    
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 18px;
      margin-bottom: 14px;
      transition: all 0.2s ease;
    }
    .card:active { transform: scale(0.985); }
    .card-title { font-size: 16px; font-weight: 700; margin-bottom: 6px; color: var(--text-main); }
    .card-desc { font-size: 13px; color: var(--text-muted); line-height: 1.5; }
    
    .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px; }
    .stat-box {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 14px;
      text-align: center;
    }
    .stat-val { font-size: 22px; font-weight: 800; font-family: monospace; color: var(--accent); }
    .stat-label { font-size: 11px; color: var(--text-muted); margin-top: 4px; }
    
    .lesson-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
    .btn-back {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--surface-light); border: 1px solid var(--border);
      color: var(--text-main); padding: 8px 14px; border-radius: 12px;
      font-size: 12px; font-weight: 600; cursor: pointer;
    }
    .article-title { font-size: 20px; font-weight: 800; line-height: 1.35; margin-bottom: 16px; }
    .lesson-body {
      font-size: 14px; line-height: 1.7; color: #d1d5db;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 20px; padding: 20px 16px; margin-bottom: 20px;
    }
    .lesson-body h2 { font-size: 17px; font-weight: 700; color: #fff; margin: 20px 0 10px; }
    .lesson-body h3 { font-size: 15px; font-weight: 600; color: var(--accent); margin: 16px 0 8px; }
    .lesson-body p { margin-bottom: 14px; }
    .lesson-body ul, .lesson-body ol { padding-left: 20px; margin-bottom: 14px; }
    .lesson-body li { margin-bottom: 6px; }
    .lesson-body strong { color: #fff; }
    .lesson-body table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
    .lesson-body th, .lesson-body td { border: 1px solid var(--border); padding: 8px; text-align: left; }
    .lesson-body th { background: var(--surface-light); color: var(--accent); font-weight: 600; }
    .term-btn {
      color: var(--accent); background: var(--accent-dim);
      border: 1px solid rgba(0, 229, 179, 0.3); border-radius: 6px;
      padding: 1px 6px; font-weight: 600; cursor: pointer; font-size: 13px;
    }
    
    .quiz-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 20px; padding: 20px 16px; margin-bottom: 20px;
    }
    .q-title { font-size: 15px; font-weight: 700; margin-bottom: 12px; }
    .opt-btn {
      width: 100%; text-align: left; padding: 12px 14px;
      background: var(--surface-light); border: 1px solid var(--border);
      border-radius: 12px; margin-bottom: 8px; font-size: 13px; color: var(--text-main);
      display: flex; align-items: center; justify-content: space-between; cursor: pointer;
    }
    .opt-btn.correct { background: rgba(16, 185, 129, 0.2); border-color: #10b981; color: #34d399; }
    .opt-btn.wrong { background: rgba(239, 68, 68, 0.2); border-color: #ef4444; color: #f87171; }
    
    .bottom-nav {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 40;
      background: rgba(17, 24, 39, 0.96);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-top: 1px solid var(--border);
      padding: 8px 12px calc(8px + var(--safe-bottom));
      display: flex; align-items: center; justify-content: space-around;
    }
    .nav-item {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      color: var(--text-muted); text-decoration: none; font-size: 10px; font-weight: 600;
      padding: 4px 10px; border-radius: 12px; transition: all 0.2s ease; cursor: pointer;
    }
    .nav-item.active { color: var(--accent); transform: scale(1.05); }
    .nav-icon { font-size: 19px; margin-bottom: 2px; }
    
    .modal-backdrop {
      position: fixed; inset: 0; z-index: 50; background: rgba(0,0,0,0.75);
      backdrop-filter: blur(4px); display: flex; align-items: flex-end; justify-content: center;
    }
    .modal-sheet {
      background: var(--surface); width: 100%; max-width: 600px;
      border-top: 1px solid var(--border); border-radius: 24px 24px 0 0;
      padding: 20px 20px calc(24px + var(--safe-bottom)); max-height: 80vh; overflow-y: auto;
      box-shadow: 0 -10px 40px rgba(0,0,0,0.6); animation: slideUp 0.25s ease;
    }
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
    .sheet-handle { width: 40px; height: 4px; background: var(--surface-light); border-radius: 99px; margin: 0 auto 16px; }
    .sheet-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 6px; }
    .sheet-category { font-size: 11px; font-weight: 700; color: var(--accent); text-transform: uppercase; margin-bottom: 12px; display: inline-block; background: var(--accent-dim); padding: 2px 8px; border-radius: 99px; }
    .sheet-desc { font-size: 14px; line-height: 1.6; color: #d1d5db; margin-bottom: 20px; }
    .btn-primary {
      width: 100%; background: var(--accent); color: #0b0f19;
      font-weight: 700; font-size: 14px; padding: 12px; border-radius: 14px;
      border: none; cursor: pointer; text-align: center;
    }
    .badge-done { background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(16, 185, 129, 0.3); }
  </style>
</head>
<body>

  <!-- Top Header -->
  <header class="header">
    <div class="brand">
      <img src="logo.jpg" alt="Logo">
      <div class="brand-title">ZIABL <span>ACADEMY</span></div>
    </div>
    <div class="cbr-badge">ЦБ РФ: 14.0%</div>
  </header>

  <!-- Main Views Container -->
  <div class="view-container">

    <!-- VIEW 1: COURSES -->
    <section id="view-courses">
      <div style="margin-bottom: 18px;">
        <h1 style="font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Образовательные курсы</h1>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">8 модулей, 20 уроков, тесты и интерактивные термины</p>
      </div>

      <div id="courses-list"></div>
    </section>

    <!-- VIEW 2: LESSON DETAILS -->
    <section id="view-lesson" class="hidden">
      <div class="lesson-meta">
        <button class="btn-back" onclick="switchTab('courses')">← Назад к курсам</button>
        <span id="lesson-status-badge"></span>
      </div>
      <h1 id="lesson-title" class="article-title"></h1>
      <div id="lesson-content" class="lesson-body"></div>

      <!-- Quiz Container -->
      <div id="lesson-quiz-box" class="quiz-card">
        <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 12px; color: var(--accent);">📝 Проверка знаний</h3>
        <div id="quiz-questions"></div>
      </div>
    </section>

    <!-- VIEW 3: GLOSSARY -->
    <section id="view-glossary" class="hidden">
      <div style="margin-bottom: 16px;">
        <h1 style="font-size: 22px; font-weight: 800;">Глоссарий терминов</h1>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">60+ финансовых определений с примерами</p>
        <input type="text" id="glossary-search" placeholder="🔍 Поиск термина (EBITDA, ОФЗ, RUONIA...)" style="width: 100%; margin-top: 12px; padding: 12px 14px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; color: #fff; font-size: 14px;" oninput="renderGlossary(this.value)" />
      </div>
      <div id="glossary-list"></div>
    </section>

    <!-- VIEW 4: SIMULATOR / CALCULATORS -->
    <section id="view-trading" class="hidden">
      <div style="margin-bottom: 16px;">
        <h1 style="font-size: 22px; font-weight: 800;">Финансовый калькулятор</h1>
        <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Уравнение Фишера и реальная процентная ставка</p>
      </div>

      <div class="card">
        <h3 class="card-title">Уравнение Фишера</h3>
        <p class="card-desc" style="margin-bottom: 12px;">Расчёт реальной доходности капитала с учётом инфляции</p>
        
        <label style="font-size: 12px; color: var(--text-muted);">Номинальная ставка (%)</label>
        <input type="number" id="calc-nominal" value="18" style="width: 100%; padding: 10px; background: var(--surface-light); border: 1px solid var(--border); border-radius: 10px; color: #fff; margin-bottom: 10px;" oninput="recalcFisher()" />

        <label style="font-size: 12px; color: var(--text-muted);">Ожидаемая инфляция (%)</label>
        <input type="number" id="calc-infl" value="8" style="width: 100%; padding: 10px; background: var(--surface-light); border: 1px solid var(--border); border-radius: 10px; color: #fff; margin-bottom: 14px;" oninput="recalcFisher()" />

        <div style="background: rgba(0,229,179,0.1); border: 1px solid rgba(0,229,179,0.3); border-radius: 12px; padding: 12px; text-align: center;">
          <div style="font-size: 11px; color: var(--accent); text-transform: uppercase; font-weight: 700;">Реальная доходность (r)</div>
          <div id="fisher-result" style="font-size: 24px; font-weight: 800; font-family: monospace; color: #fff; margin-top: 4px;">+9.26%</div>
        </div>
      </div>
    </section>

    <!-- VIEW 5: PROFILE -->
    <section id="view-profile" class="hidden">
      <div class="card" style="display: flex; align-items: center; gap: 14px; margin-bottom: 16px;">
        <div style="width: 54px; height: 54px; border-radius: 16px; background: rgba(0,229,179,0.15); border: 1px solid rgba(0,229,179,0.4); display: flex; align-items: center; justify-content: center; font-size: 26px;">🐋</div>
        <div>
          <div style="font-size: 16px; font-weight: 800;">Daniel Ziabl</div>
          <div style="font-size: 12px; color: var(--accent); font-weight: 600;">Студент Академии</div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-box">
          <div id="prof-lessons-count" class="stat-val">0 / 20</div>
          <div class="stat-label">Пройдено уроков</div>
        </div>
        <div class="stat-box">
          <div id="prof-quizzes-count" class="stat-val">0</div>
          <div class="stat-label">Сдано квизов</div>
        </div>
        <div class="stat-box">
          <div id="prof-pct" class="stat-val">0%</div>
          <div class="stat-label">Общий прогресс</div>
        </div>
        <div class="stat-box">
          <div class="stat-val">100%</div>
          <div class="stat-label">Offline Ready</div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">Автономный режим (100% Offline)</h3>
        <p class="card-desc">Все 8 модулей, тесты и глоссарий сохранены в приложении. Работает без серверов и интернета.</p>
      </div>
    </section>

  </div>

  <!-- Term Bottom Sheet Modal -->
  <div id="term-modal" class="modal-backdrop hidden" onclick="closeTermModal()">
    <div class="modal-sheet" onclick="event.stopPropagation()">
      <div class="sheet-handle"></div>
      <span id="modal-category" class="sheet-category"></span>
      <h2 id="modal-title" class="sheet-title"></h2>
      <div id="modal-desc" class="sheet-desc"></div>
      <button class="btn-primary" onclick="closeTermModal()">Понятно</button>
    </div>
  </div>

  <!-- Bottom Navigation Bar -->
  <nav class="bottom-nav">
    <div class="nav-item active" onclick="switchTab('courses')">
      <div class="nav-icon">📚</div>
      <span>Курсы</span>
    </div>
    <div class="nav-item" onclick="switchTab('glossary')">
      <div class="nav-icon">📖</div>
      <span>Глоссарий</span>
    </div>
    <div class="nav-item" onclick="switchTab('trading')">
      <div class="nav-icon">🧮</div>
      <span>Калькулятор</span>
    </div>
    <div class="nav-item" onclick="switchTab('profile')">
      <div class="nav-icon">👤</div>
      <span>Профиль</span>
    </div>
  </nav>

  <!-- Embed JSON Datastores -->
  <script>
    const APP_MODULES = ${JSON.stringify(data.modules)};
    const APP_LESSONS = ${JSON.stringify(data.lessons)};
    const APP_GLOSSARY = ${JSON.stringify(data.glossary)};
  </script>

  <!-- Application Logic -->
  <script>
    function switchTab(tabId) {
      ['courses', 'lesson', 'glossary', 'trading', 'profile'].forEach(id => {
        const el = document.getElementById('view-' + id);
        if (el) el.classList.add('hidden');
      });
      const activeEl = document.getElementById('view-' + (tabId === 'lesson' ? 'lesson' : tabId));
      if (activeEl) activeEl.classList.remove('hidden');

      document.querySelectorAll('.bottom-nav .nav-item').forEach((btn, idx) => {
        btn.classList.remove('active');
        if ((tabId === 'courses' || tabId === 'lesson') && idx === 0) btn.classList.add('active');
        if (tabId === 'glossary' && idx === 1) btn.classList.add('active');
        if (tabId === 'trading' && idx === 2) btn.classList.add('active');
        if (tabId === 'profile' && idx === 3) btn.classList.add('active');
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (tabId === 'profile') updateProfileStats();
    }

    function getCompleted() {
      try {
        return JSON.parse(localStorage.getItem('ziabl_completed_lessons') || '[]');
      } catch (e) { return []; }
    }
    function markLessonCompleted(slug) {
      const list = getCompleted();
      if (!list.includes(slug)) {
        list.push(slug);
        localStorage.setItem('ziabl_completed_lessons', JSON.stringify(list));
      }
      renderCourses();
    }

    function renderCourses() {
      const container = document.getElementById('courses-list');
      const completed = getCompleted();
      container.innerHTML = APP_MODULES.map((m, idx) => {
        const modCompleted = m.lessons.every(l => completed.includes(l.slug) || completed.includes(l.id));
        const completedCount = m.lessons.filter(l => completed.includes(l.slug) || completed.includes(l.id)).length;

        return \`
          <div class="card">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px;">
              <div style="font-size: 11px; font-weight: 700; color: var(--accent); text-transform: uppercase;">
                Модуль \${idx + 1}
              </div>
              \${modCompleted ? '<span class="badge-done">Пройден ✓</span>' : \`<span style="font-size: 11px; color: var(--text-muted);">\${completedCount}/\${m.lessons.length}</span>\`}
            </div>
            <h3 class="card-title">\${m.icon || '📚'} \${m.titleRu}</h3>
            <p class="card-desc" style="margin-bottom: 14px;">\${m.descRu}</p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              \${m.lessons.map(l => {
                const isDone = completed.includes(l.slug) || completed.includes(l.id);
                return \`
                  <div onclick="openLesson('\${l.slug}')" style="display: flex; align-items: center; justify-content: space-between; background: var(--surface-light); padding: 10px 12px; border-radius: 12px; border: 1px solid var(--border); cursor: pointer;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="width: 22px; height: 22px; border-radius: 50%; background: \${isDone ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)'}; color: \${isDone ? '#34d399' : '#9ca3af'}; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">
                        \${isDone ? '✓' : l.order}
                      </span>
                      <span style="font-size: 13px; font-weight: 600; color: #fff;">\${l.titleRu}</span>
                    </div>
                    <span style="color: var(--accent); font-size: 13px;">→</span>
                  </div>
                \`;
              }).join('')}
            </div>
          </div>
        \`;
      }).join('');
    }

    function openLesson(slug) {
      const lesson = APP_LESSONS[slug];
      if (!lesson) return;

      document.getElementById('lesson-title').innerText = lesson.titleRu;
      
      const isDone = getCompleted().includes(slug) || getCompleted().includes(lesson.id);
      document.getElementById('lesson-status-badge').innerHTML = isDone
        ? '<span class="badge-done">Пройден ✓</span>'
        : '<span style="font-size: 11px; color: var(--accent); font-weight: 600;">В процессе</span>';

      let raw = lesson.contentRu || '';
      
      APP_GLOSSARY.forEach(term => {
        const escaped = term.termRu.replace(/[.*+?^$\${}()|[\\]\\\\]/g, '\\\\$&');
        const regex = new RegExp(\`\\\\b(\${escaped})\\\\b\`, 'g');
        raw = raw.replace(regex, \`<button class="term-btn" onclick="openTermModal('\${term.termRu}')">\${term.termRu}</button>\`);
      });

      let formatted = raw
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\\*\\*(.*?)\\*\\*/gim, '<strong>$1</strong>')
        .replace(/\\*(.*?)\\*/gim, '<em>$1</em>')
        .replace(/\\n/g, '<br/>');

      document.getElementById('lesson-content').innerHTML = formatted;
      renderQuiz(lesson);
      switchTab('lesson');
    }

    function renderQuiz(lesson) {
      const container = document.getElementById('quiz-questions');
      if (!lesson.quiz || !lesson.quiz.questions || lesson.quiz.questions.length === 0) {
        document.getElementById('lesson-quiz-box').classList.add('hidden');
        return;
      }
      document.getElementById('lesson-quiz-box').classList.remove('hidden');

      container.innerHTML = lesson.quiz.questions.map((q, qIdx) => \`
        <div style="margin-bottom: 16px;">
          <div class="q-title">\${qIdx + 1}. \${q.questionRu}</div>
          \${(q.optionsRu || []).map((optText, optIdx) => {
            const isCorrect = (q.correctIndices || []).includes(optIdx);
            return \`
              <button class="opt-btn" onclick="checkAnswer(this, \${isCorrect}, '\${lesson.slug}')">
                <span>\${optText}</span>
                <span class="mark"></span>
              </button>
            \`;
          }).join('')}
        </div>
      \`).join('');
    }

    function checkAnswer(btn, isCorrect, slug) {
      const parent = btn.parentElement;
      parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('correct', 'wrong'));
      if (isCorrect) {
        btn.classList.add('correct');
        btn.querySelector('.mark').innerText = '✓';
        markLessonCompleted(slug);
        document.getElementById('lesson-status-badge').innerHTML = '<span class="badge-done">Пройден ✓</span>';
      } else {
        btn.classList.add('wrong');
        btn.querySelector('.mark').innerText = '✕';
      }
    }

    function renderGlossary(filter = '') {
      const container = document.getElementById('glossary-list');
      const filtered = APP_GLOSSARY.filter(t => 
        t.termRu.toLowerCase().includes(filter.toLowerCase()) || 
        (t.termEn && t.termEn.toLowerCase().includes(filter.toLowerCase())) ||
        t.definitionRu.toLowerCase().includes(filter.toLowerCase())
      );

      container.innerHTML = filtered.map(t => \`
        <div class="card" onclick="openTermModal('\${t.termRu}')" style="cursor: pointer;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <div style="font-size: 15px; font-weight: 700; color: #fff;">\${t.termRu}</div>
            <span class="sheet-category" style="margin-bottom: 0;">\${t.category || 'Термин'}</span>
          </div>
          <div style="font-size: 11px; color: var(--accent); margin-bottom: 8px;">\${t.termEn || ''}</div>
          <div style="font-size: 13px; color: var(--text-muted); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
            \${t.definitionRu}
          </div>
        </div>
      \`).join('');
    }

    function openTermModal(termName) {
      const item = APP_GLOSSARY.find(t => t.termRu === termName || t.termEn === termName);
      if (!item) return;
      document.getElementById('modal-title').innerText = item.termRu + (item.termEn ? ' (' + item.termEn + ')' : '');
      document.getElementById('modal-category').innerText = item.category || 'Глоссарий';
      document.getElementById('modal-desc').innerText = item.definitionRu;
      document.getElementById('term-modal').classList.remove('hidden');
    }
    function closeTermModal() {
      document.getElementById('term-modal').classList.add('hidden');
    }

    function recalcFisher() {
      const nominal = parseFloat(document.getElementById('calc-nominal').value) || 0;
      const infl = parseFloat(document.getElementById('calc-infl').value) || 0;
      const realRate = ((1 + nominal / 100) / (1 + infl / 100) - 1) * 100;
      document.getElementById('fisher-result').innerText = (realRate >= 0 ? '+' : '') + realRate.toFixed(2) + '%';
    }

    function updateProfileStats() {
      const completed = getCompleted();
      const totalLessons = 20;
      const pct = Math.round((completed.length / totalLessons) * 100);
      document.getElementById('prof-lessons-count').innerText = completed.length + ' / ' + totalLessons;
      document.getElementById('prof-quizzes-count').innerText = completed.length;
      document.getElementById('prof-pct').innerText = pct + '%';
    }

    window.addEventListener('DOMContentLoaded', () => {
      renderCourses();
      renderGlossary();
    });
  </script>
</body>
</html>`;

  const outDir = path.resolve('out_web');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');

  if (fs.existsSync('public/logo.jpg')) {
    fs.copyFileSync('public/logo.jpg', path.join(outDir, 'logo.jpg'));
  }
  console.log('Mobile App Standalone index.html successfully generated in out_web/!');
}

buildOfflineApp();
