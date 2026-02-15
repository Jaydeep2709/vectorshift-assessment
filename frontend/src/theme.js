import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#6366f1",
    },
    background: {
      default: "#f4f6f8",
    },
  },

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: "Inter, Roboto, Arial",
  }

});

export default theme;
