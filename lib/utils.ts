import { clsx, type ClassValue } from 'clsx'
import { Badge } from '@/types/drama'

// Tailwind class birleştirici
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Rozet rengi
export function getBadgeStyle(badge: Badge): string {
  const styles = {
    new: 'bg-blue-500 text-white',
    hot: 'bg-orange-500 text-white',
    free: 'bg-green-500 text-white',
    premium: 'bg-yellow-500 text-black',
  }
  return styles[badge]
}

// Rozet etiketi
export function getBadgeLabel(badge: Badge): string {
  const labels = {
    new: 'YENİ',
    hot: '🔥 HOT',
    free: 'ÜCRETSİZ',
    premium: 'PREMIUM',
  }
  return labels[badge]
}

// Puan rengi
export function getRatingColor(rating: number): string {
  if (rating >= 9) return 'text-yellow-400'
  if (rating >= 8) return 'text-green-400'
  return 'text-gray-400'
}

// Süre formatlama (dakika → "1s 42dk")
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}dk`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}s ${m}dk` : `${h}s`
}