'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Zap } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'login' | 'register'>('login')

  async function handleSubmit() {
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    setLoading(false)
    if (res?.error) {
      setError('Email veya şifre hatalı.')
    } else {
      router.push('/')
    }
  }

  async function handleGoogle() {
    await signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg)' }}>

      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-3xl font-black mb-2">
            <span style={{ color: 'var(--accent)' }}>Drama</span>
            <span style={{ color: 'var(--accent2)' }}>Storm</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Dramalar seni bekliyor
          </p>
        </div>

        {/* Kart */}
        <div className="rounded-2xl border p-6"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>

          {/* Sekmeler */}
          <div className="flex rounded-lg overflow-hidden mb-6 border"
            style={{ borderColor: 'var(--border)' }}>
            {(['login', 'register'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="flex-1 py-2 text-sm font-semibold transition-colors"
                style={tab === t
                  ? { background: 'var(--accent)', color: '#000' }
                  : { background: 'transparent', color: 'var(--muted)' }
                }
              >
                {t === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="flex flex-col gap-3">
            {tab === 'register' && (
              <div>
                <label className="text-xs font-semibold block mb-1"
                  style={{ color: 'var(--muted)' }}>Ad Soyad</label>
                <input
                  type="text"
                  placeholder="Adınız"
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--text)',
                  }}
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold block mb-1"
                style={{ color: 'var(--muted)' }}>Email</label>
              <input
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1"
                style={{ color: 'var(--muted)' }}>Şifre</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none pr-10"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--text)',
                  }}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--muted)' }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-2.5 rounded-lg font-bold text-sm text-black mt-1 disabled:opacity-60 transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)' }}
            >
              {loading ? 'Giriş yapılıyor...' : tab === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
            </button>

            {/* Ayırıcı */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              <span className="text-xs" style={{ color: 'var(--muted)' }}>veya</span>
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            </div>

            {/* Google */}
            <button
              onClick={handleGoogle}
              className="w-full py-2.5 rounded-lg text-sm border font-medium flex items-center justify-center gap-2 transition-colors hover:bg-white/5"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              <span className="text-base">G</span>
              Google ile devam et
            </button>
          </div>

          {/* Test bilgisi */}
          <div className="mt-4 p-3 rounded-lg text-xs"
            style={{ background: 'var(--surface)', color: 'var(--muted)' }}>
            <p className="font-semibold mb-1">Test hesabı:</p>
            <p>Email: test@dramastorm.com</p>
            <p>Şifre: 123456</p>
          </div>
        </div>

        {/* Premium tanıtım */}
        <div className="mt-4 p-4 rounded-xl border flex items-center gap-3"
          style={{ borderColor: 'rgba(201,162,39,0.3)', background: 'rgba(201,162,39,0.05)' }}>
          <Zap size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <div>
            <p className="text-xs font-bold" style={{ color: 'var(--accent)' }}>
              Premium üyelik
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Tüm bölümlere sınırsız erişim, reklamsız izleme
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}