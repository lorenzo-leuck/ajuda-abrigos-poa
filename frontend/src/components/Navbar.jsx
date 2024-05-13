import React, { useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

const pages = ['Doações', 'Voluntários'];
const pageRoutes = ['/doacoes', '/voluntarios'];

const settings = ['Editar', 'Contatos', 'Sair'];
const settingsRoutes = ['/editar', '/contatos', '/login'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [auth, setAuth] = React.useState(true);

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
    console.log(event.target.checked);
    setAuth(event.target.checked);
  };



  return (
    <AppBar color="secondary">
      <Container>
        <Toolbar disableGutters>
          <Box>
            
            
          <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
    </FormGroup>






            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} component={Link} to={pageRoutes[index]} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography variant="h6" sx={{ flexGrow: 20, textAlign: 'center', fontFamily: 'Roboto'}}>
            Abrigo centro vida
          </Typography>


          {auth ? (
  <Box sx={{ flexGrow: 0 }}>
    <Tooltip>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} color="inherit" size="large">
        <AccountCircle />
      </IconButton>
    </Tooltip>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {settings.map((setting, index) => (
        <MenuItem key={setting} component={Link} to={settingsRoutes[index]} onClick={handleCloseUserMenu}>
          <Typography textAlign="center">{setting}</Typography>
        </MenuItem>
      ))}
    </Menu>
  </Box>
) : (
  <IconButton onClick={()=>{window.location.href = '/login';;}} sx={{ p: 0 }} color="inherit" size="large">
    <LoginIcon />
  </IconButton>
)}




        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
