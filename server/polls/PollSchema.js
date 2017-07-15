const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollsSchema = new Schema({
  id: String,
  email: String,
  fullname: String,
  date: String,
  question: String,
  options: {
    option_1: {
      text: String,
      votes: Number
    },
    option_2: {
      text: String,
      votes: Number
    },
    option_3: {
      text: String,
      votes: Number
    },
    option_4: {
      text: String,
      votes: Number
    }
  }
});

module.exports = mongoose.model('Poll', pollsSchema);
