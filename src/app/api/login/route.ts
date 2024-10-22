import { turso } from '@/core/db'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { ApiResponse, User } from '@/core/types'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function POST(
  request: Request
): Promise<NextResponse<ApiResponse>> {
  const cookiesStore = cookies()
  const formData = await request.formData()

  const mail = formData.get('mail') as string
  const password = formData.get('password') as string

  const { rows } = await turso.execute({
    sql: 'SELECT * FROM users WHERE email = ?',
    args: [mail],
  })

  const userInDb = rows[0] as unknown as User

  if (!userInDb) {
    return NextResponse.json({ message: 'No user found', success: false })
  }

  if (!(await bcrypt.compare(password, userInDb.password as string))) {
    return NextResponse.json({ message: 'Wrong password', success: false })
  }

  delete userInDb.password

  const token = jwt.sign(userInDb, process.env.SIGNATURE as string)

  cookiesStore.set('user', JSON.stringify(token))

  return NextResponse.json({ message: 'Login successful', success: true })
}
