"use client";

import { FIELDS } from "@/app/CONSTANTS/Fields";
import useFundStore from "@/app/store/useFundStore";
// import { FIELDS } from "@/app/CONSTANTS/Fields";

import FullDataTable from "@/app/components/common/FullScreenTable";
export default function HopHoldingSection({theme}) {
  const { topHoldings } = useFundStore();

  const holdingsData = topHoldings.map((item, i) => ({
    sr_no: i + 1,
    stock_name: item[FIELDS.STOCK_NAME],
    quantity: Number(item[FIELDS.QUANTITY]).toLocaleString(),
    market_value: Math.round(Number(item[FIELDS.MARKET_VALUE]) / 100),
  }));

  const TOP_HOLDINGS_COLUMNS = [
    { key: "sr_no", label: "Sr. No." },
    { key: "stock_name", label: "Stock" },
    { key: "quantity", label: "Quantity" },
    {
      key: "market_value",
      label: "Value (Cr.)",
      render: (value) => `₹${value} Cr`,
    },
  ];
  return (
    <>
      <FullDataTable
        rows={holdingsData}
        columns={TOP_HOLDINGS_COLUMNS}
        defaultSort="market_value"
        searchPlaceholder="Search holdings..."
      />
      
    </>
  );
}
