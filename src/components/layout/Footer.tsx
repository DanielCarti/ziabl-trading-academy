import { TrendingUp } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-surface border-t border-surface-border mt-auto">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-accent" />
              <span className="text-lg font-bold gradient-text">ZIABL</span>
              <span className="text-sm text-text-secondary">Trade Academy</span>
            </div>
            <p className="text-sm text-text-secondary max-w-xs">
              Бесплатная образовательная платформа для обучения трейдингу и инвестициям.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Навигация</h4>
            <div className="space-y-2">
              {[
                { label: 'Курсы', href: '/ru/courses' },
                { label: 'Симулятор', href: '/ru/simulator' },
                { label: 'Глоссарий', href: '/ru/glossary' },
                { label: 'Калькуляторы', href: '/ru/calculators' },
              ].map((link) => (
                <a key={link.href} href={link.href} className="block text-sm text-text-secondary hover:text-accent transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Информация</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Материалы платформы носят образовательный характер и не являются инвестиционной рекомендацией. 
              Торговля на финансовых рынках связана с риском потери капитала.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-surface-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © {year} Ziabl Trade Academy. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-text-muted">v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
