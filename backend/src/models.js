const mongoose = require('mongoose');

const donationItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  shelter: String,
  lastEdited: { type: Date, default: Date.now }
});

const DonationItem = mongoose.model('DonationItem', donationItemSchema);

module.exports = {
  DonationItem
};