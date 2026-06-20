'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { getDramas } from '@/lib/data'
import { supabase } from '@/lib/supabase'
import { Drama } from '@/types/drama'
import { cn } from '@/lib/utils'

const emptyForm = {
  title: '',
  description: '',
  genre: 'romantik',
  country: 'Kore',
  year: 2024,
  rating: 8.0,
  total_episodes: 16,
  badge: '',
  emoji: '🎬',
  bg_gradient: 'linear-gradient(135deg, #1a0533, #2d1b69)',
}

export default function AdminPage() {
  const [dramas, setDramas] = useState<Drama[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadDramas()
  }, [])

  async function loadDramas() {
    setLoading(true)
    const data = await getDramas()
    setDramas(data)
    setLoading(false)
  }

  function openAdd() {
    setForm(emptyForm)
    setEditId(null)
    setShowForm(true)
  }

  function openEdit(drama: Drama) {
    setForm({
      title: drama.title,
      description: drama.description || '',
      genre: drama.genre,
      country: drama.country,
      year: drama.year,
      rating: drama.rating,
      total_episodes: drama.totalEpisodes,
      badge: drama.badge || '',
      emoji: drama.emoji || '🎬',
      bg_gradient: drama.bgGradient || '',
    })
    setEditId(drama.id)
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    if (editId) {
      await supabase.from('dramas').update(form).eq('id', editId)
    } else {
      await supabase.from('dramas').insert(form)
    }
    setSaving(false)
    setShowForm(false)
    loadDramas()
  }

  async function handleDelete(id: number) {
    if (!confirm('Bu diziyi silmek istediğine emin misin?')) return
    await supabase.from('dramas').delete().eq('id', id)
    loadDramas()
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Başlık */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black" style={{ color: 'var(--text)' }}>
            🎬 Admin Paneli
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            {dramas.length} dizi
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-black text-sm"
          style={{ background: 'var(--accent)' }}>
          <Plus size={16} />
          Yeni Dizi Ekle
        </button>
      </div>

      {/* Dizi listesi */}
      {loading ? (
        <div className="text-center py-20" style={{ color: 'var(--muted)' }}>
          Yükleniyor...
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {dramas.map((drama) => (
            <div key={drama.id}
              className="flex items-center gap-4 p-4 rounded-xl border"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>

              {/* Poster */}
              <div className="w-12 h-16 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: drama.bgGradient }}>
                {drama.emoji}
              </div>

              {/* Bilgiler */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate" style={{ color: 'var(--text)' }}>
                  {drama.title}
                </div>
                <div className="text-xs mt-1 flex gap-3" style={{ color: 'var(--muted)' }}>
                  <span>★ {drama.rating}</span>
                  <span>{drama.country}</span>
                  <span>{drama.genre}</span>
                  <span>{drama.totalEpisodes} bölüm</span>
                  {drama.badge && (
                    <span className="px-1.5 py-0.5 rounded text-xs"
                      style={{ background: 'var(--surface)' }}>
                      {drama.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Aksiyon butonları */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(drama)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors hover:bg-white/10"
                  style={{ borderColor: 'var(--border)' }}>
                  <Pencil size={14} style={{ color: 'var(--muted)' }} />
                </button>
                <button
                  onClick={() => handleDelete(drama.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors hover:bg-red-500/20"
                  style={{ borderColor: 'var(--border)' }}>
                  <Trash2 size={14} color="#e24b4a" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowForm(false)}>
          <div
            className="w-full max-w-lg rounded-2xl border max-h-[90vh] overflow-y-auto"
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b"
              style={{ borderColor: 'var(--border)' }}>
              <h2 className="font-bold" style={{ color: 'var(--text)' }}>
                {editId ? 'Diziyi Düzenle' : 'Yeni Dizi Ekle'}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X size={18} style={{ color: 'var(--muted)' }} />
              </button>
            </div>

            {/* Form alanları */}
            <div className="p-5 flex flex-col gap-4">

              {[
                { label: 'Başlık', key: 'title', type: 'text' },
                { label: 'Emoji', key: 'emoji', type: 'text' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="text-xs font-semibold block mb-1"
                    style={{ color: 'var(--muted)' }}>{label}</label>
                  <input
                    type={type}
                    value={(form as any)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
                  />
                </div>
              ))}

              <div>
                <label className="text-xs font-semibold block mb-1"
                  style={{ color: 'var(--muted)' }}>Açıklama</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none resize-none"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="genre" className="text-xs font-semibold block mb-1"
                    style={{ color: 'var(--muted)' }}>Tür</label>
                  <select
                    id="genre"
                    value={form.genre}
                    onChange={(e) => setForm({ ...form, genre: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                    {['romantik','tarihi','aksiyonlu','komedi','gerilim','fantastik','dram'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="country" className="text-xs font-semibold block mb-1"
                    style={{ color: 'var(--muted)' }}>Ülke</label>
                  <select
                    id="country"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                    {['Kore','Türkiye','Çin','Japonya'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold block mb-1"
                    style={{ color: 'var(--muted)' }}>Yıl</label>
                  <input type="number"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1"
                    style={{ color: 'var(--muted)' }}>Puan</label>
                  <input type="number" step="0.1" min="0" max="10"
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1"
                    style={{ color: 'var(--muted)' }}>Bölüm</label>
                  <input type="number"
                    value={form.total_episodes}
                    onChange={(e) => setForm({ ...form, total_episodes: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="badge" className="text-xs font-semibold block mb-1"
                  style={{ color: 'var(--muted)' }}>Rozet</label>
                <select
                  id="badge"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                  <option value="">Yok</option>
                  <option value="new">Yeni</option>
                  <option value="hot">Hot</option>
                  <option value="free">Ücretsiz</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1"
                  style={{ color: 'var(--muted)' }}>Arka Plan Gradient</label>
                <input type="text"
                  value={form.bg_gradient}
                  onChange={(e) => setForm({ ...form, bg_gradient: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
                />
                <div className="h-8 rounded-lg mt-2" style={{ background: form.bg_gradient }} />
              </div>

              {/* Kaydet butonu */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full py-2.5 rounded-lg font-bold text-black text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: 'var(--accent)' }}>
                <Check size={16} />
                {saving ? 'Kaydediliyor...' : editId ? 'Güncelle' : 'Ekle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}