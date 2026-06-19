import DramaCard from './DramaCard'
import { Drama } from '@/types/drama'

interface Props {
  dramas: Drama[]
  title?: string
}

export default function DramaGrid({ dramas, title }: Props) {
  return (
    <section>
      {title && (
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>
          {title}
        </h2>
      )}
      <div className="grid gap-3"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
        {dramas.map((drama) => (
          <DramaCard key={drama.id} drama={drama} />
        ))}
      </div>
    </section>
  )
}