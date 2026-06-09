import { GetMonthlyTrendInSchemeController } from "../../../../setup/controller/scheme.controller";

// [{
//     "report_month": "2026-01-31T18:30:00.000Z",
//     "total_holdings": "99",
//     "total_market_value": "2602530.00",
//     "added_stocks": [
//         "Aurobindo Pharma Limited",
//         "ICICI Bank Limited",
//         "Manappuram Finance Ltd",
//         "Emami Limited",
//         "Sudeep Pharma Limited",
//         "HDFC Bank Limited",
//         "Onesource Specialty Pharma Ltd."
//     ],
//     "removed_stocks": [
//         "Stanley Lifestyles Ltd."
//     ]
// }]
export async function GET(req, { params }) {
  const { schemeId } = await params;

  return GetMonthlyTrendInSchemeController(schemeId);
}