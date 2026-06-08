import { getTopHoldingsForScheme ,getTopIncreasesInScheme,getTopReductionInScheme,getNewEntriesInScheme,getFullyExitsFromScheme,getSectorWiseAllocationInScheme} from "../../setup/reositories/scheme.repository";

export async function fetchTopHoldings(schemeId) {
  if (!schemeId) {
    throw new Error("Scheme ID is required");
  }

  return await getTopHoldingsForScheme(schemeId);
}

export async function fetchTopIncreases(schemeId) {
  if (!schemeId) {
    throw new Error("Scheme ID is required");
  }

  return await getTopIncreasesInScheme(schemeId);
}
export async function fetchTopReduction(schemeId) {
  if (!schemeId) {
    throw new Error("Scheme ID is required");
  }

  return await getTopReductionInScheme(schemeId);
}
export async function fetchNewEntries(schemeId) {
  if (!schemeId) {
    throw new Error("Scheme ID is required");
  }

  return await getNewEntriesInScheme(schemeId);
}
export async function fetchFullyExitEntries(schemeId) {
  if (!schemeId) {
    throw new Error("Scheme ID is required");
  }

  return await getFullyExitsFromScheme(schemeId);
}
export async function fetchSectorWiseAllocationEntries(schemeId) {
  if (!schemeId) {
    throw new Error("Scheme ID is required");
  }

  return await getSectorWiseAllocationInScheme(schemeId);
}