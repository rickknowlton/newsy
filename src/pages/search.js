import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useNewsSearchAPI from "../hooks/useNewsSearchAPI";
import useSavedArticles from "../hooks/useSavedArticles";
import newsyTheme from "../themes/theme";
import { SearchBar, SortByMenu } from "../styles/Custom.styles";
import ArticleCard from "../components/ArticleCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const SearchResults = () => {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const { savedArticles, saveArticle, unsaveArticle, isArticleSaved } =
    useSavedArticles();
  const { query } = router.query;
  const {
    articles,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    hasMore,
    isLoading,
    error,
    setPage,
  } = useNewsSearchAPI(query);
  const [searchInput, setSearchInput] = useState("");
  const theme = useTheme();
  const darkTheme = newsyTheme(darkMode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    setDarkMode(JSON.parse(saved) || false);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchInput);
  };

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleCountryChange = (countryCode) => {
    setCountry(countryCode);
    setSearchQuery("");
  };

  const handleThemeChange = () => {
    const currentMode = !darkMode;
    setDarkMode(currentMode);
};

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar
          darkMode={darkMode}
          showCountryToggle={false}
          handleThemeChange={handleThemeChange}
          handleCountryChange={handleCountryChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Container
          sx={{
            flexGrow: 1,
          }}
        >
          <Box
            my={2}
            px={isMobile ? 3 : 8}
            py={5}
            sx={{
              borderColor: darkMode ? "#212121" : "#000000",
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom>
              Search
            </Typography>
            <Box display="flex" justifyContent="center" my={4}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={12} sm={12}>
                  <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSearchSubmit}
                    style={{ width: "100%" }}
                  >
                    <SearchBar
                      size="medium"
                      fullWidth
                      darkMode={darkMode}
                      placeholder="Search articles..."
                      onChange={handleSearchChange}
                      value={searchInput}
                      InputProps={{
                        style: {
                          color: darkMode ? "#ffffff" : "#000000",
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon
                              sx={{ color: darkMode ? "#ffffff" : "#000000" }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                            >
                              Search
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            my={2}
            px={isMobile ? 3 : 8}
            py={5}
            sx={{
              borderColor: darkMode ? "#212121" : "#000000",
              borderRadius: "20px",
              border: "solid 0px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3" component="h1" gutterBottom>
                Search Results
              </Typography>
              <SortByMenu
                darkMode={darkMode}
                sx={{ minWidth: 120, marginBottom: 2 }}
              >
                <Select value={sortBy} onChange={handleSortChange} displayEmpty>
                <MenuItem value={"relevancy"}>Relevancy</MenuItem>
                  <MenuItem value={"publishedAt"}>Newest</MenuItem>
                  <MenuItem value={"popularity"}>Popularity</MenuItem>
                </Select>
              </SortByMenu>
            </Box>
            {searchQuery && searchQuery !== "" && isLoading && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
              >
                <CircularProgress />
                <Typography>Loading...</Typography>
              </Box>
            )}
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <ArticleCard
                  key={index}
                  article={article}
                  darkMode={darkMode}
                  showDescription={true}
                  showMedia={!isMobile}
                  savedArticles={savedArticles}
                  saveArticle={saveArticle}
                  unsaveArticle={unsaveArticle}
                  isArticleSaved={isArticleSaved}
                />
              ))
            ) : (
              <Alert mt={3} severity="info">
                No articles to display.
              </Alert>
            )}
            {hasMore && searchQuery && articles.length > 0 ? (
              <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" color="primary" onClick={loadMore}>
                  Load More
                </Button>
              </Box>
            ) : articles.length > 0 ? (
              <Alert sx={{ marginTop: "2rem" }} severity="info">
                No more articles to load.
              </Alert>
            ) : null}
          </Box>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default SearchResults;
