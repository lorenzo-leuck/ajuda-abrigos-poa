const express = require('express');
const router = express.Router();
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
  if (!['doacoes', 'voluntarios'].includes(type)) {
    return res.status(400).json({ message: "Invalid path parameter. Use 'doacoes' or 'voluntarios'." });
  }

  try {
    const projectField = {};
    projectField[type] = 1; 

    const demandas = await Demandas.findOne(
      { "abrigo": "vida" },
      { _id: 0, ...projectField }
    ).lean();

    const demandasArray = demandas ? demandas[type] : [];

    res.status(200).send(demandasArray);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});




router.get('/demandasDate', async (req, res) => {
  try {

    const demandas = await Demandas.findOne(
      { "abrigo": "vida" },
      { _id: 0, "date": 1 }
    );
    const demandasDate = demandas ? demandas.date : null;

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



router.patch('/demandas/voluntarios', async (req, res) => {
  try {
    const { demandas } = req.body;
    const currentDate = new Date(); 
    console.log(currentDate);
    const updatedDemandas = await Demandas.findOneAndUpdate(
      { "abrigo": "vida" },
      {
        $push: { "voluntarios": demandas }, 
        $set: { "date": currentDate } 
      },
      { new: true } 
    );

    if (!updatedDemandas) {
      return res.status(404).json({ message: "No matching document found to update." });
    }

    res.status(200).json({ voluntarios: updatedDemandas.voluntarios, updatedDate: updatedDemandas.date });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.patch('/demandas/voluntarios/remove', async (req, res) => {
  try {
    const { item } = req.body;  
    const currentDate = new Date(); 
    const updatedDemandas = await Demandas.findOneAndUpdate(
      { "abrigo": "vida" }, 
      {
        $pull: { "voluntarios": item }, 
        $set: { "date": currentDate } 
      },
      { new: true } 
    );

    if (!updatedDemandas) {
      return res.status(404).json({ message: "No matching document found to update." });
    }

    res.status(200).json({ voluntarios: updatedDemandas.voluntarios, updatedDate: updatedDemandas.date });

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

    const token = jwt.sign({ userId: userData._id }, process.env.AUTH_KEY);

    console.log("Login successful:", token);
    res.status(200).json({ message: 'Login successful', userData, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});





module.exports = router;