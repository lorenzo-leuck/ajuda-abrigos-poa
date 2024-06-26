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
import PrivateRoute from './components/PrivateRoute'; 
import Abrigo from "./sets/local/publico/Abrigo";
import Panorama from "./sets/geral/Panorama";
import Admin from "./sets/admin/Admin";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Panorama />} />

        <Route path="/editar" element={
          <PrivateRoute>
            <Editar />
          </PrivateRoute>
        } />


        <Route path="/ademir" element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        } />


        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<Abrigo />} />
      </Routes>
    </>
  );
};

export default App;
