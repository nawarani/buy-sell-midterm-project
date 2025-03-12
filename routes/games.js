const express = require("express");
const gameRoutes = express.Router();
const db = require('../db/connection');


//rendering form to add new game

gameRoutes.get('/new', (req, res) => {
  // note FETCH ALL GAME SYSTEMS AND PASS IT INTO new-game.ejs
  // before rendering page, make a DB request (make sure systems is a selection rather than an input)
  // Query to fetch all systems from the database
  const query = 'SELECT * FROM systems'; // Adjust this if necessary based on your database schema
  
  db.query(query)
    .then((result) => {
      // Create templateVars object and pass systems from the database to it
      const templateVars = {
        systems: result.rows // Assuming result.rows contains the systems data
      };

      // Render the 'new-game' template and pass the templateVars
      res.render('new-game', templateVars);
    })
    .catch((err) => {
      console.error("Error fetching systems:", err);
      res.status(500).send("Error fetching systems");
    }); // possible EJS template required
});


gameRoutes.post('/new', (req, res) => {
  const { name, description, price, condition, system } = req.body;


  const query = `INSERT INTO games(name, description, price_cents, condition, system_id) VALUES($1, $2, $3, $4, $5)
  `; 

  const values = [name, description, price, condition, system];

  db.query(query, values)
    .then(() => {
      // Redirect back to the form after successful insertion
      res.redirect('/games/new');
    })
    .catch((err) => {
      console.error("Error inserting new game:", err);
      res.status(500).send("Error inserting new game");
    });
});


module.exports = gameRoutes

