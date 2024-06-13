
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Typography,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { remove, increaseQuantity, decreaseQuantity, setQuantity } from "../redux/cartSlice";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Cart() {
  const cartItems = useSelector((state) => state?.cart);
  const [total, setTotal] = useState(calculateTotal());
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(remove(productId));
    setTotal(calculateTotal());
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
    setTotal(calculateTotal());
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
    setTotal(calculateTotal());
  };

  function calculateTotal() {
    return cartItems
      ?.reduce((total, item) => total + item.quantity * 50, 0)
      ?.toFixed(2);
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#3F3F3F", 
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "white", 
            color: "#111", 
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, marginBottom: "20px" }}
          >
            Your Shopping Cart
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.title}
                    </TableCell>
                    <TableCell align="right">Rs. {50}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleDecreaseQuantity(item.id)}
                        size="small"
                        sx={{ color: "#111" }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      {item.quantity}
                      <IconButton
                        onClick={() => handleIncreaseQuantity(item.id)}
                        size="small"
                        sx={{ color: "#111" }}
                      >
                        <AddIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell align="right">Rs. {item.quantity * 50}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleRemove(item.id)}
                        size="small"
                        sx={{ color: "#FF5252" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            Total: Rs. {calculateTotal()}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              gap:"10px"
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  borderColor: "#111",
                  borderRadius: "5px",
                }}
              >
                Back to Home
              </Button>
            </Link>
            <Link to="/checkout" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  borderColor: "#111",
                  borderRadius: "5px",
                }}
              >
                Checkout
              </Button>
            </Link>
          </Box>
        </Card>
      </Box>
    </>
  );
}

export default Cart;
