import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import Doacoes from "./pages/publico/Doacoes";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from '@mui/material/Toolbar';
const App = () => {
  const styles = `
    body {
      font-family: 'Times New Roman', Times, serif;
      background-color: #fff;

      .AppContent {
        display: flex; 
        flex-direction: column;
        align-items: center;
        gap: 50px
      }

    }
  `;

  return (
    <>
      <Navbar />
      <Toolbar />
      <Box display="flex" flexDirection="column">
        <Doacoes />
      </Box>
    </>
  );
};

export default App;
