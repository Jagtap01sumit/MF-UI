"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [amcs, setAmcs] = useState([]);

  useEffect(() => {
    fetchAMCs();
  }, []);

 const fetchAMCs = async () => {
  try {
    console.log("Calling API...");

    // const response = await fetch(
    // "/api/v1/amc"
    // );

    // const response = await fetch(
    // "/api/v1/amc/1"
    // );

    // const response = await fetch(
    // "/api/v1/schemes/1/dashboard/schemes"
    // );

    // const response = await fetch(
    // "/api/v1/schemes/1/top-holdings"
    // );

    // const response = await fetch(
    // "/api/v1/schemes/1/top-increases"
    // );

    // const response = await fetch(
    // "/api/v1/schemes/84/top-reduction"
    // );
    // const response = await fetch(
    // "/api/v1/schemes/84/fully-exits"
    // );
    const response = await fetch(
    "/api/v1/schemes/84/sector-wise-allocation"
    );


   
    const data = await response.json();
    console.log(data)
    console.log(data.rows);

    setAmcs(data);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};

  return (
    <div>
      {/* {amcs?.rows.map((amc) => (
        <p key={amc?.id}>
          {amc?.scheme_name}
        </p>
      ))} */}
    </div>
  );
}