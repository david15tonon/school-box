import './globals.css'
import { StoreProvider } from '@/lib/store'

export const metadata = {
  title: 'SchoolBox',
  description: 'Trouve et commande tes fournitures scolaires facilement',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SchoolBox',
  },
  formatDetection: { telephone: false },
}

export const viewport = {
  themeColor: '#F07320',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        <StoreProvider>
          <div id="app-root" style={{
            maxWidth: '430px',
            margin: '0 auto',
            minHeight: '100vh',
            background: 'var(--bg)',
            position: 'relative',
            boxShadow: '0 0 60px rgba(0,0,0,0.15)',
          }}>
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  )
}
