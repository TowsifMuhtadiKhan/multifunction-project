import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 600); // 600px is typical small screen breakpoint
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Toggle the menu open/close
  const toggleMenu = () => setMenuOpen(!menuOpen);

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

        {isMobile ? (
          <IconButton onClick={toggleMenu} sx={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button component={Link} to="/" sx={{ color: "#fff" }}>
              Home
            </Button>
            <Button
              component={Link}
              to="/image-compress"
              sx={{ color: "#fff" }}
            >
              Image Compress
            </Button>
            <Button component={Link} to="/image-resize" sx={{ color: "#fff" }}>
              Image Resizer
            </Button>
          </Box>
        )}
      </Box>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#333",
            position: "absolute",
            top: "60px", // Offset the menu from the top
            width: "100%",
            padding: "1rem 0",
          }}
        >
          <IconButton
            onClick={toggleMenu}
            sx={{
              position: "absolute",
              top: 10,
              right: 20,
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Button
            component={Link}
            to="/"
            sx={{ color: "#fff", margin: "10px 0" }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/image-compress"
            sx={{ color: "#fff", margin: "10px 0" }}
          >
            Image Compress
          </Button>
          <Button
            component={Link}
            to="/image-resize"
            sx={{ color: "#fff", margin: "10px 0" }}
          >
            Image Resizer
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;
