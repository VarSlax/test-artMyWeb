import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: 10 }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
