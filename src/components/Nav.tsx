'use client'
import React, { useState, useEffect } from 'react'
import {
  CirclePlus,
  House,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface NavLink {
  href: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  text: string
}

const navLinks: NavLink[] = [
  { href: '/', icon: House, text: 'Inicio' },
  { href: '/new-entry', icon: CirclePlus, text: 'Añadir' },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const NavContent = () => (
    <>
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
                onClick={() => isMobile && setIsOpen(false)}
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
    </>
  )

  if (!isClient) return null

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleMenu}
          className='fixed top-4 left-4 z-50 p-2 bg-white rounded shadow-md'
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}
      <nav
        className={`
        ${
          isMobile
            ? 'flex flex-col items-center justify-between fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 pt-20 pb-10'
            : 'flex flex-col items-center justify-between flex-wrap p-6 rounded m-6 bg-white min-h-[calc(100vh-3rem)]'
        }
        ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
      `}
      >
        {(!isMobile || isOpen) && <NavContent />}
      </nav>
    </>
  )
}
