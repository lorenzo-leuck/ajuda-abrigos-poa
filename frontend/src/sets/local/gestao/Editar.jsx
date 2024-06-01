import React, { useState, useEffect } from "react";
import { Typography, Box, RadioGroup, IconButton, Radio, FormControlLabel, TextField, Toolbar } from "@mui/material";
import EditarItems from "./EditarItems";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { baseUrl } from "../../../api";
import Navbar from "./Navbar";

const Editar = () => {
  const abrigo = localStorage.getItem('abrigo')
  const [selectedOption, setSelectedOption] = useState("doacoes");
  const [abrigosInfo, setAbrigosInfo] = useState("");

  const getAbrigosInfo = async () => {
    const data = await axios.get(`${baseUrl}/api/abrigosInfo?abrigo=${abrigo}`);
    setAbrigosInfo(data.data.message);
  };

  useEffect(() => {
    getAbrigosInfo();
  }, []);

  const handleAddItem = async () => {
    try {
      const update = await axios.patch(`${baseUrl}/api/abrigosInfo?abrigo=${abrigo}`, { info: abrigosInfo });
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const handlePageChange = (page) => {
    window.location.href = `/${abrigo}`;
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
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.8rem' } }}
            />
            <FormControlLabel
              value="voluntarios"
              control={<Radio />}
              label="Voluntários"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.8rem' } }}
            />
            <FormControlLabel
              value="nao_aceitamos"
              control={<Radio />}
              label="Não aceitamos"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.8rem' } }}
            />
          </RadioGroup>
        </Box>
        <EditarItems itemType={selectedOption} abrigo={abrigo} />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" p={3}>
          Info
        </Typography>

        <TextField
          value={abrigosInfo}
          onChange={(e) => setAbrigosInfo(e.target.value)}
          multiline
          rows={3}
          placeholder="Adicionar informações"
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
