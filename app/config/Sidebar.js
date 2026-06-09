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
  },
  {
    title: "Top Holdings",
    icon: Wallet,
  },
  {
    title: "Top Increases",
    icon: TrendingUp,
  },
  {
    title: "Top Reductions",
    icon: TrendingDown,
  },
  {
    title: "Sector Allocation",
    icon: PieChart,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];