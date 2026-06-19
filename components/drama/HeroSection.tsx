'use client'

import { Play, Plus, Check } from 'lucide-react'
import { Drama } from '@/types/drama'
import { useStore } from '@/lib/store'
import { getRatingColor } from '@/lib/utils'

interface Props {
  drama: Drama
}

export default function HeroSection({ drama }: Props) {
  const { openModal, isInWatchList, addToWatchList, removeFromWatchList } = useStore()
  const inList = isInWatchList(drama.id)

  return (
    <div className="relative overflow-hidden" style={{ height: '520px' }}>

      {/* Arka plan */}
      <div className="absolute inset-0" style={{ background: drama.bgGradient }} />

      {/* Koyu overlay */}
      <div className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(10,10,15,0.92) 40%, transparent 80%), linear-gradient(to top, rgba(10,10,15,0.85) 0%, transparent 50%)',
        }}
      />

      {/* İçerik */}
      <div className="relative z-10 flex items-center h-full px-8 max-w-7xl mx-auto">
        <div className="max-w-xl">

          {/* Öne çıkan rozet */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 border"
            style={{
              background: 'rgba(201,162,39,0.15)',
              borderColor: 'rgba(201,162,39,0.3)',
              color: 'var(--accent)',
            }}>
            ▶ ÖNE ÇIKAN SERİ
          </div>

          {/* Başlık */}
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-3"
            style={{ color: 'var(--text)' }}>
            {drama.title}
          </h1>

          {/* Meta bilgiler */}
          <div className="flex items-center gap-3 mb-4 text-sm flex-wrap">
            <span className={`font-bold text-base ${getRatingColor(drama.rating)}`}>
              ★ {drama.rating}
            </span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>{drama.year}</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span className="px-2 py-0.5 rounded text-xs"
              style={{ background: 'var(--surface)', color: 'var(--muted)' }}>
              {drama.totalEpisodes} Bölüm
            </span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>{drama.country}</span>
          </div>

          {/* Açıklama */}
          <p className="text-sm leading-relaxed mb-6 max-w-md"
            style={{ color: '#b0b0c0' }}>
            {drama.description}
          </p>

          {/* Butonlar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal(drama)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-black text-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              <Play size={16} fill="black" color="black" />
              Şimdi İzle
            </button>

            <button
              onClick={() => inList ? removeFromWatchList(drama.id) : addToWatchList(drama.id)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm border transition-colors hover:bg-white/10"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--text)' }}
            >
              {inList ? <Check size={16} /> : <Plus size={16} />}
              {inList ? 'Listede' : 'Listem'}
            </button>
          </div>
        </div>

        {/* Sağdaki poster kartı */}
        <div className="hidden lg:block absolute right-24 top-1/2 -translate-y-1/2">
          <div
            className="w-48 rounded-xl overflow-hidden border-2 flex items-center justify-center text-6xl cursor-pointer hover:scale-105 transition-transform"
            style={{
              height: '272px',
              borderColor: 'rgba(255,255,255,0.1)',
              background: drama.bgGradient,
            }}
            onClick={() => openModal(drama)}
          >
            {drama.emoji}
          </div>
        </div>
      </div>
    </div>
  )
}