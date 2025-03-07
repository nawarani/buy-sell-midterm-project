const express = require('express');
const loginRouter  = express.Router();

router.get('/login', (req, res) => {
  const templateVars = {
    email: req.session.email
  };
  res.render('login', templateVars);
  // res.render('login');
}); 

module.exports = loginRouter;