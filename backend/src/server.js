const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./api');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = 1339;
app.use(bodyParser.json());

app.use(cors());

app.use('/api', apiRoutes);

const connect = async () => {
  const uri = process.env.MONGO;
  if (!uri) {
    throw new Error('MongoDB URI not found in environment variables');
  }

  let isConnected = false;
  
  do {
    if (mongoose.connection.readyState !== 1) {
      try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB !!!');
        isConnected = true;
      } catch (err) {
        console.log(err);
        console.log('DB Timeout - Retrying in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } else {
      isConnected = true;
    }
  } while (!isConnected);
};




app.listen(port, async () => {
  console.log('Server running on port 1339');
  await connect();
});
