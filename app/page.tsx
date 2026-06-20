import HeroSection from '@/components/drama/HeroSection'
const DramaModal = () => null
import ContinueRow from '@/components/drama/ContinueRow'
import FilterTabs from '@/components/drama/FilterTabs'
import Footer from '@/components/layout/Footer'
import DramaGrid from '@/components/drama/DramaGrid'
import { getDramas, getFeaturedDrama, getTopRated } from '@/lib/data'

export default async function HomePage() {
  const [featured, dramas, topRated] = await Promise.all([
    getFeaturedDrama(),
    getDramas(),
    getTopRated(8),
  ])

  if (!featured) return null

  return (
    <>
      <HeroSection drama={featured} />
      <div className="px-6 py-10 max-w-7xl mx-auto flex flex-col gap-14">
        <ContinueRow dramas={dramas} />
        <FilterTabs dramas={dramas} />
        <DramaGrid title="⭐ En Yüksek Puanlı" dramas={topRated} />
      </div>
      <Footer />
      <DramaModal />
    </>
  )
}