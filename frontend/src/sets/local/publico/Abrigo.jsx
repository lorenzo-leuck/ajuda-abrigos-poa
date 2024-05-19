import React, { useState } from 'react';
import { Toolbar } from '@mui/material';
import Navbar from '../../../components/Navbar';
import AbrigoItems from './AbrigoItems';

const Abrigo = () => {
  const [currentPage, setCurrentPage] = useState('doacoes'); 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar handlePageChange={handlePageChange} />
      <Toolbar />
      <AbrigoItems currentPage={currentPage} />
    </>
  );
};

export default Abrigo;
