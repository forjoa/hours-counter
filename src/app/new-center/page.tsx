'use client'
import Modal from '@/components/ui/Modal'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin } from 'lucide-react'

export default function NewCenter() {
  const [centerName, setCenterName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/center', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: centerName }),
      })

      if (response.status === 409) {
        setError('Este centro ya existe')
        return
      }

      if (!response.ok) {
        throw new Error('Error al crear el centro')
      }

      router.push('/center-list')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal route="center-list">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Añadir centro</h2>
          <p className="mt-2 text-sm text-gray-600">
            Escribe el nombre del nuevo centro de trabajo
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
          <button 
            type='submit'
            disabled={loading}
            className="w-full px-4 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mt-6"
          >
            {loading ? 'Procesando...' : 'Añadir centro'}
          </button>
        </form>
      </div>
    </Modal>
  )
}