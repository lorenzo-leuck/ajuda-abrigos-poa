import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { baseUrl } from '../../api';
import { Toolbar } from '@mui/material';
import Navbar from '../../components/Navbar';


const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handlePageChange = (page) => {
    window.location.href = '/'
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        const abrigo = data.userData.abrigo
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('abrigo', abrigo);
        window.location.href = `/editar`
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (

<>
<Navbar handlePageChange={handlePageChange} />
        <Toolbar />

    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Acessar
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Nome"
            margin="normal"
            fullWidth
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Senha"
            type="password"
            margin="normal"
            fullWidth
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>

    </>
  );
};

export default LoginPage;
