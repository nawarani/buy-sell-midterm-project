
const express = require('express');
const router  = express.Router();
const messageQueries = require('../db/queries/messages');


router.get('/', (req, res) => {
  // ideally you want to have a helper function inside user queries that checks if you are logged in
  // for now we'll have workaround, chnage that later
  // console.log('userid inside get messages:', req.session.userId);
  if (req.session.userId) {
    const templateVars = {
      userId: req.session.userId
    }
    res.render('messages', templateVars);
  } else {
    res.redirect('/login'); 
  }
}); 

router.get('/load', (req, res) => {
  messageQueries.getMessages()
    .then(messages => {
      res.json({ messages: messages, userId: req.session.userId });
    })
    .catch(err => {
      console.log('error inside load messages.js', err);
    });
});

router.post('/', (req, res) => {
  // userId set up this way for testing
  const userId = req.session.userId;
  if (userId) {
    console.log('message text:', req.body);
    messageQueries.sendMessage(userId, req.body.message)
    .then(() => {
      res.status(201).send();
    })
  } else {
    res.redirect('/login');
  }
}); 

module.exports = router;