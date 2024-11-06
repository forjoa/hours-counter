import {turso} from "@/core/db";
import {cookies} from "next/headers";

export async function POST(request: Request) {
    const cookiesStore = await cookies()
    const formData = await request.formData()
    const workcenterid = formData.get('workcenterid') as string
    const name = formData.get('center') as string
    const userid = formData.get('userid') as string

    const { rows } = await turso.execute({
        sql: 'SELECT * FROM workcenter WHERE LOWER(name) = LOWER(?) AND userid = ?',
        args: [name, userid],
    })

    if (rows.length > 0) {
        cookiesStore.set('editCenterError', 'Este centro ya existe', { maxAge: 30 })
        return Response.redirect(new URL(`/center-list/edit-center/${workcenterid}`, request.url))
    }

    await turso.execute({
        sql: 'UPDATE workcenter SET name = ? WHERE workcenterid = ?',
        args: [name, workcenterid]
    })

    return Response.redirect(new URL('/center-list', request.url))
}