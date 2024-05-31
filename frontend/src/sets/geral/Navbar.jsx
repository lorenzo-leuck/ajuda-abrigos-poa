import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Container, IconButton, Menu, MenuItem,
  Tooltip, FormGroup, FormControlLabel, Switch, Avatar
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Navbar = () => {
  const [matchAbrigo, setMatchAbrigo] = useState(false);

  const getMatchAbrigo = async () => {
    const admin = localStorage.getItem('admin');
    console.log(admin);
    if (admin === 'true') {
      console.log("object");
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
            Ajuda Abrigos Poa !!!!!!
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
