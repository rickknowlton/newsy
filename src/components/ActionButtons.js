import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Bookmark, BookmarkBorder, Share } from "@mui/icons-material";

const ActionButtons = ({
  isSaved,
  handleSaveArticle,
  handleShareArticle,
  darkMode,
}) => {
  return (
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
  );
};

export default ActionButtons;
