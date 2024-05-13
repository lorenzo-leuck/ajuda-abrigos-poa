import React from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const LoginPage = () => {
  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Acessar
        </Typography>
        <TextField label="Nome" margin="normal" fullWidth />
        <TextField label="Senha" type="password" margin="normal" fullWidth />
        <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
