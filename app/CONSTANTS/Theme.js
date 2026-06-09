export const colors = {
  common: {
    success: "#22C55E",
    danger: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",

    chart: {
      blue: "#3B82F6",
      purple: "#8B5CF6",
      cyan: "#06B6D4",
      green: "#22C55E",
      orange: "#F59E0B",
      red: "#EF4444",
      teal: "#14B8A6",
      pink: "#EC4899",
    },

    gradient: {
      primary: "linear-gradient(135deg, #8B5CF6, #3B82F6)",
      success: "linear-gradient(135deg, #10B981, #14B8A6)",
      danger: "linear-gradient(135deg, #EF4444, #F97316)",
    },
  },

  dark: {
    background: "#0B1120",
    sidebar: "#111827",
    card: "#1E293B",
    cardHover: "#334155",

    border: "#475569",

    primary: "#8B5CF6",
    secondary: "#06B6D4",

    text: {
      primary: "#F8FAFC",
      secondary: "#94A3B8",
      muted: "#64748B",
    },

    kpi: {
      schemes: "#8B5CF6",
      holdings: "#06B6D4",
      marketValue: "#22C55E",
      newEntries: "#F59E0B",
      exits: "#EF4444",
    },

    table: {
      header: "#0F172A",
      row: "#1E293B",
      rowHover: "#334155",
    },

    chartGrid: "#334155",
    chartAxis: "#94A3B8",
  },

  light: {
    background: "#F8FAFC",
    sidebar: "#FFFFFF",
    card: "#FFFFFF",
    cardHover: "#F1F5F9",

    border: "#E2E8F0",

    primary: "#10B981",
    secondary: "#14B8A6",

    text: {
      primary: "#0F172A",
      secondary: "#475569",
      muted: "#64748B",
    },

    kpi: {
      schemes: "#8B5CF6",
      holdings: "#3B82F6",
      marketValue: "#10B981",
      newEntries: "#F59E0B",
      exits: "#EF4444",
    },

    table: {
      header: "#F8FAFC",
      row: "#FFFFFF",
      rowHover: "#F1F5F9",
    },

    chartGrid: "#E2E8F0",
    chartAxis: "#64748B",
  },
};

export const getTheme = (isDark = false) => {
  return isDark ? colors.dark : colors.light;
};