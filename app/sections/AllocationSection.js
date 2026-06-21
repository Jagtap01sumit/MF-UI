"use client";

import { FIELDS } from "@/app/CONSTANTS/Fields";
import LinearChart from "../components/common/charts/LinearChart";
import MonthlyTrendChart from "../components/common/charts/MonthlyTreadChart";
import SectorDonutChart from "../components/common/charts/DountChart";
import useFundStore from "@/app/store/useFundStore";

export default function AllocationSection({theme}) {
  const { sectorAllocation, monthlyTrend } = useFundStore();
 
const trendsData = monthlyTrend.map((item) => ({
  x: new Date(item[FIELDS.REPORT_MONTH].substring(0, 10)).getTime(),
  y: Number(item[FIELDS.TOTAL_MARKET_VALUE]),
}));
  const COLORS = [
    "#8B5CF6",
    "#3B82F6",
    "#06B6D4",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
    "#14B8A6",
    "#F97316",
    "#6366F1",
  ];

  // Sort industries by market value
  const sortedIndustries = [...sectorAllocation].sort(
    (a, b) =>
      Number(b[FIELDS.TOTAL_MARKET_VALUE]) -
      Number(a[FIELDS.TOTAL_MARKET_VALUE])
  );

  // Top 5 industries
  const topIndustries = sortedIndustries.slice(0, 5);

  // Remaining industries
  const remainingIndustries = sortedIndustries.slice(5);

  // Sum remaining industries into "Others"
  const othersValue = remainingIndustries.reduce(
    (sum, item) =>
      sum + Number(item[FIELDS.TOTAL_MARKET_VALUE] || 0),
    0
  );

  // Final chart data
  const chartData =
    othersValue > 0
      ? [
          ...topIndustries,
          {
            [FIELDS.INDUSTRY_NAME]: "Others",
            [FIELDS.TOTAL_MARKET_VALUE]: othersValue,
          },
        ]
      : topIndustries;

  // Total value for percentage calculation
  const totalValue = chartData.reduce(
    (sum, item) =>
      sum + Number(item[FIELDS.TOTAL_MARKET_VALUE] || 0),
    0
  );

  // Donut Chart Data
  const sectorData = chartData.map((item, index) => ({
    name: item[FIELDS.INDUSTRY_NAME],
    value: Number(item[FIELDS.TOTAL_MARKET_VALUE]),
    percentage: (
      (Number(item[FIELDS.TOTAL_MARKET_VALUE]) /
        totalValue) *
      100
    ).toFixed(1),
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
      {/* Monthly Trend */}
      <LinearChart
        title="Monthly Market Value Trend"
        theme={theme}
      >
        <MonthlyTrendChart
          data={trendsData}
          theme={theme}
        />
      </LinearChart>

      {/* Sector Allocation */}
      <LinearChart
        title="Sector Allocation"
        theme={theme}
      >
        <SectorDonutChart
          data={sectorData}
          theme={theme}
        />
      </LinearChart>
    </div>
  );
}