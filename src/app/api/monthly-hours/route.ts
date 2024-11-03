import {NextRequest, NextResponse} from "next/server";
import {getUserFromToken} from "@/core/getToken";
import {turso} from "@/core/db";

export async function GET(req: NextRequest) {
    const user = await getUserFromToken()

    if (!user) return

    const {rows} = await turso.execute({
        sql: 'SELECT * FROM hours WHERE userid = ? AND strftime(\'%Y-%m\', day) = strftime(\'%Y-%m\', \'now\')',
        args: [user.userid as number]
    })

    return NextResponse.json(rows)
}