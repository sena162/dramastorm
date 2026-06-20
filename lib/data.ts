import { supabase } from './supabase'
import { Drama } from '@/types/drama'

// Supabase'den gelen veriyi Drama tipine çevir
function mapDrama(d: any): Drama {
  return {
    id: d.id,
    title: d.title,
    description: d.description,
    genre: d.genre,
    country: d.country,
    year: d.year,
    rating: Number(d.rating),
    totalEpisodes: d.total_episodes,
    badge: d.badge,
    emoji: d.emoji,
    bgGradient: d.bg_gradient,
  }
}

// Tüm dizileri getir
export async function getDramas(): Promise<Drama[]> {
  const { data, error } = await supabase
    .from('dramas')
    .select('*')
    .order('rating', { ascending: false })

  if (error) {
    console.error('Diziler yüklenemedi:', error)
    return []
  }

  return data.map(mapDrama)
}

// Tek dizi getir
export async function getDramaById(id: number): Promise<Drama | null> {
  const { data, error } = await supabase
    .from('dramas')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return mapDrama(data)
}

// Öne çıkan dizi (en yüksek puanlı)
export async function getFeaturedDrama(): Promise<Drama | null> {
  const { data, error } = await supabase
    .from('dramas')
    .select('*')
    .order('rating', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) return null
  return mapDrama(data)
}

// Türe göre filtrele
export async function getDramasByGenre(genre: string): Promise<Drama[]> {
  const { data, error } = await supabase
    .from('dramas')
    .select('*')
    .eq('genre', genre)
    .order('rating', { ascending: false })

  if (error) return []
  return data.map(mapDrama)
}

// Top rated
export async function getTopRated(limit = 10): Promise<Drama[]> {
  const { data, error } = await supabase
    .from('dramas')
    .select('*')
    .order('rating', { ascending: false })
    .limit(limit)

  if (error) return []
  return data.map(mapDrama)
}

// Bölümleri getir
export async function getEpisodes(dramaId: number) {
  const { data, error } = await supabase
    .from('episodes')
    .select('*')
    .eq('drama_id', dramaId)
    .order('number', { ascending: true })

  if (error) return []
  return data
}