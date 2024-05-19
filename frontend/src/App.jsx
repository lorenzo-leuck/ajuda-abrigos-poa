import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import Box from "@mui/material/Box";
import Toolbar from '@mui/material/Toolbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Panorama from "./pages/local/publico/Panorama";
import Editar from "./sets/local/gestao/Editar";
import LoginPage from "./sets/local/Login";
import PrivateRoute from './components/PrivateRoute'; // Make sure to create this component
import Abrigo from "./sets/local/publico/Abrigo";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Abrigo />} />
        <Route path=":prefix/editar" element={
          <PrivateRoute>
            <Editar />
          </PrivateRoute>
        } />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
