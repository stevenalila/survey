const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Poll = require('./PollSchema');

router.get('/all', (req, res) => {
  Poll.find({}, (err, results) => {
    if (err) {
      return res.status(500);
    }

    return res.json({ success: true, results: results });
  });
});

router.get('/get', (req, res) => {
  Poll.findOne({ id: req.query.id }, (err, poll) => {
    if (err) {
      return res.status(500);
    }
    return res.json({ success: true, poll: poll });
  });
});

router.post('/vote', (req, res) => {
  Poll.findOne({ id: req.body.id }, (err, poll) => {
    if (err) {
      return res.status(500);
    }
    poll.options['option_' + req.body.option].votes++;
    poll.save((err) => {
      if (err) {
        console.error(err);
      }
      return res.json({ success: true, voteCount: poll.options['option_' + req.body.option].votes });
    });
  });
});

router.post('/remove', (req, res) => {
  Poll.remove({ id: req.body.id }, (err) => {
    if (err) {
      return res.status(500);
    }

    return res.json({ success: true });
  });
});

router.post('/create', (req, res) => {
  const errors = [];

  // Validate question
  if(req.body.question.length < 8) {
    errors.push('Question must be at least 8 characters long.');
  }

  // Validate options
  if(req.body.options.option_1.length < 3 ||
    req.body.options.option_2.length < 3 ||
    req.body.options.option_3.length < 3 ||
    req.body.options.option_4.length < 3) {
    errors.push('All options must be at least 3 characters long.');
  }

  if(errors.length) {
    return res.status(400).json({ success: false, errors: errors });
  } else {
    Poll.create({
      id: bcrypt.hashSync(Date.now().toString()),
      email: req.body.email,
      fullname: req.body.fullname,
      date: req.body.date,
      question: req.body.question,
      options: {
        option_1: { text: req.body.options.option_1, votes: 0 },
        option_2: { text: req.body.options.option_2, votes: 0 },
        option_3: { text: req.body.options.option_3, votes: 0 },
        option_4: { text: req.body.options.option_4, votes: 0 },
      }
    }, (err) => {
      if (err) {
        console.error(err);
        errors.push('An unknown error has occurred. Please contact the administrator.');
        return res.status(500).json({ success: false, errors: errors });
      }
      return res.status(200).json({ success: true });
    });
  }
});

module.exports = router;
