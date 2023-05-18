import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Link,
  Snackbar,
  Tooltip,
  Typography,
  CardActions,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  Bookmark,
  BookmarkBorder,
  OpenInNew,
  Share,
} from "@mui/icons-material";

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

  useEffect(() => {
    console.log(url, urlToImage, title, description);
  }, [url, urlToImage, title, description]);

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
    <Card
      sx={{
        color: darkMode ? "#bdbdbd" : "#000000",
        borderRadius: "20px",
        border: "solid 2px",
      }}
    >
      <Box position="relative">
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
            <>
              <Tooltip title="Share">
                <IconButton
                  sx={{
                    color: darkMode
                      ? "rgba(255, 255, 255, 0.9)"
                      : "rgba(0, 0, 0, 0.9)",
                  }}
                  onClick={handleShareArticle}
                >
                  <Share />
                </IconButton>
              </Tooltip>
              <Tooltip title={isSaved ? "Unsave" : "Save"}>
                <IconButton
                  sx={{
                    color: darkMode
                      ? "rgba(255, 255, 255, 0.9)"
                      : "rgba(0, 0, 0, 0.9)",
                  }}
                  onClick={handleSaveArticle}
                >
                  {isSaved ? <Bookmark /> : <BookmarkBorder />}
                </IconButton>
              </Tooltip>
            </>
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
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
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
        <CardActions sx={{ backgroundColor: darkMode ? "#191919" : "#ffffff" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Link
              sx={{
                color: darkMode ? "#f5f5f5" : "black",
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
