import React, { useState } from "react";
import { Typography, Box, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import EditarItems from "./EditarItems";
import { Toolbar } from '@mui/material';
import Navbar from '../../../components/Navbar';

const Editar = () => {
  const location = window.location.pathname;
  const abrigo = location.split('/')[1];
  const [selectedOption, setSelectedOption] = useState("doacoes");

  const handlePageChange = (page) => {
    window.location.href = `/${abrigo}`
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
          <FormControlLabel value="nao_aceitamos" control={<Radio />} label="Não aceitamos" />
        </RadioGroup>
      </Box>
      <EditarItems
        itemType={selectedOption}
        abrigo={abrigo}
      />
    </Box>

    </>

  );
};

export default Editar;
