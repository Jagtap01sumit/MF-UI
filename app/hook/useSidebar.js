// hooks/useTheme.js

import useFundStore from "@/app/store/useFundStore";

export default function useTheme() {
  const isSidebarOpen = useFundStore(
    (state) => state.isSidebarOpen
  );

  return isSidebarOpen;
}