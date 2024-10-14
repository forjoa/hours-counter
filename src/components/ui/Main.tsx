import { PropsWithChildren } from 'react'

export default function Main({ children }: PropsWithChildren) {
  return <main className='mt-6 mb-6 mr-6 bg-white rounded p-6 '>{children}</main>
}
