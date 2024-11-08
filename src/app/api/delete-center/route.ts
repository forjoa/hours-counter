import { turso } from '@/core/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const workcenterid = new URL(request.url).searchParams.get('workcenterid')

  await turso.execute({
    sql: 'DELETE FROM workcenter WHERE workcenterid = ?',
    args: [workcenterid],
  })

  return NextResponse.redirect(new URL('/center-list', request.url))
}
