import React from "react";
import Header from "../Header";
import useFundStore from "@/app/store/useFundStore";

export default function Setting({ theme }) {
  const { isSidebarOpen, activeMenu } = useFundStore();
  return (
    <>
      <Header></Header>
      <div
        style={{
          color: theme.text.primary,
        }}
      >
        Coming soon....
      </div>
    </>
  );
}
