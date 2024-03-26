import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { Box, Divider, Stack, Typography } from "@mui/material";
import CoinInfo from "../components/CoinInfo";
import parse from "html-react-parser";
import { useCoins } from "../context/CoinContext";
import Loader from "../components/Loader";

function CoinPage() {
  const { curr } = useCoins();
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchCoin() {
      console.log("inside the coin fetching", id);
      setLoading(true);
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
      setLoading(false);
      console.log(data);
    }
    if (curr.length === 3) fetchCoin();
  }, [id]);

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
              {coin?.market_data.current_price[curr.toLowerCase()]}
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
              {coin?.market_data.market_cap[curr.toLowerCase()]
                .toString()
                .slice(0, -6)}
              M
            </Typography>
          </span>
        </Box>
      </Box>
      <CoinInfo coin={coin} />
    </Stack>
  );
  // );
}

export default CoinPage;
