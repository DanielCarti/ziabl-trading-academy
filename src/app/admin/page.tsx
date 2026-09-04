'use client';

import { useState, useEffect } from 'react';
import { Users, BookOpen, HelpCircle, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, lessons: 0, quizzes: 0, terms: 0 });

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  const cards = [
    { label: 'Пользователей', value: stats.users, icon: Users, color: 'text-accent' },
    { label: 'Уроков', value: stats.lessons, icon: BookOpen, color: 'text-chart-blue' },
    { label: 'Квизов', value: stats.quizzes, icon: HelpCircle, color: 'text-chart-purple' },
    { label: 'Терминов', value: stats.terms, icon: TrendingUp, color: 'text-chart-yellow' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-8">Дашборд</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">{card.label}</p>
                <p className="text-3xl font-bold text-text-primary mt-1 font-mono">{card.value}</p>
              </div>
              <card.icon className={`w-8 h-8 ${card.color} opacity-50`} />
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="/admin/lessons" className="btn-secondary">📝 Управление уроками</a>
          <a href="/admin/glossary" className="btn-secondary">📖 Управление глоссарием</a>
          <a href="/admin/quizzes" className="btn-secondary">❓ Управление квизами</a>
        </div>
      </div>
    </div>
  );
}
