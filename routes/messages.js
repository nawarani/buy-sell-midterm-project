
const express = require('express');
const router  = express.Router();
const messageQueries = require('../db/queries/messages');


router.get('/', (req, res) => {
  messageQueries.getMessages()
    .then(messages => {
      templateVars = {
        messages: messages
      }
      res.render('messages', templateVars);
    })
    .catch(err => {
      console.log('error inside messages.js', err);
    });
}); 

router.post('/', (req, res) => {
  // send the messages to the db message table
}); 

module.exports = router;