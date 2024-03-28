import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Container,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCoins } from "../context/CoinContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function CoinsTable() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(1);
  const { currency, cryptos, fetchCryptos } = useCoins();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (currency.length === 3) fetchCryptos();
    setLoading(false);
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleSearch = () => {
    return cryptos.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ marginTop: "20px" }}>
          Crypto Currency Price By Market Cap
        </Typography>
        <TextField
          id="outlined-basic"
          label="Search Crypto"
          variant="outlined"
          sx={{ width: "50%", margin: "20px 0px" }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <TableContainer>
          {loading ? (
            <Loader />
          ) : (
            <Table aria-label="simple table">
              <TableHead sx={{ backgroundColor: "aqua" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      sx={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      // align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody sx={{ backgroundColor: "#171a21" }}>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                        sx={{
                          ":hover": {
                            backgroundColor: "#14151d",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {/* {numberWithCommas(row.current_price.toFixed(2))} */}
                          {`${row.current_price.toFixed(2)} ${currency}`}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {`${row.market_cap.toString().slice(0, -6)} M`}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={10}
          page={page}
          onChange={(event, value) => {
            setPage(value);
          }}
          sx={{
            margingTop: "50px",
            width: "100%",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
