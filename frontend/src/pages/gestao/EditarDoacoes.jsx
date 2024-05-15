import React, { useState, useEffect } from "react";
import { Box, Select, MenuItem } from "@mui/material";
import axios from "axios";

const EditarDoacoes = () => {
  const [data, setData] = useState([]);
  const [demanda, setDemanda] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setDemanda([...demanda, event.target.value]);
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
    <Box>
      <Select
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Select value" }}
      >
        <MenuItem value="" disabled>
          Select a value
        </MenuItem>
        {data.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>

      <div>
        {demanda.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </Box>
  );
};

export default EditarDoacoes;
