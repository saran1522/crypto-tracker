import { Box, LinearProgress } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <LinearProgress
        sx={{
          width: "70%",
          backgroundColor: "white",
          color: "green",
          height: 5,
        }}
      />
    </Box>
  );
}

export default Loader;
