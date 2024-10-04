import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
  const { id } = await request.json()
  console.log(id)

  return NextResponse.json(id)
}
