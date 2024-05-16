import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import EditarVoluntarios from "./EditarVoluntarios";
import EditarDoacoes from "./EditarDoacoes";



const Editar = () => {
  const [selectedOption, setSelectedOption] = useState("doacoes");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" p={3} fontWeight={200}>
        Editar
      </Typography>

      <Box display="flex">
        <RadioGroup
          aria-label="Escolha uma opção"
          name="opcao"
          value={selectedOption}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="doacoes" control={<Radio />} label="Doações" />
          <FormControlLabel value="voluntarios" control={<Radio />} label="Voluntários" />
        </RadioGroup>
      </Box>

      {selectedOption === "doacoes" && <EditarDoacoes />}
      {selectedOption === "voluntarios" && <EditarVoluntarios />}
    </Box>
  );
};

export default Editar;
