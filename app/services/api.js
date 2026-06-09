// services/api.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAmcs = async () => {
  const res = await fetch(`/api/amcs`);
  return res.json();
};

export const fetchSchemes = async (amcId) => {
  const res = await fetch(
    `/api/amcs/${amcId}/schemes`
  );
  return res.json();
};

export const fetchDashboard = async (schemeId) => {
  const endpoints = [
    "dashboard",
    "top-holdings",
    "top-increases",
    "top-reductions",
    "new-entries",
    "exits",
    "sector-allocation",
    "monthly-trend",
  ];

  const responses = await Promise.all(
    endpoints.map((endpoint) =>
      fetch(
        `/api/schemes/${schemeId}/${endpoint}`
      ).then((r) => r.json())
    )
  );

  return {
    dashboard: responses[0],
    topHoldings: responses[1],
    topIncreases: responses[2],
    topReductions: responses[3],
    newEntries: responses[4],
    exits: responses[5],
    sectorAllocation: responses[6],
    monthlyTrend: responses[7],
  };
};