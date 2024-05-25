import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Container, IconButton, Menu, MenuItem,
  Tooltip, FormGroup, FormControlLabel, Switch, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
const token = localStorage.getItem('token');

const pages = ['doacoes', 'voluntarios'];

const settings = ['Editar', 'Sair'];
const settingsRoutes = ['/editar', '/login'];

const Navbar = () => {


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
