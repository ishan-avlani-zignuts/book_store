import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { IoMdLogIn } from "react-icons/io";
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signup(data);
      toast.success("Account created successfully. Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error("An error occurred during signup. Please try again.");
    }
  };

  return (
    <Box
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
     
      <Box
        style={{
          width: "900px",
          height: "600px",
          display: "flex",
          borderRadius: "10px",
        }}
      >
         <ToastContainer />
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
            <Typography variant="h3" style={{ fontSize: "35px", marginBottom: "25px" }}>
              Create Your Account
            </Typography>
            <TextField
              {...register("firstName", { required: "First Name is required" })}
              label="First Name"
              variant="outlined"
              fullWidth
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <br />
            <TextField
              {...register("lastName", { required: "Last Name is required" })}
              label="Last Name"
              variant="outlined"
              fullWidth
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
            <br />
            <TextField
              {...register("email", { required: "Email is required" })}
              label="Email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <br />
            <TextField
              {...register("mobile", { required: "Mobile Number is required" })}
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
            />
            <br />
            <TextField
              {...register("password", { required: "Password is required" })}
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <br />
            <TextField
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
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
              Sign Up
            </Button>
          </form>
          <Box>
            <Typography>
              Already have an account ? <Link to="/login">Login</Link>
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
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-8694031-6983270.png?f=webp" alt="Signup" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default SignupForm;
