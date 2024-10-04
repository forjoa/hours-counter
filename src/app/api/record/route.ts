import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { id, hours } = await request.json()
  console.log(id, hours)

  return NextResponse.json({ id, hours })
}