import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { baseUrl } from '../../../api';

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
}));

const AbrigoItems = ({ currentPage }) => {

  const abrigo = localStorage.getItem('abrigo')
  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  const formatBrazilianDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/demandas/${currentPage}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDate = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/demandasDate?abrigo=${abrigo}`);
      setLastUpdate(response.data);
    } catch (error) {
      console.error('Failed to fetch the last update date:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDate();
  }, [currentPage]);

  const typoStyle = {
    fontFamily: 'Ubuntu, sans-serif',
    color: 'gray',
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" p={3} fontWeight={200} style={typoStyle}>
        Demanda {currentPage === 'voluntarios' ? 'Voluntários' : 'Doações'}
      </Typography>
      <Typography variant="body1" marginBottom={2} fontWeight={100} style={typoStyle}>
        Atualizado em {lastUpdate ? formatBrazilianDate(lastUpdate) : ""}
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        {data.map((item, index) => (
          <Item key={index}>
            {item}
          </Item>
        ))}
      </Box>
    </Box>
  );
};

export default AbrigoItems;
