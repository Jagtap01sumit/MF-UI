import { pool } from "../../db/postgres";

export async function GET() {
  const result = await pool.query("SELECT * FROM amcs");

  return Response.json(result.rows);
}