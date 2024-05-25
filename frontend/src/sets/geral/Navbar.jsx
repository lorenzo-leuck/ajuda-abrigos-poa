import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Container, IconButton, Menu, MenuItem,
  Tooltip, FormGroup, FormControlLabel, Switch, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
const token = localStorage.getItem('token');

import axios from "axios";
import { baseUrl, getUser } from '../../api';
const pages = ['doacoes', 'voluntarios'];

const settings = ['Editar', 'Sair'];
const settingsRoutes = ['/editar', '/login'];

const Navbar = () => {
  const [matchAbrigo, setMatchAbrigo] = useState(false);

  const getMatchAbrigo = async () => {
    if (token) {
      console.log("pimba");
      const dados = await getUser()
      const abrigoUser = dados.abrigo
      console.log(dados);
      if (abrigoUser === 'ademir') {
        console.log("oi");
        setMatchAbrigo(true)
      }
    }
  }


useEffect(() => {
  getMatchAbrigo()
}, []);


  return (
    <AppBar color="secondary">
      <Container>
        <Toolbar disableGutters>


          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontFamily: 'Roboto' }}>
            ajuda abrigos poa !
          </Typography>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
