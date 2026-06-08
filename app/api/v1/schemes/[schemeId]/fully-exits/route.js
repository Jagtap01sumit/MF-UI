import { GetFullyExitsFromSchemeController } from "../../../../setup/controller/scheme.controller";

//  [{
//     stock_id: 394,
//     stock_name: 'Jio Financial Services Limited',
//     previous_quantity: '30899376',
//     current_quantity: 0,
//     quantity_exited: '30899376',
//     market_value: '69245.50',
//     previous_month: 2026-02-28T18:30:00.000Z,
//     current_month: 2026-03-31T18:30:00.000Z
//   }]
export async function GET(req, { params }) {
  const { schemeId } = await params;

  return GetFullyExitsFromSchemeController(schemeId);
}