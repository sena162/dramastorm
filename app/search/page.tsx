'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search } from 'lucide-react'
import { getDramas } from '@/lib/data'
import { Drama, Genre, Country } from '@/types/drama'
import DramaGrid from '@/components/drama/DramaGrid'
import DramaModal from '@/components/drama/DramaModal'
import { cn } from '@/lib/utils'

const genres: { label: string; value: Genre | 'hepsi' }[] = [
  { label: 'Hepsi', value: 'hepsi' },
  { label: '💕 Romantik', value: 'romantik' },
  { label: '🏯 Tarihi', value: 'tarihi' },
  { label: '⚔️ Aksiyon', value: 'aksiyonlu' },
  { label: '😂 Komedi', value: 'komedi' },
  { label: '🔍 Gerilim', value: 'gerilim' },
  { label: '✨ Fantastik', value: 'fantastik' },
  { label: '🎭 Dram', value: 'dram' },
]

const countries: { label: string; value: Country | 'hepsi' }[] = [
  { label: 'Hepsi', value: 'hepsi' },
  { label: '🇰🇷 Kore', value: 'Kore' },
  { label: '🇹🇷 Türkiye', value: 'Türkiye' },
  { label: '🇨🇳 Çin', value: 'Çin' },
  { label: '🇯🇵 Japonya', value: 'Japonya' },
]

export default function SearchPage() {
  const [allDramas, setAllDramas] = useState<Drama[]>([])
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState<Genre | 'hepsi'>('hepsi')
  const [country, setCountry] = useState<Country | 'hepsi'>('hepsi')
  const [minRating, setMinRating] = useState(0)

  useEffect(() => {
    getDramas().then(setAllDramas)
  }, [])

  const results = useMemo(() => {
    return allDramas.filter((d) => {
      const matchQuery = query === '' || d.title.toLowerCase().includes(query.toLowerCase())
      const matchGenre = genre === 'hepsi' || d.genre === genre
      const matchCountry = country === 'hepsi' || d.country === country
      const matchRating = d.rating >= minRating
      return matchQuery && matchGenre && matchCountry && matchRating
    })
  }, [query, genre, country, minRating, allDramas])

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-black mb-6" style={{ color: 'var(--text)' }}>
            🔍 Dizi Ara
          </h1>

          {/* Arama kutusu */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border mb-6"
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
            <Search size={16} style={{ color: 'var(--muted)' }} />
            <input
              type="text"
              placeholder="Dizi adı veya oyuncu ara..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: 'var(--text)' }}
              autoFocus
            />
          </div>

          {/* Filtreler */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'var(--muted)' }}>Tür</p>
              <div className="flex gap-2 flex-wrap">
                {genres.map((g) => (
                  <button key={g.value} onClick={() => setGenre(g.value)}
                    className={cn('px-3 py-1.5 rounded-full text-xs border transition-all',
                      genre === g.value ? 'font-bold text-black' : 'hover:border-white/20')}
                    style={genre === g.value
                      ? { background: 'var(--accent)', borderColor: 'transparent' }
                      : { background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--muted)' }}>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'var(--muted)' }}>Ülke</p>
              <div className="flex gap-2 flex-wrap">
                {countries.map((c) => (
                  <button key={c.value} onClick={() => setCountry(c.value)}
                    className={cn('px-3 py-1.5 rounded-full text-xs border transition-all',
                      country === c.value ? 'font-bold text-black' : 'hover:border-white/20')}
                    style={country === c.value
                      ? { background: 'var(--accent)', borderColor: 'transparent' }
                      : { background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--muted)' }}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'var(--muted)' }}>
                Min. Puan: <span style={{ color: 'var(--accent)' }}>★ {minRating}</span>
              </p>
              <input type="range" min={0} max={9} step={0.5}
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-48 accent-yellow-500" />
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{results.length}</span> dizi bulundu
          </p>
          {results.length > 0
            ? <DramaGrid dramas={results} />
            : (
              <div className="text-center py-20" style={{ color: 'var(--muted)' }}>
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-lg font-semibold mb-2">Sonuç bulunamadı</p>
                <p className="text-sm">Farklı bir arama terimi deneyin</p>
              </div>
            )
          }
        </div>
      </div>
      <DramaModal />
    </>
  )
}