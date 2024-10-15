import { turso } from '@/core/db'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  const formData = await request.formData()
  const mail = formData.get('mail') as string
  const password = formData.get('password') as string

  const { rows } = await turso.execute({
    sql: 'SELECT * FROM users WHERE email = ?',
    args: [mail],
  })

  const userInDb = rows[0]

  if (!userInDb) {
    return NextResponse.json({ message: 'No user found', success: false })
  }

  if (!(await bcrypt.compare(password, userInDb.password as string))) {
    return NextResponse.json({ message: 'Wrong password', success: false })
  }

  return NextResponse.json({ mail, password })
}
