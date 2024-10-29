import { turso } from "@/core/db"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const cookiesStore = await cookies()
  const formData = await request.formData()

  const newCenter = formData.get('center') as string 

  const { rows } = await turso.execute({
    sql: 'SELECT * FROM workcenter WHERE LOWER(name) = LOWER(?)', 
    args: [newCenter],
  })

  if (rows.length > 0) {
    cookiesStore.set('centerError', 'Este centro ya existe', { maxAge: 30 })
    return NextResponse.redirect(new URL('/new-center', request.url))
  }

  await turso.execute({
    sql: 'INSERT INTO workcenter (name) VALUES (?)',
    args: [newCenter],
  })

  cookiesStore.set('centerError', '', { maxAge: 30 })
  return NextResponse.redirect(new URL('/', request.url))
}
