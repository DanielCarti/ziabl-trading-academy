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
  {
    "id": "g-fc-1",
    "termRu": "Альтернативные издержки (Opportunity Cost)",
    "termEn": "Opportunity Cost",
    "definitionRu": "Упущенная выгода: потенциальный доход, который могли бы принести деньги и время при их разумном инвестировании вместо праздности или импульсивных трат. Фундаментальный принцип Бенджамина Франклина: «Время — деньги».",
    "definitionEn": "The potential gain forfeited when choosing one alternative over another.",
    "category": "Личные финансы",
    "relatedLessonSlug": "franklin-philosophy-time-money"
  },
  {
    "id": "g-fc-2",
    "termRu": "Актив (по Кийосаки)",
    "termEn": "Asset (Kiyosaki)",
    "definitionRu": "Любой инструмент, бизнес или недвижимость, которые генерируют положительный чистый денежный поток (Cash Flow) и регулярно кладут реальные деньги в ваш карман.",
    "definitionEn": "Anything that puts positive cash flow directly into your pocket.",
    "category": "Личные финансы",
    "relatedLessonSlug": "kiyosaki-assets-liabilities-cashflow"
  },
  {
    "id": "g-fc-3",
    "termRu": "Пассив (по Кийосаки)",
    "termEn": "Liability (Kiyosaki)",
    "definitionRu": "Имущество или финансовые обязательства, которые регулярно вынимают деньги из вашего кармана (потребительские кредиты, личный автомобиль, налоги, дорогая аренда).",
    "definitionEn": "Anything that consistently drains cash and takes money out of your pocket.",
    "category": "Личные финансы",
    "relatedLessonSlug": "kiyosaki-assets-liabilities-cashflow"
  },
  {
    "id": "g-fc-4",
    "termRu": "Денежный поток (Cash Flow)",
    "termEn": "Cash Flow",
    "definitionRu": "Чистая математическая разница между всеми фактически поступившими денежными средствами и всеми исходящими выплатами за определенный период времени.",
    "definitionEn": "Net amount of cash and cash equivalents transferred in and out.",
    "category": "Личные финансы",
    "relatedLessonSlug": "kiyosaki-assets-liabilities-cashflow"
  },
  {
    "id": "g-fc-5",
    "termRu": "Квадрант денежного потока",
    "termEn": "Cashflow Quadrant",
    "definitionRu": "Классификационная модель Роберта Кийосаки, разделяющая способы получения дохода на четыре категории: Работник (E), Сами на себя (S), Бизнесмен (B) и Инвестор (I).",
    "definitionEn": "Robert Kiyosaki’s model categorizing earners: Employee, Self-employed, Business owner, and Investor.",
    "category": "Личные финансы",
    "relatedLessonSlug": "kiyosaki-assets-liabilities-cashflow"
  },
  {
    "id": "g-fc-6",
    "termRu": "Сложный процент (Compound Interest)",
    "termEn": "Compound Interest",
    "definitionRu": "Начисление процентов не только на первоначальную сумму капитала, но и на ранее накопленный инвестиционный доход («проценты на проценты»). Главный рычаг создания долгосрочного богатства.",
    "definitionEn": "Interest calculated on the initial principal as well as the accumulated interest over previous periods.",
    "category": "Личные финансы",
    "relatedLessonSlug": "franklin-philosophy-time-money"
  },
  {
    "id": "g1",
    "termRu": "Инфляция",
    "termEn": "Inflation",
    "definitionRu": "Устойчивое повышение общего уровня цен на потребительские товары и услуги, приводящее к снижению покупательской способности денежной единицы.",
    "definitionEn": "Sustained general rise in price levels reducing purchasing power.",
    "category": "Макроэкономика",
    "relatedLessonSlug": "inflation-cb-rate"
  },
  {
    "id": "g-target-1",
    "termRu": "Таргет по инфляции Банка России",
    "termEn": "Inflation Target",
    "definitionRu": "Законодательно установленная среднесрочная цель Центрального банка РФ по темпу прироста потребительских цен, составляющая ровно 4.0% в год. Обеспечивает баланс между ценовой стабильностью и стимулами для развития экономики.",
    "definitionEn": "Official medium-term inflation target set by the Bank of Russia at exactly 4.0% per annum.",
    "category": "Макроэкономика",
    "relatedLessonSlug": "inflation-cb-rate"
  },
  {
    "id": "g-ipc-1",
    "termRu": "ИПЦ (Индекс потребительских цен)",
    "termEn": "Consumer Price Index (CPI)",
    "definitionRu": "Официальный статистический индикатор Росстата, измеряющий изменение стоимости фиксированной потребительской корзины из более чем 500 товаров и услуг.",
    "definitionEn": "Index tracking the average price variation of a representative basket of consumer goods and services.",
    "category": "Макроэкономика",
    "relatedLessonSlug": "inflation-cb-rate"
  },
  {
    "id": "g2",
    "termRu": "Ключевая ставка ЦБ РФ",
    "termEn": "Key Rate",
    "definitionRu": "Базовая процентная ставка, по которой Банк России предоставляет недельные кредиты коммерческим банкам (аукционы РЕПО) и привлекает депозиты. Фундамент процентных ставок в стране.",
    "definitionEn": "Benchmark interest rate at which the Central Bank conducts repo and deposit operations.",
    "category": "Макроэкономика",
    "relatedLessonSlug": "inflation-cb-rate"
  },
  {
    "id": "g-fisher-1",
    "termRu": "Уравнение Фишера",
    "termEn": "Fisher Equation",
    "definitionRu": "Фундаментальная экономическая формула, связывающая номинальную ставку (i), реальную процентную ставку (r) и темп инфляции (π): приближённо r ≈ i - π, точная форма: (1 + i) = (1 + r)(1 + π). Показывает реальную покупательскую способность капитала.",
    "definitionEn": "Mathematical relationship between nominal rate, real rate, and expected inflation: (1 + i) = (1 + r)(1 + π).",
    "category": "Макроэкономика",
    "relatedLessonSlug": "inflation-cb-rate"
  },
  {
    "id": "g-fisher-2",
    "termRu": "Ирвинг Фишер",
    "termEn": "Irving Fisher",
    "definitionRu": "Выдающийся экономист-неоклассик, один из основателей эконометрики. Разработал количественную теорию денег (M·V = P·Y), неоклассическую теорию капитала и процента, а также концепцию долговой дефляции (Debt Deflation).",
    "definitionEn": "Renowned American economist pioneer of quantity theory of money, neoclassical interest theory, and debt-deflation mechanics.",
    "category": "Макроэкономика",
    "relatedLessonSlug": "inflation-cb-rate"
  },
  {
    "id": "g-ruonia-1",
    "termRu": "RUONIA",
    "termEn": "RUONIA",
    "definitionRu": "Rouble OverNight Index Average — эталонная процентная ставка однодневных межбанковских кредитов в рублях в РФ. Рассчитывается Банком России и служит бенчмарком денежного рынка и купонов ОФЗ-ПК.",
    "definitionEn": "Rouble OverNight Index Average — weighted overnight unsecured lending benchmark between prime Russian banks.",
    "category": "Макроэкономика",
    "relatedLessonSlug": "inflation-cb-rate"
  },
  {
    "id": "g-dkp-1",
    "termRu": "ДКП (Денежно-кредитная политика)",
    "termEn": "Monetary Policy",
    "definitionRu": "Комплекс мер Центрального банка (управление процентной ставкой, нормативами обязательных резервов и операциями на открытом рынке) для контроля инфляции и обеспечения финансовой стабильности.",
    "definitionEn": "Central bank policies managing money supply, interest rate benchmarks, and credit conditions.",
    "category": "Макроэкономика",
    "relatedLessonSlug": "inflation-cb-rate"
  },
  {
    "id": "g-gdp-1",
    "termRu": "ВВП (Валовой внутренний продукт)",
    "termEn": "GDP (Gross Domestic Product)",
    "definitionRu": "Суммарная рыночная стоимость всех конечных товаров и услуг, произведенных на территории страны за определенный период времени.",
    "definitionEn": "Total monetary market value of all final goods and services produced within a country.",
    "category": "Макроэкономика",
    "relatedLessonSlug": "gdp-economic-cycles"
  },
  {
    "id": "g-recession-1",
    "termRu": "Рецессия (Recession)",
    "termEn": "Recession",
    "definitionRu": "Фаза экономического спада, характеризующаяся падением реального ВВП на протяжении двух и более кварталов подряд, ростом безработицы и падением деловой активности.",
    "definitionEn": "Significant and widespread downturn in economic activity lasting across consecutive quarters.",
    "category": "Макроэкономика",
    "relatedLessonSlug": "gdp-economic-cycles"
  },
  {
    "id": "g-moex-1",
    "termRu": "Режим расчётов Т+1",
    "termEn": "T+1 Settlement",
    "definitionRu": "Стандарт биржевых торгов, при котором фактический переход права собственности на ценные бумаги и списание денег происходят на следующий рабочий день после заключения сделки.",
    "definitionEn": "Securities settlement standard where legal transfer of ownership and funds occurs next business day.",
    "category": "Инфраструктура",
    "relatedLessonSlug": "moex-clearing-depository-taxes"
  },
  {
    "id": "g-moex-2",
    "termRu": "НКЦ (Центральный Контрагент)",
    "termEn": "National Clearing Centre",
    "definitionRu": "Специализированная организация группы Мосбиржи, выступающая гарантом исполнения каждой сделки, становясь покупателем для каждого продавца и продавцом для каждого покупателя.",
    "definitionEn": "Central counterparty guaranteeing every trade settlement on Moscow Exchange.",
    "category": "Инфраструктура",
    "relatedLessonSlug": "moex-clearing-depository-taxes"
  },
  {
    "id": "g-moex-3",
    "termRu": "НРД (Национальный Расчётный Депозитарий)",
    "termEn": "National Settlement Depository",
    "definitionRu": "Центральный депозитарий Российской Федерации, ведущий официальный юридический реестр прав владельцев бездокументарных ценных бумаг.",
    "definitionEn": "Central depository keeping official registries of securities ownership.",
    "category": "Инфраструктура",
    "relatedLessonSlug": "moex-clearing-depository-taxes"
  },
  {
    "id": "g-moex-4",
    "termRu": "ИИС-3",
    "termEn": "IIS-3 Account",
    "definitionRu": "Индивидуальный инвестиционный счет нового формата, совмещающий налоговый вычет на взнос (до 52-60 тыс. ₽/год) и освобождение от налога на инвестиционную прибыль при закрытии счета.",
    "definitionEn": "Dual-advantage Russian tax-sheltered investment account offering contribution and earnings deductions.",
    "category": "Инфраструктура",
    "relatedLessonSlug": "moex-clearing-depository-taxes"
  },
  {
    "id": "g14",
    "termRu": "Биржевой стакан (Order Book / Level 2)",
    "termEn": "Order Book",
    "definitionRu": "Таблица котировок, отображающая в реальном времени лимитные заявки на покупку (Bid) и продажу (Ask) с указанием объема и цены.",
    "definitionEn": "Electronic depth of market table displaying limit buy (Bid) and sell (Ask) orders.",
    "category": "Трейдинг",
    "relatedLessonSlug": "exchange-broker-orderbook"
  },
  {
    "id": "g-spread-1",
    "termRu": "Спред (Bid-Ask Spread)",
    "termEn": "Bid-Ask Spread",
    "definitionRu": "Разница между лучшей (минимальной) ценой продажи (Ask) и лучшей (максимальной) ценой покупки (Bid) в биржевом стакане.",
    "definitionEn": "The difference between the lowest asking price and the highest bid price.",
    "category": "Трейдинг",
    "relatedLessonSlug": "exchange-broker-orderbook"
  },
  {
    "id": "g-limit-1",
    "termRu": "Лимитный ордер (Limit Order)",
    "termEn": "Limit Order",
    "definitionRu": "Биржевая заявка на покупку или продажу по цене не хуже указанной. Гарантирует цену исполнения, но не гарантирует факт исполнения.",
    "definitionEn": "An order to buy or sell a security at a specified price or better.",
    "category": "Трейдинг",
    "relatedLessonSlug": "exchange-broker-orderbook"
  },
  {
    "id": "g-market-1",
    "termRu": "Рыночный ордер (Market Order)",
    "termEn": "Market Order",
    "definitionRu": "Заявка на немедленное исполнение по текущим доступным ценам стакана. Гарантирует скорость сделки, но подвержена риску проскальзывания.",
    "definitionEn": "An order to buy or sell immediately at best available current prices.",
    "category": "Трейдинг",
    "relatedLessonSlug": "exchange-broker-orderbook"
  },
  {
    "id": "g-slippage-1",
    "termRu": "Проскальзывание (Slippage)",
    "termEn": "Slippage",
    "definitionRu": "Разница между ожидаемой ценой исполнения рыночной заявки и фактической ценой совершения сделки, возникающая при недостатке ликвидности в стакане.",
    "definitionEn": "Difference between expected transaction price and the actual fill price.",
    "category": "Трейдинг",
    "relatedLessonSlug": "exchange-broker-orderbook"
  },
  {
    "id": "g4",
    "termRu": "Облигация (Bond)",
    "termEn": "Bond",
    "definitionRu": "Эмиссионная долговая ценная бумага, закрепляющая право владельца получить от эмитента её номинальную стоимость и фиксированный или плавающий процентный доход (купон).",
    "definitionEn": "Fixed-income debt security with promised coupon payments and maturity redemption.",
    "category": "Облигации",
    "relatedLessonSlug": "what-are-bonds"
  },
  {
    "id": "g-b-1",
    "termRu": "ОФЗ-ПД",
    "termEn": "OFZ-PD (Fixed)",
    "definitionRu": "Облигации федерального займа с постоянным фиксированным купонным доходом. Ставка купона известна до даты погашения, что позволяет зафиксировать высокий процент на годы вперед.",
    "definitionEn": "Russian sovereign bonds with fixed coupon payments determined through maturity.",
    "category": "Облигации",
    "relatedLessonSlug": "what-are-bonds"
  },
  {
    "id": "g-b-2",
    "termRu": "ОФЗ-ПК (Флоатер)",
    "termEn": "OFZ-PK (Floater)",
    "definitionRu": "ОФЗ с переменным плавающим купоном, привязанным к ставке межбанковского кредитования RUONIA. Защищают капитал от обесценения в период роста процентных ставок.",
    "definitionEn": "Floating-rate treasury bonds whose coupons reset periodically based on the RUONIA rate.",
    "category": "Облигации",
    "relatedLessonSlug": "what-are-bonds"
  },
  {
    "id": "g-b-3",
    "termRu": "ОФЗ-ИН (Линкер)",
    "termEn": "OFZ-IN (Linker)",
    "definitionRu": "ОФЗ с индексируемым номиналом, который ежедневно увеличивается на величину инфляции (ИПЦ) с трёхмесячным лагом.",
    "definitionEn": "Inflation-linked treasury bond where principal value increases alongside consumer price index.",
    "category": "Облигации",
    "relatedLessonSlug": "what-are-bonds"
  },
  {
    "id": "g6",
    "termRu": "НКД (Накопленный купонный доход)",
    "termEn": "Accrued Interest",
    "definitionRu": "Часть купонного дохода, накопившаяся с даты последней выплаты купона, которую покупатель облигации выплачивает продавцу сверх цены сделки.",
    "definitionEn": "Interest earned on a bond since the previous coupon date owed to the seller.",
    "category": "Облигации",
    "relatedLessonSlug": "what-are-bonds"
  },
  {
    "id": "g-b-4",
    "termRu": "Дюрация Маколея",
    "termEn": "Macaulay Duration",
    "definitionRu": "Средневзвешенный срок до полного возврата всех инвестированных денежных потоков по облигации, ключевая мера процентного риска цены бумаги.",
    "definitionEn": "Weighted average time until bond cash flows are received, measuring price sensitivity to rate shifts.",
    "category": "Облигации",
    "relatedLessonSlug": "corporate-bonds-ratings"
  },
  {
    "id": "g8",
    "termRu": "YTM (Доходность к погашению)",
    "termEn": "Yield to Maturity",
    "definitionRu": "Внутренняя норма доходности инвестиции в облигацию при условии ее удержания до погашения и полного реинвестирования всех поступающих купонов.",
    "definitionEn": "Total expected annualized rate of return if bond is held until maturity.",
    "category": "Облигации",
    "relatedLessonSlug": "bond-strategies"
  },
  {
    "id": "g-rating-1",
    "termRu": "Кредитный рейтинг",
    "termEn": "Credit Rating",
    "definitionRu": "Независимая оценка платежеспособности эмитента рейтинговыми агентствами (АКРА, Эксперт РА). Диапазон от наивысшего AAA до дефолтного D.",
    "definitionEn": "Independent assessment of borrower creditworthiness by accredited rating agencies.",
    "category": "Облигации",
    "relatedLessonSlug": "corporate-bonds-ratings"
  },
  {
    "id": "g-ebitda-1",
    "termRu": "EBITDA",
    "termEn": "EBITDA",
    "definitionRu": "Earnings Before Interest, Taxes, Depreciation, and Amortization — аналитическая прибыль компании до вычета процентов по долгам, налога на прибыль и амортизационных отчислений.",
    "definitionEn": "Operating profitability metric excluding interest, tax expenses, depreciation, and amortization.",
    "category": "Анализ",
    "relatedLessonSlug": "ifrs-reporting"
  },
  {
    "id": "g-netdebt-1",
    "termRu": "Net Debt (Чистый долг)",
    "termEn": "Net Debt",
    "definitionRu": "Разница между совокупным финансовым долгом компании (краткосрочные и долгосрочные займы) и высоколиквидными денежными средствами на расчетных счетах.",
    "definitionEn": "Total financial debt minus cash and cash equivalents, reflecting net debt burden.",
    "category": "Анализ",
    "relatedLessonSlug": "ifrs-reporting"
  },
  {
    "id": "g-netdebt-ebitda",
    "termRu": "Net Debt / EBITDA",
    "termEn": "Net Debt to EBITDA",
    "definitionRu": "Ключевой коэффициент кредитной устойчивости компании. Показывает, за сколько лет компания погасит чистый долг своей операционной прибылью. Норма: < 2.0x, опасная зона: > 3.0x.",
    "definitionEn": "Leverage coverage multiple showing years needed to eliminate net debt from annual EBITDA.",
    "category": "Анализ",
    "relatedLessonSlug": "ifrs-reporting"
  },
  {
    "id": "g-buf-1",
    "termRu": "Экономический ров (Economic Moat)",
    "termEn": "Economic Moat",
    "definitionRu": "Устойчивое конкурентное преимущество (бренд, сетевой эффект, стоимость переключения, патенты, низкая себестоимость), защищающее рентабельность бизнеса десятилетиями.",
    "definitionEn": "A company’s durable structural competitive advantages shielding market share from competitors.",
    "category": "Анализ",
    "relatedLessonSlug": "buffett-economic-moat-margin-of-safety"
  },
  {
    "id": "g-buf-2",
    "termRu": "Маржа безопасности (Margin of Safety)",
    "termEn": "Margin of Safety",
    "definitionRu": "Покупка ценной бумаги со значительным дисконтом (30-40%) к ее расчетной внутренней фундаментальной стоимости, защищающая инвестора от ошибок оценки и форс-мажоров.",
    "definitionEn": "Purchasing securities at a deep discount to calculated intrinsic value to protect against downside.",
    "category": "Анализ",
    "relatedLessonSlug": "buffett-economic-moat-margin-of-safety"
  },
  {
    "id": "g-buf-3",
    "termRu": "Круг компетенций (Circle of Competence)",
    "termEn": "Circle of Competence",
    "definitionRu": "Границы индустрий и бизнес-моделей, в которых инвестор обладает глубоким пониманием генерации прибыли. Инвестиции вне круга компетенций приравниваются к игре в казино.",
    "definitionEn": "The perimeter of businesses and sectors an investor genuinely understands thoroughly.",
    "category": "Анализ",
    "relatedLessonSlug": "buffett-philosophy-circle-of-competence"
  },
  {
    "id": "g-buf-4",
    "termRu": "Free Cash Flow (FCF)",
    "termEn": "Free Cash Flow",
    "definitionRu": "Свободный денежный поток: операционный денежный поток (CFO) за вычетом капитальных затрат (CAPEX). Живые деньги, остающиеся в распоряжении акционеров для дивидендов и байбэков.",
    "definitionEn": "Operating cash flow remaining after capital expenditure requirements (CFO - CAPEX).",
    "category": "Анализ",
    "relatedLessonSlug": "ifrs-reporting"
  },
  {
    "id": "g15",
    "termRu": "P/E (Коэффициент цена/прибыль)",
    "termEn": "P/E Ratio",
    "definitionRu": "Отношение рыночной капитализации компании к ее чистой годовой прибыли. Показывает условный срок окупаемости инвестиции в годах при неизменной прибыли.",
    "definitionEn": "Valuation ratio comparing company stock price to its per-share net income.",
    "category": "Анализ",
    "relatedLessonSlug": "ifrs-reporting"
  },
  {
    "id": "g-ev-1",
    "termRu": "EV (Enterprise Value)",
    "termEn": "Enterprise Value",
    "definitionRu": "Полная стоимость предприятия с учетом долга: Капитализация + Чистый долг. Отражает реальную стоимость покупки бизнеса стратегическим инвестором.",
    "definitionEn": "Total firm valuation reflecting market capitalization plus net debt obligations.",
    "category": "Анализ",
    "relatedLessonSlug": "ifrs-reporting"
  },
  {
    "id": "g-roe-1",
    "termRu": "ROE (Рентабельность собственного капитала)",
    "termEn": "Return on Equity (ROE)",
    "definitionRu": "Отношение чистой прибыли к собственному капиталу компании в процентах. Измеряет отдачу на каждый рубль средств, вложенный акционерами.",
    "definitionEn": "Net income divided by shareholders’ equity, measuring profitability efficiency.",
    "category": "Анализ",
    "relatedLessonSlug": "ifrs-reporting"
  },
  {
    "id": "g-bur-1",
    "termRu": "Кредитно-дефолтный своп (CDS)",
    "termEn": "Credit Default Swap",
    "definitionRu": "Производный финансовый контракт, выполняющий роль страховки от дефолта по долговым бумагам. Покупатель платит периодическую премию, а при дефолте эмитента получает полную компенсацию номинала.",
    "definitionEn": "Financial derivative acting as default insurance on debt obligations.",
    "category": "Кризисы и Риски",
    "relatedLessonSlug": "burry-cds-asymmetric-bets"
  },
  {
    "id": "g-cdo-1",
    "termRu": "CDO (Коллатерализованное долговое обязательство)",
    "termEn": "CDO",
    "definitionRu": "Сложный структурированный финансовый инструмент, объединяющий тысячи ипотечных или корпоративных кредитов в транши с разной степенью риска.",
    "definitionEn": "Structured asset-backed security packaging debt obligations into pooled risk tranches.",
    "category": "Кризисы и Риски",
    "relatedLessonSlug": "burry-2008-subprime-mortgage-crisis"
  },
  {
    "id": "g-bur-2",
    "termRu": "Асимметричная ставка (Asymmetric Bet)",
    "termEn": "Asymmetric Bet",
    "definitionRu": "Инвестиционная идея, в которой потенциальный убыток строго ограничен и минимален, а потенциальный выигрыш в разы или десятки раз превосходит риск (высокий Risk/Reward).",
    "definitionEn": "Investment where upside payoff massively exceeds strictly capped initial capital risk.",
    "category": "Кризисы и Риски",
    "relatedLessonSlug": "burry-cds-asymmetric-bets"
  },
  {
    "id": "g-bur-3",
    "termRu": "Цикл Мински (Minsky Cycle)",
    "termEn": "Minsky Moment",
    "definitionRu": "Модель Хаймана Мински, описывающая 5 стадий надувания пузырей: Смещение (Displacement), Бум (Boom), Эйфория (Euphoria), Фиксация прибыли (Profit Taking) и Паника (Panic).",
    "definitionEn": "Five credit and speculative bubble phases culminating in sudden financial collapse.",
    "category": "Кризисы и Риски",
    "relatedLessonSlug": "market-bubbles-minsky-cycle"
  },
  {
    "id": "g-bpif-1",
    "termRu": "БПИФ (Биржевой паевой фонд)",
    "termEn": "Russian BPIF ETF",
    "definitionRu": "Российский биржевой фонд, торгуемый на Мосбирже аналогично акции и инвестирующий в диверсифицированную корзину ценных бумаг (индекс Мосбиржи, ОФЗ, золото, ликвидность).",
    "definitionEn": "Russian exchange-traded index fund providing low-cost diversified asset baskets.",
    "category": "Фонды",
    "relatedLessonSlug": "etf-bpif-funds"
  },
  {
    "id": "g-etf-1",
    "termRu": "ETF (Exchange-Traded Fund)",
    "termEn": "ETF",
    "definitionRu": "Иностранный торгуемый на бирже инвестиционный фонд, повторяющий структуру базового рыночного индекса с минимальной комиссией за управление.",
    "definitionEn": "Marketable security tracking an underlying benchmark, index, or commodity basket.",
    "category": "Фонды",
    "relatedLessonSlug": "etf-bpif-funds"
  },
  {
    "id": "g-ter-1",
    "termRu": "TER (Total Expense Ratio)",
    "termEn": "Total Expense Ratio",
    "definitionRu": "Совокупный коэффициент расходов инвестиционного фонда: процент от активов, ежегодно удерживаемый управляющей компанией за администрирование и аудит.",
    "definitionEn": "Measure of annual investment fund operating expenses expressed as percentage of AUM.",
    "category": "Фонды",
    "relatedLessonSlug": "etf-bpif-funds"
  },
  {
    "id": "g-allocation-1",
    "termRu": "Asset Allocation (Распределение активов)",
    "termEn": "Asset Allocation",
    "definitionRu": "Инвестиционная стратегия распределения капитала между некоррелирующими классами активов (акции, облигации, сырье, кэш) по теории Гарри Марковица для оптимизации риска и доходности.",
    "definitionEn": "Portfolio strategy dividing investments across asset classes to optimize risk-adjusted returns.",
    "category": "Портфель",
    "relatedLessonSlug": "portfolio-construction"
  },
  {
    "id": "g-rebalance-1",
    "termRu": "Ребалансировка портфеля",
    "termEn": "Portfolio Rebalancing",
    "definitionRu": "Периодическое выравнивание долей активов в портфеле до целевых пропорций (продажа подорожавших активов и докупка просевших), дисциплинирующее инвестора.",
    "definitionEn": "Realigning portfolio asset weightings back to original asset allocation targets.",
    "category": "Портфель",
    "relatedLessonSlug": "portfolio-construction"
  },
  {
    "id": "g-tr-1",
    "termRu": "Правило 1% риска",
    "termEn": "1% Risk Rule",
    "definitionRu": "Фундаментальный закон риск-менеджмента: размер потенциального убытка в случае выбивания стоп-лосса ни при каких условиях не должен превышать 1-2% от общего баланса депозита.",
    "definitionEn": "Risk management rule limiting total loss exposure on any single trade to 1% of account equity.",
    "category": "Трейдинг",
    "relatedLessonSlug": "candlestick-patterns"
  },
  {
    "id": "g-stop-1",
    "termRu": "Стоп-лосс (Stop-Loss)",
    "termEn": "Stop-Loss Order",
    "definitionRu": "Защитный ордер, автоматически закрывающий позицию при достижении неблагоприятной цены для ограничения максимально допустимого убытка трейдера.",
    "definitionEn": "Risk-protection order automatically closing a trade to prevent catastrophic loss.",
    "category": "Трейдинг",
    "relatedLessonSlug": "candlestick-patterns"
  },
  {
    "id": "g-take-1",
    "termRu": "Тейк-профит (Take-Profit)",
    "termEn": "Take-Profit Order",
    "definitionRu": "Отложенный ордер автоматической фиксации плановой прибыли при достижении котировкой целевого ориентира.",
    "definitionEn": "Order automatically locking in designated target profit when reached.",
    "category": "Трейдинг",
    "relatedLessonSlug": "candlestick-patterns"
  },
  {
    "id": "g-support-1",
    "termRu": "Уровень поддержки (Support)",
    "termEn": "Support Level",
    "definitionRu": "Ценовая область на графике, где интерес покупателей (спрос) достаточно силен, чтобы остановить падение котировок или развернуть цену вверх.",
    "definitionEn": "Price level where demand is strong enough to prevent price from falling further.",
    "category": "Теханализ",
    "relatedLessonSlug": "trends-support-resistance"
  },
  {
    "id": "g-resist-1",
    "termRu": "Уровень сопротивления (Resistance)",
    "termEn": "Resistance Level",
    "definitionRu": "Ценовая область, где преобладают продавцы (предложение), препятствующие дальнейшему росту цены актива.",
    "definitionEn": "Price level where selling interest overcomes buying pressure, halting uptrends.",
    "category": "Теханализ",
    "relatedLessonSlug": "trends-support-resistance"
  },
  {
    "id": "g16",
    "termRu": "RSI (Индекс относительной силы)",
    "termEn": "RSI Indicator",
    "definitionRu": "Осциллятор технического анализа от 0 до 100, сигнализирующий о локальной перекупленности актива (> 70) или перепроданности (< 30).",
    "definitionEn": "Momentum oscillator measuring speed and magnitude of price shifts between 0 and 100.",
    "category": "Теханализ",
    "relatedLessonSlug": "indicators-ma-rsi-macd"
  },
  {
    "id": "g17",
    "termRu": "Дивергенция (Divergence)",
    "termEn": "Divergence",
    "definitionRu": "Расхождение в направлении движения цены актива и показаний индикатора (RSI/MACD), служащее надежным опережающим сигналом скорого разворота тренда.",
    "definitionEn": "Disagreement between price extremes and momentum indicator peaks signaling trend exhaustion.",
    "category": "Теханализ",
    "relatedLessonSlug": "indicators-ma-rsi-macd"
  }
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
