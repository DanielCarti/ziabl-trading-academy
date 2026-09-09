const fs = require('fs');
const path = require('path');

function buildOfflineApp() {
  const data = JSON.parse(fs.readFileSync('src/lib/mobileData.json', 'utf8'));

  // Build an optimized keywords list for glossary term detection
  const termEntries = [];
  data.glossary.forEach(t => {
    const variations = new Set();
    const cleanRu = t.termRu.replace(/\s*\([^)]*\)/g, '').trim();
    variations.add(cleanRu);
    const bracketMatch = t.termRu.match(/\(([^)]+)\)/);
    if (bracketMatch) variations.add(bracketMatch[1].trim());
    if (t.termEn) variations.add(t.termEn.trim());

    if (t.termRu.startsWith('ОФЗ-ПД')) variations.add('ОФЗ-ПД');
    if (t.termRu.startsWith('ОФЗ-ПК')) variations.add('ОФЗ-ПК');
    if (t.termRu.startsWith('ОФЗ-ИН')) variations.add('ОФЗ-ИН');
    if (t.termRu.startsWith('ИИС-3')) variations.add('ИИС-3');
    if (cleanRu === 'Инфляция') { variations.add('инфляция'); variations.add('инфляции'); variations.add('инфляцией'); }
    if (cleanRu === 'Ключевая ставка ЦБ РФ') { variations.add('ключевая ставка'); variations.add('ключевой ставки'); variations.add('ключевую ставку'); variations.add('ставка ЦБ'); }
    if (cleanRu === 'Альтернативные издержки') { variations.add('альтернативных издержек'); variations.add('альтернативные издержки'); variations.add('альтернативной стоимости'); }
    if (cleanRu === 'Денежный поток') { variations.add('денежный поток'); variations.add('денежного потока'); variations.add('денежные потоки'); variations.add('денежных потоков'); variations.add('Cash Flow'); }
    if (cleanRu === 'Сложный процент') { variations.add('сложный процент'); variations.add('сложного процента'); variations.add('сложным процентом'); }
    if (cleanRu === 'Облигация') { variations.add('облигации'); variations.add('облигаций'); variations.add('облигация'); variations.add('облигациях'); }
    if (cleanRu === 'Дюрация Маколея') { variations.add('дюрация'); variations.add('дюрации'); variations.add('дюрацию'); variations.add('дюрацией'); }
    if (cleanRu === 'Кредитный рейтинг') { variations.add('кредитный рейтинг'); variations.add('кредитного рейтинга'); variations.add('кредитные рейтинги'); }
    if (cleanRu === 'Маржа безопасности') { variations.add('маржа безопасности'); variations.add('маржи безопасности'); variations.add('margin of safety'); }
    if (cleanRu === 'Экономический ров') { variations.add('экономический ров'); variations.add('экономического рва'); variations.add('economic moat'); }
    if (cleanRu === 'Круг компетенций') { variations.add('круг компетенций'); variations.add('круга компетенций'); variations.add('кругом компетенций'); }
    if (cleanRu === 'Ребалансировка портфеля') { variations.add('ребалансировка'); variations.add('ребалансировки'); variations.add('ребалансировку'); }
    if (cleanRu === 'Уровень поддержки') { variations.add('уровень поддержки'); variations.add('уровня поддержки'); variations.add('уровни поддержки'); }
    if (cleanRu === 'Уровень сопротивления') { variations.add('уровень сопротивления'); variations.add('уровня сопротивления'); variations.add('уровни сопротивления'); }
    if (cleanRu === 'Дивергенция') { variations.add('дивергенция'); variations.add('дивергенции'); variations.add('дивергенцию'); }
    if (cleanRu === 'Стоп-лосс') { variations.add('стоп-лосс'); variations.add('стоп-лосса'); variations.add('Stop-Loss'); }
    if (cleanRu === 'Тейк-профит') { variations.add('тейк-профит'); variations.add('тейк-профита'); variations.add('Take-Profit'); }
    if (cleanRu === 'Лимитный ордер') { variations.add('лимитный ордер'); variations.add('лимитного ордера'); variations.add('лимитные ордера'); }
    if (cleanRu === 'Рыночный ордер') { variations.add('рыночный ордер'); variations.add('рыночного ордера'); variations.add('рыночные ордера'); }
    if (cleanRu === 'Проскальзывание') { variations.add('проскальзывание'); variations.add('проскальзывания'); }
    if (cleanRu === 'Биржевой стакан') { variations.add('биржевой стакан'); variations.add('биржевого стакана'); variations.add('Order Book'); }
    if (cleanRu === 'Спред') { variations.add('спред'); variations.add('спреда'); variations.add('Spread'); }
    if (cleanRu === 'ВВП') { variations.add('ВВП'); }
    if (cleanRu === 'Рецессия') { variations.add('рецессия'); variations.add('рецессии'); variations.add('рецессию'); }
    if (cleanRu === 'НКЦ') { variations.add('НКЦ'); }
    if (cleanRu === 'НРД') { variations.add('НРД'); }
    if (cleanRu === 'EBITDA') { variations.add('EBITDA'); }
    if (cleanRu === 'Net Debt / EBITDA') { variations.add('Net Debt / EBITDA'); variations.add('Net Debt/EBITDA'); }
    if (cleanRu === 'Free Cash Flow') { variations.add('Free Cash Flow'); variations.add('FCF'); }
    if (cleanRu === 'P/E') { variations.add('P/E'); }
    if (cleanRu === 'EV') { variations.add('EV'); }
    if (cleanRu === 'ROE') { variations.add('ROE'); }
    if (cleanRu === 'CDO') { variations.add('CDO'); }
    if (cleanRu === 'CDS') { variations.add('CDS'); }
    if (cleanRu === 'БПИФ') { variations.add('БПИФ'); variations.add('БПИФов'); variations.add('БПИФы'); }
    if (cleanRu === 'ETF') { variations.add('ETF'); }
    if (cleanRu === 'TER') { variations.add('TER'); }
    if (cleanRu === 'RSI') { variations.add('RSI'); }
    if (cleanRu === 'YTM') { variations.add('YTM'); }
    if (cleanRu === 'НКД') { variations.add('НКД'); }
    if (cleanRu === 'Цикл Мински' || t.id === 'g-bur-3') { variations.add('Мински'); variations.add('Цикл Мински'); variations.add('Minsky'); }

    for (const v of variations) {
      if (v.length >= 2) {
        termEntries.push({ keyword: v, termId: t.id, termRu: t.termRu });
      }
    }
  });

  // Longest keyword first to prevent short substrings from breaking compound words
  termEntries.sort((a, b) => b.keyword.length - a.keyword.length);

  const html = `<!DOCTYPE html>
<html lang="ru" data-theme="dark">
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
      --header-bg: rgba(17, 24, 39, 0.94);
      --nav-bg: rgba(17, 24, 39, 0.96);
      --safe-bottom: env(safe-area-inset-bottom, 16px);
    }
    html[data-theme="light"] {
      --bg: #f3f4f6;
      --surface: #ffffff;
      --surface-light: #f9fafb;
      --border: rgba(0, 0, 0, 0.08);
      --accent: #059669;
      --accent-dim: rgba(5, 150, 105, 0.12);
      --accent-hover: #047857;
      --text-main: #111827;
      --text-muted: #6b7280;
      --header-bg: rgba(255, 255, 255, 0.95);
      --nav-bg: rgba(255, 255, 255, 0.96);
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
      transition: background-color 0.25s ease, color 0.25s ease;
    }
    .header {
      position: sticky; top: 0; z-index: 30;
      background: var(--header-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      padding: 12px 16px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .brand { display: flex; align-items: center; gap: 10px; }
    .brand img { width: 32px; height: 32px; border-radius: 9px; border: 1px solid rgba(0, 229, 179, 0.3); }
    .brand-title { font-weight: 800; font-size: 15px; letter-spacing: -0.3px; color: var(--text-main); }
    .brand-title span { color: var(--accent); }
    .header-actions { display: flex; align-items: center; gap: 8px; }
    .cbr-badge {
      background: var(--accent-dim);
      border: 1px solid rgba(0, 229, 179, 0.25);
      color: var(--accent);
      padding: 4px 10px; border-radius: 999px;
      font-size: 11px; font-weight: 700; font-family: monospace;
      cursor: pointer; display: flex; align-items: center; gap: 4px;
    }
    .cbr-badge:active { transform: scale(0.96); }
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
    .article-title { font-size: 20px; font-weight: 800; line-height: 1.35; margin-bottom: 16px; color: var(--text-main); }
    .lesson-body {
      font-size: 14px; line-height: 1.75; color: var(--text-main);
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 20px; padding: 20px 16px; margin-bottom: 20px;
      user-select: text; -webkit-user-select: text;
    }
    .lesson-body h1, .lesson-body h2 { font-size: 17px; font-weight: 700; color: var(--text-main); margin: 20px 0 10px; }
    .lesson-body h3 { font-size: 15px; font-weight: 600; color: var(--accent); margin: 16px 0 8px; }
    .lesson-body p { margin-bottom: 14px; }
    .lesson-body ul, .lesson-body ol { padding-left: 20px; margin-bottom: 14px; }
    .lesson-body li { margin-bottom: 6px; }
    .lesson-body strong { color: var(--text-main); font-weight: 700; }
    .lesson-body blockquote {
      border-left: 3px solid var(--accent);
      padding: 10px 14px; margin: 14px 0;
      background: var(--accent-dim);
      border-radius: 0 12px 12px 0;
      font-style: italic; color: var(--text-main);
    }
    .lesson-body table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 12px; }
    .lesson-body th, .lesson-body td { border: 1px solid var(--border); padding: 8px; text-align: left; }
    .lesson-body th { background: var(--surface-light); color: var(--accent); font-weight: 600; }
    .lesson-body pre, .lesson-body code {
      font-family: monospace; font-size: 12px;
      background: var(--surface-light); border-radius: 8px;
      padding: 2px 6px; color: var(--accent);
    }
    .lesson-body pre { padding: 12px; margin: 14px 0; overflow-x: auto; white-space: pre-wrap; word-break: break-word; }
    
    .term-btn {
      display: inline-block;
      color: var(--accent); background: var(--accent-dim);
      border: 1px solid rgba(0, 229, 179, 0.35); border-radius: 6px;
      padding: 1px 6px; font-weight: 600; cursor: pointer; font-size: 13px;
      text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 2px;
      margin: 0 1px;
    }
    .term-btn:active { transform: scale(0.96); opacity: 0.8; }
    
    .quiz-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 20px; padding: 20px 16px; margin-bottom: 20px;
    }
    .q-item { margin-bottom: 22px; padding-bottom: 16px; border-bottom: 1px dashed var(--border); }
    .q-item:last-child { border-bottom: none; margin-bottom: 10px; }
    .q-title { font-size: 14px; font-weight: 700; margin-bottom: 12px; color: var(--text-main); }
    .opt-btn {
      width: 100%; text-align: left; padding: 12px 14px;
      background: var(--surface-light); border: 1px solid var(--border);
      border-radius: 12px; margin-bottom: 8px; font-size: 13px; color: var(--text-main);
      display: flex; align-items: center; justify-content: space-between; cursor: pointer;
      transition: all 0.15s ease;
    }
    .opt-btn.selected { border-color: var(--accent); background: var(--accent-dim); font-weight: 600; }
    .opt-btn.correct { background: rgba(16, 185, 129, 0.2); border-color: #10b981; color: #10b981; font-weight: 700; }
    .opt-btn.wrong { background: rgba(239, 68, 68, 0.2); border-color: #ef4444; color: #ef4444; }
    .q-explanation {
      margin-top: 10px; padding: 10px 12px; border-radius: 10px;
      font-size: 12px; line-height: 1.5; background: var(--surface-light);
      border: 1px solid var(--border); color: var(--text-muted);
    }
    
    .bottom-nav {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 40;
      background: var(--nav-bg);
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
      padding: 20px 20px calc(24px + var(--safe-bottom)); max-height: 85vh; overflow-y: auto;
      box-shadow: 0 -10px 40px rgba(0,0,0,0.6); animation: slideUp 0.25s ease;
    }
    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
    .sheet-handle { width: 40px; height: 4px; background: var(--surface-light); border-radius: 99px; margin: 0 auto 16px; }
    .sheet-title { font-size: 18px; font-weight: 800; color: var(--text-main); margin-bottom: 6px; }
    .sheet-category { font-size: 11px; font-weight: 700; color: var(--accent); text-transform: uppercase; margin-bottom: 12px; display: inline-block; background: var(--accent-dim); padding: 2px 8px; border-radius: 99px; }
    .sheet-desc { font-size: 14px; line-height: 1.6; color: var(--text-main); margin-bottom: 20px; }
    .btn-primary {
      width: 100%; background: var(--accent); color: #0b0f19;
      font-weight: 700; font-size: 14px; padding: 12px; border-radius: 14px;
      border: none; cursor: pointer; text-align: center;
    }
    .badge-done { background: rgba(16, 185, 129, 0.15); color: #10b981; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(16, 185, 129, 0.3); }
    
    .settings-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 12px 0; border-bottom: 1px solid var(--border);
    }
    .settings-row:last-child { border-bottom: none; }
    .settings-label { font-size: 14px; font-weight: 600; color: var(--text-main); }
    .settings-sub { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
    
    .toggle-switch {
      position: relative; display: inline-block; width: 48px; height: 26px;
    }
    .toggle-switch input { opacity: 0; width: 0; height: 0; }
    .toggle-slider {
      position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
      background-color: var(--surface-light); border: 1px solid var(--border);
      transition: .25s; border-radius: 34px;
    }
    .toggle-slider:before {
      position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px;
      background-color: var(--text-muted); transition: .25s; border-radius: 50%;
    }
    input:checked + .toggle-slider { background-color: var(--accent); border-color: var(--accent); }
    input:checked + .toggle-slider:before { transform: translateX(22px); background-color: #0b0f19; }
    
    .lang-btn {
      padding: 6px 12px; border-radius: 10px; font-size: 12px; font-weight: 700;
      border: 1px solid var(--border); background: var(--surface-light); color: var(--text-muted);
      cursor: pointer;
    }
    .lang-btn.active {
      background: var(--accent); color: #0b0f19; border-color: var(--accent);
    }
    .name-input {
      padding: 8px 12px; border-radius: 10px; border: 1px solid var(--border);
      background: var(--surface-light); color: var(--text-main); font-size: 13px; font-weight: 600;
      width: 140px; text-align: right;
    }
  </style>
</head>
<body>

  <!-- Top Header -->
  <header class="header">
    <div class="brand">
      <img src="logo.jpg" alt="Logo">
      <div class="brand-title">ZIABL <span>ACADEMY</span></div>
    </div>
    <div class="header-actions">
      <div class="cbr-badge" onclick="openKeyRateModal()" title="Нажмите, чтобы настроить ключевую ставку ЦБ">
        <span id="header-cbr-text">ЦБ РФ: 14.0%</span> ⚙️
      </div>
    </div>
  </header>

  <!-- Main Views Container -->
  <div class="view-container">

    <!-- VIEW 1: COURSES -->
    <section id="view-courses">
      <div style="margin-bottom: 18px;">
        <h1 id="courses-heading" style="font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Образовательные курсы</h1>
        <p id="courses-subheading" style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">8 модулей, 20 уроков, тесты и интерактивные термины</p>
      </div>

      <div id="courses-list"></div>
    </section>

    <!-- VIEW 2: LESSON DETAILS -->
    <section id="view-lesson" class="hidden">
      <div class="lesson-meta">
        <button class="btn-back" onclick="switchTab('courses')"><span id="lesson-back-btn">← Назад к курсам</span></button>
        <span id="lesson-status-badge"></span>
      </div>
      <h1 id="lesson-title" class="article-title"></h1>
      <div id="lesson-content" class="lesson-body"></div>

      <!-- Quiz Container with Confirm Button -->
      <div id="lesson-quiz-box" class="quiz-card">
        <h3 id="quiz-heading" style="font-size: 16px; font-weight: 800; margin-bottom: 14px; color: var(--accent);">📝 Проверка знаний</h3>
        <div id="quiz-questions"></div>
        <div id="quiz-action-bar" style="margin-top: 18px;">
          <button id="btn-submit-quiz" class="btn-primary" onclick="submitCurrentQuiz()">Подтвердить выбор ответов</button>
          <div id="quiz-result-feedback" style="display: none; margin-top: 12px; text-align: center; font-size: 13px; font-weight: 700;"></div>
        </div>
      </div>
    </section>

    <!-- VIEW 3: GLOSSARY -->
    <section id="view-glossary" class="hidden">
      <div style="margin-bottom: 16px;">
        <h1 id="glossary-heading" style="font-size: 22px; font-weight: 800;">Глоссарий терминов</h1>
        <p id="glossary-subheading" style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">60+ финансовых определений с примерами</p>
        <input type="text" id="glossary-search" placeholder="🔍 Поиск термина (EBITDA, ОФЗ, RUONIA...)" style="width: 100%; margin-top: 12px; padding: 12px 14px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; color: var(--text-main); font-size: 14px;" oninput="renderGlossary(this.value)" />
      </div>
      <div id="glossary-list"></div>
    </section>

    <!-- VIEW 4: SIMULATOR / CALCULATORS -->
    <section id="view-trading" class="hidden">
      <div style="margin-bottom: 16px;">
        <h1 id="calc-heading" style="font-size: 22px; font-weight: 800;">Финансовый калькулятор</h1>
        <p id="calc-subheading" style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Уравнение Фишера и реальная процентная ставка</p>
      </div>

      <div class="card">
        <h3 id="calc-fisher-title" class="card-title">Уравнение Фишера</h3>
        <p id="calc-fisher-desc" class="card-desc" style="margin-bottom: 12px;">Расчёт реальной доходности капитала с учётом инфляции</p>
        
        <label id="calc-nominal-label" style="font-size: 12px; color: var(--text-muted);">Номинальная ставка (%)</label>
        <input type="number" id="calc-nominal" value="14" style="width: 100%; padding: 10px; background: var(--surface-light); border: 1px solid var(--border); border-radius: 10px; color: var(--text-main); margin-bottom: 10px;" oninput="recalcFisher()" />

        <label id="calc-infl-label" style="font-size: 12px; color: var(--text-muted);">Ожидаемая инфляция (%)</label>
        <input type="number" id="calc-infl" value="8" style="width: 100%; padding: 10px; background: var(--surface-light); border: 1px solid var(--border); border-radius: 10px; color: var(--text-main); margin-bottom: 14px;" oninput="recalcFisher()" />

        <div style="background: var(--accent-dim); border: 1px solid rgba(0,229,179,0.3); border-radius: 12px; padding: 12px; text-align: center;">
          <div id="calc-real-label" style="font-size: 11px; color: var(--accent); text-transform: uppercase; font-weight: 700;">Реальная доходность (r)</div>
          <div id="fisher-result" style="font-size: 24px; font-weight: 800; font-family: monospace; color: var(--text-main); margin-top: 4px;">+5.56%</div>
        </div>
      </div>
    </section>

    <!-- VIEW 5: PROFILE & SETTINGS -->
    <section id="view-profile" class="hidden">
      <!-- Profile Card with Editable Name -->
      <div class="card" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 54px; height: 54px; border-radius: 16px; background: var(--accent-dim); border: 1px solid rgba(0,229,179,0.4); display: flex; align-items: center; justify-content: center; font-size: 26px;">🎓</div>
          <div>
            <div id="user-display-name" style="font-size: 16px; font-weight: 800; color: var(--text-main);">Студент Академии</div>
            <div id="user-role-text" style="font-size: 12px; color: var(--accent); font-weight: 600;">Локальный аккаунт</div>
          </div>
        </div>
        <button onclick="promptEditName()" style="background: var(--surface-light); border: 1px solid var(--border); color: var(--accent); font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 10px; cursor: pointer;">Изменить</button>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-box">
          <div id="prof-lessons-count" class="stat-val">0 / 20</div>
          <div id="prof-lbl-lessons" class="stat-label">Пройдено уроков</div>
        </div>
        <div class="stat-box">
          <div id="prof-quizzes-count" class="stat-val">0</div>
          <div id="prof-lbl-quizzes" class="stat-label">Сдано тестов</div>
        </div>
        <div class="stat-box">
          <div id="prof-pct" class="stat-val">0%</div>
          <div id="prof-lbl-progress" class="stat-label">Общий прогресс</div>
        </div>
        <div class="stat-box">
          <div class="stat-val">100%</div>
          <div id="prof-lbl-offline" class="stat-label">Offline Ready</div>
        </div>
      </div>

      <!-- App Settings Card -->
      <div class="card">
        <h3 id="settings-heading" class="card-title" style="margin-bottom: 8px;">⚙️ Настройки приложения</h3>
        
        <!-- Dark/Light Theme -->
        <div class="settings-row">
          <div>
            <div id="lbl-dark-theme" class="settings-label">Тёмная тема</div>
            <div id="sub-dark-theme" class="settings-sub">Ночной контрастный режим</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" id="theme-toggle" onchange="toggleTheme(this.checked)" checked>
            <span class="toggle-slider"></span>
          </label>
        </div>

        <!-- Language Switcher -->
        <div class="settings-row">
          <div>
            <div id="lbl-language" class="settings-label">Язык интерфейса</div>
            <div id="sub-language" class="settings-sub">RU / EN перевод курсов</div>
          </div>
          <div style="display: flex; gap: 6px;">
            <button id="btn-lang-ru" class="lang-btn active" onclick="setLanguage('ru')">RU</button>
            <button id="btn-lang-en" class="lang-btn" onclick="setLanguage('en')">EN</button>
          </div>
        </div>

        <!-- Central Bank Key Rate Setting -->
        <div class="settings-row">
          <div>
            <div id="lbl-cbr-rate" class="settings-label">Ключевая ставка ЦБ</div>
            <div id="sub-cbr-rate" class="settings-sub">Базовая ставка для калькуляторов</div>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <input type="number" id="setting-cbr-input" class="name-input" style="width: 80px;" value="14" step="0.5" min="0" max="50" onchange="updateKeyRate(this.value)">
            <span style="font-size: 13px; font-weight: 700; color: var(--accent);">%</span>
          </div>
        </div>

        <!-- Reset Progress -->
        <div class="settings-row" style="padding-top: 16px;">
          <div>
            <div id="lbl-reset-progress" class="settings-label">Сброс прогресса</div>
            <div id="sub-reset-progress" class="settings-sub">Очистить историю уроков и тестов</div>
          </div>
          <button onclick="resetAllProgress()" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 10px; cursor: pointer;">Сбросить</button>
        </div>
      </div>

      <div class="card" style="margin-top: 14px;">
        <h3 id="lbl-offline-card-title" class="card-title">Автономный режим (100% Offline)</h3>
        <p id="lbl-offline-card-desc" class="card-desc">Все 8 модулей, тесты и глоссарий сохранены локально в приложении. Не требует подключения к интернету.</p>
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
      <button id="modal-close-btn" class="btn-primary" onclick="closeTermModal()">Понятно</button>
    </div>
  </div>

  <!-- Quick Edit Name Modal -->
  <div id="name-modal" class="modal-backdrop hidden" onclick="closeNameModal()">
    <div class="modal-sheet" onclick="event.stopPropagation()">
      <div class="sheet-handle"></div>
      <h2 id="name-modal-title" class="sheet-title">Имя профиля</h2>
      <p id="name-modal-desc" class="card-desc" style="margin-bottom: 14px;">Укажите имя для локального сохранения прогресса:</p>
      <input type="text" id="name-edit-field" style="width: 100%; padding: 12px; background: var(--surface-light); border: 1px solid var(--border); border-radius: 12px; color: var(--text-main); font-size: 15px; margin-bottom: 16px;" placeholder="Ваше имя" />
      <button class="btn-primary" onclick="saveNewName()">Сохранить</button>
    </div>
  </div>

  <!-- Key Rate Quick Adjust Modal -->
  <div id="rate-modal" class="modal-backdrop hidden" onclick="closeRateModal()">
    <div class="modal-sheet" onclick="event.stopPropagation()">
      <div class="sheet-handle"></div>
      <h2 id="rate-modal-title" class="sheet-title">Ключевая ставка Банка России</h2>
      <p id="rate-modal-desc" class="card-desc" style="margin-bottom: 14px;">Измените базовую ставку регулятора (обновляет бейдж в шапке и финансовые расчёты):</p>
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 18px;">
        <input type="number" id="modal-cbr-input" style="flex: 1; padding: 12px; background: var(--surface-light); border: 1px solid var(--border); border-radius: 12px; color: var(--text-main); font-size: 18px; font-weight: 700; font-family: monospace;" step="0.25" min="0" max="50" />
        <span style="font-size: 20px; font-weight: 800; color: var(--accent);">%</span>
      </div>
      <button class="btn-primary" onclick="saveRateFromModal()">Применить ставку</button>
    </div>
  </div>

  <!-- Bottom Navigation Bar -->
  <nav class="bottom-nav">
    <div class="nav-item active" onclick="switchTab('courses')">
      <div class="nav-icon">📚</div>
      <span id="tab-label-courses">Курсы</span>
    </div>
    <div class="nav-item" onclick="switchTab('glossary')">
      <div class="nav-icon">📖</div>
      <span id="tab-label-glossary">Глоссарий</span>
    </div>
    <div class="nav-item" onclick="switchTab('trading')">
      <div class="nav-icon">🧮</div>
      <span id="tab-label-trading">Калькулятор</span>
    </div>
    <div class="nav-item" onclick="switchTab('profile')">
      <div class="nav-icon">👤</div>
      <span id="tab-label-profile">Профиль</span>
    </div>
  </nav>

  <!-- Embed JSON Datastores & Keywords -->
  <script>
    const APP_MODULES = ${JSON.stringify(data.modules)};
    const APP_LESSONS = ${JSON.stringify(data.lessons)};
    const APP_GLOSSARY = ${JSON.stringify(data.glossary)};
    const APP_KEYWORDS = ${JSON.stringify(termEntries)};
  </script>

  <!-- Application Logic -->
  <script>
    // State management
    const state = {
      currentTab: 'courses',
      currentLessonSlug: null,
      lang: localStorage.getItem('ziabl_lang') || 'ru',
      theme: localStorage.getItem('ziabl_theme') || 'dark',
      userName: localStorage.getItem('ziabl_username') || 'Студент',
      cbrRate: parseFloat(localStorage.getItem('ziabl_cbr_rate')) || 14.0,
      activeQuizSelections: {} // questionIndex -> optionIndex
    };

    // Localization strings
    const I18N = {
      ru: {
        brand: 'ZIABL',
        academy: 'ACADEMY',
        cbrPrefix: 'ЦБ РФ: ',
        coursesHeading: 'Образовательные курсы',
        coursesSub: '8 модулей, 20 уроков, тесты и интерактивные термины',
        modulePrefix: 'Модуль ',
        doneBadge: 'Пройден ✓',
        inProgress: 'В процессе',
        backToCourses: '← Назад к курсам',
        knowledgeCheck: '📝 Проверка знаний',
        btnSubmitQuiz: 'Подтвердить выбор ответов',
        selectOptionFirst: 'Пожалуйста, выберите варианты ответов!',
        quizPassed: '🎉 Отлично! Все ответы верны, урок успешно сдан!',
        quizFailed: '⚠️ Есть неточности. Изучите пояснения и попробуйте снова.',
        glossaryHeading: 'Глоссарий терминов',
        glossarySub: '60+ финансовых определений с примерами',
        glossaryPlaceholder: '🔍 Поиск термина (EBITDA, ОФЗ, RUONIA...)',
        calcHeading: 'Финансовый калькулятор',
        calcSub: 'Уравнение Фишера и реальная процентная ставка',
        fisherTitle: 'Уравнение Фишера',
        fisherDesc: 'Расчёт реальной доходности капитала с учётом инфляции',
        nominalLabel: 'Номинальная ставка (%)',
        inflLabel: 'Ожидаемая инфляция (%)',
        realLabel: 'Реальная доходность (r)',
        studentRole: 'Локальный аккаунт',
        btnEdit: 'Изменить',
        statLessons: 'Пройдено уроков',
        statQuizzes: 'Сдано тестов',
        statProgress: 'Общий прогресс',
        statOffline: 'Offline Ready',
        settingsTitle: '⚙️ Настройки приложения',
        themeDark: 'Тёмная тема',
        themeDarkSub: 'Ночной контрастный режим',
        langTitle: 'Язык интерфейса',
        langSub: 'RU / EN локализация контента',
        cbrRateTitle: 'Ключевая ставка ЦБ',
        cbrRateSub: 'Базовая ставка для расчётов',
        resetTitle: 'Сброс прогресса',
        resetSub: 'Очистить историю уроков и тестов',
        btnReset: 'Сбросить',
        offlineTitle: 'Автономный режим (100% Offline)',
        offlineDesc: 'Все 8 модулей, тесты и глоссарий сохранены локально в приложении. Не требует подключения к интернету.',
        understandBtn: 'Понятно',
        tabCourses: 'Курсы',
        tabGlossary: 'Глоссарий',
        tabCalc: 'Калькулятор',
        tabProfile: 'Профиль'
      },
      en: {
        brand: 'ZIABL',
        academy: 'ACADEMY',
        cbrPrefix: 'Bank of Russia: ',
        coursesHeading: 'Educational Courses',
        coursesSub: '8 modules, 20 lessons, quizzes, and interactive terms',
        modulePrefix: 'Module ',
        doneBadge: 'Completed ✓',
        inProgress: 'In Progress',
        backToCourses: '← Back to Courses',
        knowledgeCheck: '📝 Knowledge Check',
        btnSubmitQuiz: 'Confirm Answers',
        selectOptionFirst: 'Please select your answers first!',
        quizPassed: '🎉 Great job! All answers are correct, lesson passed!',
        quizFailed: '⚠️ Some answers are incorrect. Review explanations and try again.',
        glossaryHeading: 'Term Glossary',
        glossarySub: '60+ financial definitions with practical examples',
        glossaryPlaceholder: '🔍 Search term (EBITDA, OFZ, RUONIA...)',
        calcHeading: 'Financial Calculator',
        calcSub: 'Fisher equation & real interest rate calculation',
        fisherTitle: 'Fisher Equation',
        fisherDesc: 'Calculate real rate of return adjusted for inflation',
        nominalLabel: 'Nominal Rate (%)',
        inflLabel: 'Expected Inflation (%)',
        realLabel: 'Real Return Rate (r)',
        studentRole: 'Local Student',
        btnEdit: 'Edit',
        statLessons: 'Completed Lessons',
        statQuizzes: 'Passed Quizzes',
        statProgress: 'Total Progress',
        statOffline: 'Offline Ready',
        settingsTitle: '⚙️ Application Settings',
        themeDark: 'Dark Theme',
        themeDarkSub: 'Night high-contrast UI mode',
        langTitle: 'Interface Language',
        langSub: 'RU / EN content localization',
        cbrRateTitle: 'Central Bank Key Rate',
        cbrRateSub: 'Benchmark rate for calculations',
        resetTitle: 'Reset Progress',
        resetSub: 'Clear completed lessons & quiz records',
        btnReset: 'Reset',
        offlineTitle: 'Autonomous Mode (100% Offline)',
        offlineDesc: 'All 8 modules, quizzes, and glossary are stored offline. No internet connection required.',
        understandBtn: 'Got it',
        tabCourses: 'Courses',
        tabGlossary: 'Glossary',
        tabCalc: 'Calculator',
        tabProfile: 'Profile'
      }
    };

    function t(key) {
      const lang = state.lang === 'en' ? 'en' : 'ru';
      return I18N[lang][key] || I18N['ru'][key] || key;
    }

    function applyTranslations() {
      const isEn = state.lang === 'en';
      document.getElementById('header-cbr-text').innerText = t('cbrPrefix') + state.cbrRate.toFixed(1) + '%';
      document.getElementById('courses-heading').innerText = t('coursesHeading');
      document.getElementById('courses-subheading').innerText = t('coursesSub');
      document.getElementById('lesson-back-btn').innerText = t('backToCourses');
      document.getElementById('quiz-heading').innerText = t('knowledgeCheck');
      document.getElementById('btn-submit-quiz').innerText = t('btnSubmitQuiz');
      document.getElementById('glossary-heading').innerText = t('glossaryHeading');
      document.getElementById('glossary-subheading').innerText = t('glossarySub');
      document.getElementById('glossary-search').placeholder = t('glossaryPlaceholder');
      document.getElementById('calc-heading').innerText = t('calcHeading');
      document.getElementById('calc-subheading').innerText = t('calcSub');
      document.getElementById('calc-fisher-title').innerText = t('fisherTitle');
      document.getElementById('calc-fisher-desc').innerText = t('fisherDesc');
      document.getElementById('calc-nominal-label').innerText = t('nominalLabel');
      document.getElementById('calc-infl-label').innerText = t('inflLabel');
      document.getElementById('calc-real-label').innerText = t('realLabel');
      document.getElementById('user-role-text').innerText = t('studentRole');
      document.getElementById('prof-lbl-lessons').innerText = t('statLessons');
      document.getElementById('prof-lbl-quizzes').innerText = t('statQuizzes');
      document.getElementById('prof-lbl-progress').innerText = t('statProgress');
      document.getElementById('prof-lbl-offline').innerText = t('statOffline');
      document.getElementById('settings-heading').innerText = t('settingsTitle');
      document.getElementById('lbl-dark-theme').innerText = t('themeDark');
      document.getElementById('sub-dark-theme').innerText = t('themeDarkSub');
      document.getElementById('lbl-language').innerText = t('langTitle');
      document.getElementById('sub-language').innerText = t('langSub');
      document.getElementById('lbl-cbr-rate').innerText = t('cbrRateTitle');
      document.getElementById('sub-cbr-rate').innerText = t('cbrRateSub');
      document.getElementById('lbl-reset-progress').innerText = t('resetTitle');
      document.getElementById('sub-reset-progress').innerText = t('resetSub');
      document.getElementById('lbl-offline-card-title').innerText = t('offlineTitle');
      document.getElementById('lbl-offline-card-desc').innerText = t('offlineDesc');
      document.getElementById('modal-close-btn').innerText = t('understandBtn');

      document.getElementById('tab-label-courses').innerText = t('tabCourses');
      document.getElementById('tab-label-glossary').innerText = t('tabGlossary');
      document.getElementById('tab-label-trading').innerText = t('tabCalc');
      document.getElementById('tab-label-profile').innerText = t('tabProfile');

      document.getElementById('btn-lang-ru').classList.toggle('active', !isEn);
      document.getElementById('btn-lang-en').classList.toggle('active', isEn);
    }

    function switchTab(tabId) {
      state.currentTab = tabId;
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
      const isEn = state.lang === 'en';

      container.innerHTML = APP_MODULES.map((m, idx) => {
        const modTitle = isEn && m.titleEn ? m.titleEn : m.titleRu;
        const modDesc = isEn && m.descEn ? m.descEn : m.descRu;
        const modCompleted = m.lessons.every(l => completed.includes(l.slug) || completed.includes(l.id));
        const completedCount = m.lessons.filter(l => completed.includes(l.slug) || completed.includes(l.id)).length;

        return \`
          <div class="card">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px;">
              <div style="font-size: 11px; font-weight: 700; color: var(--accent); text-transform: uppercase;">
                \${t('modulePrefix')}\${idx + 1}
              </div>
              \${modCompleted ? \`<span class="badge-done">\${t('doneBadge')}</span>\` : \`<span style="font-size: 11px; color: var(--text-muted);">\${completedCount}/\${m.lessons.length}</span>\`}
            </div>
            <h3 class="card-title">\${m.icon || '📚'} \${modTitle}</h3>
            <p class="card-desc" style="margin-bottom: 14px;">\${modDesc}</p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              \${m.lessons.map(l => {
                const isDone = completed.includes(l.slug) || completed.includes(l.id);
                const lTitle = isEn && l.titleEn ? l.titleEn : l.titleRu;
                return \`
                  <div onclick="openLesson('\${l.slug}')" style="display: flex; align-items: center; justify-content: space-between; background: var(--surface-light); padding: 10px 12px; border-radius: 12px; border: 1px solid var(--border); cursor: pointer;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="width: 22px; height: 22px; border-radius: 50%; background: \${isDone ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)'}; color: \${isDone ? '#10b981' : 'var(--text-muted)'}; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">
                        \${isDone ? '✓' : l.order}
                      </span>
                      <span style="font-size: 13px; font-weight: 600; color: var(--text-main);">\${lTitle}</span>
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
      state.currentLessonSlug = slug;
      state.activeQuizSelections = {};

      const isEn = state.lang === 'en';
      document.getElementById('lesson-title').innerText = isEn && lesson.titleEn ? lesson.titleEn : lesson.titleRu;
      
      const isDone = getCompleted().includes(slug) || getCompleted().includes(lesson.id);
      document.getElementById('lesson-status-badge').innerHTML = isDone
        ? \`<span class="badge-done">\${t('doneBadge')}</span>\`
        : \`<span style="font-size: 11px; color: var(--accent); font-weight: 600;">\${t('inProgress')}</span>\`;

      let raw = (isEn && lesson.contentEn ? lesson.contentEn : lesson.contentRu) || '';

      // 1. First replace markdown glossary links [title](#glossary-xxx)
      raw = raw.replace(/\\[([^\\]]+)\\]\\(#glossary-([^)]+)\\)/g, (match, title, refId) => {
        // Find matching term by ref or title
        const item = APP_GLOSSARY.find(g => g.id === refId || g.id === 'g-' + refId || g.termRu.toLowerCase().includes(title.toLowerCase()));
        const termName = item ? item.termRu : title;
        return \`__TERM_LINK_START__\${termName}__SEP__\${title}__TERM_LINK_END__\`;
      });

      // 2. Intelligent keyword detection across all 20 lessons
      APP_KEYWORDS.forEach(entry => {
        const escaped = entry.keyword.replace(/[.*+?^$\${}()|[\\]\\\\]/g, '\\\\$&');
        // Match word boundaries that work across Cyrillic and English
        const reg = new RegExp('(^|[^а-яёa-z0-9_])(' + escaped + ')(?=[^а-яёa-z0-9_]|$)', 'i');
        if (reg.test(raw)) {
          // Replace only first 2 occurrences per term to avoid visual clutter
          let count = 0;
          raw = raw.replace(new RegExp('(^|[^а-яёa-z0-9_])(' + escaped + ')(?=[^а-яёa-z0-9_]|$)', 'gi'), (m, prefix, matchedText) => {
            count++;
            if (count <= 2) {
              return prefix + \`__TERM_LINK_START__\${entry.termRu}__SEP__\${matchedText}__TERM_LINK_END__\`;
            }
            return m;
          });
        }
      });

      // Convert temporary tokens into clickable HTML buttons
      raw = raw.replace(/__TERM_LINK_START__(.*?)__SEP__(.*?)__TERM_LINK_END__/g, (m, termName, text) => {
        const cleanName = termName.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        return \`<button type="button" class="term-btn" onclick="openTermModal('\${cleanName}')">\${text}</button>\`;
      });

      // 3. Format markdown headings, bold, code, blockquotes, lists
      let formatted = raw
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/\\*\\*(.*?)\\*\\*/gim, '<strong>$1</strong>')
        .replace(new RegExp('\\x60([^\\x60]+)\\x60', 'g'), '<code>$1</code>')
        .replace(/\\n/g, '<br/>');

      document.getElementById('lesson-content').innerHTML = formatted;
      renderQuiz(lesson);
      switchTab('lesson');
    }

    function renderQuiz(lesson) {
      const container = document.getElementById('quiz-questions');
      const feedback = document.getElementById('quiz-result-feedback');
      const submitBtn = document.getElementById('btn-submit-quiz');
      feedback.style.display = 'none';
      submitBtn.disabled = false;
      submitBtn.innerText = t('btnSubmitQuiz');

      if (!lesson.quiz || !lesson.quiz.questions || lesson.quiz.questions.length === 0) {
        document.getElementById('lesson-quiz-box').classList.add('hidden');
        return;
      }
      document.getElementById('lesson-quiz-box').classList.remove('hidden');

      const isEn = state.lang === 'en';
      container.innerHTML = lesson.quiz.questions.map((q, qIdx) => {
        const qText = isEn && q.questionEn ? q.questionEn : q.questionRu;
        const options = isEn && q.optionsEn ? q.optionsEn : q.optionsRu;
        return \`
          <div class="q-item" id="quiz-item-\${qIdx}">
            <div class="q-title">\${qIdx + 1}. \${qText}</div>
            <div class="options-group">
              \${options.map((optText, optIdx) => \`
                <button type="button" class="opt-btn" id="q-\${qIdx}-opt-\${optIdx}" onclick="selectQuizOption(\${qIdx}, \${optIdx})">
                  <span>\${optText}</span>
                  <span class="mark" style="font-size: 14px; font-weight: 800;"></span>
                </button>
              \`).join('')}
            </div>
            <div class="q-explanation hidden" id="q-explanation-\${qIdx}"></div>
          </div>
        \`;
      }).join('');
    }

    function selectQuizOption(qIdx, optIdx) {
      state.activeQuizSelections[qIdx] = optIdx;
      const group = document.getElementById('quiz-item-' + qIdx);
      group.querySelectorAll('.opt-btn').forEach((btn, idx) => {
        btn.classList.toggle('selected', idx === optIdx);
      });
    }

    function submitCurrentQuiz() {
      const lesson = APP_LESSONS[state.currentLessonSlug];
      if (!lesson || !lesson.quiz || !lesson.quiz.questions) return;

      const questions = lesson.quiz.questions;
      const isEn = state.lang === 'en';
      
      // Check if user has answered all questions
      let allAnswered = true;
      for (let i = 0; i < questions.length; i++) {
        if (state.activeQuizSelections[i] === undefined) {
          allAnswered = false;
          break;
        }
      }

      const feedback = document.getElementById('quiz-result-feedback');
      if (!allAnswered) {
        feedback.style.display = 'block';
        feedback.style.color = '#f59e0b';
        feedback.innerText = t('selectOptionFirst');
        return;
      }

      let allCorrect = true;
      questions.forEach((q, qIdx) => {
        const selectedOptIdx = state.activeQuizSelections[qIdx];
        const correctIndices = q.correctIndices || [];
        const isOptCorrect = correctIndices.includes(selectedOptIdx);
        if (!isOptCorrect) allCorrect = false;

        // Visual highlights for each option
        q.optionsRu.forEach((_, optIdx) => {
          const btn = document.getElementById(\`q-\${qIdx}-opt-\${optIdx}\`);
          if (!btn) return;
          btn.classList.remove('selected', 'correct', 'wrong');
          const mark = btn.querySelector('.mark');
          mark.innerText = '';

          if (correctIndices.includes(optIdx)) {
            btn.classList.add('correct');
            mark.innerText = '✓';
          } else if (optIdx === selectedOptIdx) {
            btn.classList.add('wrong');
            mark.innerText = '✕';
          }
        });

        // Show detailed explanation
        const explEl = document.getElementById('q-explanation-' + qIdx);
        const explText = isEn && q.explanationEn ? q.explanationEn : q.explanationRu;
        if (explText) {
          explEl.innerHTML = \`💡 <strong>\${isEn ? 'Explanation:' : 'Пояснение:'}</strong> \${explText}\`;
          explEl.classList.remove('hidden');
        }
      });

      feedback.style.display = 'block';
      if (allCorrect) {
        feedback.style.color = '#10b981';
        feedback.innerText = t('quizPassed');
        markLessonCompleted(state.currentLessonSlug);
        document.getElementById('lesson-status-badge').innerHTML = \`<span class="badge-done">\${t('doneBadge')}</span>\`;
      } else {
        feedback.style.color = '#ef4444';
        feedback.innerText = t('quizFailed');
      }
    }

    function renderGlossary(filter = '') {
      const container = document.getElementById('glossary-list');
      const isEn = state.lang === 'en';
      const cleanFilter = filter.toLowerCase().trim();

      const filtered = APP_GLOSSARY.filter(t => 
        t.termRu.toLowerCase().includes(cleanFilter) || 
        (t.termEn && t.termEn.toLowerCase().includes(cleanFilter)) ||
        (t.definitionRu && t.definitionRu.toLowerCase().includes(cleanFilter)) ||
        (t.definitionEn && t.definitionEn.toLowerCase().includes(cleanFilter))
      );

      container.innerHTML = filtered.map(item => {
        const title = isEn && item.termEn ? item.termEn : item.termRu;
        const sub = isEn ? item.termRu : (item.termEn || '');
        const desc = isEn && item.definitionEn ? item.definitionEn : item.definitionRu;
        return \`
          <div class="card" onclick="openTermModal('\${item.termRu}')" style="cursor: pointer;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <div style="font-size: 15px; font-weight: 700; color: var(--text-main);">\${title}</div>
              <span class="sheet-category" style="margin-bottom: 0;">\${item.category || 'Термин'}</span>
            </div>
            \${sub ? \`<div style="font-size: 11px; color: var(--accent); margin-bottom: 8px;">\${sub}</div>\` : ''}
            <div style="font-size: 13px; color: var(--text-muted); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              \${desc}
            </div>
          </div>
        \`;
      }).join('');
    }

    function openTermModal(termName) {
      // Find term by full or partial match
      const cleanQuery = termName.toLowerCase().replace(/[()]/g, '').trim();
      const item = APP_GLOSSARY.find(t => 
        t.termRu === termName || 
        t.termEn === termName ||
        cleanQuery.includes(t.termRu.toLowerCase()) ||
        t.termRu.toLowerCase().includes(cleanQuery)
      ) || APP_GLOSSARY.find(t => t.termRu.toLowerCase().startsWith(cleanQuery.slice(0, 4)));

      if (!item) return;
      const isEn = state.lang === 'en';
      const title = isEn && item.termEn ? item.termEn + ' (' + item.termRu + ')' : item.termRu + (item.termEn ? ' (' + item.termEn + ')' : '');
      const desc = isEn && item.definitionEn ? item.definitionEn : item.definitionRu;

      document.getElementById('modal-title').innerText = title;
      document.getElementById('modal-category').innerText = item.category || (isEn ? 'Glossary' : 'Глоссарий');
      document.getElementById('modal-desc').innerText = desc;
      document.getElementById('term-modal').classList.remove('hidden');
    }
    function closeTermModal() {
      document.getElementById('term-modal').classList.add('hidden');
    }

    // Name Editing
    function promptEditName() {
      document.getElementById('name-edit-field').value = state.userName;
      document.getElementById('name-modal').classList.remove('hidden');
      setTimeout(() => document.getElementById('name-edit-field').focus(), 100);
    }
    function closeNameModal() {
      document.getElementById('name-modal').classList.add('hidden');
    }
    function saveNewName() {
      const val = document.getElementById('name-edit-field').value.trim();
      if (val) {
        state.userName = val;
        localStorage.setItem('ziabl_username', val);
        document.getElementById('user-display-name').innerText = val;
      }
      closeNameModal();
    }

    // Theme Switcher
    function toggleTheme(isDark) {
      state.theme = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('ziabl_theme', state.theme);
    }

    // Language Switcher
    function setLanguage(lang) {
      state.lang = lang;
      localStorage.setItem('ziabl_lang', lang);
      applyTranslations();
      renderCourses();
      renderGlossary();
      if (state.currentTab === 'lesson' && state.currentLessonSlug) {
        openLesson(state.currentLessonSlug);
      }
    }

    // Key Rate settings & quick modal
    function openKeyRateModal() {
      document.getElementById('modal-cbr-input').value = state.cbrRate;
      document.getElementById('rate-modal').classList.remove('hidden');
    }
    function closeRateModal() {
      document.getElementById('rate-modal').classList.add('hidden');
    }
    function saveRateFromModal() {
      const val = parseFloat(document.getElementById('modal-cbr-input').value);
      if (!isNaN(val) && val >= 0) {
        updateKeyRate(val);
      }
      closeRateModal();
    }
    function updateKeyRate(newRate) {
      const parsed = parseFloat(newRate);
      if (isNaN(parsed)) return;
      state.cbrRate = parsed;
      localStorage.setItem('ziabl_cbr_rate', parsed);
      document.getElementById('header-cbr-text').innerText = t('cbrPrefix') + parsed.toFixed(1) + '%';
      document.getElementById('setting-cbr-input').value = parsed;
      document.getElementById('calc-nominal').value = parsed;
      recalcFisher();
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

    function resetAllProgress() {
      if (confirm('Сбросить весь прогресс обучения?')) {
        localStorage.removeItem('ziabl_completed_lessons');
        renderCourses();
        updateProfileStats();
      }
    }

    // Init App
    window.addEventListener('DOMContentLoaded', () => {
      // Restore Theme
      document.documentElement.setAttribute('data-theme', state.theme);
      document.getElementById('theme-toggle').checked = (state.theme === 'dark');

      // Restore Name
      document.getElementById('user-display-name').innerText = state.userName;

      // Restore Key Rate
      document.getElementById('setting-cbr-input').value = state.cbrRate;
      document.getElementById('calc-nominal').value = state.cbrRate;

      applyTranslations();
      renderCourses();
      renderGlossary();
      recalcFisher();
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
  console.log('Mobile App Standalone index.html successfully generated in out_web/ with all upgrades!');
}

buildOfflineApp();
