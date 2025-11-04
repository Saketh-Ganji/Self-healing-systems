import React from "react";
import Dashboard from "./components/Dashboard";
import {
  Container,
  Typography,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "#0d1117", paper: "#161b22" },
    text: { primary: "#ffffff", secondary: "#b0b3b8" },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h4: { fontWeight: 600 },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" style={{ marginTop: "30px" }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", color: "#90caf9" }}
        >
          🧠 Self-Healing System Dashboard
        </Typography>
        <Dashboard />
      </Container>
    </ThemeProvider>
  );
}

export default App;
