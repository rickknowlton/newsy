import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  Skeleton,
  Snackbar,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { OpenInNew } from "@mui/icons-material";
import ActionButtons from "./ActionButtons.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StoryCard = ({
  article: { url, urlToImage, title, description } = {},
  darkMode,
  showDescription = false,
  mediaHeight = "280px",
  cardContentHeight = "220px",
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

  return (
    <Card
      sx={{
        color: darkMode ? "#bdbdbd" : "#000000",
        borderRadius: "20px",
        border: "solid 2px",
      }}
    >
      <Box position="relative">
        {url ? (
          <>
            <CardHeader
              sx={{
                backgroundColor: darkMode ? "#212121" : "#ffffff",
                height: "40px",
                "& .MuiCardHeader-action": {
                  alignSelf: "auto",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                },
              }}
              action={
                <ActionButtons
                  isSaved={isSaved}
                  handleSaveArticle={handleSaveArticle}
                  handleCopyLink={handleCopyLink}
                  handleFacebookShare={handleFacebookShare}
                  handleTwitterShare={handleTwitterShare}
                  darkMode={darkMode}
                />
              }
            />
            <CardActionArea href={url} target="_blank">
              <CardMedia
                component="img"
                height={mediaHeight}
                image={urlToImage || "/images/newsy-sq.webp"}
                alt={title}
              />
            </CardActionArea>
            <CardContent
              sx={{
                height: cardContentHeight,
                color: darkMode ? "#ffffff" : "#000000",
                backgroundColor: darkMode ? "#212121" : "#ffffff",
              }}
            >
              <Link
                href={url}
                target="_blank"
                rel="noreferrer"
                sx={{
                  textDecoration: "none",
                  "&:hover": { color: darkMode ? "#87E52A" : "#882AE5" },
                }}
              >
                <Typography gutterBottom variant="h6" component="h2">
                  {title}
                </Typography>
              </Link>
              {showDescription && (
                <Typography
                  variant="body2"
                  sx={{
                    color: darkMode ? "#f5f5f5" : "#000000",
                  }}
                  component="p"
                >
                  {description && description.length > 180
                    ? description.substring(0, 180) + "..."
                    : description}
                </Typography>
              )}
            </CardContent>
            <CardActions
              sx={{ backgroundColor: darkMode ? "#191919" : "#ffffff" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <Link
                  sx={{
                    color: darkMode ? "#f5f5f5" : "#000000",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                      color: darkMode ? "lightgrey" : "grey",
                    },
                  }}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ textAlign: "right", marginRight: "5px" }}
                  >
                    Read More
                  </Typography>
                  <OpenInNew />
                </Link>
              </Box>
            </CardActions>
          </>
        ) : (
          <>
            <Skeleton variant="rectangular" height={40} />
            <Skeleton
              variant="rectangular"
              animation="wave"
              height={mediaHeight}
            />
            <Skeleton variant="rectangular" height={cardContentHeight} />
            <Skeleton variant="rectangular" height={40} />
          </>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        style={{ marginBottom: "40px" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default StoryCard;
