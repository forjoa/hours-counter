'use client'

import Modal from '@/components/ui/Modal'
import { getCenterById } from '@/core/getCenterById'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin } from 'lucide-react'

interface Center {
  workcenterid?: number
  name: string
  userid: number
  createdat: string
}

export default function Page({ params }: { params: Promise<{ centerid: string }> }) {
  const [center, setCenter] = useState<Center | null>(null)
  const [centerName, setCenterName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const slug = (await params).centerid
        const data = await getCenterById(slug)
        setCenter(data)
        setCenterName(data.name)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching center')
      } finally {
        setLoading(false)
      }
    }

    fetchCenter()
  }, [params])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/center', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workcenterid: center?.workcenterid,
          name: centerName,
        }),
      })

      if (response.status === 409) {
        setError('Este centro ya existe')
        return
      }

      if (!response.ok) {
        throw new Error('Error al actualizar el centro')
      }

      router.push('/center-list')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Modal route='center-list'>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </Modal>
    )
  }

  if (error && !center) {
    return (
      <Modal route='center-list'>
        <div className="text-center py-8 text-red-600">{error}</div>
      </Modal>
    )
  }

  return (
    <Modal route='center-list'>
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Editar centro</h2>
          <p className="mt-2 text-sm text-gray-600">
            Actualiza el nombre del centro: <span className="font-medium text-gray-900">{center?.name}</span>
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label htmlFor="center" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Nombre del centro
              </div>
            </label>
            <input
              id='center'
              type='text'
              placeholder='Ej: Oficina principal'
              value={centerName}
              onChange={(e) => setCenterName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            <button 
              type='button'
              onClick={() => router.push('/center-list')}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type='submit'
              disabled={submitting}
              className="flex-1 px-4 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}