import Modal from '@/components/ui/Modal'

export default function NewEntry() {
  return (
    <Modal>
      <h1 className='mt-2 font-bold'>Añadir horas de trabajo</h1>
      <span className='text-zinc-500'>
        Añade las horas trabajadas y el centro de trabajo en el que las
        realizaste.
      </span>

      <form
        action='/api/add-center'
        method='post'
        className='flex flex-col gap-4 mt-2'
      >
        <label
          htmlFor='date'
          className='relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
        >
          <input
            type='date'
            id='date'
            placeholder='Fecha'
            name='date'
            className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm hover:cursor-text'
          />

          <span className='absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs'>
            Fecha
          </span>
        </label>

        <label
          htmlFor='starthour'
          className='relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
        >
          <input
            type='time'
            id='starthour'
            placeholder='Fecha'
            name='starthour'
            className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm hover:cursor-text'
          />

          <span className='absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs'>
            Hora de inicio
          </span>
        </label>

        <label
          htmlFor='finishhour'
          className='relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
        >
          <input
            type='time'
            id='finishhour'
            placeholder='Fecha'
            name='finishhour'
            className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm hover:cursor-text'
          />

          <span className='absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs'>
            Hora de fin
          </span>
        </label>

        <div>
          <select
            name='workcenter'
            id='workcenter'
            className='mt-1.5 w-full p-3 rounded-lg border border-gray-200 text-gray-700 sm:text-sm'
          >
            <option value=''>Selecciona un centro</option>
            <option value='JM'>John Mayer</option>
            <option value='SRV'>Stevie Ray Vaughn</option>
            <option value='JH'>Jimi Hendrix</option>
            <option value='BBK'>B.B King</option>
            <option value='AK'>Albert King</option>
            <option value='BG'>Buddy Guy</option>
            <option value='EC'>Eric Clapton</option>
          </select>
        </div>

        <span className='text-zinc-500'>
          * El siguiente campo no es obligatorio.
        </span>
        <label
          htmlFor='annotations'
          className='relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
        >
          <textarea
            id='annotations'
            placeholder='Nombre del centro'
            name='annotations'
            className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm hover:cursor-text'
          />

          <span className='absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs'>
            Anotaciones
          </span>
        </label>

        <button className='bg-zinc-700 py-2 rounded text-white' type='submit'>
          Añadir
        </button>
      </form>
    </Modal>
  )
}
