const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/users', require('./users/users.js'));
app.use('/polls', require('./polls/polls.js'));

app.listen(3000, () => {
  console.log('Server running on port 3000...');

  mongoose.connect('mongodb://localhost:27017/codingdojo', (err) => {
    if(err) return console.error(err);
    console.log('Connection with MongoDB server has successfully established...');
  });
});
