export type Genre =
  | 'romantik'
  | 'tarihi'
  | 'aksiyonlu'
  | 'komedi'
  | 'gerilim'
  | 'fantastik'
  | 'dram'

export type Country = 'Kore' | 'Türkiye' | 'Çin' | 'Japonya'

export type Badge = 'new' | 'hot' | 'free' | 'premium'

export interface Episode {
  id: number
  number: number
  title: string
  duration: number   // dakika
  isFree: boolean
  thumbnail?: string
}

export interface Drama {
  id: number
  title: string
  description: string
  genre: Genre
  country: Country
  year: number
  rating: number
  totalEpisodes: number
  badge?: Badge
  emoji: string          // geçici — sonra gerçek poster resmiyle değişir
  bgGradient: string     // geçici poster arka plan rengi
  episodes?: Episode[]
}

export interface WatchProgress {
  dramaId: number
  episodeNumber: number
  progressPercent: number  // 0-100
  lastWatched: Date
}

export interface User {
  id: string
  name: string
  email: string
  isPremium: boolean
  watchList: number[]       // drama id'leri
  watchProgress: WatchProgress[]
}