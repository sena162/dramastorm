'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Play } from 'lucide-react'
import type { ComponentType } from 'react'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as unknown as ComponentType<any>

interface Props {
  url: string | null
  title: string
  emoji: string
  bgGradient: string
}

export default function VideoPlayer({ url, title, emoji, bgGradient }: Props) {
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  if (!url) {
    return (
      <div
        className="w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4 py-20"
        style={{ background: bgGradient, aspectRatio: '16/9' }}
      >
        <div className="text-6xl">{emoji}</div>
        <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Video yakında eklenecek
        </p>
      </div>
    )
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden relative" style={{ aspectRatio: '16/9' }}>
      {/* Thumbnail — başlamadan önce göster */}
      {!started && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 cursor-pointer z-10"
          style={{ background: bgGradient }}
          onClick={() => { setStarted(true); setPlaying(true) }}
        >
          <div className="text-6xl">{emoji}</div>
          <p className="text-base font-bold" style={{ color: 'var(--text)' }}>{title}</p>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mt-2 hover:scale-110 transition-transform"
            style={{ background: 'var(--accent)' }}
          >
            <Play size={28} fill="black" color="black" />
          </div>
        </div>
      )}

      {/* React Player */}
      {started && (
        <ReactPlayer
          url={url}
          playing={playing}
          controls
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
              },
            },
          } as any}
        />
      )}
    </div>
  )
}