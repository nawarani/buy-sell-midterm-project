const express = require('express');
const router  = express.Router();
// user query functions
const userQueries = require('../db/queries/users');
const getUserId = userQueries.getUserId;
const getAdmin = userQueries.getAdmin;
const checkUserExists = userQueries.checkUserExists;

router.get('/', (req, res) => {
  const templateVars = {
    id: req.session.userId
  };
  res.render('login', templateVars);
}); 

router.post('/', (req, res) => {
  // name is used for verification purposes here since we dont have passwords
  const name = req.body.name;
  const email = req.body.email;
  // TODO: check if it's a match
  if (checkUserExists(name, email)){
    console.log("inside login.js usercheck pass");
    const userId = getUserId(email);
    // set them as logged in, using cookies
    req.session.userId = userId;
    // set is-admin cookie for ease of development
    req.session.isAdmin = getAdmin(userId);
  }
  console.log("outside login.js usercheck pass");
  res.redirect('/');
});

module.exports = router;