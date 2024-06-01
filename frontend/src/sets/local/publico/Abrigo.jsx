import React, { useState } from 'react';
import { Toolbar } from '@mui/material';
import Navbar from '../../../components/Navbar';
import AbrigoItems from './AbrigoItems';

const Abrigo = () => {
  const [currentPage, setCurrentPage] = useState('doacoes'); 
  const location = window.location.pathname;
  const abrigo = location.split('/')[1];
  localStorage.setItem('abrigo', abrigo);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar handlePageChange={handlePageChange} />
      <Toolbar />
      <AbrigoItems nomeAbrigo={abrigo}/>

    </>
  );
};

export default Abrigo;
