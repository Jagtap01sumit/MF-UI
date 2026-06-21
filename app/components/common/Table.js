"use client";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import useTheme from "@/app/hook/useTheme";

export default function DataTableCard({
  title,
  columns,
  data,
  onViewMore,
}) {
  const theme = useTheme();

  const rows = [...data];

  while (rows.length < 5) {
    const emptyRow = {};

    columns.forEach((col) => {
      emptyRow[col.key] = "-";
    });

    rows.push(emptyRow);
  }

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: "16px",
        boxShadow: "none",
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
      
        <div className="flex justify-between items-center mb-4">
          <Typography
            variant="h6"
            sx={{
              color: theme.text.primary,
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>

          <Button
            size="small"
            onClick={onViewMore}
            className="md:hidden"
          >
            View More
          </Button>
        </div>

        {/* Table */}
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{
                    color: theme.text.secondary,
                    fontWeight: 600,
                    borderBottom: `1px solid ${theme.border}`,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.slice(0, 5).map((row, index) => (
              <TableRow key={index}>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    sx={{
                      color:
                        col.color || theme.text.primary,
                      fontWeight: col.color ? 600 : 400,
                      borderBottom: `1px solid ${theme.border}`,
                    }}
                  >
                    {row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}