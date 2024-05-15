import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import axios from "axios";

const EditarVoluntarios = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:1339/api/voluntarios");
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
      <Typography variant="body1" textAlign="center">
      </Typography>
      {data.map((item, index) => (
        <div key={index}>
          <Typography>{item}</Typography>
        </div>
      ))}
    </Box>
  );
};

export default EditarVoluntarios;
