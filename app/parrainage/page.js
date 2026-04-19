'use client'
import BottomNav from '@/components/layout/BottomNav'

export default function ParrainagePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ padding: '54px 24px 16px', borderBottom: '1px solid var(--border)', background: 'white' }}>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--black)' }}>
          Parrainage
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 16 }}>
        <div style={{ fontSize: 52 }}>🎁</div>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: 700, color: 'var(--black)', textAlign: 'center' }}>
          Invite tes amis, gagne des réductions !
        </div>
        <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 14, color: 'var(--mid)', textAlign: 'center' }}>
          Pour chaque ami parrainé, vous gagnez tous les deux 500 FCFA de réduction.
        </p>
        <div style={{
          background: 'var(--orange-pale)', border: '2px dashed var(--orange)',
          borderRadius: 16, padding: '20px 32px', textAlign: 'center',
          width: '100%',
        }}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, color: 'var(--mid)', marginBottom: 4, letterSpacing: 1 }}>
            TON CODE
          </div>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 24, fontWeight: 900, color: 'var(--orange)' }}>
            SCHOOL24
          </div>
        </div>
        <button style={{
          background: 'var(--orange)', color: 'white',
          border: 'none', borderRadius: 14, padding: '14px 32px',
          fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', width: '100%',
        }}>
          Partager mon code 🔗
        </button>
      </div>
      <BottomNav />
    </div>
  )
}
