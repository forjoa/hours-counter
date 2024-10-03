import { CirclePlus, House, LayoutDashboard, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Link {
  href: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  text: string
}

const navLinks: Link[] = [
  { href: '/', icon: House, text: 'Inicio' },
  { href: '/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
  { href: '/dashboard/new-entry', icon: CirclePlus, text: 'Añadir' },
]

export default function Nav() {
  return (
    <nav className='flex flex-col items-center justify-between flex-wrap p-6 rounded m-6 border border-zinc-400 min-h-[calc(100vh-3rem)]'>
      <div className='flex flex-col gap-4 items-center'>
        <header className='flex items-center gap-4'>
          <Image
            src='/reloj.png'
            alt='Logo'
            className='w-8 h-8 rounded-full'
            width={64}
            height={64}
          />
          <h1 className='font-bold text-black text-lg'>Hours Counter</h1>
        </header>
        <ul className='flex flex-col gap-4 text-black w-full'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                className='flex align-center gap-2 transition-all hover:gap-3 hover:font-bold'
                href={link.href}
              >
                <link.icon strokeWidth='1.25' />
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className='flex align-center gap-2 text-red-500'>
          <LogOut strokeWidth='1.25' />
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}
