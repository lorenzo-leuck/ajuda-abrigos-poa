import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

const EditarDoacoes = () => {
  const [doacoes, setDoacoes] = useState([]);
  const [demanda, setDemanda] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [newDoacao, setNewDoacao] = useState("");

  const updateDemandasDb = async (demanda) => {
    try {
      await axios.patch("http://localhost:1339/api/demandas/doacoes", {
        demandas: demanda,
      });

      await getDemandasDb();

    } catch (error) {
      console.error("Failed to update demandas in DB:", error);
    }
  };

  const handleDemandaChange = async (event, value) => {
    setSelectedValue(value);
    if (value && !demanda.includes(value)) {
      await updateDemandasDb(value);
    }
  };

  const handleAddDoacao = async () => {
    try {
      await axios.patch("http://localhost:1339/api/doacao", {
        doacao: newDoacao,
      });
      setNewDoacao("");
      setDemanda((currentDemanda) => [...currentDemanda, newDoacao]);
    } catch (error) {
      console.log(error);
    }
  };

  const getDemandasDb = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:1339/api/demandas/doacoes"
      );
      setDemanda(data); // Assuming 'data.message' is an array of demandas
    } catch (error) {
      console.log(error);
    }
  };

  const getDoacoes = async () => {
    try {
      const { data } = await axios.get("http://localhost:1339/api/doacoes");
      setDoacoes(data.message); // Assuming 'data.message' is an array of doacoes
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoacoes();
    getDemandasDb(); // Ensure this is called so demanda is set initially
  }, []);

  return (
    <Box p={3}>
      <TextField
        value={newDoacao}
        onChange={(e) => setNewDoacao(e.target.value)}
        placeholder="Novo tipo"
        sx={{ width: 300, marginRight: 1, marginBottom: 3 }}
      />
      <IconButton variant="contained" onClick={handleAddDoacao}>
        <SendIcon />
      </IconButton>

      <Autocomplete
        value={selectedValue}
        onChange={handleDemandaChange}
        options={doacoes}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selectione Doação"
            sx={{ width: 300 }}
          />
        )}
      />

      <Box p={3}>
        {demanda.map((item, index) => (
          <div style={{ fontFamily: "Roboto", margin: 5 }} key={index}>
            {item}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default EditarDoacoes;
