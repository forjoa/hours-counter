'use client'
import {useSearchParams, useRouter} from "next/navigation";
import {useEffect, useState, Suspense, ChangeEvent} from "react";
import {Hour, WorkCenter} from '@/core/types'
import Main from "@/components/ui/Main";

function HoursTable({hours}: { hours: Hour[] }) {
    return (
        <div className='overflow-x-auto rounded-lg border border-gray-200 mt-2'>
            <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
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
                {hours && hours.length > 0 && hours.map((hour: Hour) => {
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
                    const number = date.getDate()
                    const formattedDate = `${dia} ${number}`

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

function HoursContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [hours, setHours] = useState([]);
    const [centers, setCenters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCenters = async () => {
            try {
                const response = await fetch('/api/get-centers', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCenters(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCenters();
    }, []);

    useEffect(() => {
        const fetchHours = async () => {
            const month = searchParams.get('month') ?? new Date().toISOString().slice(0, 7);
            const workcenterid = searchParams.get('workcenterid');
            const body = workcenterid ? {month, workcenterid} : {month};

            const res = await fetch(`/api/get-hours`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const response = await res.json();
            setHours(response);
        };

        fetchHours();
    }, [searchParams]);

    if (isLoading)
        return (
            <Main>
                <div>Cargando...</div>
            </Main>
        );
    if (error)
        return (
            <Main>
                <div>Error: {error}</div>
            </Main>
        );

    const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
        const month = e.target.value;
        router.push(`?month=${month}`);
    };

    const handleCenterClick = (centerId: number) => {
        const month = searchParams.get('month') || new Date().toISOString().slice(0, 7);
        router.push(`?month=${month}&workcenterid=${centerId}`);
    };

    const selectedCenterId = searchParams.get('workcenterid');

    return (
        <div className="overflow-x-auto rounded border border-gray-200 p-2 mt-4">
            <header>
                <h1 className="font-bold">Listado de horas por centro</h1>
                <span className="text-zinc-500">
                    Las horas mostradas son las del centro y mes seleccionados.
                </span>
                <section className="flex gap-4 items-center w-full justify-end">
                    <label
                        className="block overflow-hidden rounded-md px-3 py-2 focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                        <span className="text-gray-700">Mes</span>
                        <input
                            type="month"
                            className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            onChange={handleMonthChange}
                        />
                    </label>
                </section>
                <nav className="mt-2 overflow-x-auto">
                    <div className="block">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex gap-6" aria-label="Tabs">
                                {centers.map((center: WorkCenter) => (
                                    <p
                                        key={center.workcenterid}
                                        onClick={() => handleCenterClick(center.workcenterid as number)}
                                        className={`relative shrink-0 px-1 pb-4 text-sm font-medium ${
                                            Number(selectedCenterId) === center.workcenterid
                                                ? 'font-bold text-black after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-1 after:w-full after:bg-black after:rounded-t-md'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                    >
                                        {center.name}
                                    </p>
                                ))}
                            </nav>
                        </div>
                    </div>
                </nav>
            </header>
            <HoursTable hours={hours ?? []}/>
        </div>
    )
}

export default function Home() {
    return (
        <Suspense fallback={
            <div className="overflow-x-auto rounded-lg border border-gray-200 p-2 mt-4">
                <p>Cargando datos...</p>
            </div>
        }>
            <HoursContent/>
        </Suspense>
    )
}