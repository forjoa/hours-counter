import { turso } from './db'
import { WorkCenter } from './types'

export async function getCenterById(id: string) {
  const { rows } = await turso.execute({
    sql: 'SELECT * FROM workcenter WHERE workcenterid = ?',
    args: [id],
  })

  return rows[0] as unknown as WorkCenter
}
