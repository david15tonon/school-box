'use client'
import BottomNav from '@/components/layout/BottomNav'

const MENU = [
  { icon: '👤', label: 'Mon profil', sub: 'Nom, email, téléphone' },
  { icon: '📍', label: 'Adresses de livraison', sub: 'Gérer mes adresses' },
  { icon: '💳', label: 'Moyens de paiement', sub: 'Mobile money, carte' },
  { icon: '🔔', label: 'Notifications', sub: 'Gérer mes alertes' },
  { icon: '🌍', label: 'Langue', sub: 'Français' },
  { icon: '❓', label: 'Aide & Support', sub: 'FAQ, contact' },
  { icon: '🚪', label: 'Se déconnecter', sub: '', danger: true },
]

export default function ProfilPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ padding: '54px 24px 16px', borderBottom: '1px solid var(--border)', background: 'white' }}>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--black)' }}>
          Mon Profil
        </div>
      </div>

      {/* Avatar */}
      <div style={{ background: 'white', padding: '24px 20px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 20,
          background: 'var(--orange-mist)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28,
        }}>
          👩🏾‍🎓
        </div>
        <div>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: 800, color: 'var(--black)' }}>
            Adjoa Mensah
          </div>
          <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: 13, color: 'var(--mid)' }}>
            adjoa@email.com
          </div>
        </div>
      </div>

      {/* Menu */}
      <div style={{ flex: 1, padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {MENU.map((m, i) => (
          <button key={i} style={{
            background: 'white', borderRadius: 14, padding: '14px 16px',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 14, width: '100%', textAlign: 'left',
          }}>
            <span style={{ fontSize: 20 }}>{m.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600,
                color: m.danger ? '#EF4444' : 'var(--black)',
              }}>
                {m.label}
              </div>
              {m.sub && (
                <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: 12, color: 'var(--mid)' }}>
                  {m.sub}
                </div>
              )}
            </div>
            {!m.danger && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--soft)" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            )}
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
