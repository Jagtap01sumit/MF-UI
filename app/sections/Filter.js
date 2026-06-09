"use client";

import DropdownSelect from "../components/common/DropDown";
import { getTheme } from "@/app/CONSTANTS/Theme";
import useFundStore from "@/app/store/useFundStore";
import { useEffect } from "react";

export default function Filter() {
    const theme = getTheme(true);
  const loadAmcs = useFundStore((state) => state.loadAmcs);
  const loadSchemes = useFundStore((state) => state.loadSchemes);

  //  const [selectedAmc,setSelectedAmc]=useState("select amc");
  useEffect(() => {
    loadAmcs();
  }, [loadAmcs]);
  const {
    amcs,
    schemes,
    selectedAmc,
    selectedScheme,
    setSelectedAmc,
    setSelectedScheme,
  } = useFundStore();

  const handleAmcChange = async (e) => {
    const amcId = e.target.value;

    // Update selected AMC in store
    setSelectedAmc(amcId);

    // Fetch schemes for selected AMC
    await loadSchemes(amcId);
  };
  const amcOptions = amcs.map((amc) => ({
  label: amc.amc_name,
  value: amc.id,
}));

const schemeOptions = schemes.map((scheme) => ({
  label: scheme.scheme_name,
  value: scheme.id,
}));
  return (
    <main
      className="
        w-full
        flex flex-col md:flex-row
        justify-between
        items-start md:items-center
        gap-4
        py-5
        border-b
      "
    >
      <div className="flex flex-col md:flex-row gap-5 w-full">
        {/* AMC */}
        <div className="flex flex-col gap-1">
          <h1
            className="text-sm font-semibold"
            style={{ color: theme.text.secondary }}
          >
            AMC Name
          </h1>

          <DropdownSelect
            value={selectedAmc}
            onChange={handleAmcChange}
            options={amcOptions}
            labelKey="amc_name"
            valueKey="id"
            theme={theme}
            placeholder="Select AMC"
          />
        </div>

        {/* Scheme */}
        <div className="flex flex-col gap-1">
          <h1
            className="text-sm font-semibold"
            style={{ color: theme.text.secondary }}
          >
            Scheme
          </h1>

          <DropdownSelect
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
            options={schemeOptions}
            theme={theme}
            placeholder="Select Scheme"
          />
        </div>
      </div>

      <div className="text-xs md:text-sm" style={{ color: theme.text.muted }}>
        Last updated:
        <span
          style={{
            color: theme.text.primary,
            fontWeight: 600,
          }}
        >
          {" "}
          31st March
        </span>
      </div>
    </main>
  );
}
