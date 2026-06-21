import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  TrendingDown,
  PieChart,
  Settings,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
     key: "dashboard",
  },
  {
    title: "Top Holdings",
    icon: Wallet,
     key: "topHolding",
  },
  {
    title: "Top Increases",
    icon: TrendingUp,
     key: "topIncreases",
  },
  {
    title: "Top Reductions",
    icon: TrendingDown,
     key: "topReductions",
  },
  {
    title: "Sector Allocation",
    icon: PieChart,
     key: "sectorAllocation",
  },
  {
    title: "Settings",
    icon: Settings,
     key: "setting",
  },
];