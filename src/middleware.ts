import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

// Esta función puede ser marcada como `async` si se usa `await` dentro
export function middleware(request: NextRequest) {
  // Asumimos que tienes alguna forma de verificar si el usuario está autenticado
  // Por ejemplo, podrías verificar una cookie o un token en el header
  const isAuthenticated = checkAuthentication()

  // Si el usuario no está autenticado y la ruta no es /login, redirige a /login
  if (!isAuthenticated && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si el usuario está autenticado o la ruta es /login, permite que la solicitud continúe
  return NextResponse.next()
}

// Esta función es un placeholder. Deberías implementarla según tu lógica de autenticación
function checkAuthentication(): boolean {
  const cookiesStore = cookies()
  const token = cookiesStore.get('user')?.value

  if (!token) {
    return false
  }
  console.log(token.split("\"").join("")); 

  const payload = jwt.verify(token.split("\"").join(""), process.env.SIGNATURE as string)

  // Aquí iría tu lógica para verificar si el usuario está autenticado
  // Por ejemplo, podrías verificar una cookie o un token en el header
  console.log(payload)
  return true // Cambia esto según tu implementación
}

// Configura el middleware para que se ejecute en todas las rutas excepto en /login
export const config = {
  matcher: ['/((?!login).*)'],
}
