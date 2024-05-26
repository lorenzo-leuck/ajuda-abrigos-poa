import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Container, IconButton, Menu, MenuItem,
  Tooltip, FormGroup, FormControlLabel, Switch, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import axios from "axios";
import { baseUrl, getUser } from '../api';
import HomeIcon from '@mui/icons-material/Home';


const token = localStorage.getItem('token');

const pages = ['doacoes', 'voluntarios', 'nao_aceitamos'];

const settings = ['Editar', 'Sair'];
const settingsRoutes = ['/editar', '/login'];

const Navbar = ({ handlePageChange }) => {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [auth, setAuth] = useState(true);
  const [abrigoTitle, setAbrigoTitle] = useState("");
  const [matchAbrigo, setMatchAbrigo] = useState(false);
  const location = window.location.pathname;
  const abrigoPath = location.split('/')[1];

  const getTitle = async (abrigo) => {
    try {

      const response = await axios.get(`${baseUrl}/api/abrigo/${abrigoPath}`);
      const abrigoTitleData = response?.data?.message?.titulo
      const abrigoTitleState = localStorage.getItem('abrigoTitle');
      const abrigoTitle = abrigoTitleData || abrigoTitleState

      setAbrigoTitle(abrigoTitle)
    } catch (error) {
      console.log(error);
    }
  }


  const getMatchAbrigo = async () => {
    const admin = localStorage.getItem('admin');

    if (token) {
      const dados = await getUser()
      const abrigoUser = dados.abrigo


      if (admin === 'true' || (abrigoUser === abrigoPath)) {
        console.log("condicao asdasd");
        setMatchAbrigo(true)
      }
    }
  }


  useEffect(() => {
    getTitle()
    getMatchAbrigo()
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    window.location.href = '/login';
  };

  return (
    <AppBar color="secondary">
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>


            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >




              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-nav"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >

              {pages.map((page, index) => (
                <MenuItem key={page} onClick={() => handlePageChange(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>




          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontFamily: 'Roboto' }}>

            <IconButton onClick={() => { window.location.href = '/'; }} sx={{ p: 0, mr: 2, }} color="inherit">
              <HomeIcon fontSize="small" />
            </IconButton>


            {abrigoTitle}
          </Typography>




          {matchAbrigo ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Account settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit">
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-user"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={setting} component={Link} to={settingsRoutes[index]} onClick={setting === 'Sair' ? handleLogout : handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <IconButton onClick={() => { window.location.href = '/login'; }} sx={{ p: 0 }} color="inherit">
              <LoginIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
