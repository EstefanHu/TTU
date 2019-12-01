'use strict';
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');

require('dotenv').config();

app.use(bodyParser.json({ limit: '500kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500kb' }));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(multer().none());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
  });

app.get('/', (req, res) => {
  res.sendFile('/index.html');
})

const stagesRouter = require('./routes/stages');
app.use('/stages', stagesRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})