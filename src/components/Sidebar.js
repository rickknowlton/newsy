import * as React from "react";
import { useEffect, useRef } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material";

const Sidebar = ({
  articles,
  currentArticleIndex,
  setCurrentArticleIndex,
  darkMode,
}) => {
  const activeItemRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (activeItemRef.current && containerRef.current) {
      const itemTop = activeItemRef.current.offsetTop;
      const itemHeight = activeItemRef.current.offsetHeight;
      const containerScroll = containerRef.current.scrollTop;
      const containerHeight = containerRef.current.offsetHeight;

      if (itemTop < containerScroll) {
        containerRef.current.scrollTop = itemTop;
      } else if (itemTop + itemHeight > containerScroll + containerHeight) {
        containerRef.current.scrollTop = itemTop + itemHeight - containerHeight;
      }
    }
  }, [currentArticleIndex]);

  return (
    <Box
      ref={containerRef}
      sx={{
        height: "772px",
        boxSizing: "border-box",
        overflow: "auto",
        backgroundColor: darkMode ? "#424242" : "#ffffff",
        color: darkMode ? "#bdbdbd" : "#000000",
        borderRadius: "20px",
        border: "solid 2px",
      }}
    >
      <List component="nav">
        {articles.length
          ? articles.map((article, index) => (
              <ListItemButton
                selected={index === currentArticleIndex}
                onClick={() => setCurrentArticleIndex(index)}
                key={index}
                ref={index === currentArticleIndex ? activeItemRef : null}
                sx={{
                  backgroundColor: darkMode ? "#212121" : "#ffffff",
                  transition: "background-color 0.5s",
                }}
              >
                <ListItemText
                  primary={article.title}
                  secondary={
                    article.description && article.description.length > 180
                      ? article.description.substring(0, 180) + "..."
                      : article.description
                  }
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: "bold",
                      fontSize: "1em",
                      fontFamily: '"BioRhyme", Arial, serif',
                      color: darkMode ? "#f5f5f5" : "#000000",
                    },
                  }}
                  secondaryTypographyProps={{
                    sx: {
                      fontSize: "1em",
                      fontWeight: "500",
                      fontFamily: '"Wix Madefor Display", Arial, sans-serif',
                      color: darkMode ? "#bdbdbd" : "inherit",
                    },
                  }}
                />
              </ListItemButton>
            ))
          : Array(5)
              .fill()
              .map((_, i) => (
                <>
                  <Skeleton
                    key={i}
                    height={"150px"}
                    animation="wave"
                    variant="rectangle"
                  />
                  <Skeleton
                    key={i}
                    height={"150px"}
                    animation="wave"
                    variant="rectangle"
                    sx={{
                      backgroundColor: "grey.800",
                    }}
                  />
                </>
              ))}
      </List>
    </Box>
  );
};

export default Sidebar;
