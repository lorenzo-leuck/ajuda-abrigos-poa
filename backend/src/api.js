const express = require('express');
const router = express.Router();
const DonationItem = require('./models').DonationItem;

router.get('/items', async (req, res) => {
  try {
    const items = await DonationItem.find();
    res.json(items);
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

module.exports = router;