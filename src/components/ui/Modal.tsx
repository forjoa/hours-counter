import { PropsWithChildren } from 'react'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

export default function Modal({ children }: PropsWithChildren) {
  return (
    <section className='bg-zinc-500/50 absolute top-0 left-0 right-0 bottom-0 w-screen h-screen grid place-items-center'>
      <div className='bg-white md:w-1/2 w-3/4 rounded max-h-3/4 overflow-auto p-6'>
        <Link href='/home' className='transition-all hover:pl-2'>
          <MoveLeft strokeWidth={1.5} className='transition-all hover:ml-2' />
        </Link>
        {children}
      </div>
    </section>
  )
}
