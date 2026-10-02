import { fetchTopHoldings,fetchTopIncreases,fetchTopReduction,fetchNewEntries ,fetchFullyExitEntries,fetchSectorWiseAllocationEntries,fetchMonthlyTrendInScheme, fetchLatestDate} from "../../setup/services/scheme.services";

export async function GetTopHoldingsController(schemeId) {
  try {
    const data = await fetchTopHoldings(schemeId);
console.log(data,"top holding controller")
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function getLatestDate(schemeId){
try {
    const data = await fetchLatestDate(schemeId);
console.log(data,"date")
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function GetIncreasesInSchemeController(schemeId) {
  try {
    const data = await fetchTopIncreases(schemeId);

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function GetNewEntriesInSchemeController(schemeId) {
  try {
    const data = await fetchNewEntries(schemeId);

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function GetReductionInSchemeController(schemeId) {
  try {
    const data = await fetchTopReduction(schemeId);

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function GetFullyExitsFromSchemeController(schemeId) {
  try {
    const data = await fetchFullyExitEntries(schemeId);
    // console.log(data)
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function GetSectorWiseAllocationInSchemeController(schemeId) {
  try {
    const data = await fetchSectorWiseAllocationEntries(schemeId);
    // console.log(data)
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function GetMonthlyTrendInSchemeController(schemeId) {
  try {
    const data = await fetchMonthlyTrendInScheme(schemeId);
    // console.log(data)
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

