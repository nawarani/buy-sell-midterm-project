const express = require("express");
const gameRoutes = express.Router();


//rendering form to add new game

gameRoutes.get('/new', (req, res) => {
  // note FETCH ALL GAME SYSTEMS AND PASS IT INTO new-game.ejs
  // before rendering page, make a DB request (make sure systems is a selection rather than an input)
  res.render('new-game'); // possible EJS template required
});


gameRoutes.post('/new', (req, res) => {
  console.log(req.body)
  res.redirect('/games/new')
});


module.exports = gameRoutes