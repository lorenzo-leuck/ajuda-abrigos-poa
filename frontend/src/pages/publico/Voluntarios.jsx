import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import axios from "axios";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Voluntarios = () => {
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
  const [demandaDate, setDemandaDate] = useState(null);

  const formatBrazilianDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    return formattedDate;
  };

  const getDemandasDate = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/demandas/date`);
      setDemandaDate(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDemandasDb = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/demandas/voluntarios`);
      setDemanda(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDemandasDb();
    getDemandasDate();
  }, []);

  const typoStyle = {
    fontFamily: "Ubuntu, sans-serif",
    color: "gray"
  };


  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" p={3} fontWeight={200} style={typoStyle}>
        Demanda Voluntários
      </Typography>

      <Typography variant="body1" marginBottom={2} fontWeight={100} style={typoStyle}>
        Atualizado em {demandaDate ? formatBrazilianDate(demandaDate) : ""}
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

export default Voluntarios;
