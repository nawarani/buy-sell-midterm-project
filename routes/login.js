const express = require('express');
const loginRouter  = express.Router();

router.get('/login', (req, res) => {
  const templateVars = {
    email: req.session.email
  };
  res.render('login', templateVars);
}); 

app.post('/login', (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  req.session.email = email //set cookie
  // TODO: those two info needs to be sentto users tablenvm use 8
  res.redirect('/index');
});

module.exports = loginRouter;