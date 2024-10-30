import { turso } from '@/core/db'
import { User } from '@/core/types'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const QUERY =
  'INSERT INTO hours (day, starttime, endtime, workcenterid, userid, annotations) VALUES (?, ?, ?, ?, ?, ?)'

export async function POST(request: Request) {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('user')?.value

  const formData = await request.formData()

  const day = formData.get('date') as string
  const starthour = formData.get('starthour') as string
  const finishhour = formData.get('finishhour') as string
  const workcenterid = formData.get('workcenter') as string
  const annotations = formData.get('annotations') as string

  const secret = new TextEncoder().encode(process.env.SIGNATURE)

  if (!token) return

  const { payload } = await jwtVerify(token.split('"').join(''), secret)

  const user = payload as unknown as User

  await turso.execute({
    sql: QUERY,
    args: [
      day,
      starthour,
      finishhour,
      workcenterid,
      user.userid as number,
      annotations,
    ],
  })

  return Response.redirect(new URL('/home', request.url))
}
