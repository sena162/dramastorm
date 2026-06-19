'use client'

import React from 'react'
import { Play, Plus, Check } from 'lucide-react'
import { Drama } from '@/types/drama'
import { useStore } from '@/lib/store'
import { getBadgeLabel, getBadgeStyle, getRatingColor, cn } from '@/lib/utils'

interface Props {
  drama: Drama
}

export default function DramaCard({ drama }: Props) {
  const { openModal, isInWatchList, addToWatchList, removeFromWatchList } = useStore()
  const inList = isInWatchList(drama.id)

  function toggleList(e: React.MouseEvent) {
    e.stopPropagation()
    inList ? removeFromWatchList(drama.id) : addToWatchList(drama.id)
  }

  return (
    <div
      className="group cursor-pointer"
      onClick={() => openModal(drama)}
    >
      {/* Poster */}
      <div className="relative rounded-xl overflow-hidden mb-2 border aspect-[2/3]">

        {/* Arka plan */}
        <div className={cn("w-full h-full flex items-center justify-center text-5xl", drama.bgGradient)}>
          {drama.emoji}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
          <button
            className="w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110 bg-[var(--accent)]"
            onClick={(e) => { e.stopPropagation(); openModal(drama) }}
          >
            <Play size={18} fill="black" color="black" />
          </button>
          <button
            className={cn(
              'w-11 h-11 rounded-full border border-white/30 flex items-center justify-center transition-transform hover:scale-110',
              inList ? 'bg-white/20' : 'bg-black/40'
            )}
            onClick={toggleList}
          >
            {inList
              ? <Check size={16} color="white" />
              : <Plus size={16} color="white" />
            }
          </button>
        </div>

        {/* Rozet */}
        {drama.badge && (
          <span className={cn(
            'absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded',
            getBadgeStyle(drama.badge)
          )}>
            {getBadgeLabel(drama.badge)}
          </span>
        )}

        {/* Listemde işareti */}
        {inList && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Check size={12} color="white" />
          </div>
        )}
      </div>

      {/* Bilgiler */}
      <div className="text-sm font-semibold leading-snug mb-1 line-clamp-2 text-[var(--text)]">
        {drama.title}
      </div>
      <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
        <span className={cn('font-semibold', getRatingColor(drama.rating))}>
          ★ {drama.rating}
        </span>
        <span>{drama.country}</span>
        <span>{drama.totalEpisodes} Bölüm</span>
      </div>
    </div>
  )
}