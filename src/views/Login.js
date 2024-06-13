import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;

    login(email, password);

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/");
    }
  };

  return (
    <Box
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#3F3F3F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ToastContainer />
      <Box
        style={{
          width: "900px",
          height: "500px",
          display: "flex",
          borderRadius: "10px",
        }}
      >
        <Box
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            padding: "24px",
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              style={{ fontSize: "35px", marginTop: "0" }}
            >
              Login to Your Account
            </Typography>
            <TextField
              {...register("email", { required: "Email is required" })}
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <br />
            <TextField
              {...register("password", { required: "Password is required" })}
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                border: "none",
                outline: "none",
                padding: "12px 0",
                backgroundColor: "#3bb19b",
                borderRadius: "20px",
                width: "180px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                margin: "10px",
              }}
            >
              Login
            </Button>
          </form>
        </Box>
        <Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#3bb19b",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            padding: "24px",
          }}
        >
          <Typography
            variant="h3"
            style={{ fontSize: "40px", color: "white", marginTop: "0" }}
          >
            Login
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
