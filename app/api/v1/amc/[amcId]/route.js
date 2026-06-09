// app/api/amcs/[amcId]/schemes/route.js
import { pool } from "../../../db/postgres";

export async function GET(req, { params }) {
  const { amcId } = await params;

  const result = await pool.query(
    "SELECT * FROM schemes WHERE amc_id = $1",
    [amcId]
  );
  return Response.json(result.rows);
}