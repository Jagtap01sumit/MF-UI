import { pool } from "../../db/postgres";

export async function getTopHoldingsForScheme(schemeId) {
  const result = await pool.query(
   `SELECT
	P.ID,
	P.STOCK_ID,
	S.STOCK_NAME,
	P.QUANTITY,
	P.MARKET_VALUE
FROM
	PORTFOLIO P
	JOIN STOCKS S ON P.STOCK_ID = S.ID
WHERE
	P.SCHEME_ID = $1
	AND P.REPORT_MONTH = (
		SELECT
			MAX(REPORT_MONTH)
		FROM
			PORTFOLIO
		WHERE
			SCHEME_ID = $1
	)
ORDER BY
	P.MARKET_VALUE DESC

    `,
    [schemeId]
  );

  return result.rows;
}

export async function getTopIncreasesInScheme(schemeId) {
  const result = await pool.query(
   `WITH ranked_months AS (
    SELECT
        report_month,
        ROW_NUMBER() OVER (ORDER BY report_month DESC) AS rn
    FROM (
        SELECT DISTINCT report_month
        FROM portfolio
        WHERE scheme_id = $1
    ) m
),
month_data AS (
    SELECT
        MAX(CASE WHEN rn = 1 THEN report_month END) AS current_month,
        MAX(CASE WHEN rn = 2 THEN report_month END) AS previous_month
    FROM ranked_months
)

SELECT
    c.stock_id,
    s.stock_name,
    m.previous_month,
    m.current_month,
    p.quantity AS previous_quantity,
    c.quantity AS current_quantity,
    c.quantity - p.quantity AS quantity_change
FROM portfolio c
JOIN portfolio p
    ON c.scheme_id = p.scheme_id
    AND c.stock_id = p.stock_id
JOIN stocks s
    ON c.stock_id = s.id
CROSS JOIN month_data m
WHERE c.scheme_id = $1
    AND c.report_month = m.current_month
    AND p.report_month = m.previous_month
    AND c.quantity > p.quantity
ORDER BY quantity_change DESC

    `,
    [schemeId]
  );

  return result.rows;
}
export async function getTopReductionInScheme(schemeId) {
  const result = await pool.query(
   `WITH ranked_months AS (
    SELECT
        report_month,
        ROW_NUMBER() OVER (ORDER BY report_month DESC) AS rn
    FROM (
        SELECT DISTINCT report_month
        FROM portfolio
        WHERE scheme_id = $1
    ) m
),
month_data AS (
    SELECT
        MAX(CASE WHEN rn = 1 THEN report_month END) AS current_month,
        MAX(CASE WHEN rn = 2 THEN report_month END) AS previous_month
    FROM ranked_months
)

SELECT
    c.stock_id,
    s.stock_name,
    m.previous_month,
    m.current_month,
    p.quantity AS previous_quantity,
    c.quantity AS current_quantity,
    c.quantity - p.quantity AS quantity_change
FROM portfolio c
JOIN portfolio p
    ON c.scheme_id = p.scheme_id
    AND c.stock_id = p.stock_id
JOIN stocks s
    ON c.stock_id = s.id
CROSS JOIN month_data m
WHERE c.scheme_id = $1
    AND c.report_month = m.current_month
    AND p.report_month = m.previous_month
    AND c.quantity < p.quantity
ORDER BY quantity_change DESC
LIMIT 10;
    `,
    [schemeId]
  );

  return result.rows;
}

export async function getNewEntriesInScheme(schemeId) {
  const result = await pool.query(
   `
WITH ranked_months AS (
    SELECT
        report_month,
        ROW_NUMBER() OVER (ORDER BY report_month DESC) AS rn
    FROM (
        SELECT DISTINCT report_month
        FROM portfolio
        WHERE scheme_id =$1
    ) 
),
month_data AS (
    SELECT
        MAX(CASE WHEN rn = 1 THEN report_month END) AS current_month,
        MAX(CASE WHEN rn = 2 THEN report_month END) AS previous_month
    FROM ranked_months
)

SELECT
    c.stock_id,
    s.stock_name,
    c.quantity,
    c.market_value,
   
    m.current_month
FROM portfolio c
JOIN stocks s
    ON c.stock_id = s.id
CROSS JOIN month_data m
WHERE c.scheme_id = $1
    AND c.report_month = m.current_month
    AND NOT EXISTS (
        SELECT 1
        FROM portfolio p
        WHERE p.scheme_id = c.scheme_id
            AND p.stock_id = c.stock_id
            AND p.report_month = m.previous_month
    )
ORDER BY c.market_value DESC;;
    `,
    [schemeId]
  );

  return result.rows;
}

export async function getFullyExitsFromScheme(schemeId) {
  const result = await pool.query(
   `WITH ranked_months AS (
    SELECT
        report_month,
        ROW_NUMBER() OVER (ORDER BY report_month DESC) AS rn
    FROM (
        SELECT DISTINCT report_month
        FROM portfolio
        WHERE scheme_id = $1
    ) 
),
month_data AS (
    SELECT
        MAX(CASE WHEN rn = 1 THEN report_month END) AS current_month,
        MAX(CASE WHEN rn = 2 THEN report_month END) AS previous_month
    FROM ranked_months
)

SELECT
    p.stock_id,
    s.stock_name,
    p.quantity AS previous_quantity,
    0 AS current_quantity,
    p.quantity AS quantity_exited,
    p.market_value,
    
    m.previous_month,
    m.current_month
FROM portfolio p
JOIN stocks s
    ON p.stock_id = s.id
CROSS JOIN month_data m
WHERE p.scheme_id = $1
    AND p.report_month = m.previous_month
    AND NOT EXISTS (
        SELECT 1
        FROM portfolio c
        WHERE c.scheme_id = p.scheme_id
            AND c.stock_id = p.stock_id
            AND c.report_month = m.current_month
    )
ORDER BY p.market_value DESC;
    `,
    [schemeId]
  );

  return result.rows;
}
export async function getSectorWiseAllocationInScheme(schemeId) {
  const result = await pool.query(
   `SELECT
    s.industry_id,
    i.industry_name,
    ROUND(SUM(p.market_value), 2) AS total_market_value
FROM portfolio p
JOIN stocks s
    ON p.stock_id = s.id
JOIN industries i
    ON s.industry_id = i.id
WHERE p.scheme_id = $1
  AND p.report_month = (
      SELECT MAX(report_month)
      FROM portfolio
      WHERE scheme_id = $1
  )
GROUP BY
    s.industry_id,
    i.industry_name
ORDER BY total_market_value DESC;
    `,
    [schemeId]
  );

  return result.rows;
}

// export async function getFullyExitsFromScheme(schemeId) {
//   const result = await pool.query(
//    `WITH ranked_months AS (
//     SELECT
//         report_month,
//         ROW_NUMBER() OVER (ORDER BY report_month DESC) AS rn
//     FROM (
//         SELECT DISTINCT report_month
//         FROM portfolio
//         WHERE scheme_id = $1
//     ) 
// ),
// month_data AS (
//     SELECT
//         MAX(CASE WHEN rn = 1 THEN report_month END) AS current_month,
//         MAX(CASE WHEN rn = 2 THEN report_month END) AS previous_month
//     FROM ranked_months
// )

// SELECT
//     p.stock_id,
//     s.stock_name,
//     p.quantity AS previous_quantity,
//     0 AS current_quantity,
//     p.quantity AS quantity_exited,
//     p.market_value,
    
//     m.previous_month,
//     m.current_month
// FROM portfolio p
// JOIN stocks s
//     ON p.stock_id = s.id
// CROSS JOIN month_data m
// WHERE p.scheme_id = $1
//     AND p.report_month = m.previous_month
//     AND NOT EXISTS (
//         SELECT 1
//         FROM portfolio c
//         WHERE c.scheme_id = p.scheme_id
//             AND c.stock_id = p.stock_id
//             AND c.report_month = m.current_month
//     )
// ORDER BY p.market_value DESC;
//     `,
//     [schemeId]
//   );

//   return result.rows;
// }
export async function getMonthlyTrendInScheme(schemeId) {
  const result = await pool.query(
   `

WITH monthly_data AS (
    SELECT DISTINCT report_month
    FROM portfolio
    WHERE scheme_id = $1
),
month_comparison AS (
    SELECT
        report_month,
        LAG(report_month) OVER (
            ORDER BY report_month
        ) AS previous_month
    FROM monthly_data
)

SELECT
    mc.report_month,

    COUNT(DISTINCT p.stock_id) AS total_holdings,

    ROUND(SUM(p.market_value), 2) AS total_market_value,

    ARRAY(
        SELECT s.stock_name
        FROM portfolio curr
        JOIN stocks s
            ON curr.stock_id = s.id
        WHERE curr.scheme_id = $1
          AND curr.report_month = mc.report_month
          AND NOT EXISTS (
              SELECT 1
              FROM portfolio prev
              WHERE prev.scheme_id = curr.scheme_id
                AND prev.stock_id = curr.stock_id
                AND prev.report_month = mc.previous_month
          )
    ) AS added_stocks,

    ARRAY(
        SELECT s.stock_name
        FROM portfolio prev
        JOIN stocks s
            ON prev.stock_id = s.id
        WHERE prev.scheme_id = $1
          AND prev.report_month = mc.previous_month
          AND NOT EXISTS (
              SELECT 1
              FROM portfolio curr
              WHERE curr.scheme_id = prev.scheme_id
                AND curr.stock_id = prev.stock_id
                AND curr.report_month = mc.report_month
          )
    ) AS removed_stocks

FROM month_comparison mc
JOIN portfolio p
    ON p.scheme_id = $1
   AND p.report_month = mc.report_month

GROUP BY mc.report_month, mc.previous_month
ORDER BY mc.report_month;
    `,
    [schemeId]
  );

  return result.rows;
}