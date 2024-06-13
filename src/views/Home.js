import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { add } from "../redux/cartSlice";
import { useAuth } from "../context/AuthContext";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircleOutline } from "react-icons/io";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchPosts();
  }, [searchQuery, sortOption]);

  const fetchPosts = async () => {
    try {
      let apiUrl = "https://freetestapi.com/api/v1/books";
      if (searchQuery) {
        apiUrl += `?search=${searchQuery}`;
      } else if (sortOption) {
        apiUrl += `?sort=${sortOption}&order=dec`;
      }
      const response = await axios.get(apiUrl);
      setPosts(response.data);
    } catch (error) {
      toast.error("Error fetching data of posts:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSortOption("");
  };

  const handleSort = (option) => {
    setSortOption(option);
    setSearchQuery("");
  };

  const handleAddToCart = (product) => {
    if (currentUser) {
      dispatch(add(product));
      toast.success("Product added successfully")
    } else {
      toast.error("User not authenticated. Please log in to add to cart.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "black",
        minHeight: "100vh",
        padding: isMobile ? "16px" : "32px",
      }}
    >
      <Navbar />

      <ToastContainer/>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={8}
        px={isMobile ? 2 : 0}
      >
        {currentUser ? (
          <Typography variant="h5" gutterBottom sx={{ color: "wheat" }}>
            Welcome, {currentUser.email}!
          </Typography>
        ) : (
          <Typography variant="h5" gutterBottom sx={{ color: "wheat" }}>
            Welcome to our Bookstore!
          </Typography>
        )}

        <Box
          display="flex"
          width="100%"
          mb={3}
          justifyContent="space-between"
          flexDirection={isMobile ? "column" : "row"}
          alignItems={isMobile ? "stretch" : "center"}
          gap={isMobile ? 2 : 0}
        >
          <TextField
            label="Search by title"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{
              flex: 1,
              marginRight: isMobile ? 0 : 2,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          />
          <FormControl
            variant="outlined"
            sx={{ minWidth: isMobile ? "100%" : 200, backgroundColor: "white", borderRadius: 1 }}
          >
            <InputLabel>Sort by Name</InputLabel>
            <Select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              label="Sort by Name"
            >
              <MenuItem value="name">Name (A-Z)</MenuItem>
              <MenuItem value="-name">Name (Z-A)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {posts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  width: "100%",
                  border: "1px solid wheat",
                  backgroundColor: "#3F3F3F",
                  color: "white",
                  height:"500px",
                  
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.cover_image}
                  alt={product.title}
                />
                <CardContent sx={{height:"215px"}}>
                  <Typography gutterBottom variant="h5" component="div" sx={{color:"wheat", textAlign:"center"}}>
                    {product.title}
                  </Typography>
                  <Typography variant="h5" sx={{color:"wheat" , textAlign:"center"}}>{product.author}</Typography>
                  <Typography variant="body2" marginTop={"5px"} >
                    {product.description}
                  </Typography>
                  <Typography variant="body2" marginTop={"5px"}>
                    Genre: {product.genre}
                  </Typography>
                  <Typography variant="body2" marginTop={"5px"}>
                    Publication Year: {product.publication_year}
                  </Typography>
                  <Typography variant="body2" marginTop={"5px"}>
                    Price: 50 Rs.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<IoIosAddCircleOutline/>}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;