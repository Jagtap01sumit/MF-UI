import { GetReductionInSchemeController } from "../../../../setup/controller/scheme.controller";

export async function GET(req, { params }) {
  const { schemeId } = await params;

  return GetReductionInSchemeController(schemeId);
}