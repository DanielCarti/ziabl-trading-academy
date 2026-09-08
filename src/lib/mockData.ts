import { ACADEMY_MODULES } from './coursesData';

// Fallback mock data when Postgres is not running locally
export const mockModules = ACADEMY_MODULES.map((mod) => ({
  id: mod.id,
  slug: mod.slug,
  titleRu: mod.titleRu,
  titleEn: mod.titleEn,
  descRu: mod.descRu,
  descEn: mod.descEn,
  icon: mod.icon,
  order: mod.order,
  published: mod.published,
  _count: { lessons: mod.lessons.length },
  lessons: mod.lessons.map((l) => ({
    id: l.id,
    slug: l.slug,
    titleRu: l.titleRu,
    titleEn: l.titleEn,
    order: l.order,
    published: l.published,
  })),
}));

export const mockGlossaryTerms = [
  // Франклин и Кийосаки
  { id: 'g-fc-1', termRu: 'Альтернативные издержки (Opportunity Cost)', termEn: 'Opportunity Cost', definitionRu: 'Упущенная выгода: доход, который могли бы принести деньги и время при их разумном инвестировании вместо праздности или трат', definitionEn: 'The loss of potential gain from other alternatives when one alternative is chosen', category: 'Личные финансы', relatedLessonSlug: 'franklin-philosophy-time-money' },
  { id: 'g-fc-2', termRu: 'Актив (по Кийосаки)', termEn: 'Asset (Kiyosaki)', definitionRu: 'Любой инструмент или собственность, которая генерирует положительный денежный поток (Cash Flow) и кладёт деньги в ваш карман', definitionEn: 'Anything that puts positive cash flow into your pocket', category: 'Личные финансы', relatedLessonSlug: 'kiyosaki-assets-liabilities-cashflow' },
  { id: 'g-fc-3', termRu: 'Пассив (по Кийосаки)', termEn: 'Liability (Kiyosaki)', definitionRu: 'Имущество или обязательство, которое регулярно вынимает деньги из вашего кармана (кредиты, личный автомобиль, налоги)', definitionEn: 'Anything that takes money out of your pocket', category: 'Личные финансы', relatedLessonSlug: 'kiyosaki-assets-liabilities-cashflow' },
  { id: 'g-fc-4', termRu: 'Денежный поток (Cash Flow)', termEn: 'Cash Flow', definitionRu: 'Чистая разница между всеми входящими денежными поступлениями и исходящими платежами за период', definitionEn: 'Net amount of cash being transferred into and out of an entity', category: 'Личные финансы', relatedLessonSlug: 'kiyosaki-assets-liabilities-cashflow' },
  { id: 'g-fc-5', termRu: 'Квадрант денежного потока', termEn: 'Cashflow Quadrant', definitionRu: 'Модель распределения людей по способу получения дохода: Работник (E), Сами на себя (S), Бизнес (B), Инвестор (I)', definitionEn: 'Four archetypes of earning: Employee, Self-employed, Business, and Investor', category: 'Личные финансы', relatedLessonSlug: 'kiyosaki-assets-liabilities-cashflow' },

  // Макроэкономика & Мосбиржа
  { id: 'g1', termRu: 'Инфляция', termEn: 'Inflation', definitionRu: 'Устойчивое повышение общего уровня цен на товары и услуги, приводящее к обесценению покупательской способности денег', definitionEn: 'Sustained increase in the general price level of goods and services', category: 'Макроэкономика', relatedLessonSlug: 'inflation-cb-rate' },
  { id: 'g2', termRu: 'Ключевая ставка ЦБ РФ', termEn: 'Key Rate', definitionRu: 'Минимальный процент, под который Банк России кредитует коммерческие банки, задающий ориентир для всей экономики', definitionEn: 'Minimum benchmark rate at which the Central Bank lends to commercial banks', category: 'Макроэкономика', relatedLessonSlug: 'inflation-cb-rate' },
  { id: 'g-fisher-1', termRu: 'Уравнение Фишера', termEn: 'Fisher Equation', definitionRu: 'Фундаментальная формула, связывающая номинальную ставку (i), реальную ставку (r) и инфляцию (π): приближённо r ≈ i - π, а точная мультипликативная форма: (1 + i) = (1 + r)(1 + π). Показывает реальный прирост покупательской способности капитала.', definitionEn: 'Equation relating nominal interest rate (i), real interest rate (r), and inflation (π): (1 + i) = (1 + r)(1 + π). It reveals the true purchasing power gain.', category: 'Макроэкономика', relatedLessonSlug: 'inflation-cb-rate' },
  { id: 'g-fisher-2', termRu: 'Ирвинг Фишер', termEn: 'Irving Fisher', definitionRu: 'Выдающийся американский экономист-неоклассик, пионер эконометрики. Разработал количественную теорию денег (уравнение обмена M·V = P·Y), теорию процентов и капитала, а также концепцию долговой дефляции (Debt Deflation).', definitionEn: 'Celebrated American neoclassical economist who formulated the quantity theory of money (M·V = P·Y), the theory of interest, and the debt-deflation theory.', category: 'Макроэкономика', relatedLessonSlug: 'inflation-cb-rate' },
  { id: 'g-ruonia-1', termRu: 'RUONIA', termEn: 'RUONIA', definitionRu: 'Rouble OverNight Index Average — эталонная взвешенная процентная ставка однодневных межбанковских кредитов (депозитов) в рублях в России. Рассчитывается Банком России и выступает бенчмарком денежного рынка и базой для купонов ОФЗ-ПК (флоатеров).', definitionEn: 'Rouble OverNight Index Average — the benchmark rate for overnight unsecured ruble loans between prime Russian banks, calculated by the Bank of Russia.', category: 'Макроэкономика', relatedLessonSlug: 'inflation-cb-rate' },
  { id: 'g-moex-1', termRu: 'Режим расчётов Т+1', termEn: 'T+1 Settlement', definitionRu: 'Биржевой стандарт, при котором фактический переход прав собственности на ценные бумаги и расчёт происходят на следующий рабочий день', definitionEn: 'Settlement cycle where securities and cash settle on the next business day', category: 'Инфраструктура', relatedLessonSlug: 'moex-clearing-depository-taxes' },
  { id: 'g-moex-2', termRu: 'НКЦ (Центральный Контрагент)', termEn: 'National Clearing Centre', definitionRu: 'Организация группы Мосбиржи, выступающая гарантом исполнения каждой сделки для покупателя и продавца', definitionEn: 'Central counterparty guaranteeing trade execution on Moscow Exchange', category: 'Инфраструктура', relatedLessonSlug: 'moex-clearing-depository-taxes' },
  { id: 'g-moex-3', termRu: 'НРД (Депозитарий)', termEn: 'National Settlement Depository', definitionRu: 'Главный депозитарий РФ, ведущий официальный реестр прав владельцев бездокументарных ценных бумаг', definitionEn: 'Central depository maintaining legal registries of securities ownership', category: 'Инфраструктура', relatedLessonSlug: 'moex-clearing-depository-taxes' },
  { id: 'g-moex-4', termRu: 'ИИС-3', termEn: 'IIS-3 Account', definitionRu: 'Индивидуальный инвестиционный счёт нового типа, объединяющий налоговый вычет на взнос (до 60 тыс. ₽) и освобождение от налога на прибыль', definitionEn: 'Tax-advantaged Russian investment account offering dual deduction benefits', category: 'Инфраструктура', relatedLessonSlug: 'moex-clearing-depository-taxes' },

  // Облигации
  { id: 'g4', termRu: 'Облигация (Bond)', termEn: 'Bond', definitionRu: 'Эмиссионная долговая ценная бумага с фиксированным или плавающим доходом (купоном) и обязательством возврата номинала', definitionEn: 'Debt security with fixed or floating coupon and principal repayment', category: 'Облигации', relatedLessonSlug: 'what-are-bonds' },
  { id: 'g-b-1', termRu: 'ОФЗ-ПД', termEn: 'OFZ-PD (Fixed)', definitionRu: 'Облигации федерального займа с постоянным купоном на весь срок обращения. Размер купона известен заранее вплоть до даты погашения, что позволяет зафиксировать высокую доходность на годы вперёд.', definitionEn: 'Federal loan bonds with fixed coupon payments known until maturity, allowing investors to lock in yields for years.', category: 'Облигации', relatedLessonSlug: 'what-are-bonds' },
  { id: 'g-b-2', termRu: 'ОФЗ-ПК (Флоатер)', termEn: 'OFZ-PK (Floater)', definitionRu: 'ОФЗ с переменным купоном, привязанным к ставке межбанковского кредитования RUONIA', definitionEn: 'Floating rate government bond tied to RUONIA benchmark', category: 'Облигации', relatedLessonSlug: 'what-are-bonds' },
  { id: 'g-b-3', termRu: 'ОФЗ-ИН (Линкер)', termEn: 'OFZ-IN (Linker)', definitionRu: 'ОФЗ с индексируемым номиналом, который ежедневно прирастает на величину официальной инфляции (ИПЦ)', definitionEn: 'Inflation-indexed bond where principal tracks consumer price index', category: 'Облигации', relatedLessonSlug: 'what-are-bonds' },
  { id: 'g6', termRu: 'НКД (Накопленный купонный доход)', termEn: 'Accrued Interest', definitionRu: 'Часть купона, накопившаяся с момента предыдущей выплаты, которую покупатель выплачивает продавцу при сделке', definitionEn: 'Interest accumulated since last coupon payment', category: 'Облигации', relatedLessonSlug: 'what-are-bonds' },
  { id: 'g-b-4', termRu: 'Дюрация Маколея', termEn: 'Macaulay Duration', definitionRu: 'Средневзвешенный срок до возврата всех денежных потоков по облигации, мера чувствительности цены к процентным ставкам', definitionEn: 'Weighted average term to cash flow receipt; measure of interest rate risk', category: 'Облигации', relatedLessonSlug: 'corporate-bonds-ratings' },
  { id: 'g8', termRu: 'YTM (Доходность к погашению)', termEn: 'Yield to Maturity', definitionRu: 'Полная годовая норма доходности облигации при её удержании до даты погашения с учетом реинвестирования купонов', definitionEn: 'Total internal rate of return if bond is held to maturity', category: 'Облигации', relatedLessonSlug: 'bond-strategies' },

  // Баффетт & Анализ
  { id: 'g-ebitda-1', termRu: 'EBITDA', termEn: 'EBITDA', definitionRu: 'Earnings Before Interest, Taxes, Depreciation, and Amortization — аналитическая прибыль компании до уплаты процентов по долгам, налога на прибыль и амортизационных отчислений. Показывает способность бизнеса генерировать денежный поток от профильной операционной деятельности безотносительно долговой нагрузки и налоговой юрисдикции.', definitionEn: 'Earnings Before Interest, Taxes, Depreciation, and Amortization — key proxy for core operational profitability unaffected by capital structure.', category: 'Анализ', relatedLessonSlug: 'ifrs-reporting' },
  { id: 'g-netdebt-1', termRu: 'Net Debt (Чистый долг)', termEn: 'Net Debt', definitionRu: 'Разница между совокупным долгом компании (краткосрочные кредиты + долгосрочные займы + облигационные займы) и высоколиквидными средствами (деньги на расчетных счетах и их эквиваленты). Показывает реальную непогашенную сумму обязательств.', definitionEn: 'Total debt (short-term + long-term borrowings) minus cash and cash equivalents. Reflects a company’s net financial debt obligation.', category: 'Анализ', relatedLessonSlug: 'ifrs-reporting' },
  { id: 'g-netdebt-ebitda', termRu: 'Net Debt / EBITDA', termEn: 'Net Debt to EBITDA', definitionRu: 'Главный коэффициент долговой устойчивости в корпоративных финансах. Показывает, за сколько лет компания сможет полностью погасить весь чистый долг своей годовой операционной прибылью. Норма для стабильных компаний: < 2.0x; при > 3.0x долговая нагрузка считается критической.', definitionEn: 'Debt coverage ratio measuring how many years a company needs to pay off its net debt using annual EBITDA. Ratios under 2.0x are healthy; over 3.0x signal high credit risk.', category: 'Анализ', relatedLessonSlug: 'ifrs-reporting' },
  { id: 'g-buf-1', termRu: 'Экономический ров (Economic Moat)', termEn: 'Economic Moat', definitionRu: 'Устойчивое конкурентное преимущество (бренд, сетевой эффект, монополия издержек), защищающее прибыль бизнеса десятилетиями', definitionEn: 'A company’s durable competitive advantage shielding market share', category: 'Анализ', relatedLessonSlug: 'buffett-economic-moat-margin-of-safety' },
  { id: 'g-buf-2', termRu: 'Маржа безопасности (Margin of Safety)', termEn: 'Margin of Safety', definitionRu: 'Покупка акции со значительной скидкой к её внутренней стоимости, защищающая от ошибок прогноза и кризисов', definitionEn: 'Purchasing an asset at a discount to its intrinsic fundamental value', category: 'Анализ', relatedLessonSlug: 'buffett-economic-moat-margin-of-safety' },
  { id: 'g-buf-3', termRu: 'Круг компетенций (Circle of Competence)', termEn: 'Circle of Competence', definitionRu: 'Границы отраслей и бизнесов, экономику и драйверы которых инвестор действительно досконально понимает', definitionEn: 'The subject area matching a person’s genuine business expertise', category: 'Анализ', relatedLessonSlug: 'buffett-philosophy-circle-of-competence' },
  { id: 'g-buf-4', termRu: 'Free Cash Flow (FCF)', termEn: 'Free Cash Flow', definitionRu: 'Свободный денежный поток от операционной деятельности за вычетом капитальных затрат (CFO - CAPEX)', definitionEn: 'Operating cash flow minus capital expenditures available to shareholders', category: 'Анализ', relatedLessonSlug: 'ifrs-reporting' },
  { id: 'g15', termRu: 'P/E', termEn: 'P/E Ratio', definitionRu: 'Отношение рыночной цены акции к чистой прибыли на акцию (срок окупаемости инвестиции в годах)', definitionEn: 'Price to Earnings valuation multiple', category: 'Анализ', relatedLessonSlug: 'ifrs-reporting' },

  // Майкл Бьюрри & Кризисы
  { id: 'g-bur-1', termRu: 'Кредитно-дефолтный своп (CDS)', termEn: 'Credit Default Swap', definitionRu: 'Производный финансовый инструмент: страховка от дефолта заемщика или облигации с асимметричной доходностью', definitionEn: 'A financial derivative swap that transfers credit exposure of fixed income products', category: 'Кризисы и Риски', relatedLessonSlug: 'burry-cds-asymmetric-bets' },
  { id: 'g-bur-2', termRu: 'Асимметричная ставка (Asymmetric Bet)', termEn: 'Asymmetric Bet', definitionRu: 'Инвестиционная идея, где максимальный убыток жестко ограничен и мал, а потенциальная прибыль кратна (высокий R:R)', definitionEn: 'A trade where upside potential vastly outweighs strictly capped downside risk', category: 'Кризисы и Риски', relatedLessonSlug: 'burry-cds-asymmetric-bets' },
  { id: 'g-bur-3', termRu: 'Цикл Мински (Minsky Cycle)', termEn: 'Minsky Moment', definitionRu: 'Пять стадий надувания и схлопывания рыночного пузыря: Смещение, Бум, Эйфория, Фиксация прибыли и Паника', definitionEn: 'Five phases of credit and asset bubbles leading to sudden market collapse', category: 'Кризисы и Риски', relatedLessonSlug: 'market-bubbles-minsky-cycle' },

  // Трейдинг & Риск-менеджмент
  { id: 'g-tr-1', termRu: 'Правило 1% риска', termEn: '1% Risk Rule', definitionRu: 'Железный закон мани-менеджмента: максимальный убыток при выбивании стоп-лосса не должен превышать 1% капитала', definitionEn: 'Money management principle risking at most 1% of total equity per single trade', category: 'Трейдинг', relatedLessonSlug: 'candlestick-patterns' },
  { id: 'g14', termRu: 'Биржевой стакан (Order Book)', termEn: 'Order Book', definitionRu: 'Электронный реестр встречных заявок на покупку (Bid) и продажу (Ask) с указанием объема и цены', definitionEn: 'Depth of market showing limit orders for buy and sell interest', category: 'Трейдинг', relatedLessonSlug: 'exchange-broker-orderbook' },
  { id: 'g16', termRu: 'RSI', termEn: 'RSI', definitionRu: 'Индекс относительной силы — осциллятор от 0 до 100, сигнализирующий о перекупленности (>70) или перепроданности (<30)', definitionEn: 'Relative Strength Index momentum oscillator', category: 'Теханализ', relatedLessonSlug: 'indicators-ma-rsi-macd' },
  { id: 'g17', termRu: 'Дивергенция (Divergence)', termEn: 'Divergence', definitionRu: 'Расхождение между направлением движения цены актива и индикатором (MACD/RSI), предупреждающее о скором сломе тренда', definitionEn: 'Disagreement between price action and momentum oscillator', category: 'Теханализ', relatedLessonSlug: 'indicators-ma-rsi-macd' },
];

// Map each lesson slug with its parent module info for immediate render
export const mockLessonsBySlug: Record<string, any> = {};

for (const mod of ACADEMY_MODULES) {
  for (const les of mod.lessons) {
    mockLessonsBySlug[les.slug] = {
      id: les.id,
      slug: les.slug,
      titleRu: les.titleRu,
      titleEn: les.titleEn,
      hasChart: !!les.hasChart,
      chartType: les.chartType || null,
      published: les.published,
      contentRu: les.contentRu,
      contentEn: les.contentEn,
      module: {
        id: mod.id,
        slug: mod.slug,
        titleRu: mod.titleRu,
        titleEn: mod.titleEn,
        descRu: mod.descRu,
        descEn: mod.descEn,
        lessons: mod.lessons.map((l) => ({
          id: l.id,
          slug: l.slug,
          titleRu: l.titleRu,
          titleEn: l.titleEn,
          order: l.order,
        })),
      },
      quiz: les.quiz
        ? {
            id: `quiz-${les.id}`,
            passingScore: les.quiz.passingScore,
            questions: les.quiz.questions.map((q, idx) => ({
              id: `q-${les.id}-${idx}`,
              order: idx + 1,
              questionRu: q.questionRu,
              questionEn: q.questionEn,
              optionsRu: q.optionsRu,
              optionsEn: q.optionsEn,
              correctIndices: q.correctIndices,
              explanationRu: q.explanationRu,
              explanationEn: q.explanationEn,
            })),
          }
        : null,
    };
  }
}
