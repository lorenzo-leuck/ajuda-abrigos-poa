const express = require('express');
const router = express.Router();
const { Usuarios, Doacoes, Demandas, Voluntarios, Abrigos } = require('./model');
const jwt = require('jsonwebtoken');
const { toHex } = require('./auth');

router.get('/abrigos', async (req, res) => {
  try {
    const abrigos = await Abrigos.find({}, { '_id': 0, 'abrigo': 1, 'titulo': 1 }).lean();


    res.status(200).json({ message: abrigos });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/abrigo/:nomeAbrigo', async (req, res) => {
  try {
    const { nomeAbrigo } = req.params;
    const abrigo = await Abrigos.findOne({ 'abrigo': nomeAbrigo }).lean();
    res.status(200).json({ message: abrigo });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});



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

    const labelValues = voluntarios.map(voluntario => voluntario.area);


    res.status(200).json({ message: labelValues });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


router.patch('/voluntarios', async (req, res) => {
  try {
    const { voluntarios } = req.body

    await Voluntarios.create({ "area": voluntarios })

    res.status(200).json({ message: "updated voluntarios" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.patch('/doacoes', async (req, res) => {
  try {
    const { doacoes } = req.body

    await Doacoes.create({ "label": doacoes, "categoria": "Etc" })
    console.log("updated doacoes");
    res.status(200).json({ message: "updated doacoes" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


router.get('/demandas/:itemType', async (req, res) => {
  const type = req.params.itemType;
  const { abrigo } = req.query;
  console.log(abrigo);
  if (!['doacoes', 'voluntarios'].includes(type)) {
    return res.status(400).json({ message: "Invalid path parameter. Use 'doacoes' or 'voluntarios'." });
  }

  try {
    const projectField = {};
    projectField[type] = 1;

    const demandas = await Demandas.findOne(
      { "abrigo": abrigo },
      { _id: 0, ...projectField }
    ).lean();

    const demandasArray = demandas ? demandas[type] : [];

    res.status(200).send(demandasArray);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});



router.patch('/demandas/:itemType', async (req, res) => {
  try {
    const { itemType } = req.params;
    const { demandas } = req.body;
    const { abrigo } = req.query;

    if (!['voluntarios', 'doacoes'].includes(itemType)) {
      return res.status(400).json({ message: "Invalid type specified. Use 'voluntarios' or 'doacoes'." });
    }

    const currentDate = new Date();
    console.log(currentDate);

    const updateOperation = {
      $push: { [itemType]: demandas },
      $set: { "date": currentDate }
    };

    const updatedDemandas = await Demandas.findOneAndUpdate(
      { "abrigo": abrigo },
      updateOperation,
      { new: true }
    );

    if (!updatedDemandas) {
      return res.status(404).json({ message: "No matching document found to update." });
    }

    res.status(200).json({ [itemType]: updatedDemandas[itemType], updatedDate: updatedDemandas.date });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/demandasDate', async (req, res) => {
  const { abrigo } = req.query;
  try {

    const demandas = await Demandas.findOne(
      { "abrigo": abrigo },
      { _id: 0, "date": 1 }
    );
    const demandasDate = demandas ? demandas.date : null;

    res.status(200).send(demandasDate);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.patch('/demandasRemove/:itemType', async (req, res) => {
  try {
    const { itemType } = req.params;
    const { item } = req.body;
    const { abrigo } = req.query;

    const currentDate = new Date();

    if (!['doacoes', 'voluntarios'].includes(itemType)) {
      return res.status(400).json({ message: "Invalid type specified. Use 'doacoes' or 'voluntarios'." });
    }

    const update = {
      $pull: { [itemType]: item },
      $set: { "date": currentDate }
    };

    const updatedDemandas = await Demandas.findOneAndUpdate(
      { "abrigo": abrigo },
      update,
      { new: true }
    );

    if (!updatedDemandas) {
      return res.status(404).json({ message: "No matching document found to update." });
    }

    res.status(200).json({ [itemType]: updatedDemandas[itemType], updatedDate: updatedDemandas.date });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
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

    const token = toHex(userData._id, process.env.AUTH_KEY)

    console.log("Login successful");
    res.status(200).json({ message: 'Login successful', userData, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

router.post('/user', async (req, res) => {
  const userData = req.body;

  try {


    const abrigoData = {
      titulo: userData.abrigo,
      abrigo: userData.abrigo,
      endereco: "",
      contato: "",
      info: ""
    }

    const demandaData = {
      abrigo: userData.abrigo,
      doacoes: [],
      voluntarios: [],
      nao_aceitamos: [],
      date: new Date()
    }

    if (userData.username) {
      await Usuarios.create(userData)
      await Abrigos.create(abrigoData)
      await Demandas.create(demandaData)

      console.log("Succefully created user data");
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});



router.get('/users', async (req, res) => {
  try {
    const users = await Usuarios.find({}, { '_id': 0, 'username': 1 }).lean();

    const labelValues = users.map(user => user.username);

    res.status(200).json({ message: labelValues });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


router.delete('/user', async (req, res) => {
  const { item } = req.query;
  try {
    if (item) {
      const userResult = await Usuarios.deleteOne({ username:item });
      const abrigoResult = await Abrigos.deleteOne({ abrigo: item });
      const demandaResult = await Demandas.deleteOne({ abrigo: item });

      if (userResult.deletedCount === 1 ) {
        console.log("Successfully deleted user data");
        res.status(200).json({ message: 'Successfully deleted user data' });
      } else {
        res.status(404).json({ message: 'User data not found' });
      }
    } else {
      res.status(400).json({ message: 'Invalid input data' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during deletion' });
  }
});





module.exports = router;