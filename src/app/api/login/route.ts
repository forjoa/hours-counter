import { turso } from '@/core/db'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { ApiResponse, User } from '@/core/types'
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'

export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse | unknown>> {
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
    return NextResponse.redirect(new URL('/login?error=n_u', request.url))
  }

  if (!(await bcrypt.compare(password, userInDb.password as string))) {
    return NextResponse.redirect(new URL('/login?error=w_p', request.url))
  }

  delete userInDb.password

  const token = await new SignJWT({ ...userInDb })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1y')
    .sign(new TextEncoder().encode(process.env.SIGNATURE))

  cookiesStore.set('user', JSON.stringify(token))

  return NextResponse.redirect(new URL('/', request.url))
}
