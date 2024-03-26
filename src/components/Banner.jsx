import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Carousel from "./Carousel";
import CoinsTable from "./CoinsTable";

const bannerStyle = {
  boxStyle: {
    backgroundImage: "url(/banner3.jpeg)",
  },
  containerStyle: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    // paddingTop: 25,
    justifyContent: "space-around",
    // alignItems: "center",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  headingStyle: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    margin: "30px 0px",
  },
};

function Banner() {
  return (
    <Box sx={bannerStyle.boxStyle}>
      <Container sx={bannerStyle.containerStyle}>
        <Box
          className={bannerStyle.tagline}
          sx={{
            //   fontWeight: "bold",
            //   //   marginBottom: 15,
            //   fontFamily: "Montserrat",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: 4,
              fontFamily: "Montserrat",
              textAlign: "center",
            }}
          >
            Track The Crypto Market
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the latest crypto info at one place
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Box>
  );
}

export default Banner;
