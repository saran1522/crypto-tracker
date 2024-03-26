import styled from "@emotion/styled";
import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const Button = styled("button")(({ theme, selected }) => ({
  padding: "10px",
  width: "20%",
  background: selected ? "aqua" : "transparent",
  color: selected ? "black" : "aqua",
  "&:hover": { background: "aqua", color: "black" },
  border: "1px solid aqua",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "1rem",
  position: "relative",
  marginLeft: 0,
}));

function DaysButton({ children, setDays, value, selected }) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Button
        value={value}
        onClick={(e) => {
          setDays(e.target.value);
        }}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
}

export default DaysButton;
