import Main from '@/components/ui/Main'
import { ReactNode } from 'react'

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <Main>
      {children}
    </Main>
  )
}
