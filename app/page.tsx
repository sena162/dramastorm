import HeroSection from '@/components/drama/HeroSection'
import ContinueRow from '@/components/drama/ContinueRow'
import FilterTabs from '@/components/drama/FilterTabs'
import Footer from '@/components/layout/Footer'
import { dramas, getFeaturedDrama, getTopRated } from '@/lib/data'
import DramaGrid from '@/components/drama/DramaGrid'

export default function HomePage() {
  const featured = getFeaturedDrama()
  const topRated = getTopRated(8)

  return (
    <>
      <HeroSection drama={featured} />

      <div className="px-6 py-10 max-w-7xl mx-auto flex flex-col gap-14">
        <ContinueRow />
        <FilterTabs />
        <DramaGrid title="⭐ En Yüksek Puanlı" dramas={topRated} />
      </div>

      <Footer />
    </>
  )
}