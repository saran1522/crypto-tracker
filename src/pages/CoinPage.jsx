import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import CoinInfo from "../components/CoinInfo";
import parse from "html-react-parser";
import { useCoins } from "../context/CoinContext";
import Loader from "../components/Loader";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function CoinPage() {
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const { currency, user, watchlist, setAlert } = useCoins();

  useEffect(() => {
    async function fetchCoin() {
      setLoading(true);
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
      setLoading(false);
    }
    if (currency.length === 3) fetchCoin();
  }, [id]);

  const inWatchList = watchlist.includes(coin?.id);

  async function addToWatchlist() {
    const coinRef = doc(db, "watchlist", user?.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
        },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin?.name} added to watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  }

  async function removeFromWatchlist() {
    const coinRef = doc(db, "watchlist", user?.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin?.name} removed from watchlist`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  }

  return !coin | loading ? (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
    </Box>
  ) : (
    <Stack
      sx={{ flexDirection: { xs: "column", md: "row" } }}
      divider={
        <Divider
          orientation="vertical"
          flexItem
          sx={{ backgroundColor: "white" }}
        />
      }
      spacing={2}
    >
      <Box
        direction="column"
        sx={{
          height: "90%",
          width: { xs: "100%", md: "40%", lg: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <img
          src={`${coin?.image.large}`}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3">{coin?.name}</Typography>
        <Typography
          variant="subtitle1"
          sx={{ width: "100%", textAlign: "justify" }}
        >
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <Box
          sx={{
            height: "120px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "start",
          }}
        >
          <span style={{ display: "flex" }}>
            <Typography variant="h6">Rank:</Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {/* {numberWithCommas(coin?.market_cap_rank)} */}
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6">Current Price:</Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {`${
                coin?.market_data.current_price[currency.toLowerCase()]
              } ${currency}`}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h6">Market Cap:</Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)}
              M
            </Typography>
          </span>
        </Box>
        {user && (
          <Button
            fullWidth
            sx={{
              bgcolor: inWatchList ? "red" : "aqua",
              color: inWatchList ? "white" : "black",
              "&:hover": { bgcolor: inWatchList ? "red" : "aqua" },
            }}
            onClick={inWatchList ? removeFromWatchlist : addToWatchlist}
          >
            {inWatchList ? "Remove from watchlist" : "Add to watchlist"}
          </Button>
        )}
      </Box>
      <CoinInfo coin={coin} />
    </Stack>
  );
  // );
}

export default CoinPage;
