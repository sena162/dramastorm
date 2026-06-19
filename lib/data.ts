import { Drama } from '@/types/drama'

export const dramas: Drama[] = [
  {
    id: 1,
    title: 'Sonsuz Aşkın Gölgesinde',
    description:
      'İki farklı dünyadan gelen, birbirlerine yasak olan iki gencin arasındaki tutkulu aşk hikayesi. Sarayın karanlık sırları, intikam ve sonsuz bir sevda...',
    genre: 'romantik',
    country: 'Kore',
    year: 2024,
    rating: 9.2,
    totalEpisodes: 48,
    badge: 'hot',
    emoji: '🌸',
    bgGradient: 'linear-gradient(135deg, #1a0533, #2d1b69)',
  },
  {
    id: 2,
    title: 'Kılıç ve Taç',
    description:
      'Orta Çağ Kore\'sinde geçen efsanevi bir hikaye. Bir savaşçı, tahtını kaybetmiş bir prensesi koruma görevini üstlenir.',
    genre: 'tarihi',
    country: 'Kore',
    year: 2024,
    rating: 8.9,
    totalEpisodes: 32,
    badge: 'new',
    emoji: '⚔️',
    bgGradient: 'linear-gradient(135deg, #0a1628, #1a3a5c)',
  },
  {
    id: 3,
    title: 'Yasak Aşk İstanbul',
    description:
      'İstanbul\'un iki yakasında büyüyen iki genç, hayatlarının dönüm noktasında karşılaşır. Aile baskısı, gizem ve tutkulu bir aşk...',
    genre: 'romantik',
    country: 'Türkiye',
    year: 2024,
    rating: 8.7,
    totalEpisodes: 60,
    badge: 'free',
    emoji: '🌹',
    bgGradient: 'linear-gradient(135deg, #1a0a0a, #4a1010)',
  },
  {
    id: 4,
    title: 'Bulut Sarayı',
    description:
      'Göksel bir prenses ile ölümlü bir savaşçının yasak aşkı. Tanrılar ve insanlar arasındaki sınırı aşan bir roman.',
    genre: 'fantastik',
    country: 'Çin',
    year: 2024,
    rating: 9.0,
    totalEpisodes: 56,
    badge: 'premium',
    emoji: '☁️',
    bgGradient: 'linear-gradient(135deg, #0a0a1a, #1a1a3a)',
  },
  {
    id: 5,
    title: "CEO'nun Sırrı",
    description:
      'Genç bir çalışan, sır dolu bir CEO ile iş hayatında birleşir. Güç, para ve beklenmedik bir aşk hikayesi.',
    genre: 'romantik',
    country: 'Çin',
    year: 2024,
    rating: 8.5,
    totalEpisodes: 24,
    badge: 'new',
    emoji: '💼',
    bgGradient: 'linear-gradient(135deg, #0a1a10, #0f3020)',
  },
  {
    id: 6,
    title: 'Maskeli Kraliçe',
    description:
      'Kimliğini gizleyen bir kadın, Joseon döneminde sarayın içlerine sızmayı başarır. Siyasi entrikalar ve beklenmedik bir dönüşüm.',
    genre: 'tarihi',
    country: 'Kore',
    year: 2023,
    rating: 8.8,
    totalEpisodes: 20,
    badge: 'premium',
    emoji: '🎭',
    bgGradient: 'linear-gradient(135deg, #1a1a0a, #3a3000)',
  },
  {
    id: 7,
    title: 'Tatlı Komplo',
    description:
      'Bir pastacı ile ünlü bir şefin arasındaki rekabet zamanla sevgiye dönüşür. Tatlı, eğlenceli ve romantik bir Japon komedisi.',
    genre: 'komedi',
    country: 'Japonya',
    year: 2024,
    rating: 8.3,
    totalEpisodes: 16,
    badge: 'free',
    emoji: '🍰',
    bgGradient: 'linear-gradient(135deg, #2a0a20, #4a1a30)',
  },
  {
    id: 8,
    title: 'Gece Dedektifi',
    description:
      'İstanbul\'da bir seri cinayet soruşturmasına dahil olan dedektif, geçmişiyle de yüzleşmek zorunda kalır.',
    genre: 'gerilim',
    country: 'Türkiye',
    year: 2024,
    rating: 9.1,
    totalEpisodes: 18,
    badge: 'hot',
    emoji: '🔍',
    bgGradient: 'linear-gradient(135deg, #0a0a0a, #1a0a0a)',
  },
]

export const getFeaturedDrama = (): Drama => dramas[0]

export const getDramaById = (id: number): Drama | undefined =>
  dramas.find((d) => d.id === id)

export const getDramasByGenre = (genre: string): Drama[] =>
  dramas.filter((d) => d.genre === genre)

export const getTopRated = (limit = 10): Drama[] =>
  [...dramas].sort((a, b) => b.rating - a.rating).slice(0, limit)