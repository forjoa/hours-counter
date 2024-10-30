import { turso } from '@/core/db'
import { User } from '@/core/types'
import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('user')?.value

  const secret = new TextEncoder().encode(process.env.SIGNATURE)

  if (!token) return

  const { payload } = await jwtVerify(token.split('"').join(''), secret)

  const user = payload as unknown as User

  const { rows } = await turso.execute({
    sql: 'SELECT * FROM workcenter WHERE userid = ?',
    args: [user.userid as number],
  })

  return NextResponse.json(rows)
}