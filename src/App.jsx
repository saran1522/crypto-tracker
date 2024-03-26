import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import Header from "./components/Header";
import { CoinProvider } from "./context/CoinContext";

function App() {
  return (
    <CoinProvider>
      <BrowserRouter>
        <Box
          sx={{ height: "100vh", backgroundColor: "#171a21", color: "white" }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/coins" element={<CoinPage />}></Route>
            <Route path="/coins/:id" element={<CoinPage />}></Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </CoinProvider>
  );
}

export default App;
