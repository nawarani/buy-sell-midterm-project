
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
  // userId set up this way for testing
  // const userId = req.session.userId;
  const userId = 1;
  console.log('message text:', req.body.message);
  messageQueries.sendMessage(userId, req.body.message)
  .then(() => {
    console.log('either error above or message sent');
  })
}); 

module.exports = router;