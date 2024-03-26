import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { TrendingCoins } from "../config/api";
import { useCoins } from "../context/CoinContext";
import { Link } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";
import Loader from "./Loader";

const carouselStyle = {
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    padding: 10,
    // border: "1px solid red",
  },
};

// export default Caraousel = () => {
export default function Caraousel() {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { curr } = useCoins();

  const handleDragStart = (e) => e.preventDefault();

  useEffect(() => {
    async function fetchTrendingCoins() {
      // console.log(`fetching in ${curr}`);
      setLoading(true);
      const { data } = await axios.get(TrendingCoins(curr));
      setTrendingCoins(data);
      setLoading(false);
      // console.log(data);
    }
    if (curr.length === 3) fetchTrendingCoins();
  }, [curr]);

  const items = trendingCoins.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link
        style={carouselStyle.carouselItem}
        to={`/coins/${coin.id}`}
        key={coin?.name}
        onDragStart={handleDragStart}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {coin?.current_price.toFixed(2)} {curr}
        </span>
      </Link>
    );
  });

  //btc in rupee = 5811743

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  console.log("rendering");

  return loading ? (
    <Loader />
  ) : (
    <div className={carouselStyle.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={2000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
}
