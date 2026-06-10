// hooks/useTheme.js

import useFundStore from "@/app/store/useFundStore";
import { getTheme } from "@/app/CONSTANTS/Theme";

export default function useTheme() {
  const isDarkMode = useFundStore(
    (state) => state.isDarkMode
  );

  return getTheme(isDarkMode);
}