'use client'

import { Play } from 'lucide-react'
import { useStore } from '@/lib/store'
import { dramas } from '@/lib/data'
import { useStore as useModal } from '@/lib/store'

export default function ContinueRow() {
  const { watchProgress, openModal } = useModal()

  // İzleme geçmişi olan dizileri bul
  const continueItems = watchProgress
    .map((p) => ({
      progress: p,
      drama: dramas.find((d) => d.id === p.dramaId),
    }))
    .filter((item) => item.drama !== undefined)

  // Geçmiş yoksa örnek göster
  const mockItems = dramas.slice(0, 4).map((drama, i) => ({
    drama,
    progress: {
      dramaId: drama.id,
      episodeNumber: i + 1,
      progressPercent: [65, 30, 88, 15][i],
      lastWatched: new Date(),
    },
  }))

  const items = continueItems.length > 0 ? continueItems : mockItems

  if (items.length === 0) return null

  return (
    <section>
      <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>
        Kaldığın Yerden <span style={{ color: 'var(--accent)' }}>Devam Et</span>
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'thin' }}>
        {items.map(({ drama, progress }) => {
          if (!drama) return null
          return (
            <div
              key={drama.id}
              className="flex-shrink-0 w-56 rounded-xl overflow-hidden border cursor-pointer group"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
              onClick={() => openModal(drama)}
            >
              {/* Thumbnail */}
              <div
                className="relative h-32 flex items-center justify-center text-4xl"
                style={{ background: drama.bgGradient }}
              >
                {drama.emoji}
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--accent)' }}>
                    <Play size={16} fill="black" color="black" />
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1" style={{ background: 'var(--border)' }}>
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${progress.progressPercent}%`,
                    background: 'var(--accent)',
                  }}
                />
              </div>

              {/* Bilgi */}
              <div className="p-3">
                <div className="text-sm font-semibold truncate mb-1"
                  style={{ color: 'var(--text)' }}>
                  {drama.title}
                </div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>
                  Bölüm {progress.episodeNumber} · %{progress.progressPercent} izlendi
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}