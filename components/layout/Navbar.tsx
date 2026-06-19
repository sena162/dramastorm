'use client'

import { useState } from 'react'
import { Search, Zap, Menu, X, LogIn, LogOut } from 'lucide-react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

const navLinks = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Asya Dramalar', href: '/search?country=asya' },
  { label: 'Türk Dizileri', href: '/search?country=Türkiye' },
  { label: 'Yeni Bölümler', href: '/search?sort=new' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const { searchQuery, setSearchQuery, isPremium } = useStore()
  const { data: session } = useSession()

  const initials = session?.user?.name
    ? session.user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AY'

  return (
    <nav className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-md"
      style={{ background: 'rgba(10,10,15,0.95)' }}>

      <div className="flex items-center gap-6 px-6 h-16">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="text-xl font-black tracking-tight" style={{ color: 'var(--accent)' }}>Drama</span>
          <span className="text-xl font-black tracking-tight" style={{ color: 'var(--accent2)' }}>Storm</span>
        </Link>

        {/* Linkler */}
        <div className="hidden md:flex items-center gap-6 flex-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-sm transition-colors hover:text-white"
              style={{ color: 'var(--muted)' }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Sağ */}
        <div className="flex items-center gap-3 ml-auto">

          {/* Arama */}
          <div className={cn(
            'hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border text-sm transition-all',
            searchFocused ? 'border-white/20 w-56' : 'border-white/8 w-44'
          )} style={{ background: 'var(--surface)' }}>
            <Search size={14} style={{ color: 'var(--muted)' }} />
            <input
              type="text"
              placeholder="Dizi ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-transparent outline-none text-sm flex-1 placeholder:text-gray-600"
              style={{ color: 'var(--text)' }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}>
                <X size={12} style={{ color: 'var(--muted)' }} />
              </button>
            )}
          </div>

          {/* Premium */}
          {!isPremium && (
            <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold text-black hover:opacity-90"
              style={{ background: 'var(--accent)' }}>
              <Zap size={14} />
              Premium
            </button>
          )}

          {/* Kullanıcı */}
          {session ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
                style={{ background: 'var(--accent2)' }}>
                {initials}
              </div>
              <button onClick={() => signOut()}
                className="hidden sm:flex items-center gap-1 text-xs transition-colors hover:text-white"
                style={{ color: 'var(--muted)' }}>
                <LogOut size={13} />
                Çıkış
              </button>
            </div>
          ) : (
            <Link href="/login"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm border transition-colors hover:bg-white/5"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
              <LogIn size={14} />
              Giriş
            </Link>
          )}

          {/* Mobil menü */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: 'var(--muted)' }}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      {mobileOpen && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-full border text-sm"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <Search size={14} style={{ color: 'var(--muted)' }} />
            <input type="text" placeholder="Dizi ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none flex-1"
              style={{ color: 'var(--text)' }}
            />
          </div>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-sm py-1"
              style={{ color: 'var(--muted)' }}
              onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          {session ? (
            <button onClick={() => signOut()}
              className="flex items-center gap-2 text-sm"
              style={{ color: 'var(--muted)' }}>
              <LogOut size={14} /> Çıkış Yap
            </button>
          ) : (
            <Link href="/login"
              className="flex items-center gap-2 text-sm"
              style={{ color: 'var(--muted)' }}>
              <LogIn size={14} /> Giriş Yap
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}