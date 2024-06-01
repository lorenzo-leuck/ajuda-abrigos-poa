import React, { useState } from "react";
import { Typography, Box, RadioGroup,IconButton,  Radio, FormControlLabel, TextareaAutosize, TextField } from "@mui/material";
import EditarItems from "./EditarItems";
import { Toolbar } from '@mui/material';
import Navbar from '../../../components/Navbar';
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";


const Editar = () => {
  const abrigo = localStorage.getItem('abrigo')
  const [selectedOption, setSelectedOption] = useState("doacoes");
  const [newValue, setNewValue] = useState("");


  const handleAddItem = async () => {
    try {
      await axios.patch(`${baseUrl}/api/${itemType}`, { [itemType]: newValue });
      setNewValue("");

    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };


  const handleChange = (e) => {
    const value = e.target.value;
  
    const regex = /^[^\s].*|^$/;
  
    if (regex.test(value)) {
      setNewValue(value);
    }
  };

  const handlePageChange = (page) => {
    window.location.href = `/${abrigo}`
  };
  return (


<>
  <Navbar handlePageChange={handlePageChange} />
        <Toolbar />

    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" p={3}>
        Demandas
      </Typography>
      <Box display="flex">
        <RadioGroup
          aria-label="Escolha uma opção"
          name="opcao"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          row
        >
  <FormControlLabel
              value="doacoes"
              control={<Radio />}
              label="Doações"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.8rem' } }} // Adjust font size here
            />
            <FormControlLabel
              value="voluntarios"
              control={<Radio />}
              label="Voluntários"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.8rem' } }} // Adjust font size here
            />
            <FormControlLabel
              value="nao_aceitamos"
              control={<Radio />}
              label="Não aceitamos"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.8rem' } }} // Adjust font size here
            />
        </RadioGroup>
      </Box>
      <EditarItems
        itemType={selectedOption}
        abrigo={abrigo}
      />
    </Box>

    <Box display="flex" flexDirection="column" alignItems="center">

    <Typography variant="h4" p={3}>
        Info
      </Typography>

    <TextField
      value={newValue}
      onChange={handleChange}
      multiline
      rows={3}
      placeholder={`Adicionar informações`}
      sx={{ width: 300, marginRight: 1, marginBottom: 3 }}
    />
      <IconButton variant="contained" onClick={handleAddItem}>
        <SendIcon />
      </IconButton>

    </Box>




    </>

  );
};

export default Editar;
