import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  AppBar,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Bookmark,
  Home,
  LightMode,
  NightsStay,
  Search,
} from "@mui/icons-material";
import useNewsSearchAPI from "../hooks/useNewsSearchAPI";
import { SearchBar } from "../styles/Custom.styles";
import Loader from "./Loader";

const Navbar = ({
  darkMode,
  handleThemeChange,
  handleCountryChange,
  showCountryToggle = true,
}) => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [country, setCountry] = useState("us");
  const [showLoader, setShowLoader] = useState(false);
  const { search, setSearchQuery } = useNewsSearchAPI();
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleSearch = (e) => {
    if ((e.key === "Enter" || e.type === "click") && searchInput) {
      setShowLoader(true);
      setSearchQuery(searchInput);
      router.push(`/search?query=${searchInput}`).then(() => {
        setShowSearch(false);
        setShowLoader(false);
      });
    }
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleSearchIconClick = () => {
    if (isMobile) {
      router.push("/search");
    } else {
      setShowSearch(!showSearch);
    }
  };

  const handleCountryClick = (countryCode) => {
    handleCountryChange(countryCode);
    setSearchQuery("");
    setCountry(countryCode);
  };

  return (
    <>
      <Loader open={showLoader} />
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <IconButton color="inherit" onClick={handleHomeClick}>
                <Home />
              </IconButton>
              <IconButton color="inherit" onClick={() => router.push("/saved")}>
                <Bookmark />
              </IconButton>
              <IconButton color="inherit" onClick={handleSearchIconClick}>
                <Search />
              </IconButton>
              {!isMobile && showSearch && (
                <>
                  <SearchBar
                    id="outlined-search"
                    label="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleSearch}
                    inputProps={{
                      style: {
                        color: darkMode ? "#000000" : "#ffffff",
                      },
                    }}
                    darkMode={darkMode}
                  />
                  <Button
                    size="medium"
                    variant="outlined"
                    onClick={handleSearch}
                    disabled={!searchInput}
                    sx={{
                      color: darkMode ? "#212121" : "#f5f5f5",
                      border: "2px solid",
                      borderColor: darkMode ? "#212121" : "#f5f5f5",
                      height: "56px",
                      width: "56px",
                      minWidth: "56px",
                      ":hover": {
                        borderColor: darkMode ? "#212121" : "#f5f5f5",
                        backgroundColor: darkMode ? "#212121" : "#f5f5f5",
                        color: darkMode ? "#f5f5f5" : "#212121",
                      },
                      ":disabled": {
                        borderColor: darkMode ? "#424242" : "#f5f5f5",
                        color: darkMode ? "#424242" : "#f5f5f5",
                      },
                    }}
                  >
                    GO
                  </Button>
                </>
              )}
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                flexGrow: 1,
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h2" onClick={handleHomeClick}>
                Newsy
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <IconButton
                edge="end"
                color="inherit"
                aria-label="mode"
                onClick={handleThemeChange}
                sx={{ marginRight: 1 }}
              >
                {darkMode ? <LightMode /> : <NightsStay />}
              </IconButton>
              {showCountryToggle && (
                <ButtonGroup variant="outlined">
                  <Button
                    color="inherit"
                    onClick={() => handleCountryClick("us")}
                    sx={{
                      backgroundColor:
                        country === "us"
                          ? darkMode
                            ? "action.selected"
                            : "#424242"
                          : "transparent",
                    }}
                  >
                    US
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleCountryClick("gb")}
                    sx={{
                      backgroundColor:
                        country === "gb"
                          ? darkMode
                            ? "action.selected"
                            : "#424242"
                          : "transparent",
                    }}
                  >
                    UK
                  </Button>
                </ButtonGroup>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
