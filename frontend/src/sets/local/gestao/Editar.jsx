import React, { useState } from "react";
import { Typography, Box, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import EditarItems from "./EditarItems";
import { Toolbar } from '@mui/material';
import Navbar from '../../../components/Navbar';

const Editar = () => {
  const [selectedOption, setSelectedOption] = useState("doacoes");
  const [currentPage, setCurrentPage] = useState('doacoes'); 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (


<>
  <Navbar handlePageChange={handlePageChange} />
        <Toolbar />

    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" p={3}>
        Editar
      </Typography>
      <Box display="flex">
        <RadioGroup
          aria-label="Escolha uma opção"
          name="opcao"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          row
        >
          <FormControlLabel value="doacoes" control={<Radio />} label="Doações" />
          <FormControlLabel value="voluntarios" control={<Radio />} label="Voluntários" />
        </RadioGroup>
      </Box>
      <EditarItems
        itemType={selectedOption}
      />
    </Box>

    </>

  );
};

export default Editar;
