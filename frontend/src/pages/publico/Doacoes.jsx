import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import axios from "axios";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Doacoes = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[1],
    fontFamily: 'Roboto',
    width: 300, 
    height: 15, 
  }));

  const [demanda, setDemanda] = useState([]);

  const getDemandasDb = async () => {
    try {
      const { data } = await axios.get("http://localhost:1339/api/demandas/doacoes");
      setDemanda(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDemandasDb();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" p={3} fontWeight={200}>
        Demanda doações
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="center">
        {demanda.map((item, index) => (
          <Item key={index}>
            {item}
          </Item>
        ))}
      </Box>
    </Box>
  );
};

export default Doacoes;
