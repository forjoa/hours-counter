'use client'

import { useEffect, useState } from 'react'
import Main from '@/components/ui/Main'
import { WorkCenter } from '@/core/types'
import { useRouter } from 'next/navigation'
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react'

export default function CenterList() {
  const router = useRouter()
  const [centers, setCenters] = useState<WorkCenter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [centerToDelete, setCenterToDelete] = useState<number | null>(null)

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch('/api/center', {
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

  const handleDelete = async () => {
    if (!centerToDelete) return
    
    try {
      const response = await fetch(`/api/center?workcenterid=${centerToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Error al eliminar el centro')
      }

      setCenters(centers.filter(center => center.workcenterid !== centerToDelete))
      setCenterToDelete(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error eliminando centro')
      setCenterToDelete(null)
    }
  }

  if (isLoading)
    return (
      <Main>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </Main>
    )
  if (error)
    return (
      <Main>
        <div className="text-center py-8 text-red-600">{error}</div>
      </Main>
    )

  return (
    <Main>
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className='text-2xl font-semibold text-gray-900'>Centros de trabajo</h1>
              <p className='text-sm text-gray-500 mt-1'>
                {centers.length} centros registrados
              </p>
            </div>
            <button
              onClick={() => router.push('/new-center')}
              className="inline-flex items-center px-4 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo centro
            </button>
          </div>
        </div>

        <div className='space-y-3'>
          {centers.map((center: WorkCenter) => (
            <div
              key={center.workcenterid}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">{center.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Centro de trabajo</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      router.push(
                        `/center-list/edit-center/${center.workcenterid}`
                      )
                    }
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCenterToDelete(center.workcenterid as number)}
                    className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {centers.length === 0 && (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No hay centros</h3>
            <p className="text-sm text-gray-500">No tienes centros de trabajo registrados</p>
          </div>
        )}
      </div>

      {centerToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Eliminar centro?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Esta acción no se puede deshacer. Se eliminará permanentemente el centro de trabajo.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCenterToDelete(null)}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </Main>
  )
}