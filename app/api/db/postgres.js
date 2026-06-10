import { Pool } from "pg";

export const pool = new Pool({
  user: String(process.env.NEXT_PUBLIC_DB_USER),
  password: String(process.env.NEXT_PUBLIC_DB_PASSWORD),
  host: String(process.env.NEXT_PUBLIC_DB_HOST),
  port: Number(process.env.NEXT_PUBLIC_DB_PORT),
  database: String(process.env.NEXT_PUBLIC_DB_NAME),
});