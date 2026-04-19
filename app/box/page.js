'use client'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { SUPPLIES, formatPrice } from '@/lib/data'
import { BackBtn, BtnPrimary, QtyControl } from '@/components/ui'
import BottomNav from '@/components/layout/BottomNav'

const DELIVERY = 500
const TOTAL_ITEMS = SUPPLIES.length

export default function BoxPage() {
  const router = useRouter()
  const { box, removeFromBox, updateQty, boxTotal, boxCount } = useStore()

  const grandTotal = box.length > 0 ? boxTotal + DELIVERY : 0
  const progress = Math.min((boxCount / TOTAL_ITEMS) * 100, 100)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}
      className="page-enter">

      {/* Header */}
      <div style={{
        background: 'var(--bg)',
        padding: '54px 24px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 40,
      }}>
        <BackBtn onClick={() => router.back()} />
        <div style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 20, fontWeight: 800, color: 'var(--black)',
        }}>
          Ma Box 
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>

        {/* Progress */}
        <div style={{ background: 'white', borderRadius: 16, padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: 13, color: 'var(--mid)' }}>
              Articles dans ta box
            </span>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--black)' }}>
              {boxCount} article{boxCount > 1 ? 's' : ''}
            </span>
          </div>
          <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%', background: 'var(--orange)',
              borderRadius: 3, width: `${Math.max(progress, box.length > 0 ? 4 : 0)}%`,
              transition: 'width .4s ease',
            }}/>
          </div>
        </div>

        {/* Empty state */}
        {box.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}></div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 16, fontWeight: 700, color: 'var(--black)', marginBottom: 8 }}>
              Ta box est vide
            </div>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 14, color: 'var(--mid)', marginBottom: 24 }}>
              Ajoute des fournitures depuis la liste de ta classe
            </p>
            <button onClick={() => router.push('/fournitures')} style={{
              background: 'var(--orange)', color: 'white',
              border: 'none', borderRadius: 12, padding: '12px 24px',
              fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700,
              cursor: 'pointer',
            }}>
              Voir les fournitures →
            </button>
          </div>
        )}

        {/* Items */}
        {box.map(item => (
          <BoxItem key={`${item.id}-${item.quality}`} item={item}
            onRemove={() => removeFromBox(item.id, item.quality)}
            onQtyChange={(qty) => updateQty(item.id, item.quality, qty)}
          />
        ))}

        {/* Summary */}
        {box.length > 0 && (
          <div style={{ background: 'white', borderRadius: 16, padding: 20 }}>
            <SumRow label="Sous-total" value={formatPrice(boxTotal)} />
            <SumRow label="Frais de livraison" value={formatPrice(DELIVERY)} />
            <SumRow label="Total" value={formatPrice(grandTotal)} isTotal />
          </div>
        )}
      </div>

      {/* Footer */}
      {box.length > 0 && (
        <div style={{
          padding: '16px 20px', background: 'var(--bg)',
          borderTop: '1px solid var(--border)',
        }}>
          <BtnPrimary>Valider ma box </BtnPrimary>
        </div>
      )}

      <BottomNav />
    </div>
  )
}

function BoxItem({ item, onRemove, onQtyChange }) {
  return (
    <div style={{
      background: 'white', borderRadius: 16, padding: 16,
      display: 'flex', alignItems: 'center', gap: 12, position: 'relative',
    }}>
      {/* Emoji icon */}
      <div style={{
        width: 60, height: 60, borderRadius: 12, background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, flexShrink: 0,
      }}>
        {item.emoji}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--black)', marginBottom: 4 }}>
          {item.name}
        </div>
        <span style={{
          display: 'inline-block',
          fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700,
          letterSpacing: '1px', textTransform: 'uppercase',
          color: 'var(--mid)', background: 'var(--bg)',
          border: '1px solid var(--border)', borderRadius: 6,
          padding: '2px 8px', marginBottom: 8,
        }}>
          {item.quality}
        </span>
        <QtyControl
          qty={item.qty}
          onMinus={() => onQtyChange(item.qty - 1)}
          onPlus={() => onQtyChange(item.qty + 1)}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', alignSelf: 'stretch' }}>
        <button onClick={onRemove} style={{
          width: 24, height: 24, borderRadius: 8,
          background: 'var(--bg)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: 'var(--mid)',
        }}>×</button>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 800, color: 'var(--orange)' }}>
          {formatPrice(item.price * item.qty)}
        </div>
      </div>
    </div>
  )
}

function SumRow({ label, value, isTotal }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '8px 0',
      borderBottom: isTotal ? 'none' : '1px solid var(--border)',
    }}>
      <span style={{
        fontFamily: isTotal ? 'Montserrat, sans-serif' : 'Raleway, sans-serif',
        fontSize: isTotal ? 15 : 13,
        fontWeight: isTotal ? 700 : 400,
        color: isTotal ? 'var(--black)' : 'var(--mid)',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: isTotal ? 18 : 13,
        fontWeight: isTotal ? 800 : 600,
        color: isTotal ? 'var(--orange)' : 'var(--ink)',
      }}>
        {value}
      </span>
    </div>
  )
}
