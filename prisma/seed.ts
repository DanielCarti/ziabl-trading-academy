import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Admin user
  const adminPassword = await hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@ziabl.ru' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@ziabl.ru',
      name: 'Admin',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Course
  const course = await prisma.course.upsert({
    where: { slug: 'trading-2-0' },
    update: {},
    create: {
      slug: 'trading-2-0',
      titleRu: 'Ziabl Trade Academy: Курс 2.0',
      titleEn: 'Ziabl Trade Academy: Course 2.0',
      descRu: 'Полный курс по трейдингу и инвестициям — от экономических основ до технического анализа',
      descEn: 'Complete trading and investing course — from economic fundamentals to technical analysis',
      order: 1,
    },
  });

  // ==================== MODULES & LESSONS ====================

  const modulesData = [
    {
      slug: 'economic-foundation',
      titleRu: 'Экономический фундамент',
      titleEn: 'Economic Foundation',
      descRu: 'Ключевые макроэкономические концепции, которые влияют на финансовые рынки',
      descEn: 'Key macroeconomic concepts that affect financial markets',
      icon: '📊',
      order: 1,
      lessons: [
        {
          slug: 'inflation-cb-rate',
          titleRu: 'Инфляция, ключевая ставка ЦБ РФ и деньги в экономике',
          titleEn: 'Inflation, Central Bank Rate, and Money in the Economy',
          order: 1,
          contentRu: `## Что такое инфляция?

**Инфляция** — это устойчивое повышение общего уровня цен на товары и услуги. Когда инфляция растёт, на ту же сумму денег вы можете купить меньше товаров.

### Как измеряется инфляция?

В России основной показатель — **Индекс потребительских цен (ИПЦ)**. Росстат ежемесячно замеряет цены на корзину из ~500 товаров и услуг.

- Целевая инфляция ЦБ РФ: **4% в год**
- При инфляции выше цели ЦБ **повышает ставку**
- При инфляции ниже цели ЦБ **понижает ставку**

### Ключевая ставка ЦБ РФ

**Ключевая ставка** — это минимальный процент, под который Центральный банк выдаёт кредиты коммерческим банкам. Это главный инструмент денежно-кредитной политики.

**Как ставка влияет на рынки:**

| Ставка растёт ⬆️ | Ставка падает ⬇️ |
|---|---|
| Кредиты дорожают | Кредиты дешевеют |
| Вклады выгоднее | Вклады менее выгодны |
| Облигации падают в цене | Облигации растут в цене |
| Акции под давлением | Акции могут расти |

### Практический пример

Представим, что у вас на вкладе **1 000 000 ₽** под **10%** годовых, а инфляция — **8%**. Ваша **реальная доходность** = 10% - 8% = **2%**. То есть реальный прирост покупательной способности — всего 20 000 ₽.

### Почему это важно для инвестора?

Инвестор должен стремиться к доходности **выше инфляции**. Иначе капитал постепенно обесценивается. Это главная причина, по которой людям важно инвестировать, а не просто хранить деньги «под подушкой».`,

          contentEn: `## What is Inflation?

**Inflation** is a sustained increase in the general price level of goods and services. When inflation rises, the same amount of money buys fewer goods.

### How is Inflation Measured?

In Russia, the main indicator is the **Consumer Price Index (CPI)**. Rosstat monthly measures prices for a basket of ~500 goods and services.

- Target inflation of the Central Bank of Russia: **4% per year**
- When inflation is above target, the CB **raises the rate**
- When inflation is below target, the CB **lowers the rate**

### The Central Bank Key Rate

The **key rate** is the minimum interest rate at which the Central Bank lends to commercial banks. It is the main monetary policy tool.

**How the rate affects markets:**

| Rate rises ⬆️ | Rate falls ⬇️ |
|---|---|
| Loans become expensive | Loans become cheaper |
| Deposits more profitable | Deposits less profitable |
| Bond prices fall | Bond prices rise |
| Stocks under pressure | Stocks may rise |

### Practical Example

Imagine you have **1,000,000 ₽** in a deposit at **10%** annual rate, and inflation is **8%**. Your **real return** = 10% - 8% = **2%**. The real increase in purchasing power is only 20,000 ₽.

### Why Does This Matter for Investors?

Investors should aim for returns **above inflation**. Otherwise, capital gradually loses value. This is the main reason why people need to invest rather than keep money "under the mattress."`,
          quiz: [
            {
              questionRu: 'Что такое инфляция?',
              questionEn: 'What is inflation?',
              optionsRu: ['Рост курса национальной валюты', 'Устойчивое повышение общего уровня цен', 'Снижение процентных ставок', 'Рост ВВП страны'],
              optionsEn: ['Rise in national currency', 'Sustained increase in general price level', 'Decrease in interest rates', 'GDP growth'],
              correctIndices: [1],
              explanationRu: 'Инфляция — это именно устойчивое повышение общего уровня цен на товары и услуги.',
              explanationEn: 'Inflation is a sustained increase in the general price level of goods and services.',
            },
            {
              questionRu: 'Что происходит с ценами облигаций при повышении ключевой ставки?',
              questionEn: 'What happens to bond prices when the key rate increases?',
              optionsRu: ['Растут', 'Падают', 'Не меняются', 'Зависит от эмитента'],
              optionsEn: ['They rise', 'They fall', 'They don\'t change', 'Depends on the issuer'],
              correctIndices: [1],
              explanationRu: 'При повышении ставки новые облигации выпускаются с более высоким купоном, поэтому старые облигации с низким купоном падают в цене.',
              explanationEn: 'When rates rise, new bonds are issued with higher coupons, so old bonds with lower coupons fall in price.',
            },
            {
              questionRu: 'Какова целевая инфляция ЦБ РФ?',
              questionEn: 'What is the target inflation of the Central Bank of Russia?',
              optionsRu: ['2%', '4%', '6%', '8%'],
              optionsEn: ['2%', '4%', '6%', '8%'],
              correctIndices: [1],
              explanationRu: 'ЦБ РФ таргетирует инфляцию на уровне 4% в год.',
              explanationEn: 'The Central Bank of Russia targets inflation at 4% per year.',
            },
          ],
        },
        {
          slug: 'gdp-economic-cycles',
          titleRu: 'ВВП, экономические циклы и фазы рынка',
          titleEn: 'GDP, Economic Cycles, and Market Phases',
          order: 2,
          contentRu: `## Валовой внутренний продукт (ВВП)

**ВВП** — это суммарная стоимость всех товаров и услуг, произведённых в стране за определённый период. Это главный показатель «здоровья» экономики.

### Типы ВВП
- **Номинальный ВВП** — в текущих ценах
- **Реальный ВВП** — скорректированный на инфляцию (более точный)

### Экономические циклы

Экономика развивается **циклически**, проходя через 4 фазы:

1. **🟢 Экспансия (рост)** — ВВП растёт, безработица снижается, бизнес расширяется
2. **🔴 Пик** — экономика «перегревается», инфляция ускоряется
3. **🔵 Рецессия (спад)** — ВВП падает 2+ квартала подряд, безработица растёт
4. **🟡 Дно (трон)** — экономика на минимуме, начало восстановления

### Фазы рынка и стратегии

| Фаза | Что покупать? | Что избегать? |
|------|---------------|---------------|
| Ранний рост | Акции роста, циклические | Защитные, золото |
| Поздний рост | Сырьевые, инфляционные | Длинные облигации |
| Рецессия | Защитные акции, облигации | Акции роста |
| Восстановление | Циклические, мелкие компании | Защитные |

### Опережающие индикаторы

Инвесторы следят за **опережающими индикаторами**, которые предсказывают будущие изменения:
- **PMI** (Индекс деловой активности) — выше 50 = рост
- **Заявки на пособие по безработице** — рост = проблемы
- **Кривая доходности** — инверсия = сигнал рецессии`,

          contentEn: `## Gross Domestic Product (GDP)

**GDP** is the total value of all goods and services produced in a country over a specific period. It is the main indicator of economic health.

### Types of GDP
- **Nominal GDP** — at current prices
- **Real GDP** — adjusted for inflation (more accurate)

### Economic Cycles

The economy develops **cyclically**, passing through 4 phases:

1. **🟢 Expansion** — GDP grows, unemployment falls, businesses expand
2. **🔴 Peak** — economy "overheats", inflation accelerates
3. **🔵 Recession** — GDP falls for 2+ consecutive quarters, unemployment rises
4. **🟡 Trough** — economy at minimum, beginning of recovery

### Market Phases and Strategies

| Phase | What to buy? | What to avoid? |
|-------|-------------|---------------|
| Early growth | Growth stocks, cyclicals | Defensive, gold |
| Late growth | Commodities, inflation hedges | Long bonds |
| Recession | Defensive stocks, bonds | Growth stocks |
| Recovery | Cyclicals, small caps | Defensive |

### Leading Indicators

Investors monitor **leading indicators** that predict future changes:
- **PMI** (Purchasing Managers' Index) — above 50 = growth
- **Unemployment claims** — rising = trouble
- **Yield curve** — inversion = recession signal`,
          quiz: [
            {
              questionRu: 'Что такое рецессия?',
              questionEn: 'What is a recession?',
              optionsRu: ['Рост ВВП более 5%', 'Падение ВВП 2+ квартала подряд', 'Рост инфляции', 'Снижение ключевой ставки'],
              optionsEn: ['GDP growth above 5%', 'GDP decline for 2+ consecutive quarters', 'Inflation growth', 'Key rate decrease'],
              correctIndices: [1],
              explanationRu: 'Рецессия — это период, когда реальный ВВП снижается два квартала подряд или более.',
              explanationEn: 'A recession is a period when real GDP declines for two or more consecutive quarters.',
            },
            {
              questionRu: 'Что означает PMI выше 50?',
              questionEn: 'What does PMI above 50 mean?',
              optionsRu: ['Сокращение деловой активности', 'Расширение деловой активности', 'Стагнация', 'Дефляция'],
              optionsEn: ['Business activity contraction', 'Business activity expansion', 'Stagnation', 'Deflation'],
              correctIndices: [1],
              explanationRu: 'PMI (Purchasing Managers Index) выше 50 сигнализирует о расширении деловой активности.',
              explanationEn: 'PMI above 50 signals business activity expansion.',
            },
          ],
        },
      ],
    },
    {
      slug: 'bonds-ofz',
      titleRu: 'Средне- и долгосрочные инвестиции (ОФЗ и Облигации)',
      titleEn: 'Medium and Long-term Investments (Bonds)',
      descRu: 'Всё об облигациях — от государственных ОФЗ до корпоративных бумаг',
      descEn: 'Everything about bonds — from government OFZ to corporate securities',
      icon: '📈',
      order: 2,
      lessons: [
        {
          slug: 'what-are-bonds',
          titleRu: 'Что такое облигации? ОФЗ, виды купонов',
          titleEn: 'What are Bonds? OFZ, Coupon Types',
          order: 1,
          contentRu: `## Облигация — долговая расписка

**Облигация** — это ценная бумага, которая подтверждает, что вы дали деньги в долг эмитенту (государству или компании). Взамен эмитент обязуется:
1. Выплачивать **купоны** (проценты) регулярно
2. Вернуть **номинал** (обычно 1000 ₽) в дату погашения

### ОФЗ — Облигации федерального займа

**ОФЗ** — это облигации, выпущенные Министерством финансов РФ. Считаются самым надёжным инструментом на российском рынке.

### Виды купонов

| Тип | Обозначение | Как работает |
|-----|------------|-------------|
| **Постоянный доход** | ОФЗ-ПД | Купон фиксирован на весь срок |
| **Переменный купон** | ОФЗ-ПК | Купон привязан к ставке RUONIA |
| **Индексируемый номинал** | ОФЗ-ИН | Номинал растёт с инфляцией |

### Ключевые параметры облигации

- **Номинал** — сумма, которую вернут при погашении (обычно 1000 ₽)
- **Купонная ставка** — процент от номинала, выплачиваемый обычно 2 раза в год
- **Дата погашения** — когда вернут номинал
- **Текущая цена** — может быть выше или ниже номинала
- **НКД** (накопленный купонный доход) — часть купона, которую платит покупатель продавцу

### Пример расчёта

ОФЗ-ПД с номиналом 1000 ₽, купон 7% годовых, выплата 2 раза в год:
- Каждые 6 месяцев вы получаете: 1000 × 7% / 2 = **35 ₽**
- За год: **70 ₽** купонного дохода`,

          contentEn: `## A Bond is a Debt Receipt

**A bond** is a security that confirms you have lent money to an issuer (government or company). In return, the issuer commits to:
1. Pay **coupons** (interest) regularly
2. Return the **face value** (usually 1,000 ₽) at maturity

### OFZ — Federal Loan Bonds

**OFZ** are bonds issued by the Russian Ministry of Finance. They are considered the most reliable instrument in the Russian market.

### Coupon Types

| Type | Code | How it works |
|------|------|-------------|
| **Fixed coupon** | OFZ-PD | Coupon is fixed for the entire term |
| **Floating coupon** | OFZ-PK | Coupon is tied to the RUONIA rate |
| **Inflation-indexed** | OFZ-IN | Face value grows with inflation |

### Key Bond Parameters

- **Face value** — amount returned at maturity (usually 1,000 ₽)
- **Coupon rate** — percentage of face value, paid usually twice a year
- **Maturity date** — when face value is returned
- **Current price** — may be above or below face value
- **Accrued coupon** — portion of coupon paid by buyer to seller

### Calculation Example

OFZ-PD with face value of 1,000 ₽, 7% annual coupon, paid twice a year:
- Every 6 months you receive: 1,000 × 7% / 2 = **35 ₽**
- Per year: **70 ₽** in coupon income`,
          quiz: [
            {
              questionRu: 'Что такое номинал облигации?',
              questionEn: 'What is the face value of a bond?',
              optionsRu: ['Текущая рыночная цена', 'Сумма, которую вернут при погашении', 'Размер купона', 'Доходность к погашению'],
              optionsEn: ['Current market price', 'Amount returned at maturity', 'Coupon size', 'Yield to maturity'],
              correctIndices: [1],
              explanationRu: 'Номинал — это сумма, которую эмитент обязуется вернуть владельцу облигации при погашении.',
              explanationEn: 'Face value is the amount the issuer commits to return to the bondholder at maturity.',
            },
            {
              questionRu: 'Какой тип ОФЗ защищает от инфляции?',
              questionEn: 'Which type of OFZ protects against inflation?',
              optionsRu: ['ОФЗ-ПД', 'ОФЗ-ПК', 'ОФЗ-ИН', 'ОФЗ-АД'],
              optionsEn: ['OFZ-PD', 'OFZ-PK', 'OFZ-IN', 'OFZ-AD'],
              correctIndices: [2],
              explanationRu: 'ОФЗ-ИН (с индексируемым номиналом) защищает от инфляции, так как номинал растёт вместе с ИПЦ.',
              explanationEn: 'OFZ-IN (inflation-indexed) protects against inflation as the face value grows with CPI.',
            },
          ],
        },
        {
          slug: 'corporate-bonds-ratings',
          titleRu: 'Корпоративные облигации, кредитные рейтинги и дюрация',
          titleEn: 'Corporate Bonds, Credit Ratings, and Duration',
          order: 2,
          contentRu: `## Корпоративные облигации

**Корпоративные облигации** — это долговые бумаги, выпущенные компаниями. Они обычно предлагают более высокую доходность, чем ОФЗ, но и **риск выше**.

### Кредитные рейтинги

Рейтинговые агентства (АКРА, Эксперт РА, S&P, Moody's) оценивают надёжность эмитентов:

| Рейтинг | Уровень | Описание |
|---------|---------|----------|
| AAA | Высший | Минимальный риск дефолта |
| AA | Очень высокий | Очень надёжный эмитент |
| A | Высокий | Надёжный, но чувствителен к экономике |
| BBB | Средний | Инвестиционный уровень (минимум) |
| BB и ниже | Спекулятивный | Высокий риск — «мусорные» облигации |

### Дюрация

**Дюрация** — это средневзвешенный срок до получения всех платежей по облигации. Чем выше дюрация, тем **сильнее цена реагирует на изменение ставок**.

**Правило:** При росте ставки на 1% цена облигации падает примерно на величину дюрации в процентах.

Пример: облигация с дюрацией 5 лет — при росте ставки на 1% потеряет ≈5% в цене.`,

          contentEn: `## Corporate Bonds

**Corporate bonds** are debt securities issued by companies. They usually offer higher yields than government bonds, but the **risk is also higher**.

### Credit Ratings

Rating agencies (ACRA, Expert RA, S&P, Moody's) assess issuer reliability:

| Rating | Level | Description |
|--------|-------|------------|
| AAA | Highest | Minimal default risk |
| AA | Very high | Very reliable issuer |
| A | High | Reliable but sensitive to economy |
| BBB | Medium | Investment grade (minimum) |
| BB and below | Speculative | High risk — "junk" bonds |

### Duration

**Duration** is the weighted average time until all bond payments are received. The higher the duration, the **more the price reacts to rate changes**.

**Rule:** When the rate increases by 1%, the bond price falls by approximately the duration percentage.

Example: a bond with 5-year duration — if rates rise by 1%, it loses ≈5% in price.`,
          quiz: [
            {
              questionRu: 'Какой минимальный рейтинг считается инвестиционным?',
              questionEn: 'What is the minimum investment grade rating?',
              optionsRu: ['AA', 'A', 'BBB', 'BB'],
              optionsEn: ['AA', 'A', 'BBB', 'BB'],
              correctIndices: [2],
              explanationRu: 'BBB — это минимальный инвестиционный рейтинг. Всё что ниже (BB, B, CCC) считается спекулятивным.',
              explanationEn: 'BBB is the minimum investment grade rating. Anything below (BB, B, CCC) is considered speculative.',
            },
          ],
        },
        {
          slug: 'bond-strategies',
          titleRu: 'Стратегии работы с облигациями (YTM)',
          titleEn: 'Bond Strategies (YTM)',
          order: 3,
          contentRu: `## Доходность к погашению (YTM)

**YTM (Yield to Maturity)** — это полная годовая доходность облигации, если держать её до погашения. Учитывает:
- Купонные выплаты
- Разницу между ценой покупки и номиналом
- Реинвестирование купонов

### Формула (упрощённая)

YTM ≈ (Купон + (Номинал - Цена) / Лет до погашения) / ((Номинал + Цена) / 2) × 100%

### Стратегии

1. **Купи и держи** — покупаете облигацию и держите до погашения. Простейшая стратегия, подходит для консервативных инвесторов.

2. **Лестница облигаций** — покупаете облигации с разными сроками погашения (1, 2, 3, 5 лет). По мере погашения реинвестируете в новые. Снижает процентный риск.

3. **Спекулятивная** — покупаете при высоких ставках (когда облигации дешёвые) в расчёте на снижение ставки и рост цены.`,

          contentEn: `## Yield to Maturity (YTM)

**YTM** is the total annual return on a bond if held to maturity. It accounts for:
- Coupon payments
- Difference between purchase price and face value
- Coupon reinvestment

### Simplified Formula

YTM ≈ (Coupon + (Face Value - Price) / Years) / ((Face Value + Price) / 2) × 100%

### Strategies

1. **Buy and hold** — buy a bond and hold until maturity. Simplest strategy, suitable for conservative investors.

2. **Bond ladder** — buy bonds with different maturities (1, 2, 3, 5 years). Reinvest as they mature. Reduces interest rate risk.

3. **Speculative** — buy when rates are high (bonds are cheap), expecting rate decreases and price appreciation.`,
          quiz: [
            {
              questionRu: 'Что учитывает показатель YTM?',
              questionEn: 'What does YTM account for?',
              optionsRu: ['Только купоны', 'Купоны и курсовую разницу', 'Только курсовую разницу', 'Инфляцию'],
              optionsEn: ['Only coupons', 'Coupons and price difference', 'Only price difference', 'Inflation'],
              correctIndices: [1],
              explanationRu: 'YTM учитывает как купонные выплаты, так и разницу между ценой покупки и номиналом.',
              explanationEn: 'YTM accounts for both coupon payments and the difference between purchase price and face value.',
            },
          ],
        },
      ],
    },
    {
      slug: 'collective-investments',
      titleRu: 'Коллективные инвестиции и Индексный подход',
      titleEn: 'Collective Investments and Index Approach',
      descRu: 'Фонды, ETF, БПИФ и принципы составления портфеля',
      descEn: 'Funds, ETFs, and portfolio construction principles',
      icon: '🏦',
      order: 3,
      lessons: [
        {
          slug: 'etf-bpif-funds',
          titleRu: 'Фонды (БПИФ и ETF) — как купить весь рынок одной бумагой',
          titleEn: 'Funds (BPIF and ETF) — How to Buy the Entire Market with One Security',
          order: 1,
          contentRu: `## Что такое ETF и БПИФ?

**ETF** (Exchange-Traded Fund) и **БПИФ** (Биржевой паевой инвестиционный фонд) — это фонды, акции которых торгуются на бирже. Покупая одну акцию фонда, вы получаете долю в портфеле из десятков или сотен бумаг.

### Преимущества фондов

- **Диверсификация** — одна покупка = портфель из многих бумаг
- **Низкий порог входа** — от 1 акции (часто от 10-100 ₽)
- **Профессиональное управление** — фонд следует за индексом автоматически
- **Ликвидность** — можно купить/продать в любой момент торговой сессии

### Пример

Покупая БПИФ на индекс Мосбиржи, вы одновременно владеете долей в Сбербанке, Газпроме, Лукойле и ещё ~40 крупнейших компаниях России.

### На что смотреть при выборе

- **Комиссия управления** — чем ниже, тем лучше (хороший показатель < 1% в год)
- **Отклонение от индекса** — tracking error
- **Ликвидность** — объём торгов
- **Размер фонда** — крупные фонды надёжнее`,

          contentEn: `## What are ETF and BPIF?

**ETF** (Exchange-Traded Fund) and **BPIF** (Exchange-Traded Mutual Fund) are funds whose shares are traded on the exchange. By buying one fund share, you get a portion of a portfolio of dozens or hundreds of securities.

### Fund Advantages

- **Diversification** — one purchase = portfolio of many securities
- **Low entry threshold** — from 1 share (often from 10-100 ₽)
- **Professional management** — fund follows the index automatically
- **Liquidity** — can buy/sell at any time during trading session

### Example

Buying a BPIF tracking the Moscow Exchange index, you simultaneously own a share in Sberbank, Gazprom, Lukoil, and ~40 other largest Russian companies.

### What to Look for When Choosing

- **Management fee** — lower is better (good indicator < 1% per year)
- **Index deviation** — tracking error
- **Liquidity** — trading volume
- **Fund size** — larger funds are more reliable`,
          quiz: [
            {
              questionRu: 'Какое главное преимущество ETF/БПИФ?',
              questionEn: 'What is the main advantage of ETF/BPIF?',
              optionsRu: ['Гарантированная доходность', 'Диверсификация за одну покупку', 'Отсутствие рисков', 'Нулевые комиссии'],
              optionsEn: ['Guaranteed returns', 'Diversification in one purchase', 'No risks', 'Zero fees'],
              correctIndices: [1],
              explanationRu: 'Главное преимущество — мгновенная диверсификация: одна покупка даёт доступ к портфелю из множества бумаг.',
              explanationEn: 'The main advantage is instant diversification: one purchase gives access to a portfolio of many securities.',
            },
          ],
        },
        {
          slug: 'portfolio-construction',
          titleRu: 'Составление портфеля, сложный процент и диверсификация',
          titleEn: 'Portfolio Construction, Compound Interest, and Diversification',
          order: 2,
          contentRu: `## Asset Allocation — Распределение активов

**Asset Allocation** — это стратегия распределения капитала между разными классами активов. Это самое важное решение инвестора.

### Классы активов
- **Акции** — высокая доходность, высокий риск
- **Облигации** — стабильный доход, низкий риск
- **Золото/сырьё** — защита от инфляции
- **Кэш/вклады** — ликвидность, минимальный риск

### Сложный процент — восьмое чудо света

**Сложный процент** — это начисление процентов на уже начисленные проценты. Чем дольше срок, тем сильнее эффект.

Пример: 100 000 ₽ под 10% годовых:
- Через 10 лет: **259 374 ₽** (×2.6)
- Через 20 лет: **672 750 ₽** (×6.7)
- Через 30 лет: **1 744 940 ₽** (×17.4)

### Правило 72

Чтобы узнать, за сколько лет капитал удвоится: **72 / ставка = количество лет**.
При 10% годовых: 72 / 10 = **7.2 года**.`,

          contentEn: `## Asset Allocation

**Asset Allocation** is a strategy of distributing capital among different asset classes. This is the most important investor decision.

### Asset Classes
- **Stocks** — high returns, high risk
- **Bonds** — stable income, low risk
- **Gold/Commodities** — inflation protection
- **Cash/Deposits** — liquidity, minimal risk

### Compound Interest — The Eighth Wonder of the World

**Compound interest** is interest calculated on previously accumulated interest. The longer the term, the stronger the effect.

Example: 100,000 ₽ at 10% annually:
- After 10 years: **259,374 ₽** (×2.6)
- After 20 years: **672,750 ₽** (×6.7)
- After 30 years: **1,744,940 ₽** (×17.4)

### Rule of 72

To find out how many years it takes for capital to double: **72 / rate = number of years**.
At 10% annually: 72 / 10 = **7.2 years**.`,
          quiz: [
            {
              questionRu: 'По правилу 72, за сколько лет удвоится капитал при ставке 12%?',
              questionEn: 'Using the Rule of 72, how many years to double capital at 12% rate?',
              optionsRu: ['4 года', '6 лет', '8 лет', '12 лет'],
              optionsEn: ['4 years', '6 years', '8 years', '12 years'],
              correctIndices: [1],
              explanationRu: '72 / 12 = 6 лет. Это приблизительный расчёт для удвоения капитала.',
              explanationEn: '72 / 12 = 6 years. This is an approximate calculation for doubling capital.',
            },
          ],
        },
      ],
    },
    {
      slug: 'trading-mechanics',
      titleRu: 'Механика трейдинга и словарь',
      titleEn: 'Trading Mechanics and Vocabulary',
      descRu: 'Как работает биржа, брокер, ордера и маржинальная торговля',
      descEn: 'How the exchange, broker, orders, and margin trading work',
      icon: '⚡',
      order: 4,
      lessons: [
        {
          slug: 'stocks-long-short',
          titleRu: 'Акции, лонг, шорт, маржинальная торговля',
          titleEn: 'Stocks, Long, Short, Margin Trading',
          order: 1,
          contentRu: `## Акции

**Акция** — это доля в собственности компании. Покупая акцию, вы становитесь совладельцем бизнеса.

### Лонг и Шорт

- **Лонг (Long)** — покупка актива в расчёте на рост цены. «Купил дёшево — продал дорого».
- **Шорт (Short)** — продажа заёмного актива в расчёте на падение цены. «Продал дорого — откупил дёшево».

### Маржинальная торговля

**Маржинальная торговля** — это торговля с использованием заёмных средств брокера (кредитного плеча).

⚠️ **Важно:** Маржинальная торговля увеличивает как прибыль, так и убытки. Начинающим рекомендуется торговать только на собственные средства.

### Пример шорта

1. Вы занимаете у брокера 100 акций компании Х по цене 200 ₽
2. Продаёте их на рынке → получаете 20 000 ₽
3. Цена падает до 150 ₽
4. Откупаете 100 акций за 15 000 ₽
5. Возвращаете акции брокеру
6. **Прибыль: 5 000 ₽** (минус комиссии)`,

          contentEn: `## Stocks

**A stock** is a share of ownership in a company. By buying a stock, you become a co-owner of the business.

### Long and Short

- **Long** — buying an asset expecting price increase. "Buy low — sell high."
- **Short** — selling a borrowed asset expecting price decrease. "Sell high — buy back low."

### Margin Trading

**Margin trading** is trading using borrowed broker funds (leverage).

⚠️ **Important:** Margin trading amplifies both profits and losses. Beginners should trade only with their own funds.

### Short Selling Example

1. You borrow 100 shares of Company X from broker at 200 ₽
2. Sell them on the market → receive 20,000 ₽
3. Price drops to 150 ₽
4. Buy back 100 shares for 15,000 ₽
5. Return shares to broker
6. **Profit: 5,000 ₽** (minus commissions)`,
          quiz: [
            {
              questionRu: 'Что такое шорт?',
              questionEn: 'What is short selling?',
              optionsRu: ['Покупка актива на рост', 'Продажа заёмного актива на падение', 'Долгосрочная инвестиция', 'Покупка облигаций'],
              optionsEn: ['Buying an asset expecting growth', 'Selling a borrowed asset expecting decline', 'Long-term investment', 'Buying bonds'],
              correctIndices: [1],
              explanationRu: 'Шорт — это продажа заёмного актива в надежде откупить дешевле и заработать на разнице.',
              explanationEn: 'Short selling is selling a borrowed asset hoping to buy back cheaper and profit from the difference.',
            },
          ],
        },
        {
          slug: 'exchange-broker-orderbook',
          titleRu: 'Биржа, брокер, стакан заявок и типы ордеров',
          titleEn: 'Exchange, Broker, Order Book, and Order Types',
          order: 2,
          contentRu: `## Биржа

**Биржа** — это организованная площадка для торговли ценными бумагами. В России основная биржа — **Московская биржа (MOEX)**.

### Брокер

**Брокер** — посредник между вами и биржей. Физические лица не могут торговать на бирже напрямую.

### Стакан заявок (Order Book)

**Стакан** показывает все текущие заявки на покупку (Bid) и продажу (Ask):

| Bid (покупка) | Цена | Ask (продажа) |
|:---:|:---:|:---:|
| | 255.50 | 100 шт |
| | 255.00 | 250 шт |
| 300 шт | 254.50 | |
| 150 шт | 254.00 | |

**Спред** = Ask - Bid = 255.00 - 254.50 = **0.50 ₽**

### Типы ордеров

- **Рыночный ордер** — исполняется немедленно по лучшей доступной цене
- **Лимитный ордер** — исполняется только по указанной цене или лучше
- **Стоп-лосс** — автоматическая продажа при достижении определённой цены (ограничение убытков)
- **Тейк-профит** — автоматическая продажа при достижении целевой прибыли`,

          contentEn: `## Exchange

The **exchange** is an organized platform for trading securities. In Russia, the main exchange is the **Moscow Exchange (MOEX)**.

### Broker

A **broker** is an intermediary between you and the exchange. Individuals cannot trade on the exchange directly.

### Order Book

The **order book** shows all current buy (Bid) and sell (Ask) orders:

| Bid (buy) | Price | Ask (sell) |
|:---:|:---:|:---:|
| | 255.50 | 100 shares |
| | 255.00 | 250 shares |
| 300 shares | 254.50 | |
| 150 shares | 254.00 | |

**Spread** = Ask - Bid = 255.00 - 254.50 = **0.50 ₽**

### Order Types

- **Market order** — executed immediately at the best available price
- **Limit order** — executed only at the specified price or better
- **Stop-loss** — automatic sale when a certain price is reached (loss limitation)
- **Take-profit** — automatic sale when target profit is reached`,
          quiz: [
            {
              questionRu: 'Что такое спред в стакане заявок?',
              questionEn: 'What is the spread in the order book?',
              optionsRu: ['Объём торгов', 'Разница между лучшей ценой покупки и продажи', 'Комиссия брокера', 'Размер лота'],
              optionsEn: ['Trading volume', 'Difference between best bid and ask prices', 'Broker commission', 'Lot size'],
              correctIndices: [1],
              explanationRu: 'Спред — это разница между лучшей ценой покупки (Bid) и лучшей ценой продажи (Ask).',
              explanationEn: 'Spread is the difference between the best bid and best ask prices.',
            },
          ],
        },
      ],
    },
    {
      slug: 'fundamental-analysis',
      titleRu: 'Фундаментальный анализ компании',
      titleEn: 'Fundamental Company Analysis',
      descRu: 'Как читать отчётность, считать мультипликаторы и оценивать бизнес',
      descEn: 'How to read financial statements, calculate multiples, and evaluate businesses',
      icon: '🔍',
      order: 5,
      lessons: [
        {
          slug: 'ifrs-reporting',
          titleRu: 'Отчетность МСФО (P&L, Баланс, Cash Flow)',
          titleEn: 'IFRS Reporting (P&L, Balance Sheet, Cash Flow)',
          order: 1,
          contentRu: `## Три главных отчёта

### 1. Отчёт о прибылях и убытках (P&L)
Показывает доходы и расходы за период:
- **Выручка** — все деньги от продаж
- **EBITDA** — прибыль до процентов, налогов и амортизации
- **Чистая прибыль** — итоговый результат

### 2. Баланс (Balance Sheet)
Показывает что компания имеет и кому должна:
- **Активы** = Собственный капитал + Обязательства

### 3. Отчёт о движении денежных средств (Cash Flow)
- **Операционный** — от основной деятельности (самый важный!)
- **Инвестиционный** — капитальные затраты
- **Финансовый** — кредиты, дивиденды`,

          contentEn: `## Three Main Financial Statements

### 1. Income Statement (P&L)
Shows revenues and expenses over a period:
- **Revenue** — all money from sales
- **EBITDA** — earnings before interest, taxes, depreciation, and amortization
- **Net Income** — bottom line result

### 2. Balance Sheet
Shows what the company owns and owes:
- **Assets** = Equity + Liabilities

### 3. Cash Flow Statement
- **Operating** — from core business (most important!)
- **Investing** — capital expenditures
- **Financing** — loans, dividends`,
          quiz: [
            {
              questionRu: 'Какой денежный поток самый важный?',
              questionEn: 'Which cash flow is the most important?',
              optionsRu: ['Инвестиционный', 'Финансовый', 'Операционный', 'Свободный'],
              optionsEn: ['Investing', 'Financing', 'Operating', 'Free'],
              correctIndices: [2],
              explanationRu: 'Операционный денежный поток показывает, сколько реальных денег генерирует основной бизнес.',
              explanationEn: 'Operating cash flow shows how much real cash the core business generates.',
            },
          ],
        },
        {
          slug: 'valuation-multiples',
          titleRu: 'Мультипликаторы (P/E, P/S, EV/EBITDA, ROE)',
          titleEn: 'Valuation Multiples (P/E, P/S, EV/EBITDA, ROE)',
          order: 2,
          contentRu: `## Основные мультипликаторы

### P/E (Price to Earnings)
**P/E = Цена акции / Прибыль на акцию**
Показывает, за сколько лет окупится инвестиция при текущей прибыли.
- P/E < 10 — дёшево
- P/E 10-20 — нормально  
- P/E > 20 — дорого (или быстрорастущая компания)

### EV/EBITDA
**EV/EBITDA = Стоимость компании / EBITDA**
Более точный, чем P/E, так как учитывает долг.

### ROE (Return on Equity)
**ROE = Чистая прибыль / Собственный капитал × 100%**
Показывает эффективность использования капитала. ROE > 15% — хорошо.

### Net Debt/EBITDA
Показывает долговую нагрузку. > 3x — высокая, опасно.`,

          contentEn: `## Key Valuation Multiples

### P/E (Price to Earnings)
**P/E = Share Price / Earnings Per Share**
Shows how many years to recoup investment at current earnings.
- P/E < 10 — cheap
- P/E 10-20 — normal
- P/E > 20 — expensive (or fast-growing company)

### EV/EBITDA
**EV/EBITDA = Enterprise Value / EBITDA**
More accurate than P/E as it accounts for debt.

### ROE (Return on Equity)
**ROE = Net Income / Equity × 100%**
Shows capital efficiency. ROE > 15% — good.

### Net Debt/EBITDA
Shows debt burden. > 3x — high, dangerous.`,
          quiz: [
            {
              questionRu: 'Что показывает P/E?',
              questionEn: 'What does P/E show?',
              optionsRu: ['Долговую нагрузку', 'За сколько лет окупится инвестиция', 'Эффективность капитала', 'Дивидендную доходность'],
              optionsEn: ['Debt burden', 'Years to recoup investment', 'Capital efficiency', 'Dividend yield'],
              correctIndices: [1],
              explanationRu: 'P/E показывает, за сколько лет чистая прибыль компании «окупит» текущую цену акции.',
              explanationEn: 'P/E shows how many years net income will "pay back" the current share price.',
            },
          ],
        },
        {
          slug: 'dividend-policy',
          titleRu: 'Оценка дивидендной политики и бизнес-модели',
          titleEn: 'Dividend Policy and Business Model Evaluation',
          order: 3,
          contentRu: `## Дивиденды

**Дивиденды** — это часть прибыли компании, выплачиваемая акционерам.

### Ключевые показатели
- **Дивидендная доходность** = Дивиденд на акцию / Цена акции × 100%
- **Payout ratio** = Дивиденды / Чистая прибыль — какую долю прибыли направляют на дивиденды
- Нормальный payout: 30-60%. Выше 80% — может быть неустойчивым.

### Дивидендные аристократы
Компании, которые стабильно повышают дивиденды 10+ лет подряд. В России: Лукойл, Сбербанк, НОВАТЭК.

### На что смотреть в бизнес-модели
- Стабильность выручки
- Конкурентные преимущества (moat)
- Маржинальность
- Долговая нагрузка`,

          contentEn: `## Dividends

**Dividends** are a portion of company profits paid to shareholders.

### Key Metrics
- **Dividend yield** = Dividend per Share / Share Price × 100%
- **Payout ratio** = Dividends / Net Income — what share of profit goes to dividends
- Normal payout: 30-60%. Above 80% — may be unsustainable.

### Dividend Aristocrats
Companies that consistently increase dividends for 10+ consecutive years. In Russia: Lukoil, Sberbank, NOVATEK.

### What to Look for in Business Model
- Revenue stability
- Competitive advantages (moat)
- Profit margins
- Debt burden`,
          quiz: [
            {
              questionRu: 'Какой payout ratio считается устойчивым?',
              questionEn: 'What payout ratio is considered sustainable?',
              optionsRu: ['10-20%', '30-60%', '80-100%', 'Более 100%'],
              optionsEn: ['10-20%', '30-60%', '80-100%', 'Above 100%'],
              correctIndices: [1],
              explanationRu: 'Payout ratio 30-60% считается здоровым: компания и выплачивает дивиденды, и сохраняет прибыль для роста.',
              explanationEn: 'A payout ratio of 30-60% is healthy: the company pays dividends and retains profit for growth.',
            },
          ],
        },
      ],
    },
    {
      slug: 'technical-analysis',
      titleRu: 'Технический и свечной анализ',
      titleEn: 'Technical and Candlestick Analysis',
      descRu: 'Тренды, индикаторы, паттерны японских свечей',
      descEn: 'Trends, indicators, Japanese candlestick patterns',
      icon: '📉',
      order: 6,
      lessons: [
        {
          slug: 'trends-support-resistance',
          titleRu: 'Тренды, уровни поддержки и сопротивления, объёмы',
          titleEn: 'Trends, Support and Resistance Levels, Volume',
          order: 1,
          hasChart: true,
          contentRu: `## Тренды

**Тренд** — это общее направление движения цены.

- **Восходящий тренд (бычий)** — последовательность растущих максимумов и минимумов
- **Нисходящий тренд (медвежий)** — последовательность снижающихся максимумов и минимумов
- **Боковой тренд (флэт)** — цена движется в горизонтальном коридоре

### Уровни поддержки и сопротивления

- **Поддержка** — ценовой уровень, от которого цена отталкивается вверх (много покупателей)
- **Сопротивление** — ценовой уровень, от которого цена отталкивается вниз (много продавцов)

Когда уровень пробивается, он часто меняет свою роль: поддержка становится сопротивлением и наоборот.

### Объёмы

**Объём** подтверждает движение цены:
- Рост цены + рост объёма = **сильный тренд**
- Рост цены + падение объёма = **слабый тренд** (возможен разворот)`,

          contentEn: `## Trends

A **trend** is the general direction of price movement.

- **Uptrend (bullish)** — sequence of higher highs and higher lows
- **Downtrend (bearish)** — sequence of lower highs and lower lows
- **Sideways (flat)** — price moves in a horizontal range

### Support and Resistance Levels

- **Support** — price level where price bounces up (many buyers)
- **Resistance** — price level where price bounces down (many sellers)

When a level is broken, it often changes its role: support becomes resistance and vice versa.

### Volume

**Volume** confirms price movement:
- Price rise + volume rise = **strong trend**
- Price rise + volume drop = **weak trend** (possible reversal)`,
          quiz: [
            {
              questionRu: 'Что происходит при пробое уровня поддержки?',
              questionEn: 'What happens when a support level is broken?',
              optionsRu: ['Цена всегда возвращается', 'Поддержка может стать сопротивлением', 'Объёмы обязательно падают', 'Тренд не меняется'],
              optionsEn: ['Price always returns', 'Support may become resistance', 'Volume always drops', 'Trend does not change'],
              correctIndices: [1],
              explanationRu: 'При пробое уровень поддержки часто становится новым уровнем сопротивления — это классическая смена ролей.',
              explanationEn: 'When broken, support often becomes a new resistance level — this is a classic role reversal.',
            },
          ],
        },
        {
          slug: 'indicators-ma-rsi-macd',
          titleRu: 'Индикаторы (MA, RSI, MACD)',
          titleEn: 'Indicators (MA, RSI, MACD)',
          order: 2,
          hasChart: true,
          chartType: 'indicators',
          contentRu: `## Скользящие средние (MA)

**MA (Moving Average)** — усреднённая цена за последние N периодов.

- **SMA** (Simple) — простое среднее
- **EMA** (Exponential) — больше веса недавним ценам

Сигналы:
- Цена выше MA → **бычий сигнал**
- Пересечение быстрой MA (20) снизу вверх медленной (50) → **«Золотой крест»** (покупка)
- Пересечение сверху вниз → **«Мёртвый крест»** (продажа)

## RSI (Relative Strength Index)

RSI показывает силу тренда по шкале 0-100:
- RSI > 70 → **перекупленность** (возможно падение)
- RSI < 30 → **перепроданность** (возможен рост)

## MACD

MACD = EMA(12) - EMA(26). Показывает изменение импульса:
- MACD пересекает сигнальную линию снизу вверх → **покупка**
- MACD пересекает сверху вниз → **продажа**`,

          contentEn: `## Moving Averages (MA)

**MA (Moving Average)** — averaged price over the last N periods.

- **SMA** (Simple) — simple average
- **EMA** (Exponential) — more weight to recent prices

Signals:
- Price above MA → **bullish signal**
- Fast MA (20) crossing above slow MA (50) → **"Golden Cross"** (buy)
- Crossing below → **"Death Cross"** (sell)

## RSI (Relative Strength Index)

RSI shows trend strength on a 0-100 scale:
- RSI > 70 → **overbought** (possible decline)
- RSI < 30 → **oversold** (possible rise)

## MACD

MACD = EMA(12) - EMA(26). Shows momentum change:
- MACD crossing signal line from below → **buy**
- MACD crossing from above → **sell**`,
          quiz: [
            {
              questionRu: 'Что означает RSI > 70?',
              questionEn: 'What does RSI > 70 mean?',
              optionsRu: ['Перепроданность', 'Перекупленность', 'Нейтральная зона', 'Боковой тренд'],
              optionsEn: ['Oversold', 'Overbought', 'Neutral zone', 'Sideways trend'],
              correctIndices: [1],
              explanationRu: 'RSI выше 70 указывает на перекупленность — актив может быть переоценён и возможна коррекция.',
              explanationEn: 'RSI above 70 indicates overbought conditions — the asset may be overvalued and a correction is possible.',
            },
          ],
        },
        {
          slug: 'candlestick-patterns',
          titleRu: 'Японские свечи и разворотные паттерны',
          titleEn: 'Japanese Candlesticks and Reversal Patterns',
          order: 3,
          hasChart: true,
          contentRu: `## Японские свечи

Каждая свеча показывает 4 цены за период: **Open, High, Low, Close (OHLC)**.

- 🟢 **Зелёная/белая свеча** — Close > Open (рост)
- 🔴 **Красная/чёрная свеча** — Close < Open (падение)
- **Тело** — расстояние между Open и Close
- **Тени (фитили)** — максимум и минимум периода

## Ключевые паттерны

### Разворотные (бычьи):
- **Молот (Hammer)** — маленькое тело вверху, длинная нижняя тень. Сигнал разворота на дне.
- **Бычье поглощение** — зелёная свеча полностью «поглощает» тело предыдущей красной.
- **Утренняя звезда** — три свечи: длинная красная, маленькая (доджи), длинная зелёная.

### Разворотные (медвежьи):
- **Повешенный (Hanging Man)** — молот на вершине тренда.
- **Медвежье поглощение** — красная свеча поглощает предыдущую зелёную.
- **Вечерняя звезда** — три свечи: длинная зелёная, маленькая, длинная красная.

### Пин-бар
Свеча с очень длинной тенью и маленьким телом. Показывает отвержение уровня.

⚠️ Один паттерн — не гарантия. Всегда используйте подтверждение (объём, индикаторы, уровни).`,

          contentEn: `## Japanese Candlesticks

Each candle shows 4 prices per period: **Open, High, Low, Close (OHLC)**.

- 🟢 **Green candle** — Close > Open (rise)
- 🔴 **Red candle** — Close < Open (decline)
- **Body** — distance between Open and Close
- **Shadows (wicks)** — period high and low

## Key Patterns

### Bullish Reversals:
- **Hammer** — small body at top, long lower shadow. Reversal signal at bottom.
- **Bullish Engulfing** — green candle completely "engulfs" the previous red candle's body.
- **Morning Star** — three candles: long red, small (doji), long green.

### Bearish Reversals:
- **Hanging Man** — hammer at the top of a trend.
- **Bearish Engulfing** — red candle engulfs the previous green candle.
- **Evening Star** — three candles: long green, small, long red.

### Pin Bar
Candle with a very long shadow and small body. Shows level rejection.

⚠️ One pattern is not a guarantee. Always use confirmation (volume, indicators, levels).`,
          quiz: [
            {
              questionRu: 'Какой паттерн является бычьим разворотным?',
              questionEn: 'Which pattern is a bullish reversal?',
              optionsRu: ['Вечерняя звезда', 'Медвежье поглощение', 'Молот', 'Повешенный'],
              optionsEn: ['Evening Star', 'Bearish Engulfing', 'Hammer', 'Hanging Man'],
              correctIndices: [2],
              explanationRu: 'Молот (Hammer) — классический бычий разворотный паттерн, появляется на дне нисходящего тренда.',
              explanationEn: 'Hammer is a classic bullish reversal pattern that appears at the bottom of a downtrend.',
            },
          ],
        },
      ],
    },
  ];

  // Create modules and lessons
  for (const modData of modulesData) {
    const { lessons: lessonsData, ...moduleFields } = modData;
    
    const mod = await prisma.module.upsert({
      where: { slug: modData.slug },
      update: {},
      create: { ...moduleFields, courseId: course.id },
    });
    console.log(`  📦 Module: ${mod.titleRu}`);

    for (const lessonData of lessonsData) {
      const { quiz: quizData, ...lessonFields } = lessonData;

      const lesson = await prisma.lesson.upsert({
        where: { slug: lessonData.slug },
        update: {},
        create: { ...lessonFields, moduleId: mod.id },
      });
      console.log(`    📝 Lesson: ${lesson.titleRu}`);

      if (quizData && quizData.length > 0) {
        const quiz = await prisma.quiz.upsert({
          where: { lessonId: lesson.id },
          update: {},
          create: { lessonId: lesson.id, passingScore: 70 },
        });

        for (let qi = 0; qi < quizData.length; qi++) {
          await prisma.quizQuestion.create({
            data: { ...quizData[qi], quizId: quiz.id, order: qi + 1 },
          });
        }
        console.log(`    ✅ Quiz: ${quizData.length} questions`);
      }
    }
  }

  // Glossary terms
  const glossaryTerms = [
    { termRu: 'Инфляция', termEn: 'Inflation', definitionRu: 'Устойчивое повышение общего уровня цен на товары и услуги', definitionEn: 'Sustained increase in the general price level of goods and services', category: 'Макроэкономика', relatedLessonSlug: 'inflation-cb-rate' },
    { termRu: 'Ключевая ставка', termEn: 'Key Rate', definitionRu: 'Минимальный процент, под который ЦБ выдаёт кредиты коммерческим банкам', definitionEn: 'Minimum rate at which the Central Bank lends to commercial banks', category: 'Макроэкономика', relatedLessonSlug: 'inflation-cb-rate' },
    { termRu: 'ВВП', termEn: 'GDP', definitionRu: 'Суммарная стоимость всех товаров и услуг, произведённых в стране', definitionEn: 'Total value of all goods and services produced in a country', category: 'Макроэкономика', relatedLessonSlug: 'gdp-economic-cycles' },
    { termRu: 'Облигация', termEn: 'Bond', definitionRu: 'Долговая ценная бумага с фиксированным доходом (купоном)', definitionEn: 'Debt security with fixed income (coupon)', category: 'Облигации', relatedLessonSlug: 'what-are-bonds' },
    { termRu: 'ОФЗ', termEn: 'OFZ', definitionRu: 'Облигации федерального займа — государственные облигации РФ', definitionEn: 'Federal Loan Bonds — Russian government bonds', category: 'Облигации', relatedLessonSlug: 'what-are-bonds' },
    { termRu: 'Купон', termEn: 'Coupon', definitionRu: 'Периодическая процентная выплата по облигации', definitionEn: 'Periodic interest payment on a bond', category: 'Облигации', relatedLessonSlug: 'what-are-bonds' },
    { termRu: 'Номинал', termEn: 'Face Value', definitionRu: 'Сумма, выплачиваемая при погашении облигации', definitionEn: 'Amount paid at bond maturity', category: 'Облигации', relatedLessonSlug: 'what-are-bonds' },
    { termRu: 'Дюрация', termEn: 'Duration', definitionRu: 'Средневзвешенный срок до получения всех платежей по облигации', definitionEn: 'Weighted average time until all bond payments are received', category: 'Облигации', relatedLessonSlug: 'corporate-bonds-ratings' },
    { termRu: 'YTM', termEn: 'Yield to Maturity', definitionRu: 'Полная годовая доходность облигации при удержании до погашения', definitionEn: 'Total annual bond return if held to maturity', category: 'Облигации', relatedLessonSlug: 'bond-strategies' },
    { termRu: 'ETF', termEn: 'ETF', definitionRu: 'Биржевой инвестиционный фонд, акции которого торгуются на бирже', definitionEn: 'Exchange-Traded Fund whose shares are traded on the exchange', category: 'Фонды', relatedLessonSlug: 'etf-bpif-funds' },
    { termRu: 'БПИФ', termEn: 'BPIF', definitionRu: 'Биржевой паевой инвестиционный фонд — российский аналог ETF', definitionEn: 'Exchange-traded mutual fund — Russian analog of ETF', category: 'Фонды', relatedLessonSlug: 'etf-bpif-funds' },
    { termRu: 'Диверсификация', termEn: 'Diversification', definitionRu: 'Распределение инвестиций между различными активами для снижения риска', definitionEn: 'Distributing investments among various assets to reduce risk', category: 'Портфель', relatedLessonSlug: 'portfolio-construction' },
    { termRu: 'Сложный процент', termEn: 'Compound Interest', definitionRu: 'Начисление процентов на уже начисленные проценты', definitionEn: 'Interest calculated on previously accumulated interest', category: 'Портфель', relatedLessonSlug: 'portfolio-construction' },
    { termRu: 'Asset Allocation', termEn: 'Asset Allocation', definitionRu: 'Стратегия распределения капитала между разными классами активов', definitionEn: 'Strategy of distributing capital among different asset classes', category: 'Портфель', relatedLessonSlug: 'portfolio-construction' },
    { termRu: 'Акция', termEn: 'Stock', definitionRu: 'Ценная бумага, дающая долю в собственности компании', definitionEn: 'Security giving a share of company ownership', category: 'Трейдинг', relatedLessonSlug: 'stocks-long-short' },
    { termRu: 'Лонг', termEn: 'Long', definitionRu: 'Покупка актива в расчёте на рост цены', definitionEn: 'Buying an asset expecting price increase', category: 'Трейдинг', relatedLessonSlug: 'stocks-long-short' },
    { termRu: 'Шорт', termEn: 'Short', definitionRu: 'Продажа заёмного актива в расчёте на падение цены', definitionEn: 'Selling a borrowed asset expecting price decrease', category: 'Трейдинг', relatedLessonSlug: 'stocks-long-short' },
    { termRu: 'Маржинальная торговля', termEn: 'Margin Trading', definitionRu: 'Торговля с использованием заёмных средств брокера', definitionEn: 'Trading using borrowed broker funds', category: 'Трейдинг', relatedLessonSlug: 'stocks-long-short' },
    { termRu: 'Спред', termEn: 'Spread', definitionRu: 'Разница между лучшей ценой покупки (Bid) и продажи (Ask)', definitionEn: 'Difference between best bid and ask prices', category: 'Трейдинг', relatedLessonSlug: 'exchange-broker-orderbook' },
    { termRu: 'Стакан заявок', termEn: 'Order Book', definitionRu: 'Таблица всех текущих заявок на покупку и продажу актива', definitionEn: 'Table of all current buy and sell orders for an asset', category: 'Трейдинг', relatedLessonSlug: 'exchange-broker-orderbook' },
    { termRu: 'Стоп-лосс', termEn: 'Stop Loss', definitionRu: 'Ордер на автоматическую продажу для ограничения убытков', definitionEn: 'Order for automatic sale to limit losses', category: 'Трейдинг', relatedLessonSlug: 'exchange-broker-orderbook' },
    { termRu: 'Тейк-профит', termEn: 'Take Profit', definitionRu: 'Ордер на автоматическую продажу при достижении целевой прибыли', definitionEn: 'Order for automatic sale when target profit is reached', category: 'Трейдинг', relatedLessonSlug: 'exchange-broker-orderbook' },
    { termRu: 'P/E', termEn: 'P/E Ratio', definitionRu: 'Отношение цены акции к прибыли на акцию — показывает «дороговизну» акции', definitionEn: 'Price to Earnings ratio — shows how expensive a stock is', category: 'Анализ', relatedLessonSlug: 'valuation-multiples' },
    { termRu: 'EV/EBITDA', termEn: 'EV/EBITDA', definitionRu: 'Отношение стоимости компании к прибыли до налогов и амортизации', definitionEn: 'Enterprise Value to EBITDA ratio', category: 'Анализ', relatedLessonSlug: 'valuation-multiples' },
    { termRu: 'ROE', termEn: 'ROE', definitionRu: 'Рентабельность собственного капитала — показывает эффективность', definitionEn: 'Return on Equity — shows capital efficiency', category: 'Анализ', relatedLessonSlug: 'valuation-multiples' },
    { termRu: 'EBITDA', termEn: 'EBITDA', definitionRu: 'Прибыль до вычета процентов, налогов, износа и амортизации', definitionEn: 'Earnings Before Interest, Taxes, Depreciation, and Amortization', category: 'Анализ', relatedLessonSlug: 'ifrs-reporting' },
    { termRu: 'Дивиденды', termEn: 'Dividends', definitionRu: 'Часть прибыли компании, выплачиваемая акционерам', definitionEn: 'Portion of company profits paid to shareholders', category: 'Анализ', relatedLessonSlug: 'dividend-policy' },
    { termRu: 'Тренд', termEn: 'Trend', definitionRu: 'Общее направление движения цены актива', definitionEn: 'General direction of asset price movement', category: 'Теханализ', relatedLessonSlug: 'trends-support-resistance' },
    { termRu: 'Поддержка', termEn: 'Support', definitionRu: 'Ценовой уровень, от которого цена отталкивается вверх', definitionEn: 'Price level where price bounces up', category: 'Теханализ', relatedLessonSlug: 'trends-support-resistance' },
    { termRu: 'Сопротивление', termEn: 'Resistance', definitionRu: 'Ценовой уровень, от которого цена отталкивается вниз', definitionEn: 'Price level where price bounces down', category: 'Теханализ', relatedLessonSlug: 'trends-support-resistance' },
    { termRu: 'RSI', termEn: 'RSI', definitionRu: 'Индекс относительной силы — показывает перекупленность/перепроданность (0-100)', definitionEn: 'Relative Strength Index — shows overbought/oversold conditions (0-100)', category: 'Теханализ', relatedLessonSlug: 'indicators-ma-rsi-macd' },
    { termRu: 'MACD', termEn: 'MACD', definitionRu: 'Схождение/расхождение скользящих средних — индикатор импульса', definitionEn: 'Moving Average Convergence Divergence — momentum indicator', category: 'Теханализ', relatedLessonSlug: 'indicators-ma-rsi-macd' },
    { termRu: 'Скользящая средняя', termEn: 'Moving Average', definitionRu: 'Усреднённая цена за последние N периодов, сглаживает колебания', definitionEn: 'Averaged price over the last N periods, smooths fluctuations', category: 'Теханализ', relatedLessonSlug: 'indicators-ma-rsi-macd' },
    { termRu: 'Японская свеча', termEn: 'Candlestick', definitionRu: 'Графическое представление цены за период (Open, High, Low, Close)', definitionEn: 'Graphical price representation for a period (Open, High, Low, Close)', category: 'Теханализ', relatedLessonSlug: 'candlestick-patterns' },
    { termRu: 'Пин-бар', termEn: 'Pin Bar', definitionRu: 'Свеча с длинной тенью и коротким телом — сигнал отвержения уровня', definitionEn: 'Candle with long shadow and small body — level rejection signal', category: 'Теханализ', relatedLessonSlug: 'candlestick-patterns' },
    { termRu: 'Молот', termEn: 'Hammer', definitionRu: 'Бычий разворотный паттерн — маленькое тело вверху, длинная нижняя тень', definitionEn: 'Bullish reversal pattern — small body at top, long lower shadow', category: 'Теханализ', relatedLessonSlug: 'candlestick-patterns' },
    { termRu: 'Бычий рынок', termEn: 'Bull Market', definitionRu: 'Рынок с устойчивым ростом цен', definitionEn: 'Market with sustained price growth', category: 'Общее' },
    { termRu: 'Медвежий рынок', termEn: 'Bear Market', definitionRu: 'Рынок с устойчивым падением цен (обычно -20% от максимума)', definitionEn: 'Market with sustained price decline (usually -20% from peak)', category: 'Общее' },
    { termRu: 'Волатильность', termEn: 'Volatility', definitionRu: 'Мера колебаний цены актива — чем выше, тем рискованнее', definitionEn: 'Measure of asset price fluctuations — higher means riskier', category: 'Общее' },
    { termRu: 'Ликвидность', termEn: 'Liquidity', definitionRu: 'Способность быстро купить/продать актив без значительного изменения цены', definitionEn: 'Ability to quickly buy/sell an asset without significant price change', category: 'Общее' },
    { termRu: 'Капитализация', termEn: 'Market Cap', definitionRu: 'Рыночная стоимость компании = цена акции × количество акций', definitionEn: 'Market value of company = share price × number of shares', category: 'Общее' },
    { termRu: 'Рецессия', termEn: 'Recession', definitionRu: 'Снижение ВВП в течение 2+ кварталов подряд', definitionEn: 'GDP decline for 2+ consecutive quarters', category: 'Макроэкономика', relatedLessonSlug: 'gdp-economic-cycles' },
    { termRu: 'PMI', termEn: 'PMI', definitionRu: 'Индекс деловой активности — выше 50 = рост, ниже 50 = спад', definitionEn: 'Purchasing Managers Index — above 50 = growth, below 50 = contraction', category: 'Макроэкономика', relatedLessonSlug: 'gdp-economic-cycles' },
    { termRu: 'Кредитный рейтинг', termEn: 'Credit Rating', definitionRu: 'Оценка надёжности эмитента рейтинговым агентством (AAA, AA, A, BBB...)', definitionEn: 'Rating agency assessment of issuer reliability (AAA, AA, A, BBB...)', category: 'Облигации', relatedLessonSlug: 'corporate-bonds-ratings' },
    { termRu: 'Брокер', termEn: 'Broker', definitionRu: 'Посредник между инвестором и биржей, предоставляющий доступ к торгам', definitionEn: 'Intermediary between investor and exchange providing trading access', category: 'Трейдинг', relatedLessonSlug: 'exchange-broker-orderbook' },
    { termRu: 'Лимитный ордер', termEn: 'Limit Order', definitionRu: 'Заявка на покупку/продажу только по указанной цене или лучше', definitionEn: 'Order to buy/sell only at specified price or better', category: 'Трейдинг', relatedLessonSlug: 'exchange-broker-orderbook' },
    { termRu: 'Рыночный ордер', termEn: 'Market Order', definitionRu: 'Заявка на немедленную покупку/продажу по лучшей доступной цене', definitionEn: 'Order for immediate buy/sell at best available price', category: 'Трейдинг', relatedLessonSlug: 'exchange-broker-orderbook' },
    { termRu: 'Дивидендная доходность', termEn: 'Dividend Yield', definitionRu: 'Отношение годового дивиденда к текущей цене акции в процентах', definitionEn: 'Ratio of annual dividend to current share price in percent', category: 'Анализ', relatedLessonSlug: 'dividend-policy' },
    { termRu: 'Payout Ratio', termEn: 'Payout Ratio', definitionRu: 'Доля чистой прибыли, направляемая на дивиденды', definitionEn: 'Share of net income allocated to dividends', category: 'Анализ', relatedLessonSlug: 'dividend-policy' },
    { termRu: 'Золотой крест', termEn: 'Golden Cross', definitionRu: 'Пересечение быстрой скользящей средней медленной снизу вверх — бычий сигнал', definitionEn: 'Fast moving average crossing above slow moving average — bullish signal', category: 'Теханализ', relatedLessonSlug: 'indicators-ma-rsi-macd' },
  ];

  for (const term of glossaryTerms) {
    await prisma.glossaryTerm.upsert({
      where: { termRu: term.termRu },
      update: {},
      create: term,
    });
  }
  console.log(`✅ Glossary: ${glossaryTerms.length} terms created`);

  console.log('\n🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
