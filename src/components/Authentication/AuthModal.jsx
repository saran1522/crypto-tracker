import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Paper } from "@mui/material";
import BasicTabs from "./BasicTabs";
import GoogleButton from "react-google-button";
import { useCoins } from "../../context/CoinContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  boxShadow: 40,
  p: 1,
  baccolor: "#171a21",
};

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setAlert } = useCoins();
  const googleProvider = new GoogleAuthProvider();

  function signInWithGoogle() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setAlert({
          open: true,
          message: `Login Successfull for ${result.user.displayName}`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: `Login Failed due to ${error.message}`,
          type: "error",
        });
      });
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: "aqua",
          marginLeft: "10px",
          color: "black",
          "&:hover": { backgroundColor: "aqua" },
        }}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <BasicTabs handleClose={handleClose} />
          <Box
            sx={{
              paddingTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 2,
              fontSize: 14,
            }}
          >
            <span>OR</span>
            <GoogleButton
              style={{ width: "90%", bgcolor: "red", borderRadius: 6 }}
              onClick={signInWithGoogle}
            />
          </Box>
        </Paper>
      </Modal>
    </div>
  );
}
