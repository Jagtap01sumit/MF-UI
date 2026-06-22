"use client";

import { Box, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FullDataTable from "@/app/components/common/FullScreenTable";
import { FIELDS } from "@/app/CONSTANTS/Fields";
import useFundStore from "@/app/store/useFundStore";
// import { FIELDS } from "@/app/CONSTANTS/Fields";

// API response
// const apiData = [
//   {
//     current_month: "2026-04-30T18:30:00.000Z",
//     current_quantity: "398165",
//     previous_month: "2026-03-31T18:30:00.000Z",
//     previous_quantity: "87310",
//     quantity_change: "310855",
//     stock_id: 71,
//     stock_name: "Heritage Foods Limited",
//   },
// ];

export default function TopIncreasesSection({theme}) {
  // Convert API data into table rows
   const { topIncreases } = useFundStore();
  const rows = topIncreases.map((item, index) => ({
    sr_no: index + 1,
    stock_name: item[FIELDS.STOCK_NAME],
    previous_month: item.previous_month,
    previous_quantity: Number(item.previous_quantity),
    current_month: item.current_month,
    current_quantity: Number(item.current_quantity),
  }));

  // Column definitions
  const columns = [
    {
      key: "sr_no",
      label: "Sr. No.",
    },
    {
      key: "stock_name",
      label: "Stock",
    },
    {
      key: "previous_month",
      label: "Previous Month",
      render: (value) =>
        new Date(value).toLocaleDateString("en-IN"),
    },
     {
      key: "current_month",
      label: "Current Month",
      render: (value) =>
        new Date(value).toLocaleDateString("en-IN"),
    },
    {
      key: "previous_quantity",
      label: "Previous Qty",
      render: (value) => value.toLocaleString(),
    },
  
    {
      key: "current_quantity",
      label: "Current Qty",
      render: (value, row) => {
        const prev = row.previous_quantity;

        const percent =
          prev === 0
            ? 0
            : (((value - prev) / prev) * 100).toFixed(2);

        const increased = value >= prev;

        return (
          <Box>
            <Typography fontWeight={600}>
              {value.toLocaleString()}
            </Typography>

         <Box
  sx={{
    display: "flex",
    alignItems: "center",
    color: increased ? "success.main" : "error.main",
    fontSize: "0.8rem",
    fontWeight: 600,
  }}
>
  {increased ? (
    <ArrowDropUpIcon fontSize="small" />
  ) : (
    <ArrowDropDownIcon fontSize="small" />
  )}
  {Math.abs(percent)}%
</Box>
          </Box>
        );
      },
    },
  ];

  return (
    <FullDataTable
      rows={rows}
      columns={columns}
      defaultSort="current_quantity"
      searchPlaceholder="Search stocks..."
      rowsPerPageOptions={[5, 10, 25]}
    />
  );
}