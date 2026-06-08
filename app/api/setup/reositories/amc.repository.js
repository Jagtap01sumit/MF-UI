import pool from "../../db/postgres";

export const fetchAllAMCs = async () => {
  const result = await pool.query(`
    SELECT
            id,
            amc_name
    FROM amcs
        ORDER BY amc_name
  `);

  return result.rows;
};