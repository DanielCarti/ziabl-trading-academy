'use client';

import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  KeyRound,
  Mail,
  Plus,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

interface WhitelistItem {
  id: string;
  email: string;
  note: string | null;
  createdAt: string;
}

interface InviteItem {
  id: string;
  code: string;
  note: string | null;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminAccessPage() {
  const [whitelist, setWhitelist] = useState<WhitelistItem[]>([]);
  const [invites, setInvites] = useState<InviteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState('');
  const [emailNote, setEmailNote] = useState('');
  const [addingEmail, setAddingEmail] = useState(false);

  const [newCode, setNewCode] = useState('');
  const [inviteNote, setInviteNote] = useState('');
  const [maxUses, setMaxUses] = useState('1');
  const [creatingInvite, setCreatingInvite] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/admin/access');
      if (!res.ok) throw new Error('Ошибка загрузки данных');
      const data = await res.json();
      setWhitelist(data.whitelist || []);
      setInvites(data.invites || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    setAddingEmail(true);
    setError('');

    try {
      const res = await fetch('/api/admin/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_email',
          email: newEmail,
          note: emailNote,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Не удалось добавить email');

      setNewEmail('');
      setEmailNote('');
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAddingEmail(false);
    }
  };

  const handleCreateInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    setCreatingInvite(true);
    setError('');

    try {
      const res = await fetch('/api/admin/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_invite',
          code: newCode,
          note: inviteNote,
          maxUses: parseInt(maxUses, 10) || 1,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Не удалось создать инвайт');

      setNewCode('');
      setInviteNote('');
      setMaxUses('1');
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCreatingInvite(false);
    }
  };

  const handleDelete = async (type: 'whitelist' | 'invite', id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту запись?')) return;
    try {
      const res = await fetch(`/api/admin/access?type=${type}&id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Ошибка удаления');
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggleInvite = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_invite',
          id,
          isActive: !currentStatus,
        }),
      });
      if (!res.ok) throw new Error('Ошибка обновления статуса');
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = 'ZIABL-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCode(result);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-accent" />
            Управление доступом и инвайтами
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Белый список доверенных email (для OAuth Google / Yandex / GitHub) и коды приглашений для закрытого пет-проекта
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="btn-secondary flex items-center gap-2 self-start"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Обновить
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Whitelist Card */}
        <div className="card space-y-6">
          <div className="flex items-center justify-between border-b border-surface-border pb-4">
            <div className="flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-bold">Whitelist Email ({whitelist.length})</h2>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent font-medium">OAuth & Регистрация</span>
          </div>

          <form onSubmit={handleAddEmail} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                placeholder="friend@gmail.com"
                className="input-field flex-1 text-sm"
              />
              <button
                type="submit"
                disabled={addingEmail}
                className="btn-primary flex items-center gap-1.5 px-4 text-sm whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                {addingEmail ? '...' : 'Добавить'}
              </button>
            </div>
            <input
              type="text"
              value={emailNote}
              onChange={(e) => setEmailNote(e.target.value)}
              placeholder="Заметка (например: Друг Тимур, тестировщик)"
              className="input-field text-xs text-text-secondary"
            />
          </form>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {loading && whitelist.length === 0 ? (
              <div className="text-center py-8 text-sm text-text-muted">Загрузка списка...</div>
            ) : whitelist.length === 0 ? (
              <div className="text-center py-8 text-sm text-text-muted">
                В базе пока нет добавленных email. (Также действует резервный список из .env)
              </div>
            ) : (
              whitelist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-light border border-surface-border/50 hover:border-accent/30 transition-all text-sm"
                >
                  <div className="min-w-0 pr-3">
                    <p className="font-semibold text-text-primary truncate">{item.email}</p>
                    {item.note && <p className="text-xs text-text-secondary truncate mt-0.5">{item.note}</p>}
                    <p className="text-[10px] text-text-muted mt-1">
                      {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete('whitelist', item.id)}
                    className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
                    title="Удалить из списка"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Invites Card */}
        <div className="card space-y-6">
          <div className="flex items-center justify-between border-b border-surface-border pb-4">
            <div className="flex items-center gap-2.5">
              <KeyRound className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-bold">Инвайт-коды ({invites.length})</h2>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent font-medium">Закрытая регистрация</span>
          </div>

          <form onSubmit={handleCreateInvite} className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  required
                  placeholder="ZIABL-..."
                  className="input-field uppercase font-mono tracking-wider text-sm pr-24"
                />
                <button
                  type="button"
                  onClick={generateRandomCode}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-surface border border-surface-border text-[11px] text-accent hover:border-accent"
                >
                  Сгенерировать
                </button>
              </div>
              <div className="w-24">
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={maxUses}
                  onChange={(e) => setMaxUses(e.target.value)}
                  placeholder="Лимит"
                  title="Максимальное количество использований"
                  className="input-field text-sm text-center"
                />
              </div>
              <button
                type="submit"
                disabled={creatingInvite}
                className="btn-primary flex items-center gap-1.5 px-4 text-sm whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                {creatingInvite ? '...' : 'Создать'}
              </button>
            </div>
            <input
              type="text"
              value={inviteNote}
              onChange={(e) => setInviteNote(e.target.value)}
              placeholder="Для кого код (например: Для коллег из трейдинг-чата)"
              className="input-field text-xs text-text-secondary"
            />
          </form>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {loading && invites.length === 0 ? (
              <div className="text-center py-8 text-sm text-text-muted">Загрузка инвайтов...</div>
            ) : invites.length === 0 ? (
              <div className="text-center py-8 text-sm text-text-muted">
                Активных кодов пока нет. Создайте первый код выше!
              </div>
            ) : (
              invites.map((item) => {
                const isExhausted = item.usedCount >= item.maxUses;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl bg-surface-light border transition-all text-sm ${
                      !item.isActive || isExhausted
                        ? 'opacity-60 border-surface-border/30'
                        : 'border-surface-border/60 hover:border-accent/40'
                    }`}
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold tracking-wider text-accent text-sm">
                          {item.code}
                        </span>
                        <button
                          onClick={() => copyToClipboard(item.code, item.id)}
                          className="p-1 rounded hover:bg-surface text-text-muted hover:text-text-primary"
                          title="Скопировать код"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-accent" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                            isExhausted
                              ? 'bg-danger/10 text-danger'
                              : 'bg-accent/10 text-accent'
                          }`}
                        >
                          {item.usedCount} / {item.maxUses} исп.
                        </span>
                      </div>
                      {item.note && <p className="text-xs text-text-secondary truncate mt-0.5">{item.note}</p>}
                      <p className="text-[10px] text-text-muted mt-1">
                        Создан {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleInvite(item.id, item.isActive)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          item.isActive ? 'text-accent hover:bg-accent/10' : 'text-text-muted hover:bg-surface'
                        }`}
                        title={item.isActive ? 'Деактивировать код' : 'Активировать код'}
                      >
                        {item.isActive ? (
                          <ToggleRight className="w-5 h-5" />
                        ) : (
                          <ToggleLeft className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete('invite', item.id)}
                        className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
                        title="Удалить инвайт"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
