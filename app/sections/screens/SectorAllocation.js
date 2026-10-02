"use client";

import React, { useMemo } from "react";
import SectorDonutChart from "../../components/common/charts/DountChart";
import useFundStore from "@/app/store/useFundStore";
import { FIELDS } from "@/app/CONSTANTS/Fields";

const SECTOR_COLORS = [
  "#7C3AED",
  "#0EA5E9",
  "#14B8A6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#64748B",
  "#EC4899",
  "#8B5CF6",
  "#06B6D4",
];

const formatNumber = (value) => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);
};

export default function SectorAllocation({ theme }) {
  const { sectorAllocation, loading } = useFundStore();

  const { chartData, totalMarketValue } = useMemo(() => {
    if (!Array.isArray(sectorAllocation)) {
      return {
        chartData: [],
        totalMarketValue: 0,
      };
    }
    const total = sectorAllocation.reduce(
      (sum, item) => sum + Number(item[FIELDS.TOTAL_MARKET_VALUE] || 0),
      0,
    );

    const data = sectorAllocation
      .map((item, index) => {
        const marketValue = Number(item[FIELDS.TOTAL_MARKET_VALUE] || 0);

        const percentage = total > 0 ? (marketValue / total) * 100 : 0;

        return {
          name: item[FIELDS.INDUSTRY_NAME] || "Others",
          value: marketValue,
          percentage: Number(percentage.toFixed(1)),
          color: SECTOR_COLORS[index % SECTOR_COLORS.length],
        };
      })
      .sort((a, b) => b.value - a.value);

    return {
      chartData: data,
      totalMarketValue: total,
    };
  }, [sectorAllocation]);

  // Your API values are in lakh.
  // 100 lakh = 1 crore.
  const totalInCrores = totalMarketValue / 100;

  if (loading) {
    return (
      <div
        className="w-full h-[420px] rounded-2xl border p-5 animate-pulse"
        style={{
          backgroundColor: theme.card,
          borderColor: theme.border,
        }}
      >
        <div
          className="h-6 w-48 rounded"
          style={{
            backgroundColor: theme.border,
          }}
        />
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div
        className="w-full h-[420px] rounded-2xl border flex items-center justify-center"
        style={{
          backgroundColor: theme.card,
          borderColor: theme.border,
          color: theme.text.secondary,
        }}
      >
        No sector allocation data available
      </div>
    );
  }

  const topSector = chartData[0];
  console.log(chartData.length, "chartdata");

  return (
    <div
      className="w-full rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 border-b flex items-center justify-between"
        style={{
          borderColor: theme.border,
        }}
      >
        <div>
          <h2
            className="text-lg font-semibold"
            style={{
              color: theme.text.primary,
            }}
          >
            Sector Allocation
          </h2>

          <p
            className="text-xs mt-1"
            style={{
              color: theme.text.secondary,
            }}
          >
            Portfolio exposure by industry
          </p>
        </div>

        <div
          className="px-3 py-1.5 rounded-lg text-xs"
          style={{
            backgroundColor: theme.background,
            color: theme.text.secondary,
            border: `1px solid ${theme.border}`,
          }}
        >
          Market Value
        </div>
      </div>

      {/* Main */}
      {/* Main */}
      <div className="p-5">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ==================== */}
          {/* Donut Section */}
          {/* ==================== */}

          <div className="w-full lg:w-1/2">
            <div
              className={`relative ${
                chartData<10 ? "h-[314px]" : "h-[1114px]"
              }} w-full`}
            >
              <SectorDonutChart data={chartData} theme={theme} />

              {/* Center Value */}
              <div
                className="absolute
                     left-1/4
                     top-1/2
                     -translate-x-1/2
                     -translate-y-1/2
                     pointer-events-none
                     flex flex-col items-center"
              >
                <span
                  className="text-xs text-center"
                  style={{
                    color: theme.text.secondary,
                  }}
                >
                  Total Market Value
                </span>

                <span
                  className="text-xl font-bold mt-1 whitespace-nowrap"
                  style={{
                    color: theme.text.primary,
                  }}
                >
                  ₹{formatNumber(totalInCrores)} Cr
                </span>
              </div>
            </div>
          </div>

          {/* ==================== */}
          {/* Sector Table */}
          {/* ==================== */}

          <div className="w-full lg:w-1/2">
            {/* Table Header */}
            <div
              className="grid grid-cols-[minmax(0,1fr)_100px_80px]
                   gap-3 px-2 pb-3 text-xs font-medium"
              style={{
                color: theme.text.secondary,
              }}
            >
              <span>Industry</span>

              <span className="text-right">Market Value</span>

              <span className="text-right">Allocation</span>
            </div>

            {/* Rows */}
            <div>
              {chartData.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-[minmax(0,1fr)_100px_80px]
                       gap-3
                       items-center
                       py-3
                       px-2
                       border-t"
                  style={{
                    borderColor: theme.border,
                  }}
                >
                  {/* Industry */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: item.color,
                      }}
                    />

                    <span
                      className="text-sm font-medium truncate"
                      style={{
                        color: theme.text.primary,
                      }}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Market Value */}
                  <span
                    className="text-sm text-right whitespace-nowrap"
                    style={{
                      color: theme.text.primary,
                    }}
                  >
                    ₹{formatNumber(item.value / 100)}
                  </span>

                  {/* Percentage */}
                  <span
                    className="text-sm font-semibold text-right whitespace-nowrap"
                    style={{
                      color: theme.text.secondary,
                    }}
                  >
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="grid grid-cols-2 border-t"
        style={{
          borderColor: theme.border,
        }}
      >
        {/* Top Sector */}
        <div className="px-5 py-4">
          <p
            className="text-xs"
            style={{
              color: theme.text.secondary,
            }}
          >
            Top Industry
          </p>

          <p
            className="text-sm font-semibold mt-1"
            style={{
              color: theme.text.primary,
            }}
          >
            {topSector.name}
          </p>

          <p
            className="text-xs mt-1"
            style={{
              color: topSector.color,
            }}
          >
            {topSector.percentage}%
          </p>
        </div>

        {/* Total */}
        <div
          className="px-5 py-4 border-l"
          style={{
            borderColor: theme.border,
          }}
        >
          <p
            className="text-xs"
            style={{
              color: theme.text.secondary,
            }}
          >
            Total Industries
          </p>

          <p
            className="text-sm font-semibold mt-1"
            style={{
              color: theme.text.primary,
            }}
          >
            {chartData.length}
          </p>
        </div>
      </div>
    </div>
  );
}
