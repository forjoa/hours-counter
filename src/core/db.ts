import { createClient } from '@libsql/client'

export const turso = createClient({
  url: process.env.NEXT_PUBLIC_DB_URL as string,
  authToken: process.env.NEXT_PUBLIC_DB_TOKEN,
})