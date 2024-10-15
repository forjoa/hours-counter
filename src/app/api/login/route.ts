import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const mail = formData.get('mail')
  const password = formData.get('password')

  return NextResponse.json({ mail, password })
}
