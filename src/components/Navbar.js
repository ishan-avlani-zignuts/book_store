

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { useAuth } from "../context/AuthContext"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const { currentUser, handleLogout } = useAuth(); 
  const items = useSelector((state) => state.cart); 
  const navigate = useNavigate(); 

  const handleLogoutClick = () => {
    handleLogout(); 
    toast.success("You are logged out successfully");
    navigate("/"); 
  };

  return (
    <>
      <Box>
        <AppBar style={{ backgroundColor: "black", color: "white" }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white", fontSize: "18px" }}
            >
              Book Store
            </Typography>
            <Box gap={2} display={"flex"}>
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <Box display={"flex"} sx={{ border: "1px solid #4CDBBE" }}>
                  <Button
                    sx={{
                      color: "#4CDBBE",
                    }}
                  >
                    Cart
                  </Button>
                  <Box
                    my={0.5}
                    sx={{
                      borderRadius: "45px",
                      backgroundColor: "#4CDBBE",
                      fontSize: "15px",
                    }}
                    px={3}
                    py={0.5}
                  >
                    {items.length}
                  </Box>
                </Box>
              </Link>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <Box display={"flex"}>
                  <Avatar
                    onClick={() => navigate("/profile")}
                    sx={{
                      color: "green",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  >
                  </Avatar>
                </Box>
              </Link>
              {currentUser && (
                <Button
                  sx={{
                    color: "#4CDBBE",
                    border: "1px solid #4CDBBE",
                  }}
                  onClick={handleLogoutClick}
                >
                  Logout
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;

