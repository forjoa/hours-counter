import { PropsWithChildren } from 'react'

export default function Main({ children }: PropsWithChildren) {
  return (
    <main className='md:ml-[20rem] md:mt-4 mt-16 md:mb-4 mb-8 md:mr-4 mr-4 ml-4'>
      <div className="mx-auto max-w-7xl bg-[#fafafa] min-h-screen p-6">
        {children}
      </div>
    </main>
  )
}