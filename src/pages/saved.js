import * as React from "react";
import { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useSavedArticles from "../hooks/useSavedArticles";
import newsyTheme from "../themes/theme";
import ArticleCard from "../components/ArticleCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const SavedArticles = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { savedArticles, saveArticle, unsaveArticle, isArticleSaved } =
    useSavedArticles();
  const theme = useTheme();
  const darkTheme = newsyTheme(darkMode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    setDarkMode(JSON.parse(saved) || false);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

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
              borderRadius: "20px",
              border: "solid 0px",
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom>
              Saved Articles
            </Typography>
            {savedArticles.length > 0 ? (
              savedArticles.map((article, index) => (
                <ArticleCard
                  key={index}
                  article={article}
                  darkMode={darkMode}
                  showMedia={!isMobile}
                  showDescription={true}
                  savedArticles={savedArticles}
                  saveArticle={saveArticle}
                  unsaveArticle={unsaveArticle}
                  isArticleSaved={isArticleSaved}
                  onUnsave={() => unsaveArticle(article.url)}
                />
              ))
            ) : (
              <Alert mt={3} severity="info">
                No saved articles to display.
              </Alert>
            )}
          </Box>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default SavedArticles;
