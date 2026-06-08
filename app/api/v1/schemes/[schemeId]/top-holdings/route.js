// app/api/schemes/[schemeId]/top-holdings/route.js

import { GetTopHoldingsController } from "../../../../setup/controller/scheme.controller";

export async function GET(req, { params }) {
  const { schemeId } = await params;

  return GetTopHoldingsController(schemeId);
}