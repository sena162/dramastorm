import Link from 'next/link'
import { Check } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg)' }}>
      <div className="text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(58,158,110,0.2)' }}>
          <Check size={40} color="#3a9e6e" />
        </div>
        <h1 className="text-2xl font-black mb-2" style={{ color: 'var(--text)' }}>
          Premium aktif! 🎉
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          Tüm bölümlere erişimin açıldı. İyi seyirler!
        </p>
        <Link href="/"
          className="px-6 py-3 rounded-xl font-bold text-black text-sm inline-block hover:opacity-90"
          style={{ background: 'var(--accent)' }}>
          İzlemeye Başla
        </Link>
      </div>
    </div>
  )
}