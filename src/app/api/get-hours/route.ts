import {NextRequest, NextResponse} from "next/server";
import {getUserFromToken} from "@/core/getToken";
import {turso} from "@/core/db";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {month} = body;

    const user = await getUserFromToken()

    if (!user) return

    const query = 'SELECT h.*, wc.name FROM hours h JOIN workcenter wc ON h.workcenterid = wc.workcenterid WHERE h.userid = ? AND strftime(\'%Y-%m\', day) = ?'

    const {rows} = await turso.execute({
        sql: query,
        args: [user.userid, month ? month : 'now']
    })

    return NextResponse.json(rows)
}