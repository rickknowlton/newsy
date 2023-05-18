import * as React from "react";
import { useState, useRef } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Home, Bookmark, Search, Menu as MenuIcon } from "@mui/icons-material";
import { useRouter } from "next/router";

const MobileMenu = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  const handleMobileMenuOpen = () => setMobileMenuOpen(true);
  const handleMobileMenuClose = () => setMobileMenuOpen(false);

  const handleHomeClick = () => {
    router.push("/");
    handleMobileMenuClose();
  };

  const handleSavedClick = () => {
    router.push("/saved");
    handleMobileMenuClose();
  };

  const handleSearchClick = () => {
    router.push("/search");
    handleMobileMenuClose();
  };

  return (
    <>
      <IconButton
        color="inherit"
        ref={menuButtonRef}
        onClick={handleMobileMenuOpen}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={menuButtonRef.current}
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem sx={{ minWidth: "200px" }} onClick={handleHomeClick}>
          <IconButton color="inherit">
            <Home />
          </IconButton>
          Home
        </MenuItem>
        <MenuItem sx={{ minWidth: "200px" }} onClick={handleSavedClick}>
          <IconButton color="inherit">
            <Bookmark />
          </IconButton>
          Saved
        </MenuItem>
        <MenuItem sx={{ minWidth: "200px" }} onClick={handleSearchClick}>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          Search
        </MenuItem>
      </Menu>
    </>
  );
};

export default MobileMenu;
