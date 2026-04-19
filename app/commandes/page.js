'use client'
import BottomNav from '@/components/layout/BottomNav'

export default function CommandesPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ padding: '54px 24px 16px', borderBottom: '1px solid var(--border)', background: 'white' }}>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--black)' }}>
          Mes Commandes
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🛍️</div>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: 700, color: 'var(--black)', marginBottom: 8, textAlign: 'center' }}>
          Aucune commande
        </div>
        <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 14, color: 'var(--mid)', textAlign: 'center' }}>
          Tes commandes apparaîtront ici après validation de ta box.
        </p>
      </div>
      <BottomNav />
    </div>
  )
}
