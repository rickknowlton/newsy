import * as React from "react";
import { useState, useEffect } from "react";
import { Grid, IconButton, Snackbar, Tooltip } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  Bookmark,
  BookmarkBorder,
  OpenInNew,
  Share,
} from "@mui/icons-material";
import {
  Image,
  Title,
  Description,
  ReadMoreButton,
} from "../styles/Custom.styles";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ArticleCard = ({
  article: { url, urlToImage, title, description } = {},
  darkMode,
  showDescription,
  showMedia,
  savedArticles,
  saveArticle,
  unsaveArticle,
  isArticleSaved,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(isArticleSaved(url));
  }, [url, isArticleSaved]);

  const handleSaveArticle = () => {
    if (isSaved) {
      unsaveArticle(url);
      setSnackbarMessage("Article removed from favorites!");
    } else {
      saveArticle({ url, urlToImage, title, description });
      setSnackbarMessage("Article saved to favorites!");
    }
    setIsSaved(!isSaved);
    setSnackbarOpen(true);
  };

  const handleShareArticle = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(url);
    setSnackbarMessage("Article link copied to clipboard!");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Grid
      container
      sx={{
        mt: 2,
        borderRadius: "20px",
        border: 2,
        color: darkMode ? "#bdbdbd" : "#000000",
        p: 0,
        whiteSpace: "normal",
      }}
    >
      {showMedia && (
        <Grid item xs={2}>
          <Image src={urlToImage || "/images/newsy-sq.png"} alt={title} />
        </Grid>
      )}
      <Grid item xs={showMedia ? 10 : 12} container direction="column">
        <Grid item container justifyContent="flex-end">
          <Tooltip title="Share">
            <IconButton onClick={handleShareArticle}>
              <Share sx={{ color: darkMode ? "white" : "black" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={isSaved ? "Unsave" : "Save"}>
            <IconButton onClick={handleSaveArticle}>
              {isSaved ? (
                <Bookmark sx={{ color: darkMode ? "white" : "black" }} />
              ) : (
                <BookmarkBorder sx={{ color: darkMode ? "white" : "black" }} />
              )}
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Title
            sx={{
              color: darkMode ? "#ffffff" : "#000000",
            }}
            variant="h6"
          >
            {title}
          </Title>
          {showDescription && (
            <Description
              variant="body2"
              sx={{
                color: darkMode ? "#f5f5f5" : "#000000",
              }}
            >
              {description && description.length > 180
                ? description.substring(0, 180) + "..."
                : description}
            </Description>
          )}
        </Grid>
        <Grid item container justifyContent="flex-end">
          <ReadMoreButton
            variant="outlined"
            color="primary"
            startIcon={<OpenInNew />}
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </ReadMoreButton>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        style={{ marginBottom: "40px" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ArticleCard;
