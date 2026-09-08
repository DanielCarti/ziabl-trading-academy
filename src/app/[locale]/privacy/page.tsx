'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Shield, AlertTriangle, Database, Lock, Eye, FileText, Scale } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const locale = useLocale();
  const isRu = locale === 'ru';

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-text-primary">
      {/* Header */}
      <div className="mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider">
          <Shield className="w-4 h-4" />
          {isRu ? '152-ФЗ РФ & Безопасность' : 'Privacy Policy & Compliance'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {isRu ? 'Политика обработки персональных данных' : 'Privacy and Personal Data Policy'}
        </h1>
        <p className="text-sm text-text-muted">
          {isRu ? 'Редакция от 8 сентября 2024 г. Действует бессрочно до замены новой версией' : 'Effective date: September 8, 2024. In effect until superseded'}
        </p>
      </div>

      {/* Critical Legal Disclaimer: Not Investment Advice & Virtual Simulator */}
      <div className="mb-8 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1.5 text-sm">
          <h3 className="font-bold text-amber-500">
            {isRu ? 'Важное правовое уведомление (Дисклеймер о рисках)' : 'Important Risk Disclaimer'}
          </h3>
          <p className="text-text-secondary leading-relaxed text-xs sm:text-sm">
            {isRu ? (
              <>
                Платформа <strong>«Ziabl Trade Academy»</strong> является исключительно образовательным и исследовательским проектом. Все материалы сайта и учебные курсы носят сугубо ознакомительный характер и <strong>не являются индивидуальной инвестиционной рекомендацией</strong> (в смысле ст. 6.1 и 6.2 Федерального закона от 22.04.1996 № 39-ФЗ «О рынке ценных бумаг»). Все торговые операции в разделе «Симулятор» проводятся исключительно на виртуальные условные единицы и не влекут реальных финансовых обязательств.
              </>
            ) : (
              <>
                The <strong>Ziabl Trade Academy</strong> platform is strictly an educational and training simulation project. None of the educational materials represent financial or investment advice. All trading in the Simulator module is conducted solely using virtual demo currency.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Main Document Body */}
      <div className="space-y-8 text-sm leading-relaxed text-text-secondary bg-surface p-6 sm:p-10 rounded-2xl border border-surface-border shadow-sm">
        {/* Section 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-text-primary font-bold text-base">
            <FileText className="w-5 h-5 text-accent" />
            <h2>{isRu ? '1. Общие положения' : '1. General Provisions'}</h2>
          </div>
          <p>
            {isRu ? (
              <>
                1.1. Настоящая Политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок сбора, обработки, хранения и защиты персональных данных пользователей веб-платформы Ziabl Trade Academy (далее — «Платформа», «Оператор»).
              </>
            ) : (
              <>
                1.1. This Privacy Policy governs the collection, storage, and processing of personal data on the Ziabl Trade Academy platform in accordance with applicable personal data protection laws.
              </>
            )}
          </p>
          <p>
            {isRu ? (
              <>
                1.2. Использование сервисов Платформы, регистрация аккаунта или продолжение навигации означает полное и безоговорочное согласие Пользователя с настоящей Политикой и условиями обработки его данных.
              </>
            ) : (
              <>
                1.2. Using the Platform or registering an account constitutes full acceptance of this Privacy Policy and consent to data processing.
              </>
            )}
          </p>
        </section>

        <hr className="border-surface-border" />

        {/* Section 2 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-text-primary font-bold text-base">
            <Eye className="w-5 h-5 text-accent" />
            <h2>{isRu ? '2. Состав и категории собираемых данных' : '2. Categories of Data Collected'}</h2>
          </div>
          <p>
            {isRu ? 'Платформа осуществляет сбор только минимально необходимого объёма данных для обеспечения образовательного процесса:' : 'We collect only the minimum data required to provide educational services:'}
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>{isRu ? 'Учётные данные:' : 'Account credentials:'}</strong> {isRu ? 'адрес электронной почты (Email), отображаемое имя (псевдоним), криптографический хэш пароля (пароли в открытом виде никогда не сохраняются).' : 'Email address, display name / alias, password hash (passwords are never stored in plain text).'}
            </li>
            <li>
              <strong>{isRu ? 'Данные OAuth-авторизации:' : 'OAuth authorization data:'}</strong> {isRu ? 'при входе через Яндекс, Google или GitHub передаются идентификатор аккаунта провайдера, публичное имя и ссылка на аватар.' : 'Provider account ID, public username, and avatar URL upon OAuth login.'}
            </li>
            <li>
              <strong>{isRu ? 'Данные образовательного прогресса:' : 'Progress and simulation metrics:'}</strong> {isRu ? 'информация о пройденных уроках, результатах тестирования, виртуальный баланс и история учебных сделок в симуляторе.' : 'Completed lessons, quiz scores, virtual portfolio balance, and simulation order history.'}
            </li>
            <li>
              <strong>{isRu ? 'Технические данные (Cookies, LocalStorage):' : 'Technical data (Cookies & LocalStorage):'}</strong> {isRu ? 'выбранная языковая локаль (RU/EN), выбранная цветовая тема, часовой пояс пользователя, настройки отображения виджетов шапки и токены сессии NextAuth.' : 'Theme preference, timezone, UI widget toggles, and session authentication tokens.'}
            </li>
          </ul>
        </section>

        <hr className="border-surface-border" />

        {/* Section 3 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-text-primary font-bold text-base">
            <Database className="w-5 h-5 text-accent" />
            <h2>{isRu ? '3. Локализация и порядок хранения данных (152-ФЗ)' : '3. Data Storage & Localization'}</h2>
          </div>
          <p>
            {isRu ? (
              <>
                3.1. В строгом соответствии с частью 5 статьи 18 Федерального закона № 152-ФЗ «О персональных данных», хранение, запись, систематизация и накопление персональных данных граждан Российской Федерации осуществляются с использованием баз данных и серверов, <strong>физически расположенных на территории Российской Федерации</strong>.
              </>
            ) : (
              <>
                3.1. All primary database operations, persistence, and storage for Russian citizens are carried out on servers and infrastructure compliant with localized data requirements.
              </>
            )}
          </p>
          <p>
            {isRu ? (
              <>
                3.2. Оператор применяет современные технические и организационные средства защиты: протоколы шифрования HTTPS (TLS 1.3), стойкое хэширование паролей алгоритмом bcrypt, разделение прав доступа (RBAC), опциональную двухфакторную аутентификацию (2FA RFC 6238 TOTP).
              </>
            ) : (
              <>
                3.2. Data protection mechanisms include HTTPS / TLS encryption, bcrypt hashing, role-based access control, and optional 2FA TOTP authentication.
              </>
            )}
          </p>
        </section>

        <hr className="border-surface-border" />

        {/* Section 4 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-text-primary font-bold text-base">
            <Lock className="w-5 h-5 text-accent" />
            <h2>{isRu ? '4. Файлы Cookie и аналитика' : '4. Cookies and Web Storage'}</h2>
          </div>
          <p>
            {isRu ? (
              <>
                Платформа использует сессионные файлы cookie для авторизации и локальное хранилище браузера (LocalStorage) для сохранения пользовательских настроек (тема, виджеты, часовой пояс). Пользователь может в любой момент очистить или заблокировать cookie в настройках своего браузера, однако это может ограничить функционал автоматического входа.
              </>
            ) : (
              <>
                The platform utilizes session cookies for authentication and browser LocalStorage for UI preference persistence. Users may clear cookies at any time via browser settings.
              </>
            )}
          </p>
        </section>

        <hr className="border-surface-border" />

        {/* Section 5 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2.5 text-text-primary font-bold text-base">
            <Scale className="w-5 h-5 text-accent" />
            <h2>{isRu ? '5. Права пользователя и отзыв согласия (Право на забвение)' : '5. User Rights and Data Deletion'}</h2>
          </div>
          <p>
            {isRu ? (
              <>
                Пользователь имеет право в любой момент:
              </>
            ) : (
              <>
                Users retain full rights to:
              </>
            )}
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>{isRu ? 'Получить сведения об объёме и составе своих персональных данных;' : 'Request information regarding their stored personal data;'}</li>
            <li>{isRu ? 'Изменить свои данные (имя, аватар, часовой пояс, пароль) в личном кабинете;' : 'Update their profile details directly in settings;'}</li>
            <li>{isRu ? 'Отозвать согласие на обработку данных и запросить полное удаление своего аккаунта и связанной истории из базы данных.' : 'Revoke consent and request permanent account & data deletion.'}</li>
          </ul>
          <p className="pt-2 text-xs text-text-muted">
            {isRu ? (
              <>
                Для реализации права на отзыв согласия или удаление аккаунта обратитесь по электронной почте службы поддержки:{' '}
                <a href="mailto:support@ziabl.ru" className="text-accent underline">support@ziabl.ru</a>.
              </>
            ) : (
              <>
                For deletion requests, please contact our support team at{' '}
                <a href="mailto:support@ziabl.ru" className="text-accent underline">support@ziabl.ru</a>.
              </>
            )}
          </p>
        </section>
      </div>

      <div className="mt-8 text-center">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors"
        >
          ← {isRu ? 'Вернуться на главную' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}
