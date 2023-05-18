import * as React from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { FooterBox } from "../styles/Custom.styles.js";

const Footer = () => {
  return (
    <FooterBox>
      <Container maxWidth="md">
        <Typography variant="h6" color="textPrimary" align="center">
          Newsy
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Newsy © " + new Date().getFullYear()}
        </Typography>
        <Box mt={4} display="flex" justifyContent="center" alignItems="center">
          <Link
            color="inherit"
            href="https://www.github.com/rickknowlton/newsy"
            display="flex"
            alignItems="center"
          >
            <GitHubIcon sx={{ mr: 1 }} />
            Github
          </Link>
        </Box>
      </Container>
    </FooterBox>
  );
};

export default Footer;

