import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton, Autocomplete } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { baseUrl } from "../../../api";

const EditarItems = ({ itemType, abrigo }) => {
  const [items, setItems] = useState([]);
  const [demandas, setDemandas] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [newValue, setNewValue] = useState("");

  const fetchData = async () => {
    try {
      const itemsResponse = await axios.get(`${baseUrl}/api/${itemType}`);
      setItems(itemsResponse.data.message);
      const demandasResponse = await axios.get(`${baseUrl}/api/demandas/${itemType}?abrigo=${abrigo}`);
      setDemandas(demandasResponse.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemType]); 

  const handleAddItem = async () => {
    try {
      await axios.patch(`${baseUrl}/api/${itemType}`, { [itemType]: newValue });
      setNewValue("");
      await fetchData()
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const handleDemandaChange = async (event, value) => {
    setSelectedValue(value);
    if (value && !demandas.includes(value)) {
      await axios.patch(`${baseUrl}/api/demandas/${itemType}?abrigo=${abrigo}`, { demandas: value });
      await fetchData()
    }
  };

  const handleRemoveItem = async (item) => {
    try {
      await axios.patch(`${baseUrl}/api/demandasRemove/${itemType}/remove?abrigo=${abrigo}`, { item });
      await fetchData()
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  return (
    <Box p={3}>
      <TextField
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        placeholder={`Adicionar ${itemType}`}
        sx={{ width: 300, marginRight: 1, marginBottom: 3 }}
      />
      <IconButton variant="contained" onClick={handleAddItem}>
        <SendIcon />
      </IconButton>

      <Autocomplete
        value={selectedValue}
        onChange={handleDemandaChange}
        options={items}
        renderInput={(params) => <TextField {...params} label={`Selecionar ${itemType}`} sx={{ width: 300 }} />}
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
