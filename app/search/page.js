'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { SCHOOLS } from '@/lib/data'
import { SchoolIcon, VerifiedBadge, LocationRow } from '@/components/ui'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const { update } = useStore()

  const filtered = SCHOOLS.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.city.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (school) => {
    update({ school, classe: null })
    router.push('/classe')
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
        <div style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 18, fontWeight: 800,
          color: 'white', letterSpacing: '-.3px',
        }}>
          Rechercher une école
        </div>
      </div>

      {/* Search bar */}
      <div style={{ background: 'var(--orange)', padding: '0 24px 20px' }}>
        <div style={{ position: 'relative' }}>
          <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#AAA" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Nom de l'école..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%', background: 'white', border: 'none', borderRadius: 14,
              padding: '14px 16px 14px 44px',
              fontFamily: 'Raleway, sans-serif', fontSize: 14, color: 'var(--ink)',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Results */}
      <div style={{
        flex: 1, background: 'var(--bg)',
        padding: '16px 20px',
        display: 'flex', flexDirection: 'column', gap: 8,
        overflowY: 'auto',
      }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--mid)' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🏫</div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 600 }}>
              Aucune école trouvée
            </div>
          </div>
        ) : filtered.map(school => (
          <SchoolCard key={school.id} school={school} onClick={() => handleSelect(school)} />
        ))}
      </div>
    </div>
  )
}

function SchoolCard({ school, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'white', borderRadius: 16,
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', gap: 14,
        cursor: 'pointer',
        border: `1.5px solid ${hover ? 'var(--orange)' : 'transparent'}`,
        transition: 'border-color .2s',
        textAlign: 'left', width: '100%',
      }}
    >
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
        {school.validated && (
          <div style={{ marginTop: 4 }}>
            <VerifiedBadge />
          </div>
        )}
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="var(--soft)" strokeWidth="2" strokeLinecap="round">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>
  )
}
