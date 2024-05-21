import { Typography, List, ListItem, ListItemText, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import { Toolbar } from "@mui/material";
import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../api";

const Panorama = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/abrigos`);
      setData(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (item) => {
    localStorage.setItem('abrigo', item.abrigo);
    localStorage.setItem('abrigoTitle', item.titulo);
    window.location.href = `/${item.abrigo}`

  };

  return (
    <>
      <Navbar />
      <Toolbar />

      <Box display="flex" flexDirection="column" alignItems="center">

        <List>
          {data.map((item, index) => (
            <Paper
              key={index}
              component={ListItem}
              button
              onClick={() => handleClick(item)}
              elevation={2}
              sx={{ borderRadius: "10px", my: 2 }}
            >
              <ListItemText primary={item.titulo} />
            </Paper>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Panorama;
