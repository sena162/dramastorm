export default function Footer() {
  return (
    <footer className="border-t mt-16" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Marka */}
        <div className="col-span-2 md:col-span-1">
          <div className="text-xl font-black mb-3">
            <span style={{ color: 'var(--accent)' }}>Drama</span>
            <span style={{ color: 'var(--accent2)' }}>Storm</span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            Türkiye'nin en büyük drama platformu. Kore, Türk, Çin ve Japon dramalarını yüksek kalitede izleyin.
          </p>
        </div>

        {/* Keşfet */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-4"
            style={{ color: 'var(--muted)' }}>
            Keşfet
          </h4>
          {['Ana Sayfa', 'Yeni Diziler', 'Filmler', 'Öneriler'].map((item) => (
            <a key={item} href="#"
              className="block text-sm mb-2 transition-colors hover:text-white"
              style={{ color: 'var(--muted)' }}>
              {item}
            </a>
          ))}
        </div>

        {/* Hesabım */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-4"
            style={{ color: 'var(--muted)' }}>
            Hesabım
          </h4>
          {['Profilim', 'Listem', 'İzleme Geçmişi', 'Premium Al'].map((item) => (
            <a key={item} href="#"
              className="block text-sm mb-2 transition-colors hover:text-white"
              style={{ color: 'var(--muted)' }}>
              {item}
            </a>
          ))}
        </div>

        {/* Destek */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-4"
            style={{ color: 'var(--muted)' }}>
            Destek
          </h4>
          {['Yardım Merkezi', 'İletişim', 'Gizlilik', 'Kullanım Şartları'].map((item) => (
            <a key={item} href="#"
              className="block text-sm mb-2 transition-colors hover:text-white"
              style={{ color: 'var(--muted)' }}>
              {item}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t px-6 py-4 text-center text-xs"
        style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
        © 2024 DramaStorm. Tüm hakları saklıdır. · Türkiye'de %100 yasal yayın platformu
      </div>
    </footer>
  )
}