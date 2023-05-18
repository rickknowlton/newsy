import * as React from "react";
import { useState } from "react";
import {
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };
  const darkTheme = newsyTheme(darkMode);

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
              borderColor: darkMode ? "darkgrey" : "black",
              borderRadius: "20px",
              border: "solid 0px",
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom>
              Saved Articles
            </Typography>
            {savedArticles.map((article, index) => (
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
            ))}
          </Box>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default SavedArticles;
