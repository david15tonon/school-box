'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if onboarding was done
    const done = localStorage.getItem('schoolbox-onboarded')
    if (done) {
      router.replace('/search')
    } else {
      router.replace('/onboarding')
    }
  }, [router])

  return (
    <div style={{
      height: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}></div>
        <div style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 20, fontWeight: 800,
          color: 'var(--orange)',
        }}>SchoolBox</div>
      </div>
    </div>
  )
}
