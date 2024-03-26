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

function CoinInfo({ coin }) {
  const [historicData, setHistoricData] = useState(null);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const { curr } = useCoins();

  useEffect(() => {
    async function fetchHistoricData() {
      setLoading(true);
      const { data } = await axios.get(HistoricalChart(coin.id, days, curr));
      setHistoricData(data.prices);
      setLoading(false);
      console.log("historic", data.prices);
    }
    if (coin.id) fetchHistoricData();
  }, [days, coin.id, curr]);

  //   console.log(coin);
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
              label: `Price ( Past ${days} Days ) in ${curr}`,
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
          //   border: "1px solid red",
          margin: "40px auto",
        }}
      >
        {chartDays.map((day, i) => (
          <DaysButton
            key={i}
            setDays={setDays}
            value={day.value}
            selected={day.value === days}
          >
            {day.label}
          </DaysButton>
        ))}
      </Box>
    </Container>
  ) : (
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

export default CoinInfo;
