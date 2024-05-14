const express = require('express');
const router = express.Router();
const DonationItem = require('./models/doacoes').DonationItem;
const mongoose = require('mongoose');
const { Usuarios, Doacoes,Demandas, Voluntarios } = require('./model');

router.get('/items', async (req, res) => {
  try {
    // const items = await DonationItem.find();
    console.log("asdasdasd");
    res.json(["gol do gremio"]);
  } catch (err) {
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
      console.log('Invalid username or password');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    console.log("Login successful:", userData);
    res.status(200).json({ message: 'Login successful', userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});



module.exports = router;