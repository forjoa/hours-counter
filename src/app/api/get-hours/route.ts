import { NextRequest, NextResponse } from 'next/server'
import { getUserFromToken } from '@/core/getToken'
import { turso } from '@/core/db'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { month, workcenterid } = body

  const user = await getUserFromToken()

  if (!user) return

  let query = `
        SELECT h.*, wc.name 
        FROM hours h 
        JOIN workcenter wc ON h.workcenterid = wc.workcenterid 
        WHERE h.userid = ? 
        AND h.day LIKE ?
    `

  const args = [user.userid as number, `${month}%`]

  if (workcenterid) {
    query += ' AND h.workcenterid = ?'
    args.push(workcenterid)
  }

  const { rows } = await turso.execute({
    sql: query,
    args,
  })

  return NextResponse.json(rows)
}
