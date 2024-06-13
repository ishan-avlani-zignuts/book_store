import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { IoMdLogIn } from "react-icons/io";
import { Link } from 'react-router-dom';
const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("login succeesfull");
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor:"black",
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
              style={{ fontSize: "35px", marginBottom: "25px" }}
            >
              Login to Your Account
            </Typography>
            <TextField
              {...register("email", { required: "Email is required" })}
              label="Email"
              variant="outlined"
              fullWidth
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
              endIcon={<IoMdLogIn/>}
            >
              Login
            </Button>
          </form>
          <Box>
            <Typography>
              Don`t have an account ? <Link to="/signup">Signup</Link>
            </Typography>
      </Box>
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
          <img src="https://knowledgemission.kerala.gov.in/img/official-login.jpg" alt="Signup" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
