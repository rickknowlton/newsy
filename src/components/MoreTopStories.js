import * as React from "react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Box, Button, Grid, Snackbar, useMediaQuery } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import StoryCard from "./StoryCard";

const MoreTopStories = ({
  articles,
  darkMode,
  saveArticle,
  unsaveArticle,
  isArticleSaved,
  loadMore,
  hasMore,
}) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: {
        y: 1.0,
      },
    });
  };

  const handleLoadMore = () => {
    if (hasMore) {
      loadMore();
    }
  };

  useEffect(() => {
    if (!hasMore && articles.length) {
      setOpen(true);
      handleConfetti();
    }
  }, [hasMore, articles.length]);

  if (!articles.length) return null;

  return (
    <Box>
      <Grid container spacing={2}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StoryCard
              article={article}
              darkMode={darkMode}
              showDescription={false}
              mediaHeight="280px"
              cardContentHeight={isMobile ? "180px" : "210px"}
              saveArticle={saveArticle}
              unsaveArticle={unsaveArticle}
              isArticleSaved={isArticleSaved}
            />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" my={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoadMore}
          disabled={!hasMore}
        >
          Load More
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        style={{ marginBottom: "40px" }}
      >
        <MuiAlert
          onClose={handleClose}
          severity="info"
          elevation={6}
          variant="filled"
        >
          Congratulations! You&#39;ve read ALL the news! Come back later!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default MoreTopStories;
