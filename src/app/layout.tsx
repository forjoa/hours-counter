import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const aptos = localFont({
  src: './fonts/aptos.ttf',
  variable: '--font-aptos',
  weight: '100 900',
})

const aptosBold = localFont({
  src: './fonts/aptos-bold.ttf',
  variable: '--font-aptos-bold',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Hours Counter',
  description: 'Application to count your working hours',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${aptos.variable} ${aptosBold.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
