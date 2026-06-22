"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useFundStore from "@/app/store/useFundStore";
import { getTheme } from "@/app/CONSTANTS/Theme";

export default function FullDataTable({
  rows = [],
  columns = [],
  defaultSort = "",
  searchPlaceholder = "Search...",
  rowsPerPageOptions = [5, 10, 25],
}) {
  const { isDarkMode } = useFundStore();
  const theme = getTheme(isDarkMode);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [orderBy, setOrderBy] = useState(columns[0]?.key);
  const [order, setOrder] = useState("asc");

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [rows, searchTerm]);

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      let x = a[orderBy];
      let y = b[orderBy];

      const xNum = Number(String(x).replace(/[^0-9.-]/g, ""));
      const yNum = Number(String(y).replace(/[^0-9.-]/g, ""));

      if (!Number.isNaN(xNum) && !Number.isNaN(yNum)) {
        return order === "asc" ? xNum - yNum : yNum - xNum;
      }

      return order === "asc"
        ? String(x).localeCompare(String(y))
        : String(y).localeCompare(String(x));
    });
  }, [filteredRows, orderBy, order]);

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        background: theme.card,
        border: `1px solid ${theme.border}`,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search holdings..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.background,
              color: theme.text.primary,
              borderRadius: "10px",

              "& fieldset": {
                borderColor: theme.border,
              },

              "&:hover fieldset": {
                borderColor: theme.primary,
              },

              "&.Mui-focused fieldset": {
                borderColor: theme.primary,
              },
            },

            "& input::placeholder": {
              color: theme.text.muted,
              opacity: 1,
            },
          }}
        />
      </Box>

      <TableContainer
        sx={{
          border: `1px solid ${theme.border}`,
          borderRadius: 2,
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sx={{
                    backgroundColor: theme.table.header,
                    color: theme.text.primary,
                    fontWeight: 700,
                    borderBottom: `1px solid ${theme.border}`,
                  }}
                >
                  <TableSortLabel
  active={orderBy === column.key}
  direction={orderBy === column.key ? order : "asc"}
  onClick={() => handleSort(column.key)}
  sx={{
    color: `${theme.text.primary} !important`,
    fontWeight: 700,

    "&:hover": {
      color: `${theme.text.primary} !important`,
    },

    "&.Mui-active": {
      color: `${theme.text.primary} !important`,
    },

    "& .MuiTableSortLabel-icon": {
      color: `${theme.text.muted} !important`,
    },

    "&.Mui-active .MuiTableSortLabel-icon": {
      color: `${theme.primary} !important`,
    },
  }}
>
  {column.label}
</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  background:
                    index % 2 === 0 ? theme.table.row : theme.cardHover,
                  "&:hover": {
                    background: theme.table.rowHover,
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    sx={{
                      color: column.color || theme.text.primary,
                      borderBottom: `1px solid ${theme.border}`,
                    }}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {paginatedRows.length === 0 && (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={columns.length}
                  sx={{ color: theme.text.muted }}
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={sortedRows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(Number(e.target.value));
          setPage(0);
        }}
          sx={{
    color: theme.text.primary,
    borderTop: `1px solid ${theme.border}`,

    "& .MuiTablePagination-selectLabel": {
      color: theme.text.secondary,
    },

    "& .MuiTablePagination-displayedRows": {
      color: theme.text.secondary,
    },

    "& .MuiTablePagination-select": {
      color: theme.text.primary,
    },

    /* Dropdown arrow */
    "& .MuiSelect-icon": {
      color: theme.primary,
    },

    /* Pagination buttons */
    "& .MuiIconButton-root": {
      color: theme.primary,
    },

    /* All SVG icons */
    "& .MuiSvgIcon-root": {
      color: theme.primary,
    },

    "& .Mui-disabled .MuiSvgIcon-root": {
      color: theme.text.muted,
    },
  }}
        
      />
    </Paper>
  );
}
