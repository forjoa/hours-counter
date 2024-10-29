import { turso } from '@/core/db'
import { User } from '@/core/types'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const cookiesStore = await cookies()
  const formData = await request.formData()
  const token = cookiesStore.get('user')?.value
  const newCenter = formData.get('center') as string

  const secret = new TextEncoder().encode(process.env.SIGNATURE)

  if (!token) return

  const { payload } = await jwtVerify(token.split('"').join(''), secret)

  const user = payload as unknown as User

  const { rows } = await turso.execute({
    sql: 'SELECT * FROM workcenter WHERE LOWER(name) = LOWER(?) AND userid = ?',
    args: [newCenter, user.userid as number],
  })

  if (rows.length > 0) {
    cookiesStore.set('centerError', 'Este centro ya existe', { maxAge: 30 })
    return Response.redirect(new URL('/new-center', request.url))
  }

  await turso.execute({
    sql: 'INSERT INTO workcenter (name, userid) VALUES (?, ?)',
    args: [newCenter, user.userid as number],
  })

  cookiesStore.set('centerError', '', { maxAge: 30 })
  return Response.redirect(new URL('/', request.url))
}
