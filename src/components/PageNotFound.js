import React from "react";
import { Box, Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Box textAlign="center">
        <img
          src="https://shorturl.at/gwxKR"
          alt="404 Error"
          width={500}
          height={500}
        />
        <Typography variant="h4" color="textSecondary" mt={2}>
          Page Not Found
        </Typography>
      </Box>
    </Box>
  );
};

export default PageNotFound;
