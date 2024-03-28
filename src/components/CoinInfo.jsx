import { Box, CircularProgress, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/chartDays";
import { useCoins } from "../context/CoinContext";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import DaysButton from "./DaysButton";
import Loader from "./Loader";

function CoinInfo({ coin }) {
  const [historicData, setHistoricData] = useState(null);
  const [days, setDays] = useState(1);
  const { currency } = useCoins();

  useEffect(() => {
    async function fetchHistoricData() {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setHistoricData(data.prices);
    }
    if (coin.id) fetchHistoricData();
  }, [days, coin.id, currency]);

  return historicData ? (
    <Container>
      <Line
        data={{
          labels: historicData.map((hData) => {
            let date = new Date(hData[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              label: `Price ( Past ${days} Days ) in ${currency}`,
              data: historicData.map((hData) => hData[1]),
              borderColor: "aqua",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          widht: "100%",
          margin: "40px auto",
        }}
      >
        {chartDays.map((day, i) => (
          <DaysButton
            key={i}
            setDays={setDays}
            value={day.value}
            selected={day.value == days}
          >
            {day.label}
          </DaysButton>
        ))}
      </Box>
    </Container>
  ) : (
    <Loader />
  );
}

export default CoinInfo;
