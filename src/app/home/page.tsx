'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense, ChangeEvent } from 'react'
import { Hour, WorkCenter } from '@/core/types'
import Main from '@/components/ui/Main'
import { Calendar, Clock, MapPin, Plus, Edit2, Trash2 } from 'lucide-react'

function HoursTable({ hours }: { hours: Hour[] }) {
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  if (!hours || hours.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <Clock className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No hay registros</h3>
        <p className="text-sm text-gray-500">No se encontraron horas para este periodo</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-3">
      {hours.map((hour: Hour) => {
        const [startHours, startMinutes] = hour.starttime.split(':').map(Number)
        const [endHours, endMinutes] = hour.endtime.split(':').map(Number)
        const startTotalMinutes = startHours * 60 + startMinutes
        const endTotalMinutes = endHours * 60 + endMinutes
        const diffHours = (endTotalMinutes - startTotalMinutes) / 60

        const date = new Date(hour.day)
        const dia = dias[date.getDay()]
        const number = date.getDate()

        return (
          <div
            key={hour.hourid}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-xs font-medium text-gray-500">{dia}</span>
                    <span className="text-lg font-semibold text-gray-900">{number}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{hour.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-500">Centro</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">{hour.starttime} - {hour.endtime}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{diffHours.toFixed(1)} horas</p>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-600">
                    {hour.annotations || (
                      <span className="text-gray-400 italic">Sin anotaciones</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function HoursContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [hours, setHours] = useState<Hour[]>([])
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

  useEffect(() => {
    const fetchHours = async () => {
      const month =
        searchParams.get('month') ?? new Date().toISOString().slice(0, 7)
      const workcenterid = searchParams.get('workcenterid')
      const body = workcenterid ? { month, workcenterid } : { month }

      const res = await fetch(`/api/get-hours`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const response = await res.json()
      setHours(response)
    }

    fetchHours()
  }, [searchParams])

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

  const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const month = e.target.value
    const centerId = searchParams.get('workcenterid')
    router.push(
      `?month=${month}` + (centerId ? `&workcenterid=${centerId}` : '')
    )
  }

  const handleCenterClick = (centerId: number) => {
    const month =
      searchParams.get('month') || new Date().toISOString().slice(0, 7)
    router.push(`?month=${month}&workcenterid=${centerId}`)
  }

  const handleViewAll = () => {
    const month =
      searchParams.get('month') || new Date().toISOString().slice(0, 7)
    router.push(`?month=${month}`)
  }

  const selectedCenterId = searchParams.get('workcenterid')

  const totalHours = hours.reduce((acc, hour) => {
    const [startH, startM] = hour.starttime.split(':').map(Number)
    const [endH, endM] = hour.endtime.split(':').map(Number)
    return acc + ((endH * 60 + endM) - (startH * 60 + startM)) / 60
  }, 0)

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Horas trabajadas</h1>
            <p className="text-sm text-gray-500 mt-1">
              {hours.length} registros · {totalHours.toFixed(1)}h totales
            </p>
          </div>
          <button
            onClick={() => router.push('/new-entry')}
            className="inline-flex items-center px-4 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Registrar horas
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <input
                type='month'
                className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                onChange={handleMonthChange}
                defaultValue={searchParams.get('month') ?? new Date().toISOString().slice(0, 7)}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex overflow-x-auto pb-2 gap-2">
        <button
          onClick={handleViewAll}
          className={`px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
            !selectedCenterId
              ? 'bg-black text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
          }`}
        >
          Todos
        </button>
        {centers.map((center: WorkCenter) => (
          <button
            key={center.workcenterid}
            onClick={() => handleCenterClick(center.workcenterid as number)}
            className={`px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
              Number(selectedCenterId) === center.workcenterid
                ? 'bg-black text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            {center.name}
          </button>
        ))}
      </div>
      
      <HoursTable hours={hours} />
    </div>
  )
}

export default function Home() {
  return (
    <Main>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        }
      >
        <HoursContent />
      </Suspense>
    </Main>
  )
}