import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Container, IconButton, Menu, MenuItem,
  Tooltip, FormGroup, FormControlLabel, Switch, Avatar
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
const admin = localStorage.getItem('admin');

const Navbar = () => {
  const [matchAbrigo, setMatchAbrigo] = useState(false);

  const getMatchAbrigo = async () => {
    if (admin === true) {
        setMatchAbrigo(true)
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


          {matchAbrigo ? (

<IconButton onClick={() => { window.location.href = '/ademir'; }} sx={{ p: 0 }} color="inherit">
<ManageAccountsIcon />
</IconButton>


          ): <></>}



        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
