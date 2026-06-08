// app/api/schemes/[schemeId]/sector-wise-callocation/route.js

import { GetSectorWiseAllocationInSchemeController } from "../../../../setup/controller/scheme.controller";

export async function GET(req, { params }) {
  const { schemeId } = await params;

  return GetSectorWiseAllocationInSchemeController(schemeId);
}