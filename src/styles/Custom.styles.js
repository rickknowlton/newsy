import { styled } from "@mui/system";
import { Box, Button, TextField, Typography } from "@mui/material";

export const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "18px 0 0 18px",
});

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  overflowWrap: "break-word",
  whiteSpace: "normal",
  padding: "0 20px",
}));

export const Description = styled(Typography)(({ theme }) => ({
  overflowWrap: "break-word",
  whiteSpace: "normal",
  padding: "0 20px",
}));

export const ReadMoreButton = styled(Button)(({ theme }) => ({
  margin: "5px 20px 10px",
}));

export const SearchBar = styled(TextField)(({ theme, darkMode }) => ({
  "& label.Mui-focused": {
    color: darkMode ? theme.palette.text.primary : "#f5f5f5",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: darkMode ? theme.palette.text.primary : "#f5f5f5",
  },
  "& .MuiInputLabel-root": {
    color: darkMode ? theme.palette.text.primary : "#f5f5f5",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: darkMode ? theme.palette.text.primary : "#f5f5f5",
    },
    "&:hover fieldset": {
      borderColor: darkMode ? theme.palette.text.primary : "#f5f5f5",
    },
    "&.Mui-focused fieldset": {
      borderColor: darkMode ? theme.palette.text.primary : "#f5f5f5",
    },
  },
  marginRight: theme.spacing(1),
}));

export const FooterBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  backgroundColor: theme.palette.mode === "light" ? "#f3f3f3" : "#424242",
  mt: 5,
}));
