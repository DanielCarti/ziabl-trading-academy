// Fallback mock data when Postgres is not running locally
export const mockModules = [
  {
    id: 'mod-1',
    slug: 'economic-foundation',
    titleRu: 'Экономический фундамент',
    titleEn: 'Economic Foundation',
    descRu: 'Ключевые макроэкономические концепции, которые влияют на финансовые рынки',
    descEn: 'Key macroeconomic concepts that affect financial markets',
    order: 1,
    published: true,
    _count: { lessons: 2 },
    lessons: [
      { id: 'les-1-1', slug: 'inflation-cb-rate', titleRu: 'Инфляция, ключевая ставка ЦБ РФ и деньги в экономике', titleEn: 'Inflation, Central Bank Rate, and Money in the Economy', order: 1, published: true },
      { id: 'les-1-2', slug: 'gdp-economic-cycles', titleRu: 'ВВП, экономические циклы и фазы рынка', titleEn: 'GDP, Economic Cycles, and Market Phases', order: 2, published: true },
    ],
  },
  {
    id: 'mod-2',
    slug: 'bonds-ofz',
    titleRu: 'Средне- и долгосрочные инвестиции (ОФЗ и Облигации)',
    titleEn: 'Medium and Long-term Investments (Bonds)',
    descRu: 'Всё об облигациях — от государственных ОФЗ до корпоративных бумаг',
    descEn: 'Everything about bonds — from government OFZ to corporate securities',
    order: 2,
    published: true,
    _count: { lessons: 3 },
    lessons: [
      { id: 'les-2-1', slug: 'what-are-bonds', titleRu: 'Что такое облигации? ОФЗ, виды купонов', titleEn: 'What are Bonds? OFZ, Coupon Types', order: 1, published: true },
      { id: 'les-2-2', slug: 'corporate-bonds-ratings', titleRu: 'Корпоративные облигации, кредитные рейтинги и дюрация', titleEn: 'Corporate Bonds, Credit Ratings, and Duration', order: 2, published: true },
      { id: 'les-2-3', slug: 'bond-strategies', titleRu: 'Стратегии работы с облигациями (YTM)', titleEn: 'Bond Strategies (YTM)', order: 3, published: true },
    ],
  },
  {
    id: 'mod-3',
    slug: 'collective-investments',
    titleRu: 'Коллективные инвестиции и Индексный подход',
    titleEn: 'Collective Investments and Index Approach',
    descRu: 'Фонды, ETF, БПИФ и принципы составления портфеля',
    descEn: 'Funds, ETFs, and portfolio construction principles',
    order: 3,
    published: true,
    _count: { lessons: 2 },
    lessons: [
      { id: 'les-3-1', slug: 'etf-bpif-funds', titleRu: 'Фонды (БПИФ и ETF) — как купить весь рынок одной бумагой', titleEn: 'Funds (BPIF and ETF) — How to Buy the Entire Market with One Security', order: 1, published: true },
      { id: 'les-3-2', slug: 'portfolio-construction', titleRu: 'Составление портфеля, сложный процент и диверсификация', titleEn: 'Portfolio Construction, Compound Interest, and Diversification', order: 2, published: true },
    ],
  },
  {
    id: 'mod-4',
    slug: 'trading-mechanics',
    titleRu: 'Механика трейдинга и словарь',
    titleEn: 'Trading Mechanics and Vocabulary',
    descRu: 'Как работает биржа, брокер, ордера и маржинальная торговля',
    descEn: 'How the exchange, broker, orders, and margin trading work',
    order: 4,
    published: true,
    _count: { lessons: 2 },
    lessons: [
      { id: 'les-4-1', slug: 'stocks-long-short', titleRu: 'Акции, лонг, шорт, маржинальная торговля', titleEn: 'Stocks, Long, Short, Margin Trading', order: 1, published: true },
      { id: 'les-4-2', slug: 'exchange-broker-orderbook', titleRu: 'Биржа, брокер, стакан заявок и типы ордеров', titleEn: 'Exchange, Broker, Order Book, and Order Types', order: 2, published: true },
    ],
  },
  {
    id: 'mod-5',
    slug: 'fundamental-analysis',
    titleRu: 'Фундаментальный анализ компании',
    titleEn: 'Fundamental Company Analysis',
    descRu: 'Как читать отчётность, считать мультипликаторы и оценивать бизнес',
    descEn: 'How to read financial statements, calculate multiples, and evaluate businesses',
    order: 5,
    published: true,
    _count: { lessons: 3 },
    lessons: [
      { id: 'les-5-1', slug: 'ifrs-reporting', titleRu: 'Отчетность МСФО (P&L, Баланс, Cash Flow)', titleEn: 'IFRS Reporting (P&L, Balance Sheet, Cash Flow)', order: 1, published: true },
      { id: 'les-5-2', slug: 'valuation-multiples', titleRu: 'Мультипликаторы (P/E, P/S, EV/EBITDA, ROE)', titleEn: 'Valuation Multiples (P/E, P/S, EV/EBITDA, ROE)', order: 2, published: true },
      { id: 'les-5-3', slug: 'dividend-policy', titleRu: 'Оценка дивидендной политики и бизнес-модели', titleEn: 'Dividend Policy and Business Model Evaluation', order: 3, published: true },
    ],
  },
  {
    id: 'mod-6',
    slug: 'technical-analysis',
    titleRu: 'Технический и свечной анализ',
    titleEn: 'Technical and Candlestick Analysis',
    descRu: 'Тренды, индикаторы, паттерны японских свечей',
    descEn: 'Trends, indicators, Japanese candlestick patterns',
    order: 6,
    published: true,
    _count: { lessons: 3 },
    lessons: [
      { id: 'les-6-1', slug: 'trends-support-resistance', titleRu: 'Тренды, уровни поддержки и сопротивления, объёмы', titleEn: 'Trends, Support and Resistance Levels, Volume', order: 1, published: true },
      { id: 'les-6-2', slug: 'indicators-ma-rsi-macd', titleRu: 'Индикаторы (MA, RSI, MACD)', titleEn: 'Indicators (MA, RSI, MACD)', order: 2, published: true },
      { id: 'les-6-3', slug: 'candlestick-patterns', titleRu: 'Японские свечи и разворотные паттерны', titleEn: 'Japanese Candlesticks and Reversal Patterns', order: 3, published: true },
    ],
  },
];

export const mockGlossaryTerms = [
  { id: 'g1', termRu: 'Инфляция', termEn: 'Inflation', definitionRu: 'Устойчивое повышение общего уровня цен на товары и услуги', definitionEn: 'Sustained increase in the general price level of goods and services', category: 'Макроэкономика', relatedLessonSlug: 'inflation-cb-rate' },
  { id: 'g2', termRu: 'Ключевая ставка', termEn: 'Key Rate', definitionRu: 'Минимальный процент, под который ЦБ выдаёт кредиты коммерческим банкам', definitionEn: 'Minimum rate at which the Central Bank lends to commercial banks', category: 'Макроэкономика', relatedLessonSlug: 'inflation-cb-rate' },
  { id: 'g3', termRu: 'ВВП', termEn: 'GDP', definitionRu: 'Суммарная стоимость всех товаров и услуг, произведённых в стране', definitionEn: 'Total value of all goods and services produced in a country', category: 'Макроэкономика', relatedLessonSlug: 'gdp-economic-cycles' },
  { id: 'g4', termRu: 'Облигация', termEn: 'Bond', definitionRu: 'Долговая ценная бумага с фиксированным доходом (купоном)', definitionEn: 'Debt security with fixed income (coupon)', category: 'Облигации', relatedLessonSlug: 'what-are-bonds' },
  { id: 'g5', termRu: 'ОФЗ', termEn: 'OFZ', definitionRu: 'Облигации федерального займа — государственные облигации РФ', definitionEn: 'Federal Loan Bonds — Russian government bonds', category: 'Облигации', relatedLessonSlug: 'what-are-bonds' },
  { id: 'g6', termRu: 'Купон', termEn: 'Coupon', definitionRu: 'Периодическая процентная выплата по облигации', definitionEn: 'Periodic interest payment on a bond', category: 'Облигации', relatedLessonSlug: 'what-are-bonds' },
  { id: 'g7', termRu: 'Номинал', termEn: 'Face Value', definitionRu: 'Сумма, выплачиваемая при погашении облигации (обычно 1000 ₽)', definitionEn: 'Amount paid at bond maturity', category: 'Облигации', relatedLessonSlug: 'what-are-bonds' },
  { id: 'g8', termRu: 'YTM', termEn: 'Yield to Maturity', definitionRu: 'Полная годовая доходность облигации при удержании до погашения', definitionEn: 'Total annual bond return if held to maturity', category: 'Облигации', relatedLessonSlug: 'bond-strategies' },
  { id: 'g9', termRu: 'ETF', termEn: 'ETF', definitionRu: 'Биржевой инвестиционный фонд, акции которого торгуются на бирже', definitionEn: 'Exchange-Traded Fund whose shares are traded on the exchange', category: 'Фонды', relatedLessonSlug: 'etf-bpif-funds' },
  { id: 'g10', termRu: 'БПИФ', termEn: 'BPIF', definitionRu: 'Биржевой паевой инвестиционный фонд — российский аналог ETF', definitionEn: 'Exchange-traded mutual fund — Russian analog of ETF', category: 'Фонды', relatedLessonSlug: 'etf-bpif-funds' },
  { id: 'g11', termRu: 'Сложный процент', termEn: 'Compound Interest', definitionRu: 'Начисление процентов на уже начисленные проценты', definitionEn: 'Interest calculated on previously accumulated interest', category: 'Портфель', relatedLessonSlug: 'portfolio-construction' },
  { id: 'g12', termRu: 'Лонг', termEn: 'Long', definitionRu: 'Покупка актива в расчёте на рост цены («купил дешевле — продал дороже»)', definitionEn: 'Buying an asset expecting price increase', category: 'Трейдинг', relatedLessonSlug: 'stocks-long-short' },
  { id: 'g13', termRu: 'Шорт', termEn: 'Short', definitionRu: 'Продажа заёмного актива в расчёте на падение цены', definitionEn: 'Selling a borrowed asset expecting price decrease', category: 'Трейдинг', relatedLessonSlug: 'stocks-long-short' },
  { id: 'g14', termRu: 'Стакан заявок', termEn: 'Order Book', definitionRu: 'Таблица всех текущих заявок на покупку (Bid) и продажу (Ask)', definitionEn: 'Table of all current buy and sell orders for an asset', category: 'Трейдинг', relatedLessonSlug: 'exchange-broker-orderbook' },
  { id: 'g15', termRu: 'P/E', termEn: 'P/E Ratio', definitionRu: 'Отношение цены акции к прибыли на акцию — срок окупаемости инвестиции', definitionEn: 'Price to Earnings ratio — shows how expensive a stock is', category: 'Анализ', relatedLessonSlug: 'valuation-multiples' },
  { id: 'g16', termRu: 'RSI', termEn: 'RSI', definitionRu: 'Индекс относительной силы — индикатор перекупленности и перепроданности (0-100)', definitionEn: 'Relative Strength Index (0-100)', category: 'Теханализ', relatedLessonSlug: 'indicators-ma-rsi-macd' },
  { id: 'g17', termRu: 'MACD', termEn: 'MACD', definitionRu: 'Схождение/расхождение скользящих средних — индикатор импульса', definitionEn: 'Moving Average Convergence Divergence', category: 'Теханализ', relatedLessonSlug: 'indicators-ma-rsi-macd' },
  { id: 'g18', termRu: 'Японская свеча', termEn: 'Candlestick', definitionRu: 'Графическое представление цены за период: Open, High, Low, Close', definitionEn: 'OHLC representation of price over time', category: 'Теханализ', relatedLessonSlug: 'candlestick-patterns' },
];

export const mockLessonsBySlug: Record<string, any> = {
  'inflation-cb-rate': {
    id: 'les-1-1',
    slug: 'inflation-cb-rate',
    titleRu: 'Инфляция, ключевая ставка ЦБ РФ и деньги в экономике',
    titleEn: 'Inflation, Central Bank Rate, and Money in the Economy',
    hasChart: false,
    chartType: null,
    module: {
      titleRu: 'Экономический фундамент',
      titleEn: 'Economic Foundation',
      lessons: mockModules[0].lessons,
    },
    contentRu: `## Что такое инфляция?

**Инфляция** — это устойчивое повышение общего уровня цен на товары и услуги. Когда инфляция растёт, на ту же сумму денег вы можете купить меньше товаров.

### Ключевая ставка ЦБ РФ

**Ключевая ставка** — это минимальный процент, под который Центральный банк выдаёт кредиты коммерческим банкам. Это главный инструмент денежно-кредитной политики.

| Ставка растёт ⬆️ | Ставка падает ⬇️ |
|---|---|
| Кредиты дорожают | Кредиты дешевеют |
| Вклады выгоднее | Вклады менее выгодны |
| Облигации падают в цене | Облигации растут в цене |
| Акции под давлением | Акции могут расти |

### Практический пример

Представим, что у вас на вкладе **1 000 000 ₽** под **10%** годовых, а инфляция — **8%**. Ваша **реальная доходность** = 10% - 8% = **2%**. То есть реальный прирост покупательной способности — всего 20 000 ₽.`,
    contentEn: `## What is Inflation?

**Inflation** is a sustained increase in the general price level of goods and services. When inflation rises, the same amount of money buys fewer goods.

### The Central Bank Key Rate

The **key rate** is the minimum interest rate at which the Central Bank lends to commercial banks. It is the main monetary policy tool.`,
    quiz: {
      id: 'quiz-1-1',
      passingScore: 70,
      questions: [
        {
          id: 'q1-1',
          questionRu: 'Что такое инфляция?',
          questionEn: 'What is inflation?',
          optionsRu: ['Рост курса валюты', 'Устойчивое повышение общего уровня цен', 'Снижение процентных ставок'],
          optionsEn: ['Currency rise', 'Sustained general price level increase', 'Interest rates drop'],
          correctIndices: [1],
          explanationRu: 'Инфляция — это устойчивое повышение общего уровня цен на товары и услуги.',
          explanationEn: 'Inflation is a sustained increase in the general price level.',
        },
        {
          id: 'q1-2',
          questionRu: 'Что происходит с ценами старых облигаций при повышении ставки ЦБ?',
          questionEn: 'What happens to older bond prices when the CB rate increases?',
          optionsRu: ['Растут', 'Падают', 'Не меняются'],
          optionsEn: ['They rise', 'They fall', 'No change'],
          correctIndices: [1],
          explanationRu: 'При росте ставок старые облигации с меньшим купоном падают в цене.',
          explanationEn: 'When rates rise, bonds with lower coupons drop in price.',
        },
      ],
    },
  },
  'gdp-economic-cycles': {
    id: 'les-1-2',
    slug: 'gdp-economic-cycles',
    titleRu: 'ВВП, экономические циклы и фазы рынка',
    titleEn: 'GDP, Economic Cycles, and Market Phases',
    hasChart: false,
    chartType: null,
    module: {
      titleRu: 'Экономический фундамент',
      titleEn: 'Economic Foundation',
      lessons: mockModules[0].lessons,
    },
    contentRu: `## Валовой внутренний продукт (ВВП)

**ВВП** — это суммарная стоимость всех товаров и услуг, произведённых в стране за определённый период.

### Экономические циклы
1. **🟢 Экспансия (рост)** — ВВП растёт, бизнес расширяется
2. **🔴 Пик** — «перегрев» экономики, ускорение инфляции
3. **🔵 Рецессия (спад)** — падение ВВП 2+ квартала подряд
4. **🟡 Дно** — точка разворота и начало восстановления`,
    contentEn: `## Gross Domestic Product (GDP)

GDP is the total monetary value of all finished goods and services produced within a country.`,
    quiz: {
      id: 'quiz-1-2',
      passingScore: 70,
      questions: [
        {
          id: 'q1-2-1',
          questionRu: 'Что такое рецессия?',
          questionEn: 'What is a recession?',
          optionsRu: ['Рост ВВП', 'Падение ВВП 2+ квартала подряд', 'Рост инфляции'],
          optionsEn: ['GDP growth', 'Decline in GDP for 2+ consecutive quarters', 'Inflation rise'],
          correctIndices: [1],
          explanationRu: 'Рецессия — это экономический спад, длящийся 2 квартала подряд или более.',
          explanationEn: 'Recession is a decline in GDP lasting for 2+ consecutive quarters.',
        },
      ],
    },
  },
  'what-are-bonds': {
    id: 'les-2-1',
    slug: 'what-are-bonds',
    titleRu: 'Что такое облигации? ОФЗ, виды купонов',
    titleEn: 'What are Bonds? OFZ, Coupon Types',
    hasChart: false,
    chartType: null,
    module: {
      titleRu: 'Средне- и долгосрочные инвестиции (ОФЗ и Облигации)',
      titleEn: 'Medium and Long-term Investments (Bonds)',
      lessons: mockModules[1].lessons,
    },
    contentRu: `## Облигация — долговая расписка

**Облигация** — ценная бумага, удостоверяющая долг эмитента перед инвестором с обязательством выплаты купонов и возврата номинала.

### ОФЗ
Государственные облигации Министерства финансов РФ с максимальной надёжностью.`,
    contentEn: `## What are Bonds?

A bond is a fixed-income instrument that represents a loan made by an investor to a borrower.`,
    quiz: {
      id: 'quiz-2-1',
      passingScore: 70,
      questions: [
        {
          id: 'q2-1-1',
          questionRu: 'Что такое номинал облигации?',
          questionEn: 'What is face value?',
          optionsRu: ['Текущая цена на бирже', 'Сумма, возвращаемая при погашении', 'Размер купона'],
          optionsEn: ['Current market price', 'Amount returned at maturity', 'Coupon payment'],
          correctIndices: [1],
          explanationRu: 'Номинал — сумма, которую эмитент выплачивает инвестору в дату погашения.',
          explanationEn: 'Face value is the principal amount returned at maturity.',
        },
      ],
    },
  },
  'corporate-bonds-ratings': {
    id: 'les-2-2',
    slug: 'corporate-bonds-ratings',
    titleRu: 'Корпоративные облигации, кредитные рейтинги и дюрация',
    titleEn: 'Corporate Bonds, Credit Ratings, and Duration',
    hasChart: false,
    chartType: null,
    module: {
      titleRu: 'Средне- и долгосрочные инвестиции (ОФЗ и Облигации)',
      titleEn: 'Medium and Long-term Investments (Bonds)',
      lessons: mockModules[1].lessons,
    },
    contentRu: `## Корпоративные облигации и риски

Облигации компаний предлагают доходность выше ОФЗ взамен на кредитный риск эмитента.

### Дюрация
Чувствительность цены облигации к изменению процентных ставок. Чем больше дюрация, тем сильнее скачет цена.`,
    contentEn: `## Corporate Bonds

Corporate bonds offer higher yields than sovereign bonds in exchange for credit risk.`,
    quiz: {
      id: 'quiz-2-2',
      passingScore: 70,
      questions: [
        {
          id: 'q2-2-1',
          questionRu: 'Какой рейтинг считается инвестиционным минимумом?',
          questionEn: 'What is minimum investment grade?',
          optionsRu: ['AAA', 'BBB', 'BB'],
          optionsEn: ['AAA', 'BBB', 'BB'],
          correctIndices: [1],
          explanationRu: 'Рейтинг BBB — нижняя граница инвестиционного грейда.',
          explanationEn: 'BBB is the lower bound of investment grade.',
        },
      ],
    },
  },
  'bond-strategies': {
    id: 'les-2-3',
    slug: 'bond-strategies',
    titleRu: 'Стратегии работы с облигациями (YTM)',
    titleEn: 'Bond Strategies (YTM)',
    hasChart: false,
    chartType: null,
    module: {
      titleRu: 'Средне- и долгосрочные инвестиции (ОФЗ и Облигации)',
      titleEn: 'Medium and Long-term Investments (Bonds)',
      lessons: mockModules[1].lessons,
    },
    contentRu: `## Доходность к погашению (YTM)

YTM учитывает не только купоны, но и разницу между текущей ценой покупки и номиналом, а также реинвестирование выплат.`,
    contentEn: `## Yield to Maturity

YTM calculates the total annual return anticipated on a bond if held until it matures.`,
    quiz: {
      id: 'quiz-2-3',
      passingScore: 70,
      questions: [
        {
          id: 'q2-3-1',
          questionRu: 'Что отражает YTM?',
          questionEn: 'What does YTM reflect?',
          optionsRu: ['Только размер купона', 'Полную годовую доходность к погашению', 'Размер налога'],
          optionsEn: ['Only coupon size', 'Total annualized return to maturity', 'Tax amount'],
          correctIndices: [1],
          explanationRu: 'YTM отражает совокупную доходность с учётом дисконта или премии к номиналу.',
          explanationEn: 'YTM represents total return including capital gain or loss.',
        },
      ],
    },
  },
  'etf-bpif-funds': {
    id: 'les-3-1',
    slug: 'etf-bpif-funds',
    titleRu: 'Фонды (БПИФ и ETF) — как купить весь рынок одной бумагой',
    titleEn: 'Funds (BPIF and ETF) — How to Buy the Entire Market with One Security',
    hasChart: false,
    chartType: null,
    module: {
      titleRu: 'Коллективные инвестиции и Индексный подход',
      titleEn: 'Collective Investments and Index Approach',
      lessons: mockModules[2].lessons,
    },
    contentRu: `## Биржевые фонды

Покупая одну акцию ETF или пай БПИФ, инвестор получает готовую корзину из десятков или сотен акций и облигаций с минимальной комиссией.`,
    contentEn: `## ETFs and Mutual Funds

An ETF is a pooled investment security that can be bought and sold like an individual stock.`,
    quiz: {
      id: 'quiz-3-1',
      passingScore: 70,
      questions: [
        {
          id: 'q3-1-1',
          questionRu: 'В чём главное преимущество ETF?',
          questionEn: 'What is the main benefit of an ETF?',
          optionsRu: ['Гарантированный доход', 'Мгновенная широкая диверсификация', 'Отсутствие комиссий'],
          optionsEn: ['Guaranteed profit', 'Instant broad diversification', 'Zero fees'],
          correctIndices: [1],
          explanationRu: 'ETF позволяет купить сразу весь рынок одной сделкой.',
          explanationEn: 'ETF enables buying the whole basket in one order.',
        },
      ],
    },
  },
  'portfolio-construction': {
    id: 'les-3-2',
    slug: 'portfolio-construction',
    titleRu: 'Составление портфеля, сложный процент и диверсификация',
    titleEn: 'Portfolio Construction, Compound Interest, and Diversification',
    hasChart: false,
    chartType: null,
    module: {
      titleRu: 'Коллективные инвестиции и Индексный подход',
      titleEn: 'Collective Investments and Index Approach',
      lessons: mockModules[2].lessons,
    },
    contentRu: `## Asset Allocation

Грамотное распределение активов между акциями, облигациями и защитными активами снижает просадки без потери доходности.`,
    contentEn: `## Portfolio Construction

Asset allocation is the implementation of an investment strategy that attempts to balance risk versus reward.`,
    quiz: {
      id: 'quiz-3-2',
      passingScore: 70,
      questions: [
        {
          id: 'q3-2-1',
          questionRu: 'За сколько лет удвоится капитал при ставке 12% по Правилу 72?',
          questionEn: 'Rule of 72: years to double at 12%?',
          optionsRu: ['12 лет', '6 лет', '8 лет'],
          optionsEn: ['12 years', '6 years', '8 years'],
          correctIndices: [1],
          explanationRu: '72 / 12 = 6 лет.',
          explanationEn: '72 / 12 = 6 years.',
        },
      ],
    },
  },
  'stocks-long-short': {
    id: 'les-4-1',
    slug: 'stocks-long-short',
    titleRu: 'Акции, лонг, шорт, маржинальная торговля',
    titleEn: 'Stocks, Long, Short, Margin Trading',
    hasChart: false,
    chartType: null,
    module: {
      titleRu: 'Механика трейдинга и словарь',
      titleEn: 'Trading Mechanics and Vocabulary',
      lessons: mockModules[3].lessons,
    },
    contentRu: `## Лонг и Шорт

- **Лонг (Long)**: покупка актива с расчётом на рост цены.
- **Шорт (Short)**: продажа заёмных акций с расчётом откупить их дешевле при падении.`,
    contentEn: `## Long vs Short

Long position is buying expecting appreciation. Short is borrowing and selling expecting a drop.`,
    quiz: {
      id: 'quiz-4-1',
      passingScore: 70,
      questions: [
        {
          id: 'q4-1-1',
          questionRu: 'Что такое шорт?',
          questionEn: 'What is a short position?',
          optionsRu: ['Покупка на долгий срок', 'Продажа заёмного актива в расчёте на падение', 'Покупка облигаций'],
          optionsEn: ['Long term holding', 'Selling borrowed asset expecting price drop', 'Buying bonds'],
          correctIndices: [1],
          explanationRu: 'Шорт позволяет извлекать прибыль из падения цены.',
          explanationEn: 'Shorting profits from market declines.',
        },
      ],
    },
  },
  'exchange-broker-orderbook': {
    id: 'les-4-2',
    slug: 'exchange-broker-orderbook',
    titleRu: 'Биржа, брокер, стакан заявок и типы ордеров',
    titleEn: 'Exchange, Broker, Order Book, and Order Types',
    hasChart: false,
    chartType: null,
    module: {
      titleRu: 'Механика трейдинга и словарь',
      titleEn: 'Trading Mechanics and Vocabulary',
      lessons: mockModules[3].lessons,
    },
    contentRu: `## Биржевой стакан и ордера

Стакан отражает глубину рынка (заявки Bid и Ask). Разница между лучшей ценой покупки и продажи называется **спредом**.`,
    contentEn: `## Order Book and Orders

The order book lists the number of shares being bid on or offered at each price point.`,
    quiz: {
      id: 'quiz-4-2',
      passingScore: 70,
      questions: [
        {
          id: 'q4-2-1',
          questionRu: 'Что такое спред?',
          questionEn: 'What is spread?',
          optionsRu: ['Комиссия брокера', 'Разница между лучшей ценой покупки и продажи', 'Размер лота'],
          optionsEn: ['Broker fee', 'Difference between best bid and ask', 'Lot size'],
          correctIndices: [1],
          explanationRu: 'Спред — это разница между лучшим Bid и лучшим Ask в стакане.',
          explanationEn: 'Spread is the gap between the highest bid and lowest ask.',
        },
      ],
    },
  },
  'ifrs-reporting': {
    id: 'les-5-1',
    slug: 'ifrs-reporting',
    titleRu: 'Отчетность МСФО (P&L, Баланс, Cash Flow)',
    titleEn: 'IFRS Reporting (P&L, Balance Sheet, Cash Flow)',
    hasChart: false,
    chartType: null,
    module: {
      titleRu: 'Фундаментальный анализ компании',
      titleEn: 'Fundamental Company Analysis',
      lessons: mockModules[4].lessons,
    },
    contentRu: `## Три главных отчёта МСФО

1. **P&L (Отчёт о прибылях и убытках)**: выручка, EBITDA, чистая прибыль.
2. **Баланс (Balance Sheet)**: активы = капитал + обязательства.
3. **Cash Flow (Движение денежных средств)**: операционный поток отражает реальный приток денег от бизнеса.`,
    contentEn: `## Financial Statements

Income Statement, Balance Sheet, and Cash Flow Statement form the basis of fundamental analysis.`,
    quiz: {
      id: 'quiz-5-1',
      passingScore: 70,
      questions: [
        {
          id: 'q5-1-1',
          questionRu: 'Какой денежный поток важнее всего для оценки основного бизнеса?',
          questionEn: 'Which cash flow is crucial for core business health?',
          optionsRu: ['Финансовый', 'Операционный', 'Инвестиционный'],
          optionsEn: ['Financing', 'Operating', 'Investing'],
          correctIndices: [1],
          explanationRu: 'Операционный поток отражает поступление живых денег от профильной деятельности.',
          explanationEn: 'Operating cash flow reflects actual cash generated from operations.',
        },
      ],
    },
  },
  'valuation-multiples': {
    id: 'les-5-2',
    slug: 'valuation-multiples',
    titleRu: 'Мультипликаторы (P/E, P/S, EV/EBITDA, ROE)',
    titleEn: 'Valuation Multiples (P/E, P/S, EV/EBITDA, ROE)',
    hasChart: false,
    chartType: null,
    module: {
      titleRu: 'Фундаментальный анализ компании',
      titleEn: 'Fundamental Company Analysis',
      lessons: mockModules[4].lessons,
    },
    contentRu: `## Мультипликаторы оценки

- **P/E**: отношение капитализации к годовой чистой прибыли (срок окупаемости).
- **EV/EBITDA**: оценка компании с учётом долговой нагрузки.
- **ROE**: рентабельность собственного капитала (эффективность бизнеса).`,
    contentEn: `## Valuation Multiples

P/E, EV/EBITDA, and ROE allow comparing companies across industries and markets.`,
    quiz: {
      id: 'quiz-5-2',
      passingScore: 70,
      questions: [
        {
          id: 'q5-2-1',
          questionRu: 'Что показывает P/E = 5?',
          questionEn: 'What does P/E = 5 mean?',
          optionsRu: ['Дивиденд 5%', 'Инвестиция окупается за 5 лет при текущей прибыли', 'Компания имеет 5 долей долга'],
          optionsEn: ['5% dividend', 'Investment pays back in 5 years at current earnings', '5x debt ratio'],
          correctIndices: [1],
          explanationRu: 'P/E показывает количество лет, необходимое для окупаемости цены акции чистой прибылью.',
          explanationEn: 'P/E measures how many years of earnings cover the share price.',
        },
      ],
    },
  },
  'dividend-policy': {
    id: 'les-5-3',
    slug: 'dividend-policy',
    titleRu: 'Оценка дивидендной политики и бизнес-модели',
    titleEn: 'Dividend Policy and Business Model Evaluation',
    hasChart: false,
    chartType: null,
    module: {
      titleRu: 'Фундаментальный анализ компании',
      titleEn: 'Fundamental Company Analysis',
      lessons: mockModules[4].lessons,
    },
    contentRu: `## Дивидендная политика

- **Дивидендная доходность**: отношение годового дивиденда к текущей цене акции.
- **Payout Ratio**: процент чистой прибыли или FCF, направляемый акционерам. Здоровый уровень: 30-60%.`,
    contentEn: `## Dividend Investing

Dividend yield and payout ratio are the primary metrics to evaluate dividend safety.`,
    quiz: {
      id: 'quiz-5-3',
      passingScore: 70,
      questions: [
        {
          id: 'q5-3-1',
          questionRu: 'Какой payout ratio считается устойчивым и безопасным?',
          questionEn: 'Which payout ratio is generally considered sustainable?',
          optionsRu: ['30-60%', '100%+', '10%'],
          optionsEn: ['30-60%', '100%+', '10%'],
          correctIndices: [0],
          explanationRu: '30-60% позволяет выплачивать стабильный дивиденд и реинвестировать в развитие.',
          explanationEn: '30-60% allows steady payouts while funding expansion.',
        },
      ],
    },
  },
  'trends-support-resistance': {
    id: 'les-6-1',
    slug: 'trends-support-resistance',
    titleRu: 'Тренды, уровни поддержки и сопротивления, объёмы',
    titleEn: 'Trends, Support and Resistance Levels, Volume',
    hasChart: true,
    chartType: 'default',
    module: {
      titleRu: 'Технический и свечной анализ',
      titleEn: 'Technical and Candlestick Analysis',
      lessons: mockModules[5].lessons,
    },
    contentRu: `## Тренды и уровни

- **Тренд**: направление движения цены (бычий, медвежий, боковой).
- **Поддержка**: ценовая зона покупателей.
- **Сопротивление**: ценовая зона продавцов.
- **Объёмы**: подтверждают истинность пробоя уровней.`,
    contentEn: `## Trends and Support/Resistance

Trends, key levels, and volume confirm market directional momentum.`,
    quiz: {
      id: 'quiz-6-1',
      passingScore: 70,
      questions: [
        {
          id: 'q6-1-1',
          questionRu: 'Что происходит при пробое уровня поддержки?',
          questionEn: 'What happens when support is broken?',
          optionsRu: ['Поддержка часто становится сопротивлением', 'Объёмы падают до нуля', 'Тренд всегда разворачивается вверх'],
          optionsEn: ['Support often flips into resistance', 'Volume hits zero', 'Trend always reverses up'],
          correctIndices: [0],
          explanationRu: 'При пробое уровень меняет свою роль на противоположную.',
          explanationEn: 'Broken support frequently becomes future resistance.',
        },
      ],
    },
  },
  'indicators-ma-rsi-macd': {
    id: 'les-6-2',
    slug: 'indicators-ma-rsi-macd',
    titleRu: 'Индикаторы (MA, RSI, MACD)',
    titleEn: 'Indicators (MA, RSI, MACD)',
    hasChart: true,
    chartType: 'indicators',
    module: {
      titleRu: 'Технический и свечной анализ',
      titleEn: 'Technical and Candlestick Analysis',
      lessons: mockModules[5].lessons,
    },
    contentRu: `## Базовые технические индикаторы

- **SMA / EMA**: скользящие средние показывают средний тренд и сглаживают шум.
- **RSI (0-100)**: зона выше 70 — перекупленность, ниже 30 — перепроданность.
- **MACD**: индикатор импульса и разворота скользящих.`,
    contentEn: `## Technical Indicators

Moving Averages, RSI, and MACD provide mathematical insight into price momentum.`,
    quiz: {
      id: 'quiz-6-2',
      passingScore: 70,
      questions: [
        {
          id: 'q6-2-1',
          questionRu: 'О чём сигнализирует RSI выше 70?',
          questionEn: 'What does RSI above 70 indicate?',
          optionsRu: ['Перекупленность актива', 'Перепроданность актива', 'Полный штиль'],
          optionsEn: ['Overbought market', 'Oversold market', 'Flat market'],
          correctIndices: [0],
          explanationRu: 'RSI > 70 указывает на перегретость цены и вероятность отката.',
          explanationEn: 'RSI > 70 suggests overextended buying and potential correction.',
        },
      ],
    },
  },
  'candlestick-patterns': {
    id: 'les-6-3',
    slug: 'candlestick-patterns',
    titleRu: 'Японские свечи и разворотные паттерны',
    titleEn: 'Japanese Candlesticks and Reversal Patterns',
    hasChart: true,
    chartType: 'default',
    module: {
      titleRu: 'Технический и свечной анализ',
      titleEn: 'Technical and Candlestick Analysis',
      lessons: mockModules[5].lessons,
    },
    contentRu: `## Японские свечи и паттерны

Каждая свеча показывает цены Open, High, Low, Close.
- **Молот (Hammer)**: бычий разворот на дне тренда (маленькое тело вверху, длинная нижняя тень).
- **Поглощение**: следующая свеча полностью перекрывает предыдущую.`,
    contentEn: `## Candlestick Patterns

Candlesticks visually express market sentiment through body and wick relationships.`,
    quiz: {
      id: 'quiz-6-3',
      passingScore: 70,
      questions: [
        {
          id: 'q6-3-1',
          questionRu: 'Какой паттерн является бычьим разворотным на дне тренда?',
          questionEn: 'Which is a bullish reversal pattern at the bottom?',
          optionsRu: ['Молот (Hammer)', 'Повешенный (Hanging Man)', 'Вечерняя звезда'],
          optionsEn: ['Hammer', 'Hanging Man', 'Evening Star'],
          correctIndices: [0],
          explanationRu: 'Молот с длинной нижней тенью указывает на откуп локального минимума.',
          explanationEn: 'Hammer shows strong rejection of lower price levels.',
        },
      ],
    },
  },
};
