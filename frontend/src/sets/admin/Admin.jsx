import React, { useState, useEffect } from "react";
import { Typography, Box, RadioGroup, Radio, FormControlLabel, TextField, IconButton, Button, Container } from "@mui/material";
import { Toolbar } from '@mui/material';

import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { baseUrl, getUser } from "../../api";


const Admin = () => {
//   const abrigo = localStorage.getItem('abrigo')
  const [selectedOption, setSelectedOption] = useState("doacoes");
  const [newValue, setNewValue] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [abrigo, setAbrigo] = useState('');


  const fetchData = async () => {
    try {
    //   const itemsResponse = await axios.get(`${baseUrl}/api/${itemType}`);
    //   setItems(itemsResponse.data.message);
    //   const demandasResponse = await axios.get(`${baseUrl}/api/demandas/${itemType}?abrigo=${abrigo}`);
    //   setDemandas(demandasResponse.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []); 


  const handleSubmit = async (event) => {
    event.preventDefault();

    const signupData = {
      username,
      password,
      abrigo,
    };

    try {
      const response = await axios.post('/api/signup', signupData);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error signing up!', error);
    }
  };


  const handleRemoveItem = async (item) => {
    try {
    //   await axios.patch(`${baseUrl}/api/demandasRemove/${itemType}?abrigo=${abrigo}`, { item });
    //   await fetchData()
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };



  const handlePageChange = (page) => {
    window.location.href = `/`
  };
  return (
    <Container component="main" maxWidth="xs">
          <Navbar handlePageChange={handlePageChange} />
        <Toolbar />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Admin
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="abrigo"
            label="Abrigo"
            id="abrigo"
            value={abrigo}
            onChange={(e) => setAbrigo(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Admin;
