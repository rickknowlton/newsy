import * as React from "react";
import { useState, useEffect } from "react";
import { Grid, Link, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { OpenInNew } from "@mui/icons-material";
import {
  Description,
  Image,
  PublishedAt,
  ReadMoreButton,
  Title,
} from "../styles/Custom.styles";
import ActionButtons from "./ActionButtons.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ArticleCard = ({
  article: { url, urlToImage, title, description, publishedAt } = {},
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
      saveArticle({ url, urlToImage, title, description, publishedAt });
      setSnackbarMessage("Article saved to favorites!");
    }
    setIsSaved(!isSaved);
    setSnackbarOpen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setSnackbarMessage("Article link copied to clipboard!");
    setSnackbarOpen(true);
  };

  const handleFacebookShare = () => {
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url),
      "_blank"
    );
    setSnackbarMessage("Article shared to Facebook!");
    setSnackbarOpen(true);
  };

  const handleTwitterShare = () => {
    window.open(
      "https://twitter.com/intent/tweet?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(title),
      "_blank"
    );
    setSnackbarMessage("Article shared to Twitter!");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const date = new Date(publishedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          <Image src={urlToImage || "/images/newsy-sq.webp"} alt={title} />
        </Grid>
      )}
      <Grid item xs={showMedia ? 10 : 12} container direction="column">
        <Grid item container justifyContent="flex-end">
          <ActionButtons
            isSaved={isSaved}
            handleSaveArticle={handleSaveArticle}
            handleCopyLink={handleCopyLink}
            handleFacebookShare={handleFacebookShare}
            handleTwitterShare={handleTwitterShare}
            darkMode={darkMode}
          />
        </Grid>
        <Grid item>
          <Link
            href={url}
            target="_blank"
            rel="noreferrer"
            sx={{
              textDecoration: "none",
              "&:hover": { color: darkMode ? "#87E52A" : "#882AE5" },
            }}
          >
            <Title variant="h6">{title}</Title>
          </Link>
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
          {!isNaN(date.getTime()) && (
            <PublishedAt
              sx={{
                color: darkMode ? "#f5f5f5" : "textSecondary",
              }}
              variant="caption"
              color="textSecondary"
            >
              Published on: {formattedDate}
            </PublishedAt>
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
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
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
