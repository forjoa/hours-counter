'use client'
import Main from '@/components/ui/Main'
import Modal from '@/components/ui/Modal'
import { WorkCenter } from '@/core/types'
import { useEffect, useState } from 'react'

export default function NewEntry() {
  const [centers, setCenters] = useState<WorkCenter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch('/api/get-centers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        setCenters(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCenters()
  }, [])

  if (isLoading)
    return (
      <Main>
        <div>Cargando...</div>
      </Main>
    )
  if (error)
    return (
      <Main>
        <div>Error: {error}</div>
      </Main>
    )

  return (
    <Modal>
      <h1 className='mt-2 font-bold'>Añadir horas de trabajo</h1>
      <span className='text-zinc-500'>
        Añade las horas trabajadas y el centro de trabajo en el que las
        realizaste.
      </span>

      <form
        action='/api/record'
        method='post'
        className='flex flex-col gap-4 mt-2'
      >
        <label
          htmlFor='date'
          className='relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
        >
          <input
            type='date'
            id='date'
            placeholder='Fecha'
            name='date'
            required
            className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm hover:cursor-text'
          />

          <span className='absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs'>
            Fecha
          </span>
        </label>

        <label
          htmlFor='starthour'
          className='relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
        >
          <input
            type='time'
            id='starthour'
            placeholder='Fecha'
            name='starthour'
            required
            className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm hover:cursor-text'
          />

          <span className='absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs'>
            Hora de inicio
          </span>
        </label>

        <label
          htmlFor='finishhour'
          className='relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
        >
          <input
            type='time'
            id='finishhour'
            placeholder='Fecha'
            name='finishhour'
            required
            className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm hover:cursor-text'
          />

          <span className='absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs'>
            Hora de fin
          </span>
        </label>

        <div>
          <select
            required
            name='workcenter'
            id='workcenter'
            className='mt-1.5 w-full p-3 rounded-lg border border-gray-200 text-gray-700 sm:text-sm'
          >
            <option value=''>Selecciona un centro</option>
            {centers.map((center: WorkCenter) => (
              <option key={center.workcenterid} value={center.workcenterid}>
                {center.name}
              </option>
            ))}
          </select>
        </div>

        <span className='text-zinc-500 text-sm'>
          * El siguiente campo no es obligatorio.
        </span>
        <label
          htmlFor='annotations'
          className='relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
        >
          <textarea
            id='annotations'
            placeholder='Nombre del centro'
            name='annotations'
            className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm hover:cursor-text'
          />

          <span className='absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs'>
            Anotaciones
          </span>
        </label>

        <button className='bg-zinc-700 py-2 rounded text-white' type='submit'>
          Añadir
        </button>
      </form>
    </Modal>
  )
}
