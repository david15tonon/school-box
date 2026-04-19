'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { SUPPLIES, formatPrice } from '@/lib/data'
import { BackBtn, TabBar, BtnPrimary, Badge } from '@/components/ui'

const TABS = [
  { value: 'all', label: 'Tous' },
  { value: 'obligatoire', label: 'Obligatoire' },
  { value: 'optionnel', label: 'Optionnel' },
]

export default function FournituresPage() {
  const router = useRouter()
  const { school, classe, addToBox, box, boxCount } = useStore()
  const [tab, setTab] = useState('all')
  const [added, setAdded] = useState({}) // itemId -> quality just added, for animation

  const filtered = useMemo(() =>
    tab === 'all' ? SUPPLIES : SUPPLIES.filter(s => s.category === tab),
    [tab]
  )

  const handleAdd = (item, quality) => {
    const price = quality === 'premium' ? item.pricePrem : item.priceStd
    addToBox({ id: item.id, name: item.name, price, qty: 1, quality, emoji: item.emoji })
    setAdded(prev => ({ ...prev, [`${item.id}-${quality}`]: true }))
    setTimeout(() => setAdded(prev => {
      const n = { ...prev }
      delete n[`${item.id}-${quality}`]
      return n
    }), 1200)
  }

  const getBoxQty = (item) => {
    return box
      .filter(b => b.id === item.id)
      .reduce((s, b) => s + b.qty, 0)
  }

  if (!school || !classe) {
    router.replace('/search')
    return null
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}
      className="page-enter">

      {/* Header */}
      <div style={{
        background: 'var(--black)',
        padding: '54px 20px 0',
        position: 'sticky', top: 0, zIndex: 40,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <BackBtn onClick={() => router.push('/classe')} light />
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 17, fontWeight: 800, color: 'white',
            }}>
              Fournitures
            </div>
            <div style={{
              fontFamily: 'Raleway, sans-serif',
              fontSize: 12, color: 'rgba(255,255,255,0.6)',
            }}>
              {school.name} — {classe.label}
            </div>
          </div>

          {/* Box button */}
          <button onClick={() => router.push('/box')} style={{
            position: 'relative',
            width: 40, height: 40, borderRadius: 12,
            background: 'var(--orange)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
            {boxCount > 0 && (
              <span style={{
                position: 'absolute', top: -4, right: -4,
                background: 'white', color: 'var(--orange)',
                borderRadius: 10, fontSize: 9, fontWeight: 800,
                fontFamily: 'Montserrat, sans-serif',
                minWidth: 17, height: 17,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 3px',
              }}>
                {boxCount}
              </span>
            )}
          </button>
        </div>

        {/* Tabs */}
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
      </div>

      {/* Grid */}
      <div style={{
        flex: 1, padding: '0 0 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1px',
        background: 'var(--border)',
        alignContent: 'start',
      }}>
        {filtered.map(item => (
          <SupplyCard
            key={item.id}
            item={item}
            onAdd={handleAdd}
            addedStd={!!added[`${item.id}-standard`]}
            addedPrem={!!added[`${item.id}-premium`]}
            qtyInBox={getBoxQty(item)}
          />
        ))}
      </div>

      {/* Sticky box footer */}
      {boxCount > 0 && (
        <div style={{
          position: 'sticky', bottom: 0,
          padding: '12px 20px',
          background: 'white',
          borderTop: '1px solid var(--border)',
          zIndex: 40,
        }}>
          <BtnPrimary onClick={() => router.push('/box')}>
             Voir ma box ({boxCount} article{boxCount > 1 ? 's' : ''})
          </BtnPrimary>
        </div>
      )}
    </div>
  )
}

function SupplyCard({ item, onAdd, addedStd, addedPrem, qtyInBox }) {
  const [quality, setQuality] = useState('standard')
  const price = quality === 'premium' ? item.pricePrem : item.priceStd
  const isAdded = quality === 'standard' ? addedStd : addedPrem

  return (
    <div style={{
      background: 'white',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden' }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        {/* Category badge */}
        <div style={{ position: 'absolute', top: 8, left: 8 }}>
          <Badge color={item.required ? 'orange' : 'teal'}>
            {item.required ? 'Obligatoire' : 'Optionnel'}
          </Badge>
        </div>
        {/* "Sous-titré" badge */}
        {item.badge && (
          <div style={{ position: 'absolute', top: 8, right: 8 }}>
            <Badge color="gray">{item.badge}</Badge>
          </div>
        )}
        {/* In-box indicator */}
        {qtyInBox > 0 && (
          <div style={{
            position: 'absolute', bottom: 8, right: 8,
            background: 'var(--green)', color: 'white',
            borderRadius: 10, fontSize: 9, fontWeight: 800,
            fontFamily: 'Montserrat, sans-serif',
            padding: '3px 8px',
          }}>
            ✓ ×{qtyInBox}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '12px 12px 14px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <div style={{
          fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
          color: 'var(--black)', lineHeight: 1.3,
        }}>
          {item.name}
        </div>

        {/* Quality toggle */}
        <div style={{
          display: 'flex',
          background: 'var(--bg)',
          borderRadius: 8,
          padding: 2,
          border: '1px solid var(--border)',
        }}>
          <ToggleBtn active={quality === 'standard'} onClick={() => setQuality('standard')}>
            Standard
          </ToggleBtn>
          <ToggleBtn active={quality === 'premium'} onClick={() => setQuality('premium')}>
            ✦ Premium
          </ToggleBtn>
        </div>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 800,
            color: 'var(--orange)',
          }}>
            {formatPrice(price)}
          </span>
        </div>

        {/* Add button */}
        <button
          onClick={() => onAdd(item, quality)}
          style={{
            width: '100%',
            padding: '10px 8px',
            background: isAdded ? 'var(--green)' : 'var(--orange)',
            color: 'white',
            border: 'none', borderRadius: 10,
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 11, fontWeight: 700,
            letterSpacing: '.5px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            transition: 'background .25s, transform .1s',
            transform: isAdded ? 'scale(0.97)' : 'scale(1)',
          }}
        >
          {isAdded ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Ajouté !
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Ajouter à ma box
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function ToggleBtn({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '5px 4px',
      background: active ? 'white' : 'transparent',
      border: active ? '1px solid var(--border)' : '1px solid transparent',
      borderRadius: 6,
      fontFamily: 'Montserrat, sans-serif', fontSize: 9,
      fontWeight: 700, letterSpacing: '.5px',
      color: active ? 'var(--ink)' : 'var(--soft)',
      cursor: 'pointer',
      transition: 'all .15s',
      boxShadow: active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </button>
  )
}
