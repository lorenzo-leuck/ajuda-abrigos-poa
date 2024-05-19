import React, { useState } from "react";
import { Typography, Box, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import EditarItems from "./EditarItems";

const Editar = () => {
  const [selectedOption, setSelectedOption] = useState("doacoes");

  return (
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
        itemType={selectedOption === "doacoes" ? "doacao" : "voluntário"}
        apiEndpoint={selectedOption}
      />
    </Box>
  );
};

export default Editar;
