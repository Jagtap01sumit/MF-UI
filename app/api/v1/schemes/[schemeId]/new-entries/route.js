import { GetNewEntriesInSchemeController } from "../../../../setup/controller/scheme.controller";

export async function GET(req, { params }) {
  const { schemeId } = await params;

  return GetNewEntriesInSchemeController(schemeId);
}