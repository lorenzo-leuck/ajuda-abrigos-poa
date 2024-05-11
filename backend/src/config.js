require('dotenv').config();

module.exports = {
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/shelterDonations',
  jwtSecret: process.env.JWT_SECRET || 'your_secret_key'
};