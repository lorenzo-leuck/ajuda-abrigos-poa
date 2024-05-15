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






router.patch('/doacao', async (req, res) => {
  try {
    const { doacao } = req.body

    await Doacoes.create({ "label": doacao, "categoria": "Etc" })
    console.log("updated doacoes");
    res.status(200).json({ message: "updated doacoes" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


router.get('/voluntarios', async (req, res) => {
  try {
    const voluntarios = await Voluntarios.find({}).lean();

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


router.get('/demandas/doacoes', async (req, res) => {
  try {

    const demandas = await Demandas.findOne(
      { "abrigo": "vida" },
      { _id: 0, "doacoes": 1 }
    ).lean();

    const demandasArray = demandas ? demandas.doacoes : [];

    res.status(200).send(demandasArray);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


router.get('/demandas/date', async (req, res) => {
  try {

    const demandas = await Demandas.findOne(
      { "abrigo": "vida" },
      { _id: 0, "date": 1 }
    );
    const demandasDate = demandas ? demandas.date : null;
    console.log("aaaxaa", demandasDate);

    res.status(200).send(demandasDate);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


// place array

// router.patch('/demandas/doacoes', async (req, res) => {
//   try {
//     const { demandas } = req.body;

//     await Demandas.updateOne({ "abrigo": "vida" }, { $set: { "doacoes": demandas } });

//     res.status(200).json({ message: "Array updated successfully" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// });

// push elemente 
router.patch('/demandas/doacoes', async (req, res) => {
  try {
    const { demandas } = req.body;
    const currentDate = new Date(); 
    console.log(currentDate);
    const updatedDemandas = await Demandas.findOneAndUpdate(
      { "abrigo": "vida" },
      {
        $push: { "doacoes": demandas }, 
        $set: { "date": currentDate } 
      },
      { new: true } 
    );

    if (!updatedDemandas) {
      return res.status(404).json({ message: "No matching document found to update." });
    }

    res.status(200).json({ doacoes: updatedDemandas.doacoes, updatedDate: updatedDemandas.date });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.patch('/demandas/doacoes/remove', async (req, res) => {
  try {
    const { item } = req.body;  
    const currentDate = new Date(); 
    const updatedDemandas = await Demandas.findOneAndUpdate(
      { "abrigo": "vida" }, 
      {
        $pull: { "doacoes": item }, 
        $set: { "date": currentDate } 
      },
      { new: true } 
    );

    if (!updatedDemandas) {
      return res.status(404).json({ message: "No matching document found to update." });
    }

    res.status(200).json({ doacoes: updatedDemandas.doacoes, updatedDate: updatedDemandas.date });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;