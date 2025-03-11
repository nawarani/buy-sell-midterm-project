
const express = require('express');
const router  = express.Router();
const messageQueries = require('../db/queries/messages');


router.get('/', (req, res) => {
  // ideally you want to have a helper function inside user queries that checks if you are logged in
  // for now we'll have workaround, chnage that later
  // console.log('userid inside get messages:', req.session.userId);
  // if (req.session.userId) {
  if (true) {
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
  } else {
    res.redirect('/login'); 
  }
}); 

router.post('/', (req, res) => {
  // userId set up this way for testing
  const userId = 1;
  // const userId = req.session.userId;
  if (userId) {
    console.log('message text:', req.body.message);
    messageQueries.sendMessage(userId, req.body.message)
    .then(() => {
      console.log('either error above or message sent');
    })
  } else {
    res.redirect('/login');
  }
}); 

module.exports = router;