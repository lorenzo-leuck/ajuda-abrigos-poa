import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';

const EditarDoacoes = () => {
  const [data, setData] = useState([]);
  const [demanda, setDemanda] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [newDoacao, setNewDoacao] = useState('');

  const handleChange = (event, value) => {
    setSelectedValue(value);
    if (value) {
      setDemanda([...demanda, value]);
    }
  };

  const handleAddDoacao = async () => {
    try {
      await axios.patch("http://localhost:1339/api/doacao", { doacao: newDoacao });
      // Assuming the patch request is successful, you can update the local state
      setDemanda([...demanda, newDoacao]);
      setNewDoacao('');
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:1339/api/doacoes");
      setData(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box p={3}>
      <TextField
        value={newDoacao}
        onChange={(e) => setNewDoacao(e.target.value)}
        placeholder="Novo tipo"
        sx={{ width: 300, marginRight: 1, marginBottom:3 }}
      />
      <IconButton variant="contained" onClick={handleAddDoacao}>

      <SendIcon/>

      </IconButton>
      
      <Autocomplete
        value={selectedValue}
        onChange={handleChange}
        options={data}
        renderInput={(params) => (
          <TextField {...params} label="Selectione Doação" sx={{ width: 300 }}/>
        )}
      />
    
      <Box p={3}>
        {demanda.map((item, index) => (
          <div style={{ fontFamily: 'Roboto', margin: 5}} key={index}>{item}</div>
        ))}
      </Box>
    </Box>
  );
};

export default EditarDoacoes;
