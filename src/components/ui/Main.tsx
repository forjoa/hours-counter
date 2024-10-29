import { PropsWithChildren } from 'react'

export default function Main({ children }: PropsWithChildren) {
  return (
    <main className='md:mt-6 mt-16 md:mb-6 mb-12 md:mr-6 mr-4 ml-4 md:ml-0 bg-white rounded p-6 w-full overflow-auto md:w-[calc(100%-20rem)]'>
      {children}
    </main>
  )
}
