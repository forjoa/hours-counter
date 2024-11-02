import Main from "@/components/ui/Main";

export default function Layout() {
    return (
        <Main>
            <div className='border border-zinc-200 p-2 rounded'>
                <h1 className='font-bold'>Promedio de horas semanales</h1>
                <span
                    className='text-zinc-500'>Este es el promedio de las horas que has trabajado a la semana este mes.</span>
                {/*number of average weekly hours*/}
            </div>
            <div className='border border-zinc-200 p-2 rounded'>
                <h1 className='font-bold'>Total de horas este mes</h1>
                <span
                    className='text-zinc-500'>Número total de horas trabajas en el mes.</span>
                {/*number of total monthly hours*/}
            </div>
        </Main>
    )
}