import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Button,IconButton, Container } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { Toolbar } from "@mui/material";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { baseUrl } from "../../api";

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [abrigo, setAbrigo] = useState('');
  const [items, setItems] = useState([]);

const fetchData = async() => {
    try {
        const data = await axios.get(`${baseUrl}/api/users`)
        setItems(data.data.message);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const handleRemoveItem = async (item) => {
    try {
        console.log("1");
      await axios.delete(`${baseUrl}/api/user?item=${item}`);
    console.log(item);  
    await fetchData()
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

useEffect(() => {
    fetchData()
}, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submission triggered');

    const signupData = {
      username,
      password,
      abrigo,
    };

    if (username && password && abrigo) {  
      try {
        const response = await axios.post(`${baseUrl}/api/user`, signupData);
        console.log(response.data);
      } catch (error) {
        console.error('There was an error signing up!', error);
      }
    } else {
      console.error('Please fill in all fields');
    }
  };

  const handlePageChange = (page) => {
    window.location.href = `/`;
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
          Create
        </Typography>
        <form onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
        </form>
<br/>
        <Typography component="h1" variant="h5">
            Remove
        </Typography>

        <Box p={3}>
        {items.map((item, index) => (
          <Box key={index} display="flex" alignItems="center">
            <IconButton onClick={() => handleRemoveItem(item)} color="error">
              <CloseIcon />
            </IconButton>
            <div style={{ fontFamily: "Roboto", margin: 5 }}>{item}</div>
          </Box>
        ))}

</Box>



      </Box>
    </Container>
  );
};

export default Admin;
