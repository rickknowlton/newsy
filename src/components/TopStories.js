import * as React from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import StoryCard from "./StoryCard";

const TopStories = ({
  articles,
  currentArticleIndex,
  setCurrentArticleIndex,
  darkMode,
  savedArticles,
  saveArticle,
  unsaveArticle,
  isArticleSaved,
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  if (!articles.length) return null;

  const article = articles[currentArticleIndex];

  const arrowButtonStyle = {
    position: "absolute",
    top: "50%",
    zIndex: 100,
    transform: "translateY(-50%)",
    borderRadius: "8px",
    width: "50px",
    height: "50px",
    background: darkMode
      ? "rgba(255, 255, 255, 0.7)"
      : "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      background: darkMode
        ? "rgba(255, 255, 255, 0.9)"
        : "rgba(255, 255, 255, 0.9)",
    },
  };

  return (
    <Box position="relative">
      <IconButton
        sx={{ ...arrowButtonStyle, left: 5 }}
        onClick={() =>
          setCurrentArticleIndex(
            (currentArticleIndex - 1 + articles.length) % articles.length
          )
        }
      >
        <ArrowBack fontSize="medium" />
      </IconButton>
      <IconButton
        sx={{ ...arrowButtonStyle, right: 5 }}
        onClick={() =>
          setCurrentArticleIndex((currentArticleIndex + 1) % articles.length)
        }
      >
        <ArrowForward fontSize="medium" />
      </IconButton>
      <StoryCard
        article={article}
        darkMode={darkMode}
        showDescription={true}
        mediaHeight="500px"
        cardContentHeight={isMobile ? "260px" : "130px"}
        saveArticle={saveArticle}
        unsaveArticle={unsaveArticle}
        isArticleSaved={isArticleSaved}
      />
    </Box>
  );
};

export default TopStories;
