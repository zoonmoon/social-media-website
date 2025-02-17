'use client'
import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NavigationBar = ({ pageName }) => {
  const handleBack = () => {
    window.history.back(); // Goes back in browser history
  };

  return (
    <AppBar position="static"  >
      <Toolbar>
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="back" 
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pageName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
