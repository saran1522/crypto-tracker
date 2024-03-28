import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCoins } from "../../context/CoinContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Signup({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAlert } = useCoins();

  async function handleSubmit() {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match",
        type: "error",
      });
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: "User created successfully",
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  }

  return (
    <Box
      sx={{ color: "white" }}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
    >
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
        fullwidth
        onChange={(e) => setPassword(e.target.value)}
        sx={{ color: "white" }}
      />
      <TextField
        variant="outlined"
        type="password"
        label="confirm Password"
        value={confirmPassword}
        fullwidth
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        variant="contained"
        disabled="true"
        size="large"
        color="primary"
        fullwidth
        onSubmit={handleSubmit}
      >
        <span>Sign Up</span>
      </Button>
    </Box>
  );
}

export default Signup;

// console.js:213 Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.
