'use client'

import { useState } from 'react'
import { Zap, Check } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const features = [
  'Tüm bölümlere sınırsız erişim',
  'Reklamsız izleme deneyimi',
  'HD ve 4K kalite',
  'Yeni bölümler önce sana gelir',
  'İstediğin cihazda izle',
  'İstediğin zaman iptal et',
]

export default function PremiumPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    if (!session) {
      router.push('/login')
      return
    }

    setLoading(true)
    const res = await fetch('/api/stripe/checkout', { method: 'POST' })
    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md">

        {/* Başlık */}
        <div className="text-center mb-8">
          <div className="text-3xl font-black mb-2">
            <span style={{ color: 'var(--accent)' }}>Drama</span>
            <span style={{ color: 'var(--accent2)' }}>Storm</span>
          </div>
          <h1 className="text-2xl font-black mb-2" style={{ color: 'var(--text)' }}>
            Premium Üyelik
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Sınırsız drama keyfi için Premium'a geç
          </p>
        </div>

        {/* Fiyat kartı */}
        <div className="rounded-2xl border p-6 mb-4"
          style={{
            background: 'var(--card)',
            borderColor: 'rgba(201,162,39,0.3)',
          }}>

          {/* Fiyat */}
          <div className="text-center mb-6">
            <div className="flex items-end justify-center gap-1 mb-1">
              <span className="text-4xl font-black" style={{ color: 'var(--accent)' }}>
                $9.99
              </span>
              <span className="text-sm mb-1" style={{ color: 'var(--muted)' }}>/ay</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              İstediğin zaman iptal edebilirsin
            </p>
          </div>

          {/* Özellikler */}
          <div className="flex flex-col gap-3 mb-6">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,162,39,0.2)' }}>
                  <Check size={12} style={{ color: 'var(--accent)' }} />
                </div>
                <span className="text-sm" style={{ color: 'var(--text)' }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Buton */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-black text-sm flex items-center justify-center gap-2 disabled:opacity-60 hover:opacity-90 transition-opacity"
            style={{ background: 'var(--accent)' }}
          >
            <Zap size={16} />
            {loading ? 'Yönlendiriliyor...' : 'Hemen Başla'}
          </button>
        </div>

        <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
          Güvenli ödeme · Stripe ile şifreli
        </p>
      </div>
    </div>
  )
}