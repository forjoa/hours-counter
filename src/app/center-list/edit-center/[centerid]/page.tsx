import Modal from '@/components/ui/Modal'
import {getCenterById} from '@/core/getCenterById'
import {cookies} from "next/headers";

export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ centerid: string }>
}) {
    const slug = (await params).centerid
    const cookiesStore = await cookies()

    const error = cookiesStore.get('editCenterError')

    const center = await getCenterById(slug)

    return (
        <Modal route='center-list'>
            <h1 className='mt-2 font-bold'>Edita este centro de trabajo</h1>
            <span className='text-zinc-500'>
        Edita el nombre actual del centro de trabajo: {center.name}
      </span>
            <form
                action='/api/edit-center'
                method='post'
                className='flex flex-col gap-4 mt-2'
            >
                {error && <p className='text-red-500'>{error.value}</p>}
                <input
                    type='hidden'
                    name='workcenterid'
                    value={center.workcenterid}
                />
                <input
                    type='hidden'
                    name='userid'
                    value={center.userid}
                />
                <label
                    htmlFor='center'
                    className='relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
                >
                    <input
                        type='text'
                        id='center'
                        placeholder='Nombre del centro'
                        name='center'
                        className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm hover:cursor-text'
                    />

                    <span
                        className='absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs'>
            Nombre del centro
          </span>
                </label>
                <button className='bg-zinc-700 py-2 rounded text-white' type='submit'>
                    Editar
                </button>
            </form>
        </Modal>
    )
}
