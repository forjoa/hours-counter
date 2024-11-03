import {getUserFromToken} from "@/core/getToken";
import {turso} from "@/core/db";
import {WorkShift} from "@/core/types";

export async function getMonthlyHours() {
    const user = await getUserFromToken()

    if (!user) return

    const {rows} = await turso.execute({
        sql: 'SELECT * FROM hours WHERE userid = ? AND strftime(\'%Y-%m\', day) = strftime(\'%Y-%m\', \'now\')',
        args: [user.userid as number]
    })

    return rows as unknown as WorkShift[]
}