import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

const Home = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleRedirect = () => {
    setShouldRedirect(true);
  };

  if (shouldRedirect) {
    return <Navigate to="/users" />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar style={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          />
          <Button onClick={handleRedirect} color="inherit">
            Redirect to Users
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Home;
