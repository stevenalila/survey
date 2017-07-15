const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('./UserSchema');

router.post('/register', (req, res) => {
  const errors = [];
  let response = {};
  // email - make sure its valid and unique
  // first name - between 2 and 14 characters
  // last name - between 2 and 14 characters
  // password - between 2 and 14 characters
  // password_confirm - equal to password
  // birthday - cannot set year to the future

  // Validate email address
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!emailRegex.test(req.body.email)) {
    errors.push('The supplied e-mail address is invalid.');
  }

  // Validate first and last names
  const nameRegex = /^[a-zA-Z]+$/;
  if(!nameRegex.test(req.body.firstname)) {
    errors.push('The supplied first name is invalid.');
  }

  if(!nameRegex.test(req.body.lastname)) {
    errors.push('The supplied last name is invalid.');
  }

  // Validate password is at least 5 characters
  if(req.body.password.length < 5) {
    errors.push('The supplied password is invalid (password has to be at least 5 characters long.');
  }

  // Validate password and password_confirm are matching
  if(req.body.password !== req.body.password_confirm) {
    errors.push('The two passwords do not match.');
  }

  // Validate birthday is not in the future
  const ageDif = Date.now() - new Date(req.body.birthday).getTime();
  const ageDate = new Date(ageDif);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  if(age < 13) {
    errors.push('You must be at least 13 years old to surf this website');
  }

  // If errors are empty, set response object to be successful.
  // Otherwise, set to false, and also add the errors object (so the front-end can show them to the user).
  if(errors.length) {
    res.status(401).json({ success: false, errors: errors });
  } else {
    const salt = bcrypt.genSaltSync(10);

    User.create({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: bcrypt.hashSync(req.body.password, salt),
      salt: salt,
      birthday: req.body.birthday
    }, (err) => {
      // Error handling
      if (err) {
        if(err.code === 11000) { // Duplicate email address
          errors.push('Please choose a different email address. The one provided already exists.');
        } else { // Any other error
          console.error(err);
          errors.push('An unknown error has occurred. Please contact the administrator.');
        }
        return res.status(401).json({ success: false, errors: errors });
      }
      res.json(({ success: true }));
    });
  }
});

router.post('/login', (req, res) => {
  const errors = [];
  const email = req.body.email;

  User.findOne({ email: email }, (err, user) => {
    if(err || !user) {
      errors.push('Please check whether the email address and password are correct.');
      return res.status(401).json({ success: false, errors: errors });
    }
    const encryptedPassword = bcrypt.hashSync(req.body.password, user.salt);
    if(encryptedPassword !== user.password) {
      errors.push('Please check whether the email address and password are correct.');
      return res.status(401).json({ success: false, errors: errors });
    } else {
      // TODO: token
      return res.json({ success: true, email: user.email, fullname: user.firstname + user.lastname });
    }
  });
});

module.exports = router;
