// store/useFundStore.js

import { create } from "zustand";

const useFundStore = create((set) => ({
  isSidebarOpen: false,
  isDarkMode: false,
// BASEURL:String(process.env.BASEURL),
  setSidebarOpen: (value) => set({ isSidebarOpen: value }),

  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
  setDarkMode: (value) => set({ isDarkMode: value }),
  toggleDarkMode: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),

  // Selected values
  selectedAmc: "",
  selectedScheme: "",

  // KPI Data
  total_holding: 0,
  total_market_value: 0,
  total_schemes: 0,
  new_entries: 0,
  total_exits: 0,
  total_market_value_in_lakh: 0,
  // Dropdown data
  amcs: [],
  schemes: [],

  // Dashboard data
  dashboard: null,
  topHoldings: [],
  topIncreases: [],
  topReductions: [],
  newEntries: [],
  exits: [],
  sectorAllocation: [],
  monthlyTrend: [],

  loading: false,
  error: null,

  // ------------------
  // Load AMCs
  // ------------------

  loadAmcs: async () => {
    try {
      const res = await fetch("/api/v1/amc");
      const data = await res.json();

      set({
        amcs: data.rows || [],
      });
    } catch (error) {
      console.error(error);
    }
  },

  // ------------------
  // Load Schemes
  // ------------------

  loadSchemes: async (amcId) => {
    try {
      const res = await fetch(`/api/v1/amc/${amcId}`);
      const data = await res.json();

      set({
        schemes: data || [],
        total_schemes: data?.length || 0,
      });

      //   total_schemes= schemes?.length || 0
    } catch (error) {
      console.error(error);
    }
  },

  // ------------------
  // AMC Change
  // ------------------

  setSelectedAmc: (amcId) => {
    set({
      selectedAmc: amcId,
      selectedScheme: "",
      schemes: [],
    });
  },

  // ------------------
  // Scheme Change
  // ------------------

  setSelectedScheme: async (schemeId) => {
    try {
      set({
        selectedScheme: schemeId,
        loading: true,
      });

      const [
        dashboard,
        topHoldings,
        topIncreases,
        topReductions,
        newEntries,
        exits,
        sectorAllocation,
        monthlyTrend,
      ] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/schemes/${schemeId}/dashboard/schemes`).then((r) =>
          r.json(),
        ),
// api/v1/schemes/5509/dashboard/schemes
        fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/schemes/${schemeId}/top-holdings`).then((r) => r.json()),

        fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/schemes/${schemeId}/top-increases`).then((r) =>
          r.json(),
        ),

        fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/schemes/${schemeId}/top-reduction`).then((r) =>
          r.json(),
        ),

        fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/schemes/${schemeId}/new-entries`).then((r) => r.json()),

        fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/schemes/${schemeId}/fully-exits`).then((r) => r.json()),

        fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/schemes/${schemeId}/sector-wise-allocation`).then((r) =>
          r.json(),
        ),

        fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/schemes/${schemeId}/monthly-trend`).then((r) =>
          r.json(),
        ),
      ]);

      set({
        dashboard,
        topHoldings,
        topIncreases,
        topReductions,
        newEntries,
        exits,
        sectorAllocation,
        monthlyTrend,

        // KPI Values
        total_holding: topHoldings?.length || 0,
        new_entries: newEntries?.length || 0,
        total_exits: exits?.length || 0,

        total_market_value: Math.round(
          sectorAllocation.reduce(
            (sum, item) => sum + Number(item.total_market_value || 0),
            0,
          ) / 100,
        ),
        // total_market_value : total_market_value_in_lakh/100,

        loading: false,
        error: null,
      });
    } catch (error) {
      console.error(error);

      set({
        loading: false,
        error: "Failed to load dashboard data",
      });
    }
  },
  setToggle: (toggle) => {
    set({
      toggle: !toggle || false,
    });
  },
}));

export default useFundStore;
