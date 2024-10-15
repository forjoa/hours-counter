import Modal from '@/components/ui/Modal'

export default function Login() {
  return (
    <Modal>
      <h1 className='font-bold text-lg'>Login</h1>
      <form action='/api/login' method='post' className='flex flex-col gap-4 mt-4'>
        <label
          htmlFor='mail'
          className='relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
        >
          <input
            type='email'
            id='mail'
            placeholder='Email'
            name='mail'
            className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm hover:cursor-text'
          />

          <span className='absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs'>
            Email
          </span>
        </label>
        <label
          htmlFor='password'
          className='relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
        >
          <input
            type='password'
            id='password'
            placeholder='Password'
            name='password'
            className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm hover:cursor-text'
          />

          <span className='absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs'>
            Password
          </span>
        </label>
        <button className='bg-zinc-700 py-2 rounded text-white' type='submit'>
          Login
        </button>
      </form>
    </Modal>
  )
}
