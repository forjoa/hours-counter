import { turso } from '@/core/db'
import { cookies } from 'next/headers'
import { getUserFromToken } from '@/core/getToken'

export async function POST(request: Request) {
  const cookiesStore = await cookies()
  const formData = await request.formData()
  const newCenter = formData.get('center') as string

  const user = await getUserFromToken()

  if (!user) return

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
  return Response.redirect(new URL('/center-list', request.url))
}