'use client'

import { useState, useMemo } from 'react'
import { dramas } from '@/lib/data'
import { Genre } from '@/types/drama'
import DramaGrid from './DramaGrid'
import { cn } from '@/lib/utils'

const tabs = [
  { label: 'Hepsi', value: 'hepsi' },
  { label: '💕 Romantik', value: 'romantik' },
  { label: '🏯 Tarihi', value: 'tarihi' },
  { label: '⚔️ Aksiyon', value: 'aksiyonlu' },
  { label: '😂 Komedi', value: 'komedi' },
  { label: '🔍 Gerilim', value: 'gerilim' },
  { label: '✨ Fantastik', value: 'fantastik' },
]

export default function FilterTabs() {
  const [active, setActive] = useState<Genre | 'hepsi'>('hepsi')

  const filtered = useMemo(() =>
    active === 'hepsi' ? dramas : dramas.filter((d) => d.genre === active),
    [active]
  )

  return (
    <section>
      <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>
        🎬 Tüm <span style={{ color: 'var(--accent)' }}>Diziler</span>
      </h2>

      {/* Sekmeler */}
      <div className="flex gap-2 flex-wrap mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value as Genre | 'hepsi')}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs border transition-all',
              active === tab.value
                ? 'font-bold text-black'
                : 'hover:border-white/20'
            )}
            style={active === tab.value
              ? { background: 'var(--accent)', borderColor: 'transparent' }
              : { background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--muted)' }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <DramaGrid dramas={filtered} />
    </section>
  )
}