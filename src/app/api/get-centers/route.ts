import { turso } from '@/core/db'
import { NextRequest, NextResponse } from 'next/server'
import { getUserFromToken } from '@/core/getToken'

export async function GET(request: NextRequest) {
  const user = await getUserFromToken(request)

  if (!user) return

  const { rows } = await turso.execute({
    sql: 'SELECT * FROM workcenter WHERE userid = ?',
    args: [user.userid as number],
  })

  return NextResponse.json(rows)
}
