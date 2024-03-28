import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCoins } from "../../context/CoinContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = useCoins();

  async function handleSubmit() {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: "Login successfull",
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  }

  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
      <TextField
        variant="outlined"
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        type="password"
        label="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        disabled="true"
        size="large"
        color="primary"
        onSubmit={handleSubmit}
      >
        <span>Login</span>
      </Button>
    </Box>
  );
}

export default Login;
