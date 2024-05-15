const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Usuarios, Doacoes, Demandas, Voluntarios } = require('./model');
const jwt = require('jsonwebtoken');

router.get('/doacoes', async (req, res) => {
  try {
    const doacoes = await Doacoes.find({}, { '_id': 0, 'label': 1 }).lean();

    const labelValues = doacoes.map(doacao => doacao.label);

    res.status(200).json({ message: labelValues });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/voluntarios', async (req, res) => {
  try {
    const voluntarios = await Voluntarios.find({}).lean();

console.log(voluntarios);

    const labelValues = voluntarios.map(voluntario => voluntario.area);


    res.status(200).json({ message: labelValues });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});



router.post('/items', async (req, res) => {
  const item = new DonationItem({
    name: req.body.name,
    category: req.body.category,
    shelter: req.body.shelter
  });
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



router.post('/login', async (req, res) => {
  const login = req.body;
  const { username, password } = login;

  try {
    const userData = await Usuarios.findOne({ "username": username, "password": password });

    if (!userData) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: userData._id }, 'Td?B75q0uOX');

    console.log("Login successful:", token);
    res.status(200).json({ message: 'Login successful', userData, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});


module.exports = router;