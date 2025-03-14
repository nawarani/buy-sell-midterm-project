const express = require('express');
const router = express.Router();
// user query functions
const userQueries = require('../db/queries/users');
const getUsers = userQueries.getUsers;
const getUserByEmail = userQueries.getUserByEmail;
const checkUserExists = userQueries.checkUserExists;
//-------------------------------------------------------------------------------------
router.get('/', (req, res) => {
  const templateVars = {
    userId: req.session.userId
  };
  res.render('login', templateVars);
});
//-------------------------------------------------------------------------------------
router.post('/', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  // if user logged in already, redirect them to homepage
  if (checkUserExists(name, email)) {
    console.log("inside login.js usercheck pass");
    getUserByEmail(email)
      .then(user => {
        // set them as logged in, using cookies
        req.session.userId = user.id;
        // set is-admin cookie for ease of development
        req.session.isAdmin = user.is_admin;
      })
      .then(() => {
        res.redirect('/');
      });
  } else {
    res.redirect('/');
  }
});

module.exports = router;