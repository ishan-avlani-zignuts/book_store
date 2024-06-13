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
  const { currentUser, logout } = useAuth();
  const items = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout(); 
    toast.success("Logged out successfully.");
    navigate("/"); 
  };

  return (
    <>
      <Box>
        <AppBar style={{ backgroundColor: "#3f3f3f", color: "white" }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "wheat", fontSize: "18px" }}
            >
              Book Store
            </Typography>
            <Box gap={2} display={"flex"}>
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <Box display={"flex"} sx={{ border: "1px solid wheat" }}>
                  <Button
                    sx={{
                      color: "wheat",
                    }}
                  >
                    Cart 
                  </Button>
                  <Box
                    my={0.5}
                    sx={{
                      borderRadius: "45px",
                      backgroundColor: "wheat",
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
                      color: "blue",
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
                    color: "wheat",
                    border: "1px solid wheat",
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
