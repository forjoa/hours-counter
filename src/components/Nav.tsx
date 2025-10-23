'use client'
import React, { useState, useEffect } from 'react'
import {
  CirclePlus,
  House,
  LogOut,
  BriefcaseBusiness,
  List,
  Menu,
  X,
  LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLink {
  href: string
  icon: LucideIcon
  text: string
}

const navLinks: NavLink[] = [
  { href: '/home', icon: House, text: 'Inicio' },
  { href: '/new-entry', icon: CirclePlus, text: 'Añadir horas' },
  { href: '/new-center', icon: BriefcaseBusiness, text: 'Añadir centro' },
  { href: '/center-list', icon: List, text: 'Lista de centros' },
]

export default function Nav() {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (!isClient) return null

  const isActiveLink = (href: string) => {
    if (href === '/home') return pathname === '/home' || pathname === '/'
    return pathname?.startsWith(href)
  }

  const NavContent = () => (
    <div className='flex flex-col h-full bg-white'>
      <div className="p-6 border-b border-gray-200">
        <div className='flex items-center gap-3'>
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <Image
              src='/reloj.png'
              alt='Logo'
              className='w-6 h-6'
              width={24}
              height={24}
            />
          </div>
          <h1 className='font-semibold text-gray-900 text-lg'>Hours Counter</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <ul className='flex flex-col gap-1'>
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href)
            return (
              <li key={link.href}>
                <Link
                  className={`flex items-center gap-3 py-2.5 px-4 rounded-lg transition-all ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  href={link.href}
                >
                  <link.icon size={20} strokeWidth={2} />
                  <span className="text-sm font-medium">{link.text}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="p-3 border-t border-gray-200">
        <button className='flex items-center gap-3 w-full py-2.5 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors'>
          <LogOut size={20} strokeWidth={2} />
          <span className="text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className='p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm'
          >
            <Menu size={24} strokeWidth={2} className="text-gray-700" />
          </button>
        </div>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed left-0 top-0 bottom-0 w-64 z-50 shadow-xl animate-in slide-in-from-left duration-200">
              <div className="relative h-full">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
                >
                  <X size={20} className="text-gray-700" />
                </button>
                <NavContent />
              </div>
            </div>
          </>
        )}
      </>
    )
  }

  return (
    <nav className="w-64 fixed left-4 top-4 bottom-4 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <NavContent />
    </nav>
  )
}