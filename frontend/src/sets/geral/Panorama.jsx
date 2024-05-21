import { Typography, List, ListItem, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import { Toolbar } from '@mui/material';
import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from "../../api";

const Panorama = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/abrigos`);
      console.log(response.data.message);
      setData(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (item) => {
    console.log(item);
  };

  return (
    <>
      <Navbar />
      <Toolbar />

      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" p={3} fontWeight={200}>
          List of Abrigos
        </Typography>

        <List>
          {data.map((item, index) => (
            <ListItem button key={index} onClick={() => handleClick(item)}>
              <ListItemText primary={item.titulo} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Panorama;
