import { notFound } from 'next/navigation'
import { ArrowLeft, Lock, Play } from 'lucide-react'
import Link from 'next/link'
import { getDramaById, getEpisodes } from '@/lib/data'
import { cn } from '@/lib/utils'
import VideoPlayer from '@/components/drama/VideoPlayer'

interface Props {
  params: Promise<{ id: string; ep: string }>
}

const episodeTitles = [
  'Kaderin Çizdiği Yol', 'İlk Karşılaşma', 'Sırların Gölgesi',
  'Yasak Arzu', 'Geri Dönüş', 'Kırık Kalpler', 'İntikam Saati',
  'Yeni Başlangıçlar', 'Fırtına Öncesi', 'Son Hamle',
]

export default async function WatchPage({ params }: Props) {
  const { id, ep } = await params
  const [drama, episodes] = await Promise.all([
    getDramaById(Number(id)),
    getEpisodes(Number(id)),
  ])

  if (!drama) notFound()

  const epNum = Number(ep)
  const freeEpisodes = drama.badge === 'free' ? drama.totalEpisodes : 3
  const isLocked = epNum > freeEpisodes
  const epTitle = episodeTitles[epNum - 1] ?? `Bölüm ${epNum}`
  const prevEp = epNum > 1 ? epNum - 1 : null
  const nextEp = epNum < drama.totalEpisodes ? epNum + 1 : null
  const currentEpisode = episodes.find((e: any) => e.number === epNum)
  const videoUrl = currentEpisode?.video_url || null

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* Üst bar */}
      <div className="flex items-center gap-4 px-6 py-4 border-b"
        style={{ borderColor: 'var(--border)' }}>
        <Link href={`/drama/${drama.id}`}
          className="flex items-center gap-2 text-sm transition-colors hover:text-white"
          style={{ color: 'var(--muted)' }}>
          <ArrowLeft size={16} />
          {drama.title}
        </Link>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          Bölüm {epNum} — {epTitle}
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col lg:flex-row gap-6">

        {/* Video alanı */}
        <div className="flex-1">
          {isLocked ? (
            <div className="rounded-2xl flex flex-col items-center justify-center gap-4 py-24 border"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <Lock size={48} style={{ color: 'var(--accent)' }} />
              <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                Bu bölüm Premium içerik
              </h2>
              <p className="text-sm text-center max-w-xs" style={{ color: 'var(--muted)' }}>
                İlk {freeEpisodes} bölüm ücretsiz. Devamı için Premium üyelik gerekiyor.
              </p>
              <Link href="/premium"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-black text-sm mt-2"
                style={{ background: 'var(--accent)' }}>
                ⚡ Premium'a Geç
              </Link>
            </div>
          ) : (
            <div>
              <VideoPlayer
                url={videoUrl}
                title={`${drama.title} — Bölüm ${epNum}`}
                emoji={drama.emoji}
                bgGradient={drama.bgGradient}
              />

              {/* Navigasyon */}
              <div className="flex items-center justify-between mt-4">
                {prevEp ? (
                  <Link href={`/drama/${drama.id}/watch/${prevEp}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-colors hover:bg-white/5"
                    style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                    ← Bölüm {prevEp}
                  </Link>
                ) : <div />}
                <span className="text-sm" style={{ color: 'var(--muted)' }}>
                  {epNum} / {drama.totalEpisodes}
                </span>
                {nextEp ? (
                  <Link href={`/drama/${drama.id}/watch/${nextEp}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-colors hover:bg-white/5"
                    style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                    Bölüm {nextEp} →
                  </Link>
                ) : <div />}
              </div>
            </div>
          )}
        </div>

        {/* Sağ panel */}
        <div className="lg:w-72 flex-shrink-0">
          <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>Bölümler</h3>
          <div className="flex flex-col gap-1.5 max-h-[600px] overflow-y-auto pr-1">
            {Array.from({ length: Math.min(drama.totalEpisodes, 20) }, (_, i) => {
              const n = i + 1
              const locked = n > freeEpisodes
              const active = n === epNum
              const epItem = episodes.find((e: any) => e.number === n)
              return (
                <Link key={n}
                  href={locked ? '#' : `/drama/${drama.id}/watch/${n}`}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm transition-colors',
                    active ? 'border-yellow-500/50' : 'hover:bg-white/5',
                    locked ? 'opacity-50 pointer-events-none' : ''
                  )}
                  style={{
                    background: active ? 'rgba(201,162,39,0.1)' : 'var(--card)',
                    borderColor: active ? 'rgba(201,162,39,0.4)' : 'var(--border)',
                  }}>
                  <span className="w-5 text-xs text-center font-mono"
                    style={{ color: active ? 'var(--accent)' : 'var(--muted)' }}>
                    {n}
                  </span>
                  <span className="flex-1 truncate"
                    style={{ color: active ? 'var(--accent)' : 'var(--text)' }}>
                    {epItem?.title ?? episodeTitles[i] ?? `Bölüm ${n}`}
                  </span>
                  {locked
                    ? <Lock size={11} style={{ color: 'var(--accent)' }} />
                    : active
                      ? <Play size={11} fill="currentColor" style={{ color: 'var(--accent)' }} />
                      : null
                  }
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}