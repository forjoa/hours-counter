'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
    const pathname = useSearchParams();
    const [hours, setHours] = useState<any[]>()

    useEffect(() => {
        const fetchHours = async () => {
            const month = pathname.get('month') != null ? pathname.get('month') : new Date().toISOString().slice(0, 7)
            const res = await fetch(`/api/get-hours`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ month })
            });
            const response = await res.json();
            setHours(response)
        }

        fetchHours().then()
    }, []);

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 p-2">
            <header>
                <h1 className='font-bold'>Listado de horas por centro</h1>
                <span
                    className='text-zinc-500'>Las horas mostradas son las del centro y mes seleccionados.</span>
            </header>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Día</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Horario</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Total</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Centro</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Anotaciones</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {hours && hours.length > 0 && hours.map((hour: any) => {
                    const [startHours, startMinutes] = hour.starttime.split(':').map(Number)
                    const [endHours, endMinutes] = hour.endtime.split(':').map(Number)

                    const startTotalMinutes = startHours * 60 + startMinutes
                    const endTotalMinutes = endHours * 60 + endMinutes

                    const diffHours = (endTotalMinutes - startTotalMinutes) / 60

                    const dias = [
                        'Domingo',
                        'Lunes',
                        'Martes',
                        'Miércoles',
                        'Jueves',
                        'Viernes',
                        'Sábado'
                    ]

                    const date = new Date(hour.day)
                    const dia = dias[date.getDay()]
                    const numero = date.getDate()
                    const formattedDate = `${dia} ${numero}`

                    return (
                        <tr key={hour.hourid}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {formattedDate}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {hour.starttime} - {hour.endtime}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {diffHours.toFixed(1)}h
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {hour.name}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {hour.annotations ? hour.annotations : 'No hay anotación'}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}