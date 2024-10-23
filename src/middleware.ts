'use server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { turso } from './core/db'
import { User } from './core/types'

export async function middleware(request: NextRequest) {
  const isAuthenticated = await checkAuthentication(request)

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

async function checkAuthentication(request: NextRequest): Promise<boolean> {
  const cookiesStore = cookies()
  const token = cookiesStore.get('user')?.value

  if (
    request.nextUrl.pathname.startsWith('/api/login') ||
    request.nextUrl.pathname.startsWith('/login')
  ) {
    return true
  }

  if (!token) {
    return false
  }

  try {
    const secret = new TextEncoder().encode(process.env.SIGNATURE)
    const { payload } = await jwtVerify(token.split('"').join(''), secret)

    const user = payload as unknown as User

    const { rows } = await turso.execute({
      sql: 'SELECT * FROM users WHERE email = ? AND name = ?',
      args: [user.email, user.name],
    })

    if (rows.length === 0) {
      return false
    }

    return true
  } catch (error) {
    console.error('Token verification failed', error)
    return false
  }
}

export const config = {
  matcher: ['/((?!login).*)'],
}
