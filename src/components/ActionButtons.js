import * as React from "react";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import {
  Bookmark,
  BookmarkBorder,
  Link,
  Facebook,
  Share,
  Twitter,
} from "@mui/icons-material";

const ActionButtons = ({
  isSaved,
  handleSaveArticle,
  handleShareArticle,
  handleCopyLink,
  handleFacebookShare,
  handleTwitterShare,
  darkMode,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Share">
        <IconButton
          sx={{
            color: darkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)",
          }}
          onClick={handleClick}
        >
          <Share />
        </IconButton>
      </Tooltip>

      <Menu
        id="share-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCopyLink}>
          <Box mr={1}>
            <Link />
          </Box>
          Copy link
        </MenuItem>
        <MenuItem onClick={handleFacebookShare}>
          <Box mr={1}>
            <Facebook />
          </Box>
          Share on Facebook
        </MenuItem>
        <MenuItem onClick={handleTwitterShare}>
          <Box mr={1}>
            <Twitter />
          </Box>
          Share on Twitter
        </MenuItem>
      </Menu>

      <Tooltip title={isSaved ? "Unsave" : "Save"}>
        <IconButton
          sx={{
            color: darkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)",
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
