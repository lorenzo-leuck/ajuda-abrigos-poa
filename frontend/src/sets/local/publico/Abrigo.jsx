import React, { useState, useEffect } from "react";
import { Typography, Box, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from "axios";


import Toolbar from '@mui/material/Toolbar';
import { baseUrl } from "../../../api";
import Navbar from "../../../components/Navbar";


const Abrigo = ({ displayType }) => {


  const [currentPage, setCurrentPage] = useState('home'); // Default page

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[1],
    fontFamily: 'Roboto',
    width: 300
  }));

  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

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

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/demandas/${displayType}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDate = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/demandas/date/${displayType}`);
      setLastUpdate(response.data);
    } catch (error) {
      console.error('Failed to fetch the last update date:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDate();
  }, [displayType]);

  const typoStyle = {
    fontFamily: "Ubuntu, sans-serif",
    color: "gray"
  };

  return (


<>
<Navbar handlePageChange={handlePageChange} />
<Toolbar/>
      
    <Box display="flex" flexDirection="column" alignItems="center">
aaaaaa{currentPage}
      <Typography variant="h4" p={3} fontWeight={200} style={typoStyle}>
        Demanda {displayType === 'voluntarios' ? 'Voluntários' : 'Doações'}
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
    </>

  );
};

export default Abrigo;
