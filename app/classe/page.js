'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { CLASSES } from '@/lib/data'
import { BackBtn, BtnPrimary, SchoolIcon, LocationRow, VerifiedBadge } from '@/components/ui'

export default function ClassePage() {
  const router = useRouter()
  const { school, update } = useStore()
  const [selected, setSelected] = useState(null)

  const handleConfirm = () => {
    if (!selected) return
    update({ classe: selected })
    router.push('/fournitures')
  }

  if (!school) {
    router.replace('/search')
    return null
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}
      className="page-enter">

      {/* Header */}
      <div style={{
        background: 'var(--orange)',
        padding: '54px 24px 24px',
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <BackBtn onClick={() => router.push('/search')} light />
        <div style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 800,
          color: 'white', letterSpacing: '-.3px',
        }}>
          Sélection de classe
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

        {/* Selected school card */}
        <div style={{
          background: 'white', borderRadius: 16,
          border: '2px solid var(--orange)',
          padding: '16px 20px', margin: '16px 20px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 48, height: 48, background: 'var(--orange-mist)',
            borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <SchoolIcon />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600,
              color: 'var(--black)', marginBottom: 2,
            }}>
              {school.name}
            </div>
            <LocationRow city={school.city} />
            <button onClick={() => router.push('/search')} style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: 11,
              fontWeight: 700, color: 'var(--orange)',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 0, marginTop: 4, letterSpacing: '.3px',
            }}>
              Changer d'école
            </button>
          </div>
        </div>

        {/* Class grid */}
        <div style={{
          fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700,
          color: 'var(--black)', margin: '4px 20px 12px', letterSpacing: '.3px',
        }}>
          Sélectionne une classe
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: 8, padding: '0 20px',
        }}>
          {CLASSES.map(c => (
            <ClassBtn
              key={c.id}
              label={c.label}
              selected={selected?.id === c.id}
              onClick={() => setSelected(c)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      {selected && (
        <div style={{ padding: '16px 20px 24px', borderTop: '1px solid var(--border)' }}>
          <BtnPrimary onClick={handleConfirm}>
            Voir les fournitures →
          </BtnPrimary>
        </div>
      )}
    </div>
  )
}

function ClassBtn({ label, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: selected ? 'var(--orange)' : 'white',
      border: `1.5px solid ${selected ? 'var(--orange)' : 'var(--border)'}`,
      borderRadius: 14,
      padding: '18px 8px',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 15, fontWeight: 700,
      color: selected ? 'white' : 'var(--ink)',
      cursor: 'pointer', textAlign: 'center',
      transition: 'all .2s',
    }}>
      {label}
    </button>
  )
}
