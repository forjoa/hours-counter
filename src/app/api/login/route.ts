import { turso } from '@/core/db'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { User } from '@/core/types'
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'

export async function POST(
  request: Request
) {
  const cookiesStore = await cookies()
  const formData = await request.formData()

  const mail = formData.get('mail') as string
  const password = formData.get('password') as string

  const { rows } = await turso.execute({
    sql: 'SELECT * FROM users WHERE email = ?',
    args: [mail],
  })

  const userInDb = rows[0] as unknown as User

  if (!userInDb) {
    cookiesStore.set('loginError', 'n_u', { maxAge: 30 })
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (!(await bcrypt.compare(password, userInDb.password as string))) {
    cookiesStore.set('loginError', 'w_p', { maxAge: 30 }) 
    return NextResponse.redirect(new URL('/login', request.url))
  }

  delete userInDb.password

  const token = await new SignJWT({ ...userInDb })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1y')
    .sign(new TextEncoder().encode(process.env.SIGNATURE))

  cookiesStore.set('user', JSON.stringify(token))
  cookiesStore.delete('loginError')

  return Response.redirect(new URL('/home', request.url))
}
