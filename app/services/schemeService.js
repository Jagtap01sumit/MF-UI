export const getDashboard = (id) =>
  api.get(`/api/schemes/${id}/dashboard`);

export const getTopHoldings = (id) =>
  api.get(`/api/schemes/${id}/top-holdings`);

export const getSectorAllocation = (id) =>
  api.get(`/api/schemes/${id}/sector-allocation`);

export const getMonthlyTrend = (id) =>
  api.get(`/api/schemes/${id}/monthly-trend`);