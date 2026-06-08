// app/api/schemes/[schemeId]/dashboard/route.js
import { pool } from "../../../../../db/postgres";

export async function GET(req, { params }) {
  const { schemeId } = await params;

  const result = await pool.query(
    "SELECT * FROM schemes WHERE id = $1",
    [schemeId]
  );

  return Response.json(result);
}