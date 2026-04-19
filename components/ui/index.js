'use client'

// ── Back button ──
export function BackBtn({ onClick, light = false }) {
  return (
    <button onClick={onClick} style={{
      width: 36, height: 36,
      borderRadius: 12,
      background: light ? 'rgba(255,255,255,0.2)' : 'var(--border)',
      border: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0,
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke={light ? 'white' : '#333'} strokeWidth="2.5" strokeLinecap="round">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
  )
}

// ── Primary button ──
export function BtnPrimary({ children, onClick, disabled, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', padding: '18px',
      background: disabled ? '#ccc' : 'var(--orange)',
      color: 'white', border: 'none', borderRadius: 16,
      fontFamily: 'Montserrat, sans-serif', fontSize: 15, fontWeight: 700,
      letterSpacing: '.5px', cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      transition: 'background .2s, transform .1s',
      ...style,
    }}
    onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = 'scale(0.98)' }}
    onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
    >
      {children}
    </button>
  )
}

// ── Secondary button ──
export function BtnSecondary({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '18px',
      background: 'transparent', color: 'var(--black)',
      border: '2px solid var(--border)', borderRadius: 16,
      fontFamily: 'Montserrat, sans-serif', fontSize: 15, fontWeight: 700,
      cursor: 'pointer', letterSpacing: '.5px',
    }}>
      {children}
    </button>
  )
}

// ── Badge ──
export function Badge({ children, color = 'orange' }) {
  const colors = {
    orange: { bg: 'var(--orange)', text: 'white' },
    green:  { bg: 'var(--green)',  text: 'white' },
    gray:   { bg: 'var(--border)', text: 'var(--mid)' },
    teal:   { bg: '#0DAFB8',       text: 'white' },
  }
  const c = colors[color] || colors.orange
  return (
    <span style={{
      display: 'inline-block',
      background: c.bg, color: c.text,
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 9, fontWeight: 700,
      letterSpacing: '1px', textTransform: 'uppercase',
      borderRadius: 6, padding: '3px 8px',
    }}>
      {children}
    </span>
  )
}

// ── School icon ──
export function SchoolIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="var(--orange)" strokeWidth="2" strokeLinecap="round">
      <path d="M2 20h20M4 20V10L12 4l8 6v10M9 20v-5h6v5"/>
    </svg>
  )
}

// ── Verified badge ──
export function VerifiedBadge() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4,
      fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 700,
      color: 'var(--green)', letterSpacing: '.3px' }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
        stroke="var(--green)" strokeWidth="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      Liste officielle validée
    </div>
  )
}

// ── Location row ──
export function LocationRow({ city }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4,
      fontFamily: 'Raleway, sans-serif', fontSize: 12, color: 'var(--mid)' }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
        stroke="#AAA" strokeWidth="2">
        <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
      {city}
    </div>
  )
}

// ── Quantity control ──
export function QtyControl({ qty, onMinus, onPlus }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button onClick={onMinus} style={{
        width: 28, height: 28, borderRadius: 8,
        background: 'var(--bg)', border: '1.5px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: 16, fontWeight: 700, color: 'var(--ink)',
      }}>−</button>
      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 14,
        fontWeight: 700, color: 'var(--black)', minWidth: 16, textAlign: 'center' }}>
        {qty}
      </span>
      <button onClick={onPlus} style={{
        width: 28, height: 28, borderRadius: 8,
        background: 'var(--orange)', border: '1.5px solid var(--orange)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: 16, fontWeight: 700, color: 'white',
      }}>+</button>
    </div>
  )
}

// ── Tab bar ──
export function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{
      display: 'flex', gap: 6, padding: '0 20px 16px',
      overflowX: 'auto', flexShrink: 0,
    }}>
      {tabs.map(t => (
        <button key={t.value} onClick={() => onChange(t.value)} style={{
          flexShrink: 0,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 11, fontWeight: 700, letterSpacing: '1px',
          textTransform: 'uppercase',
          padding: '8px 16px', borderRadius: 20,
          border: `1.5px solid ${active === t.value ? 'var(--orange)' : 'var(--border)'}`,
          background: active === t.value ? 'var(--orange)' : 'white',
          color: active === t.value ? 'white' : 'var(--mid)',
          cursor: 'pointer', transition: 'all .2s',
          whiteSpace: 'nowrap',
        }}>
          {t.label}
        </button>
      ))}
    </div>
  )
}
