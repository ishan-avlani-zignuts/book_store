import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { FcCancel } from "react-icons/fc";
import { Link } from 'react-router-dom';

const Profile = () => {
  const { currentUser, updateUserProfile, updatePassword } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currentUser) {
      setValue("firstName", currentUser.firstName);
      setValue("lastName", currentUser.lastName);
      setValue("email", currentUser.email);
      setValue("mobile", currentUser.mobile);
    }
  }, [currentUser, setValue]);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { currentPassword, newPassword, confirmPassword, ...profileData } = data;

    if (currentPassword && newPassword) {
      const isPasswordValid = bcrypt.compareSync(currentPassword, currentUser.password);
      if (!isPasswordValid) {
        toast.error("Invalid current password.");
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match.");
        return;
      }

      await updatePassword(newPassword);
    }

    await updateUserProfile(profileData);
    toast.success("Profile updated successfully.", { duration: 2000 });
    
    navigate("/");
    reset();
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
          width: "600px",
          padding: "24px",
          borderRadius: "10px",
          border:"1px solid black",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" style={{ marginBottom: "20px", textAlign:"center" }}>
          Update Profile
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            {...register("firstName", { required: "First Name is required" })}
            variant="outlined"
            fullWidth
            defaultValue={currentUser?.firstName}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            {...register("lastName", { required: "Last Name is required" })}
            variant="outlined"
            fullWidth
            defaultValue={currentUser?.lastName}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            {...register("email", { required: "Email is required" })}
            variant="outlined"
            fullWidth
            defaultValue={currentUser?.email}
            error={!!errors.email}
            helperText={errors.email?.message}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            {...register("mobile", { required: "Mobile Number is required" })}
            variant="outlined"
            fullWidth
            defaultValue={currentUser?.mobile}
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            {...register("currentPassword")}
            label="Current Password"
            type="password"
            variant="outlined"
            fullWidth
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            {...register("newPassword")}
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            {...register("confirmPassword", {
              validate: (value) => value === watch("newPassword") || "Passwords do not match",
            })}
            label="Confirm New Password"
            type="password"
            variant="outlined"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            style={{ marginBottom: "10px" }}
          />
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ padding: "12px", marginTop: "20px" }}
            endIcon={<RxUpdate/>}
          >
            Update Profile
          </Button>
          <Link to="/">
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "12px", marginTop: "20px" }}
            endIcon={<FcCancel/>}
          >
            Cancel
          </Button>
          </Link>
          
          </Box>
          
        </form>
      </Box>
    </Box>
  );
};

export default Profile;
