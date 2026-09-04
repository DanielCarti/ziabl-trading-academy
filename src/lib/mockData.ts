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
    contentRu: `## Тренды

**Тренд** — это общее направление движения цены.
- **Восходящий тренд (бычий)** — череда растущих локальных максимумов и минимумов.
- **Нисходящий тренд (медвежий)** — череда снижающихся максимумов и минимумов.
- **Боковой тренд (флэт)** — движение цены в горизонтальном диапазоне.

### Поддержка и сопротивление
- **Поддержка (Support)** — уровень, на котором спрос покупателей останавливает падение цены.
- **Сопротивление (Resistance)** — уровень, на котором давление продавцов препятствует росту.`,
    contentEn: `## Trends

A **trend** is the general direction of price movement.
- **Uptrend (bullish)** — series of higher highs and higher lows.
- **Downtrend (bearish)** — series of lower highs and lower lows.`,
    quiz: {
      id: 'quiz-6-1',
      passingScore: 70,
      questions: [
        {
          id: 'q6-1',
          questionRu: 'Что происходит при пробое уровня поддержки?',
          questionEn: 'What happens when support is broken?',
          optionsRu: ['Цена гарантированно развернется', 'Поддержка часто становится сопротивлением', 'Объёмы падают до нуля'],
          optionsEn: ['Price always reverses', 'Support often becomes resistance', 'Volume drops to zero'],
          correctIndices: [1],
          explanationRu: 'При пробое уровень поддержки часто зеркально становится новым уровнем сопротивления.',
          explanationEn: 'When broken, support often becomes resistance.',
        },
      ],
    },
  },
};
