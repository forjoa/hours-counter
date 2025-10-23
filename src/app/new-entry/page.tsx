'use client'
import Modal from '@/components/ui/Modal'
import { WorkCenter } from '@/core/types'
import { useEffect, useState } from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'

export default function NewEntry() {
  const [centers, setCenters] = useState<WorkCenter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  if (isLoading)
    return (
      <Modal>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </Modal>
    )
  if (error)
    return (
      <Modal>
        <div className="text-center py-8 text-red-600">{error}</div>
      </Modal>
    )

  return (
    <Modal>
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Registrar horas</h2>
          <p className="mt-2 text-sm text-gray-600">
            Añade un nuevo registro de tiempo trabajado
          </p>
        </div>
        
        <form
          action='/api/record'
          method='post'
          className='space-y-5'
        >
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Fecha
              </div>
            </label>
            <input
              type='date'
              id='date'
              name='date'
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="starthour" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Inicio
                </div>
              </label>
              <input
                type='time'
                id='starthour'
                name='starthour'
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="finishhour" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Fin
                </div>
              </label>
              <input
                type='time'
                id='finishhour'
                name='finishhour'
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="workcenter" className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Centro de trabajo
              </div>
            </label>
            <select
              name="workcenter"
              id="workcenter"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="">Selecciona un centro</option>
              {centers.map((center: WorkCenter) => (
                <option key={center.workcenterid} value={String(center.workcenterid)}>
                  {center.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="annotations" className="block text-sm font-medium text-gray-700 mb-2">
              Anotaciones <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <textarea
              id='annotations'
              name='annotations'
              placeholder='Detalles adicionales sobre esta jornada...'
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
            />
          </div>

          <button
            type='submit'
            className="w-full px-4 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors mt-6"
          >
            Registrar horas
          </button>
        </form>
      </div>
    </Modal>
  )
}