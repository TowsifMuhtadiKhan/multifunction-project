import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "#282c34",
        color: "#fff",
        padding: "1rem 0",
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Button component={Link} to="/" sx={{ color: "#fff" }}>
            Home
          </Button>
          <Button component={Link} to="/image-compress" sx={{ color: "#fff" }}>
            Image Compress
          </Button>
          <Button component={Link} to="/image-resize" sx={{ color: "#fff" }}>
            Image Resizer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
