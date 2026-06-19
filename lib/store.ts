import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Drama, WatchProgress } from '@/types/drama'

interface StoreState {
  // Kullanıcı
  isPremium: boolean
  setPremium: (val: boolean) => void

  // İzleme listesi
  watchList: number[]
  addToWatchList: (id: number) => void
  removeFromWatchList: (id: number) => void
  isInWatchList: (id: number) => boolean

  // İzleme geçmişi
  watchProgress: WatchProgress[]
  updateProgress: (progress: WatchProgress) => void
  getProgress: (dramaId: number) => WatchProgress | undefined

  // Modal
  selectedDrama: Drama | null
  openModal: (drama: Drama) => void
  closeModal: () => void

  // Arama
  searchQuery: string
  setSearchQuery: (q: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Kullanıcı
      isPremium: false,
      setPremium: (val) => set({ isPremium: val }),

      // İzleme listesi
      watchList: [],
      addToWatchList: (id) =>
        set((s) => ({ watchList: [...s.watchList, id] })),
      removeFromWatchList: (id) =>
        set((s) => ({ watchList: s.watchList.filter((x) => x !== id) })),
      isInWatchList: (id) => get().watchList.includes(id),

      // İzleme geçmişi
      watchProgress: [],
      updateProgress: (progress) =>
        set((s) => {
          const existing = s.watchProgress.findIndex(
            (p) => p.dramaId === progress.dramaId
          )
          if (existing >= 0) {
            const updated = [...s.watchProgress]
            updated[existing] = progress
            return { watchProgress: updated }
          }
          return { watchProgress: [...s.watchProgress, progress] }
        }),
      getProgress: (dramaId) =>
        get().watchProgress.find((p) => p.dramaId === dramaId),

      // Modal — persist etmiyoruz, sayfa açılınca kapalı olsun
      selectedDrama: null,
      openModal: (drama) => set({ selectedDrama: drama }),
      closeModal: () => set({ selectedDrama: null }),

      // Arama
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
    }),
    {
      name: 'dramastorm-storage',
      // Sadece bu alanları localStorage'a kaydet
      partialize: (s) => ({
        isPremium: s.isPremium,
        watchList: s.watchList,
        watchProgress: s.watchProgress,
      }),
    }
  )
)