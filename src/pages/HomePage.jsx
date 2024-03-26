import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import Banner from "../components/Banner";
import CoinsTable from "../components/CoinsTable";

function HomePage() {
  return (
    <>
      {/* <Typography>Home page</Typography> */}
      {/* <Button variant="outline">change</Button> */}
      <Banner />
      <CoinsTable />
    </>
  );
}

export default HomePage;
