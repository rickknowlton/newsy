import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Hidden,
  ThemeProvider,
  Typography,
} from "@mui/material";
import useNewsAPI from "../hooks/useNewsAPI";
import useSavedArticles from "../hooks/useSavedArticles";
import Footer from "../components/Footer";
import TopStories from "../components/TopStories";
import MoreTopStories from "../components/MoreTopStories";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import newsyTheme from "../themes/theme";

const IndexPage = () => {
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const {
    articles,
    country,
    setCountry,
    searchQuery,
    setSearchQuery,
    hasMore,
    isLoading,
    error,
    setPage,
    setEndpoint,
  } = useNewsAPI("us");
  const { savedArticles, saveArticle, unsaveArticle, isArticleSaved } =
    useSavedArticles();

  const mainArticles = articles.slice(0, 9);
  const moreTopStories = articles.slice(9);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (!mainArticles || mainArticles.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentArticleIndex(
        (prevIndex) => (prevIndex + 1) % mainArticles.length
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [mainArticles]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          setCurrentArticleIndex(
            (currentArticleIndex - 1 + mainArticles.length) %
              mainArticles.length
          );
          console.log("ArrowLeft", currentArticleIndex);
          break;
        case "ArrowRight":
          setCurrentArticleIndex(
            (currentArticleIndex + 1) % mainArticles.length
          );
          console.log("ArrowRight", currentArticleIndex);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentArticleIndex, mainArticles.length]);

  const darkTheme = newsyTheme(darkMode);

  const handleCountryChange = (countryCode) => {
    setCountry(countryCode);
    setSearchQuery("");
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
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
          handleThemeChange={handleThemeChange}
          handleCountryChange={handleCountryChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setEndpoint={setEndpoint}
        />
        <Container
          sx={{
            flexGrow: 1,
          }}
          mx={0}
          px={0}
        >
          <Box
            my={2}
            px={0}
            py={5}
            sx={{
              borderColor: darkMode ? "darkgrey" : "black",
              borderRadius: "20px",
              border: "solid 0px",
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom>
              Top Stories
            </Typography>
            {isLoading && <CircularProgress />}
            {error && (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TopStories
                  articles={mainArticles}
                  currentArticleIndex={currentArticleIndex}
                  setCurrentArticleIndex={setCurrentArticleIndex}
                  darkMode={darkMode}
                  savedArticles={savedArticles}
                  saveArticle={saveArticle}
                  unsaveArticle={unsaveArticle}
                  isArticleSaved={isArticleSaved}
                />
              </Grid>
              <Hidden smDown>
                <Grid item md={4}>
                  <Sidebar
                    articles={mainArticles}
                    currentArticleIndex={currentArticleIndex}
                    setCurrentArticleIndex={setCurrentArticleIndex}
                    darkMode={darkMode}
                    savedArticles={savedArticles}
                    saveArticle={saveArticle}
                    unsaveArticle={unsaveArticle}
                    isArticleSaved={isArticleSaved}
                  />
                </Grid>
              </Hidden>
            </Grid>
          </Box>
          <Box
            my={0}
            px={0}
            mx={0}
            pt={0}
            sx={{
              borderColor: darkMode ? "darkgrey" : "black",
              borderRadius: "20px",
              border: "solid px",
            }}
          >
            <Typography variant="h3" component="h2" my={5} gutterBottom>
              More Top Stories
            </Typography>
            <MoreTopStories
              articles={moreTopStories}
              darkMode={darkMode}
              currentArticleIndex={currentArticleIndex}
              loadMore={loadMore}
              hasMore={hasMore}
              savedArticles={savedArticles}
              saveArticle={saveArticle}
              unsaveArticle={unsaveArticle}
              isArticleSaved={isArticleSaved}
            />
          </Box>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default IndexPage;
