'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'

const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Accueil',
    href: '/',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke={active ? 'var(--orange)' : '#AAA'} strokeWidth="2" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 'box',
    label: 'Ma Box',
    href: '/box',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke={active ? 'var(--orange)' : '#AAA'} strokeWidth="2" strokeLinecap="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    badge: true,
  },
  {
    id: 'commandes',
    label: 'Commandes',
    href: '/commandes',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke={active ? 'var(--orange)' : '#AAA'} strokeWidth="2" strokeLinecap="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    id: 'parrainage',
    label: 'Parrainage',
    href: '/parrainage',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke={active ? 'var(--orange)' : '#AAA'} strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'profil',
    label: 'Profil',
    href: '/profil',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke={active ? 'var(--orange)' : '#AAA'} strokeWidth="2" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { boxCount } = useStore()

  return (
    <div style={{
      display: 'flex',
      background: 'white',
      borderTop: '1px solid var(--border)',
      paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      paddingTop: 8,
      position: 'sticky',
      bottom: 0,
      zIndex: 50,
    }}>
      {NAV_ITEMS.map(item => {
        const active = pathname === item.href ||
          (item.href !== '/' && pathname.startsWith(item.href))
        return (
          <button key={item.id} onClick={() => router.push(item.href)} style={{
            flex: 1,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '4px 0',
            background: 'none', border: 'none', cursor: 'pointer',
            position: 'relative',
          }}>
            <div style={{ position: 'relative' }}>
              {item.icon(active)}
              {item.badge && boxCount > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -6,
                  background: 'var(--orange)', color: 'white',
                  borderRadius: 10, fontSize: 9, fontWeight: 700,
                  fontFamily: 'Montserrat, sans-serif',
                  minWidth: 16, height: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 4px',
                }}>
                  {boxCount > 99 ? '99+' : boxCount}
                </span>
              )}
            </div>
            <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 9, fontWeight: 600, letterSpacing: '.5px',
              color: active ? 'var(--orange)' : 'var(--soft)',
            }}>
              {item.label}
            </span>
            {active && (
              <div style={{
                width: 5, height: 5, borderRadius: '50%',
                background: 'var(--orange)', marginTop: -2,
              }}/>
            )}
          </button>
        )
      })}
    </div>
  )
}
