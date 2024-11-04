'use client'

import { useEffect, useState } from 'react'
import Main from '@/components/ui/Main'
import { WorkCenter } from '@/core/types'

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
    <Main>
      <h1 className='font-bold'>Centros de trabajo</h1>
      <span className='text-zinc-500'>
        Esta es toda tu lista de centros de trabajo
      </span>

      <div className='overflow-x-auto rounded-lg border border-gray-200 mt-2'>
        <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
          <thead className='ltr:text-left rtl:text-right'>
            <tr>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                Centro
              </th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200'>
            {centers.map((center: WorkCenter) => (
              <tr key={center.workcenterid}>
                <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                  {center.name}
                </td>
                <td className='whitespace-nowrap px-4 py-2 flex justify-center gap-2'>
                  <button className='py-1 px-2 bg-blue-500 text-white rounded'>
                    Editar
                  </button>
                  <button className='py-1 px-2 bg-red-500 text-white rounded'>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Main>
  )
}
