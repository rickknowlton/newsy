import { styled } from "@mui/system";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

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

export const PublishedAt = styled(Typography)(({ theme }) => ({
  overflowWrap: "break-word",
  whiteSpace: "normal",
  padding: "0 20px",
}));

export const ReadMoreButton = styled(Button)(({ theme }) => ({
  margin: "5px 20px 10px",
}));

export const SearchBar = styled(TextField)(({ theme, darkMode }) => ({
  "& label.Mui-focused": {
    color: darkMode ? "#f3f3f3" : "#212121",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: darkMode ? "#f3f3f3" : "#212121",
  },
  "& .MuiInputLabel-root": {
    color: darkMode ? "#f3f3f3" : "#212121",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: darkMode ? "#f3f3f3" : "#212121",
    },
    "&:hover fieldset": {
      borderColor: darkMode ? "#f3f3f3" : "#212121",
    },
    "&.Mui-focused fieldset": {
      borderColor: darkMode ? "#f3f3f3" : "#212121",
    },
  },
  marginRight: theme.spacing(1),
}));

export const NavSearchBar = styled(TextField)(({ theme, darkMode }) => ({
  "& label.Mui-focused": {
    color: darkMode ? "#212121" : "#f3f3f3",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: darkMode ? "#212121" : "#f3f3f3",
  },
  "& .MuiInputLabel-root": {
    color: darkMode ? "#212121" : "#f3f3f3",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: darkMode ? "#212121" : "#f3f3f3",
    },
    "&:hover fieldset": {
      borderColor: darkMode ? "#212121" : "#f3f3f3",
    },
    "&.Mui-focused fieldset": {
      borderColor: darkMode ? "#212121" : "#f3f3f3",
    },
  },
  marginRight: theme.spacing(1),
}));

export const SortByMenu = styled(FormControl)(({ theme, darkMode }) => ({
  "& label.Mui-focused": {
    color: darkMode ? "#f3f3f3" : "#212121",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: darkMode ? "#f3f3f3" : "#212121",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: darkMode ? "#f3f3f3" : "#212121",
    },
    "&:hover fieldset": {
      borderColor: darkMode ? "#f3f3f3" : "#212121",
    },
    "&.Mui-focused fieldset": {
      borderColor: darkMode ? "#f3f3f3" : "#212121",
    },
  },
  "& .MuiInputBase-input": {
    color: darkMode ? "#f3f3f3" : "#212121",
  },
  "& .MuiSvgIcon-root": {
    color: darkMode ? "#f3f3f3" : "#212121",
  },
}));

export const FooterBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  backgroundColor: theme.palette.mode === "light" ? "#f3f3f3" : "#424242",
  mt: 5,
}));
