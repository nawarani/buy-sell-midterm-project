
const express = require('express');
const router = express.Router();
const messageQueries = require('../db/queries/messages');

//-------------------------------------------------------------------------------------
// Route handles the rendering of the messages once fetched and only applies if user is logged in, otherwise it'll redirect to login page
router.get('/', (req, res) => {
  if (req.session.userId) {
    const templateVars = {
      userId: req.session.userId
    };
    res.render('messages', templateVars);
  } else {
    res.redirect('/login');
  }
});
//-------------------------------------------------------------------------------------
// This route fetches the list of messages from the database
router.get('/load', (req, res) => {
  messageQueries.getMessages()
    .then(messages => {
      res.json({ messages: messages, userId: req.session.userId });
    })
    .catch(err => {
      console.log('error inside load messages.js', err);
    });
});
//-------------------------------------------------------------------------------------
// This handles the actual sending of the messages for users logged in.
router.post('/', (req, res) => {
  // userId set up this way for testing
  const userId = req.session.userId;
  if (userId) {
    console.log('message text:', req.body);
    messageQueries.sendMessage(userId, req.body.message)
      .then(() => {
        res.status(201).send();
      });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;