import React, { createContext, useContext, useState } from "react";

const CoinContext = createContext();
function CoinProvider({ children }) {
  const [curr, setCurr] = useState("INR");
  return (
    <CoinContext.Provider value={{ curr, setCurr }}>
      {children}
    </CoinContext.Provider>
  );
}

function useCoins() {
  const context = useContext(CoinContext);
  if (!context) throw new Error("useCoins must be used within a CoinProvider");
  return context;
}

export { CoinProvider, useCoins };
