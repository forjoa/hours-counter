import {jwtVerify} from 'jose'
import {User} from '@/core/types'
import {cookies} from 'next/headers'
import {NextRequest} from 'next/server'

export async function getUserFromToken(request?: NextRequest) {
    const cookieStore = await cookies()
    try {
        const token = request
            ? request.cookies.get('user')?.value
            : cookieStore.get('user')?.value

        if (!token) return null

        const secret = new TextEncoder().encode(process.env.SIGNATURE)
        const {payload} = await jwtVerify(token.split('"').join(''), secret)

        return payload as unknown as User
    } catch (error) {
        return error
    }
}