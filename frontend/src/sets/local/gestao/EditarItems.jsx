import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton, Autocomplete } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { baseUrl } from "../../../api";


const EditarItems = ({ itemType, apiEndpoint }) => {
  const [items, setItems] = useState([]);
  const [demandas, setDemandas] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [newValue, setNewValue] = useState("");

  const handleRemoveItem = async (item) => {
    try {
      await axios.patch(`${baseUrl}/api/demandas/${apiEndpoint}/remove`, { item });
      getDemandasDb();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const updateDemandasDb = async (item) => {
    try {
      await axios.patch(`${baseUrl}/api/demandas/${apiEndpoint}`, { demandas: item });
      getDemandasDb();
    } catch (error) {
      console.error("Failed to update demandas in DB:", error);
    }
  };

  const handleDemandaChange = async (event, value) => {
    setSelectedValue(value);
    if (value && !demandas.includes(value)) {
      updateDemandasDb(value);
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.patch(`${baseUrl}/api/${apiEndpoint}`, { [itemType]: newValue });
      setNewValue("");
      updateDemandasDb(newValue);
      getDemandasDb();
    } catch (error) {
      console.error(error);
    }
  };

  const getDemandasDb = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/demandas/${apiEndpoint}`);
      setDemandas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/${apiEndpoint}`);
      setItems(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItems();
    getDemandasDb();
  }, []);

  return (
    <Box p={3}>
      <TextField
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        placeholder={`Novo ${itemType}`}
        sx={{ width: 300, marginRight: 1, marginBottom: 3 }}
      />
      <IconButton variant="contained" onClick={handleAddItem}>
        <SendIcon />
      </IconButton>

      <Autocomplete
        value={selectedValue}
        onChange={handleDemandaChange}
        options={items}
        renderInput={(params) => <TextField {...params} label={`Selecione ${itemType}`} sx={{ width: 300 }} />}
      />

      <Box p={3}>
        {demandas.map((item, index) => (
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

export default EditarItems;
