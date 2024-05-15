import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

const EditarVoluntarios = () => {
  const [voluntarios, setvoluntarios] = useState([]);
  const [demanda, setDemanda] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [newVoluntario, setnewVoluntario] = useState("");

  const handleRemoveItem = async (item) => {
    console.log(item);
    try {
      await axios.patch("http://localhost:1339/api/demandas/voluntarios/remove", {
        item: item,
      });

      await getDemandasDb();

    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const updateDemandasDb = async (demanda) => {
    try {
      await axios.patch("http://localhost:1339/api/demandas/voluntarios", {
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

  const handleAddVoluntarios = async () => {
    try {
      await axios.patch("http://localhost:1339/api/voluntario", {
        area: newVoluntario,
      });
      setnewVoluntario("");

      updateDemandasDb(newVoluntario)
      getDemandasDb();




    } catch (error) {
      console.error(error);
    }
  };

  const getDemandasDb = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:1339/api/demandas/voluntarios"
      );
      setDemanda(data); // Assuming 'data' is an array of demandas
    } catch (error) {
      console.error(error);
    }
  };

  const getvoluntarios = async () => {
    try {
      const { data } = await axios.get("http://localhost:1339/api/voluntarios");
      setvoluntarios(data.message); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getvoluntarios();
    getDemandasDb();
  }, []);

  return (
    <Box p={3}>
      <TextField
        value={newVoluntario}
        onChange={(e) => setnewVoluntario(e.target.value)}
        placeholder="Nova área"
        sx={{ width: 300, marginRight: 1, marginBottom: 3 }}
      />
      <IconButton variant="contained" onClick={handleAddVoluntarios}>
        <SendIcon />
      </IconButton>

      <Autocomplete
        value={selectedValue}
        onChange={handleDemandaChange}
        options={voluntarios}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecione Área"
            sx={{ width: 300 }}
          />
        )}
      />

      <Box p={3}>
        {demanda.map((item, index) => (
          <Box key={index} display="flex" alignItems="center">
            <IconButton onClick={() => handleRemoveItem(item)} color="error">
              <CloseIcon />
            </IconButton>

            <div style={{ fontFamily: "Roboto", margin: 5 }}>{item}</div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default EditarVoluntarios;
