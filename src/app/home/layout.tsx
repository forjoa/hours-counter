import Main from "@/components/ui/Main";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <Main>
            <section className='border border-zinc-200 p-2 rounded mt-4'>
                <header>
                    <h1 className='font-bold'>Promedio de horas semanales</h1>
                </header>
                <main>
                <span
                    className='text-zinc-500'>Este es el promedio de las horas que has trabajado a la semana este mes.</span>
                    {/*number of average weekly hours*/}
                </main>
            </section>
            <section className='border border-zinc-200 p-2 rounded mt-4'>
                <header>
                    <h1 className='font-bold'>Total de horas este mes</h1>
                </header>
                <main>
                <span
                    className='text-zinc-500'>Número total de horas trabajas en el mes.</span>
                    {/*number of total monthly hours*/}
                </main>
            </section>
            {children}
        </Main>
    )
}