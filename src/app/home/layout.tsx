import Main from "@/components/ui/Main";
import {ReactNode} from "react";
import {getMonthlyHours} from "@/core/getMonthlyHours";

export default async function Layout({
                                         children,
                                     }: Readonly<{
    children: ReactNode
}>) {
    const hours = await getMonthlyHours()

    let weeklyAverage
    let totalHours = 0

    hours?.map(hour => {
        const [startHours, startMinutes] = hour.starttime.split(':').map(Number)
        const [endHours, endMinutes] = hour.endtime.split(':').map(Number)

        const startTotalMinutes = startHours * 60 + startMinutes
        const endTotalMinutes = endHours * 60 + endMinutes

        const diffHours = (endTotalMinutes - startTotalMinutes) / 60
        totalHours += diffHours
        weeklyAverage = (totalHours / 7).toFixed(1)
    })
    return (
        <Main>
            {children}
            <section className='border border-zinc-200 p-4 shadow rounded mt-4'>
                <header>
                    <h1 className='font-bold'>Promedio de horas semanales</h1>
                </header>
                <main>
                <span
                    className='text-zinc-500'>Este es el promedio de las horas que has trabajado a la semana este mes.</span>
                    <p className='w-full text-center text-2xl font-bold'>{weeklyAverage}</p>
                </main>
            </section>
            <section className='border border-zinc-200 p-4 shadow rounded mt-4'>
                <header>
                    <h1 className='font-bold'>Total de horas este mes</h1>
                </header>
                <main>
                <span
                    className='text-zinc-500'>Número total de horas trabajas en el mes.</span>
                    <p className='w-full text-center text-2xl font-bold'>{totalHours}</p>
                </main>
            </section>
        </Main>
    )
}