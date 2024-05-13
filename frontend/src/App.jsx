import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import Doacoes from "./pages/publico/Doacoes";
import Box from "@mui/material/Box";
import Toolbar from '@mui/material/Toolbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Panorama from "./pages/publico/Panorama";
import Voluntarios from "./pages/publico/Voluntarios";
import Editar from "./pages/gestao/Editar";
import Contatos from "./pages/gestao/Contatos";
import LoginPage from "./pages/gestao/Login";


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
      <Routes>
      <Route path="/" element={<Panorama />} />
      {/* <Route path=":prefix/doacoes" element={<PlanDataProvider><PlanRoutes /></PlanDataProvider>} /> */}
      <Route path="/doacoes" element={<Doacoes/>} />
      <Route path="/voluntarios" element={<Voluntarios/>} />
      <Route path="/editar" element={<Editar/>} />
      <Route path="/contatos" element={<Contatos/>} />
      <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </>
  );
};

export default App;
