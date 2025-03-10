
const express = require('express');
const router  = express.Router();
const messageQueries = require('../db/queries/messages');


router.get('/', (req, res) => {
  messageQueries.getMessages()
    .then(messages => {
      templateVars = {
        messages
      }
      res.render('messages', templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
}); 

router.post('/', (req, res) => {
  // send the messages to the db message table
}); 

module.exports = router;