import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  console.log(email, password)

  return NextResponse.json({ email, password })
}