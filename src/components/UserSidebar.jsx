import { Avatar, Box, Button, Drawer, Paper } from "@mui/material";
import * as React from "react";
import { useCoins } from "../context/CoinContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { cryptos, user, setAlert, watchlist } = useCoins();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function handleLogout() {
    signOut(auth);
    setAlert({
      open: true,
      message: "Logged out successfully",
      type: "success",
    });
    toggleDrawer();
  }

  async function removeFromWatchlist(coin) {
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

  return (
    <Box sx={{ marginLeft: "10px" }}>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            src={user?.photoURL}
            alt={user?.displayName || user?.email}
            sx={{ cursor: "pointer" }}
          ></Avatar>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Paper
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "rgb(26, 26, 26)",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  height: "92%",
                  width: "100%",
                }}
              >
                <Avatar
                  src={user?.photoURL}
                  alt={user?.displayName || user?.email}
                  sx={{
                    width: 100,
                    height: 100,
                    cursor: "pointer",
                    backgroundColor: "aqua",
                    objectFit: "contain",
                  }}
                ></Avatar>
                <span>{user?.displayName || user?.email}</span>
                <Box
                  sx={{
                    width: 250,
                    height: "400px",
                    borderRadius: 2,
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    boxSizing: "border-box",
                    bgcolor: "rgb(27, 27, 27)",
                    overflowY: "auto",
                  }}
                >
                  <span>Watchlist</span>
                  {cryptos.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <Box
                          key={coin.id}
                          sx={{
                            bgcolor: "aqua",
                            padding: 1.5,
                            borderRadius: 2,
                            width: 200,
                            color: "black",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>{coin.name}</span>
                          <span>{coin.current_price.toFixed(2)}</span>
                          <AiFillDelete
                            cursor={"pointer"}
                            onClick={() => removeFromWatchlist(coin)}
                          />
                        </Box>
                      );
                  })}
                </Box>
              </Box>
              <Button
                onClick={handleLogout}
                sx={{
                  height: "8%",
                  width: "100%",
                  bgcolor: "aqua",
                  marginTop: 2,
                  color: "black",
                  "&:hover": { bgcolor: "aqua" },
                }}
              >
                Log Out
              </Button>
            </Paper>
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}
