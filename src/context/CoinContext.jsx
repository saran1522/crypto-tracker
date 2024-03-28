import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { CoinList } from "../config/api";
import axios from "axios";

const CoinContext = createContext();
function CoinProvider({ children }) {
  const [currency, setCurrency] = useState("INR");
  const [cryptos, setCryptos] = useState([]);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });
    }
    return () => {
      unsubscribe;
      // unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  async function fetchCryptos() {
    const { data } = await axios.get(CoinList(currency));
    setCryptos(data);
  }

  return (
    <CoinContext.Provider
      value={{
        currency,
        cryptos,
        fetchCryptos,
        setCurrency,
        alert,
        setAlert,
        user,
        watchlist,
      }}
    >
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
