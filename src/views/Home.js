// Home.js

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
} from "@mui/material";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { add } from "../redux/cartSlice";
import { useAuth } from "../context/AuthContext"; 

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const { currentUser } = useAuth(); 
  const dispatch = useDispatch();

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
      console.error("Error fetching data of posts:", error);
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
    } else {
      console.log("User not authenticated. Please log in to add to cart.");
    }
  };

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={3}
        mt={8}
      >
        {currentUser ? (
          <Typography variant="h3" gutterBottom>
            Welcome, {currentUser.email}!
          </Typography>
        ) : (
          <Typography variant="h3" gutterBottom>
            Welcome to our Bookstore!
          </Typography>
        )}

        <Box display="flex" width="100%" mb={3} justifyContent="space-between">
          <TextField
            label="Search by title"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{ flex: 1, marginRight: 2 }}
          />
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
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

        <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
          {posts.map((product) => (
            <Card
              key={product.id}
              sx={{ maxWidth: 345, width: "100%", borderRadius: "5px" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.cover_image}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="h5">{product.author}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Genre: {product.genre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Publication Year: {product.publication_year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: 50 Rs.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Home;
