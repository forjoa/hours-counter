import Main from '@/components/ui/Main'

export default function Home() {
  return (
    <Main>
      <div className='min-h-96 flex items-center justify-center'>
        <div className="text-center space-y-4">
          <h1 className='text-3xl font-semibold text-foreground'>Hours Counter</h1>
          <p className='text-muted-foreground'>Inicia sesión para continuar</p>
        </div>
      </div>
    </Main>
  )
}
