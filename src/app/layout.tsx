import type { Metadata, Viewport } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Hours Counter',
  description: 'Aplicación para contabilizar horas de trabajo',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <head>
        <link rel='icon' href='/reloj.png' />
      </head>
      <body className='antialiased flex min-h-screen bg-background'>
        <Nav />
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  )
}
