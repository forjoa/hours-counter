import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { id, name, hours } = await request.json()
  console.log(id, name, hours)

  return NextResponse.json({ id, name, hours })
}