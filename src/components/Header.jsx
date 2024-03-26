import {
  AppBar,
  Container,
  InputBase,
  ThemeProvider,
  Toolbar,
  Typography,
  alpha,
  createTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCoins } from "../context/CoinContext";
import styled from "@emotion/styled";

const logoStyle = {
  flex: 1,
  cursor: "pointer",
  color: "aqua",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: "1.5rem",
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "100px",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
  },
}));

function Header() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const { curr, setCurr } = useCoins();
  const navigate = useNavigate();
  //   console.log(curr);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography sx={logoStyle} onClick={() => navigate("/")}>
              Crypto Tracker
            </Typography>
            <form>
              <Search>
                <StyledInputBase
                  // placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={curr}
                  onChange={(e) => {
                    setCurr(e.target.value);
                  }}
                />
              </Search>
            </form>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
