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

const AbrigoItems = ({ nomeAbrigo }) => {

  const [doacoes, setDoacoes] = useState([]);
  const [voluntarios, setVoluntarios] = useState([]);
  const [naoAceitamos, setNaoAceitamos] = useState([]);
  const [info, setInfo] = useState("");
    const [lastUpdate, setLastUpdate] = useState(null);
    const [abrigosInfo, setAbrigosInfo] = useState("");


    const getAbrigosInfo = async () => {
      const data = await axios.get(`${baseUrl}/api/abrigosInfo?abrigo=${nomeAbrigo}`);
      setAbrigosInfo(data.data.message);
    };

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
      const responses = await Promise.all([
        axios.get(`${baseUrl}/api/demandas/doacoes?abrigo=${nomeAbrigo}`),
        axios.get(`${baseUrl}/api/demandas/voluntarios?abrigo=${nomeAbrigo}`),
        axios.get(`${baseUrl}/api/demandas/nao_aceitamos?abrigo=${nomeAbrigo}`),
        axios.get(`${baseUrl}/api/demandas/nao_aceitamos?abrigo=${nomeAbrigo}`),
      ]);

      setDoacoes(responses[0].data)
      setVoluntarios(responses[1].data)
      setNaoAceitamos(responses[2].data)
      setInfo(responses[3].data)

    } catch (error) {
      console.error(error);
    }
  };

  const fetchDate = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/demandasDate?abrigo=${nomeAbrigo}`);
      setLastUpdate(response.data);
    } catch (error) {
      console.error('Failed to fetch the last update date:', error);
    }
  };

  useEffect(() => {
    getAbrigosInfo();
    fetchData();
    fetchDate();
  }, []);

  const typoStyle = {
    fontFamily: 'Ubuntu, sans-serif',
    color: 'black',
    margin: '25px 0px -10px 0px',
  };


  const renderContent = (title, data) => {

    if (data.length === 0) {
      return null;
    }

    return (
      <>
        <Typography variant="h4" p={3} fontWeight={200} style={typoStyle}>
          {title}
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center">
          {data.map((item, index) => (
            <Item key={index}>
              {item}
            </Item>
          ))}
        </Box>
      </>
    );
  };


  return (
    <Box display="flex" flexDirection="column" alignItems="center">


      <Typography variant="body1" marginBottom={2} fontWeight={100} style={typoStyle}>
        Atualizado em {lastUpdate ? formatBrazilianDate(lastUpdate) : ""}
      </Typography>

      {renderContent("Doações", doacoes)}
      {renderContent("Voluntários", voluntarios)}
      {renderContent("Não aceitamos", naoAceitamos)}

      {abrigosInfo && (
  <>
    <Typography variant="h4" p={3} fontWeight={200} style={typoStyle}>
      Info
    </Typography>

    <Typography variant="h6" fontWeight={50} p={1}>
      {abrigosInfo}
    </Typography>
  </>
)}

    </Box>
  );
};

export default AbrigoItems;
