import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={200} thickness={1} sx={{ color: "aqua" }} />
    </Box>
  );
}

export default Loader;
