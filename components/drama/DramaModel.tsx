'use client'

import { useEffect } from 'react'
import { X, Play, Plus, Check, Star, Lock } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getBadgeLabel, getBadgeStyle, getRatingColor, cn } from '@/lib/utils'
import './DramaModel.css'

export default function DramaModal() {
  const { selectedDrama, closeModal, isInWatchList, addToWatchList, removeFromWatchList, isPremium } = useStore()

  // ESC ile kapat
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeModal])

  // Scroll kilitle
  useEffect(() => {
    if (selectedDrama) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedDrama])

  if (!selectedDrama) return null

  const inList = isInWatchList(selectedDrama.id)
  const freeEpisodes = selectedDrama.badge === 'free' ? selectedDrama.totalEpisodes : 3

  // Örnek bölüm başlıkları
  const episodeTitles = [
    'Kaderin Çizdiği Yol', 'İlk Karşılaşma', 'Sırların Gölgesi',
    'Yasak Arzu', 'Geri Dönüş', 'Kırık Kalpler', 'İntikam Saati',
    'Yeni Başlangıçlar', 'Fırtına Öncesi', 'Son Hamle',
  ]

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        onClick={closeModal}
      >
        {/* Modal kutusu */}
        <div
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden border max-h-[90vh] overflow-y-auto bg-[var(--card)] border-[var(--border)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Kapat butonu */}
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/20 bg-black/50"
          >
            <X size={18} color="white" />
          </button>

          {/* Header — poster */}
          <div
            className="relative h-52 flex items-end p-5 dramaHeader"
          >
            <div className="absolute inset-0 dramaHeaderOverlay" />
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-[var(--text)]">
                {selectedDrama.title}
              </h2>
            </div>
            <div className="absolute top-5 left-5 text-5xl">
              {selectedDrama.emoji}
            </div>
          </div>

          {/* Body */}
          <div className="p-6">

            {/* Meta etiketler */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                selectedDrama.country,
                String(selectedDrama.year),
                selectedDrama.genre,
                `${selectedDrama.totalEpisodes} Bölüm`,
              ].map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded border bg-[var(--surface)] border-[var(--border)] text-[var(--muted)]">
                  {tag}
                </span>
              ))}
              <span className={cn(
                'text-xs px-2 py-1 rounded font-bold flex items-center gap-1',
                getRatingColor(selectedDrama.rating)
              )}>
                <Star size={11} fill="currentColor" />
                {selectedDrama.rating}
              </span>
              {selectedDrama.badge && (
                <span className={cn('text-xs px-2 py-1 rounded font-bold', getBadgeStyle(selectedDrama.badge))}>
                  {getBadgeLabel(selectedDrama.badge)}
                </span>
              )}
            </div>

            {/* Açıklama */}
            <p className="text-sm leading-relaxed mb-5 text-[#b0b0c0]">
              {selectedDrama.description}
            </p>

            {/* Aksiyon butonları */}
            <div className="flex gap-3 mb-6">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-black text-sm hover:opacity-90 transition-opacity bg-[var(--accent)]">
                <Play size={15} fill="black" color="black" />
                İzlemeye Başla
              </button>
              <button
                onClick={() => inList ? removeFromWatchList(selectedDrama.id) : addToWatchList(selectedDrama.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm border hover:bg-white/10 transition-colors border-[rgba(255,255,255,0.2)] text-[var(--text)]"
              >
                {inList ? <Check size={15} /> : <Plus size={15} />}
                {inList ? 'Listede' : 'Listem'}
              </button>
            </div>

            {/* Bölüm listesi */}
            <h3 className="text-base font-bold mb-3 text-[var(--text)]">
              Bölümler
            </h3>
            <div className="flex flex-col gap-2">
              {Array.from({ length: Math.min(selectedDrama.totalEpisodes, 10) }, (_, i) => {
                const isLocked = !isPremium && i >= freeEpisodes
                return (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors border-[var(--border)] bg-[var(--surface)]',
                      isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-white/5'
                    )}
                  >
                    <span className="text-xs w-6 text-center text-[var(--muted)]">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-sm text-[var(--text)]">
                      {episodeTitles[i] ?? `Bölüm ${i + 1}`}
                    </span>
                    <span className="text-xs text-[var(--muted)]">
                      {42 + (i % 8) * 3} dk
                    </span>
                    {isLocked
                      ? <Lock size={13} color="var(--accent)" />
                      : <Play size={13} color="var(--muted)" />
                    }
                  </div>
                )
              })}
              {selectedDrama.totalEpisodes > 10 && (
                <p className="text-center text-xs py-2 text-[var(--muted)]">
                  + {selectedDrama.totalEpisodes - 10} bölüm daha
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}