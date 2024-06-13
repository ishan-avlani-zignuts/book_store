import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import bcrypt from "bcryptjs";

const Profile = () => {
  const { currentUser, updateUserProfile, updatePassword } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
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

  const onSubmit = async (data) => {
    const { currentPassword, newPassword, confirmPassword, ...profileData } =
      data;

    if (currentPassword && newPassword) {
      const isPasswordValid = bcrypt.compareSync(
        currentPassword,
        currentUser.hashedPassword
      );
      if (!isPasswordValid) {
        toast.error("Invalid current password.");
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match.");
        return;
      }
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      updatePassword(hashedPassword);

      updateUserProfile(profileData);

      toast.success("Profile updated successfully.", { duration: 2000 });
    } else {
      updateUserProfile(profileData);

      toast.success("Profile updated successfully.", { duration: 2000 });
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
      <Box
        style={{
          width: "600px",
          padding: "24px",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" style={{ marginBottom: "20px" }}>
          Update Profile
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            {...register("firstName", { required: "First Name is required" })}
            label="First Name"
            variant="outlined"
            fullWidth
            defaultValue={currentUser?.firstName}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            {...register("lastName", { required: "Last Name is required" })}
            label="Last Name"
            variant="outlined"
            fullWidth
            defaultValue={currentUser?.lastName}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            {...register("email", { required: "Email is required" })}
            label="Email"
            variant="outlined"
            fullWidth
            defaultValue={currentUser?.email}
            error={!!errors.email}
            helperText={errors.email?.message}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            {...register("mobile", { required: "Mobile Number is required" })}
            label="Mobile Number"
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
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
            label="Confirm New Password"
            type="password"
            variant="outlined"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            style={{ marginBottom: "10px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ padding: "12px", marginTop: "20px" }}
          >
            Update Profile
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Profile;
