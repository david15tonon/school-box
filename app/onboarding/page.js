'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BtnPrimary, BtnSecondary } from '@/components/ui'

const SLIDES = [
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="20" width="48" height="36" rx="6" stroke="#F07320" strokeWidth="3.5" fill="none"/>
        <path d="M22 20V16a10 10 0 0 1 20 0v4" stroke="#F07320" strokeWidth="3.5" strokeLinecap="round"/>
        <circle cx="25" cy="36" r="2.5" fill="#F07320"/>
        <circle cx="39" cy="36" r="2.5" fill="#F07320"/>
      </svg>
    ),
    iconBg: 'var(--orange-mist)',
    title: 'Trouve tes\nfournitures',
    desc: 'Recherche par école et classe pour trouver la liste officielle de fournitures.',
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path d="M32 8L54 20V44L32 56L10 44V20L32 8Z" stroke="#22C55E" strokeWidth="3" fill="none" strokeLinejoin="round"/>
        <path d="M32 8L32 56" stroke="#22C55E" strokeWidth="3" strokeLinecap="round"/>
        <path d="M10 20L54 20" stroke="#22C55E" strokeWidth="3" strokeLinecap="round"/>
        <path d="M10 20L32 32L54 20" stroke="#22C55E" strokeWidth="3" strokeLinejoin="round"/>
      </svg>
    ),
    iconBg: '#E0F9F0',
    title: 'Compose\nta box',
    desc: 'Choisis la qualité, la quantité et ajoute tout dans ta box personnalisée.',
  },
  {
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="4" y="20" width="38" height="26" rx="4" stroke="#F07320" strokeWidth="3.5" fill="none"/>
        <path d="M42 28h8l8 10v8h-16V28Z" stroke="#F07320" strokeWidth="3.5" strokeLinejoin="round" fill="none"/>
        <circle cx="16" cy="50" r="5" stroke="#F07320" strokeWidth="3" fill="white"/>
        <circle cx="50" cy="50" r="5" stroke="#F07320" strokeWidth="3" fill="white"/>
        <line x1="4" y1="32" x2="42" y2="32" stroke="#F07320" strokeWidth="2" strokeDasharray="3 3"/>
      </svg>
    ),
    iconBg: 'var(--orange-mist)',
    title: 'Reçois\nà domicile',
    desc: 'Livraison rapide en 24–48h directement chez toi. Simple et pratique !',
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const router = useRouter()
  const slide = SLIDES[step]

  const handleNext = () => {
    if (step < 2) setStep(step + 1)
  }

  const handleSkip = () => {
    localStorage.setItem('schoolbox-onboarded', '1')
    router.push('/search')
  }

  const handleSignup = () => {
    localStorage.setItem('schoolbox-onboarded', '1')
    router.push('/search')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '80px 32px 0',
    }} className="page-enter">
      {/* Body */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', flex: 1, gap: 0, paddingBottom: 40,
      }}>
        {/* Icon */}
        <div style={{
          width: 140, height: 140, borderRadius: 36,
          background: slide.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 40,
          transition: 'background .3s',
        }}>
          {slide.icon}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 26, fontWeight: 800,
          color: 'var(--black)', textAlign: 'center',
          marginBottom: 14, letterSpacing: '-.5px', lineHeight: 1.15,
          whiteSpace: 'pre-line',
        }}>
          {slide.title}
        </h1>

        {/* Desc */}
        <p style={{
          fontFamily: 'Raleway, sans-serif',
          fontSize: 15, color: 'var(--mid)',
          textAlign: 'center', lineHeight: 1.7, maxWidth: 260,
        }}>
          {slide.desc}
        </p>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 36 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: i === step ? 24 : 8, height: 8,
              borderRadius: 4,
              background: i === step ? 'var(--orange)' : 'var(--border)',
              transition: 'all .3s',
            }}/>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ width: '100%', paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {step < 2 ? (
          <>
            <BtnPrimary onClick={handleNext}>Suivant →</BtnPrimary>
            <button onClick={handleSkip} style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: 13,
              fontWeight: 600, color: 'var(--mid)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 8,
            }}>
              Passer
            </button>
          </>
        ) : (
          <>
            <BtnPrimary onClick={handleSignup}>S'inscrire</BtnPrimary>
            <BtnSecondary onClick={handleSignup}>Se connecter</BtnSecondary>
          </>
        )}
      </div>
    </div>
  )
}
