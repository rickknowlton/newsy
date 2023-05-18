import { createTheme } from "@mui/material/styles";

const newsyTheme = (darkMode) => {
  const palletType = darkMode ? "dark" : "light";
  const mainPrimaryColor = darkMode ? "#f5f5f5" : "#000000";
  const mainSecondaryColor = darkMode ? "#ffffff" : "#212121";

  const theme = createTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
      background: {
        default: darkMode ? "#131313" : "#ffffff",
      },
      footer: {
        light: "#f3f3f3",
        dark: "#424242",
      },
    },
    typography: {
      fontFamily: '"Wix Madefor Display", Arial, sans-serif',
      h1: {
        fontFamily: '"BioRhyme", Arial, serif',
      },
      h2: {
        fontFamily: '"BioRhyme", Arial, serif',
      },
      h3: {
        fontFamily: '"BioRhyme", Arial, serif',
        fontWeight: "700",
        color: darkMode ? "#ffffff" : "#000000",
      },
      h4: {
        fontFamily: '"BioRhyme", Arial, serif',
        fontWeight: "700",
      },
      h5: {
        fontFamily: '"BioRhyme", Arial, serif',
        fontWeight: "700",
      },
      h6: {
        fontFamily: '"BioRhyme", Arial, serif',
      },
      subtitle1: {
        fontFamily: '"BioRhyme", Arial, serif',
        fontSize: "1.2rem",
      },
    },
  });

  return theme;
};

export default newsyTheme;
