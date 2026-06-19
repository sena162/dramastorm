import { notFound } from 'next/navigation'
import { Play, Plus, Star, ArrowLeft, Lock } from 'lucide-react'
import { getDramaById, dramas } from '@/lib/data'
import { getBadgeLabel, getBadgeStyle, getRatingColor, cn } from '@/lib/utils'
import DramaGrid from '@/components/drama/DramaGrid'
import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

const episodeTitles = [
  'Kaderin Çizdiği Yol', 'İlk Karşılaşma', 'Sırların Gölgesi',
  'Yasak Arzu', 'Geri Dönüş', 'Kırık Kalpler', 'İntikam Saati',
  'Yeni Başlangıçlar', 'Fırtına Öncesi', 'Son Hamle',
]

export default async function DramaDetailPage({ params }: Props) {
  const { id } = await params
  const drama = getDramaById(Number(id))
  if (!drama) notFound()

  const related = dramas
    .filter((d) => d.genre === drama.genre && d.id !== drama.id)
    .slice(0, 6)

  const freeEpisodes = drama.badge === 'free' ? drama.totalEpisodes : 3

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: '420px' }}>
        <div className="absolute inset-0" style={{ background: drama.bgGradient }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(10,10,15,0.95) 40%, transparent 80%), linear-gradient(to top, rgba(10,10,15,1) 0%, transparent 60%)' }} />

        {/* Geri butonu */}
        <div className="relative z-10 px-6 pt-6">
          <Link href="/"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ color: 'var(--muted)' }}>
            <ArrowLeft size={16} />
            Ana Sayfa
          </Link>
        </div>

        {/* İçerik */}
        <div className="relative z-10 flex items-end h-full pb-8 px-6 max-w-7xl mx-auto gap-8">
          {/* Poster */}
          <div className="hidden md:flex flex-shrink-0 w-40 h-56 rounded-xl items-center justify-center text-6xl border-2"
            style={{ background: drama.bgGradient, borderColor: 'rgba(255,255,255,0.1)' }}>
            {drama.emoji}
          </div>

          {/* Bilgiler */}
          <div className="flex-1">
            {drama.badge && (
              <span className={cn('text-xs font-bold px-2 py-0.5 rounded mb-3 inline-block', getBadgeStyle(drama.badge))}>
                {getBadgeLabel(drama.badge)}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: 'var(--text)' }}>
              {drama.title}
            </h1>
            <div className="flex items-center gap-3 mb-3 text-sm flex-wrap">
              <span className={cn('font-bold flex items-center gap-1', getRatingColor(drama.rating))}>
                <Star size={14} fill="currentColor" />
                {drama.rating}
              </span>
              <span style={{ color: 'var(--muted)' }}>·</span>
              <span style={{ color: 'var(--muted)' }}>{drama.year}</span>
              <span style={{ color: 'var(--muted)' }}>·</span>
              <span style={{ color: 'var(--muted)' }}>{drama.country}</span>
              <span style={{ color: 'var(--muted)' }}>·</span>
              <span style={{ color: 'var(--muted)' }}>{drama.totalEpisodes} Bölüm</span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-lg" style={{ color: '#b0b0c0' }}>
              {drama.description}
            </p>
            <div className="flex gap-3">
              <Link href={`/drama/${drama.id}/watch/1`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-black text-sm hover:opacity-90 transition-opacity"
                style={{ background: 'var(--accent)' }}>
                <Play size={15} fill="black" color="black" />
                İzlemeye Başla
              </Link>
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm border hover:bg-white/10 transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--text)' }}>
                <Plus size={15} />
                Listem
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bölümler + İlgili */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-12">

        {/* Bölüm listesi */}
        <section>
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Bölümler</h2>
          <div className="flex flex-col gap-2">
            {Array.from({ length: Math.min(drama.totalEpisodes, 12) }, (_, i) => {
              const isLocked = i >= freeEpisodes
              return (
                <Link
                  key={i}
                  href={isLocked ? '#' : `/drama/${drama.id}/watch/${i + 1}`}
                  className={cn(
                    'flex items-center gap-4 px-4 py-3 rounded-xl border transition-colors',
                    isLocked
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-white/5 cursor-pointer'
                  )}
                  style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                >
                  <span className="text-sm w-6 text-center font-mono" style={{ color: 'var(--muted)' }}>
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium" style={{ color: 'var(--text)' }}>
                    {episodeTitles[i] ?? `Bölüm ${i + 1}`}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>
                    {42 + (i % 8) * 3} dk
                  </span>
                  {isLocked
                    ? <Lock size={14} style={{ color: 'var(--accent)' }} />
                    : <Play size={14} style={{ color: 'var(--muted)' }} />
                  }
                </Link>
              )
            })}
            {drama.totalEpisodes > 12 && (
              <p className="text-center text-xs py-3" style={{ color: 'var(--muted)' }}>
                + {drama.totalEpisodes - 12} bölüm daha · Premium ile tümünü izle
              </p>
            )}
          </div>
        </section>

        {/* İlgili diziler */}
        {related.length > 0 && (
          <DramaGrid title="Benzer Diziler" dramas={related} />
        )}
      </div>
    </>
  )
}