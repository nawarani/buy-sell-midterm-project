const express = require("express");
const gameRoutes = express.Router();
const db = require('../db/connection');


//rendering form to add new game

gameRoutes.get('/new', (req, res) => {
  // if (req.session.is_admin) {

  // }

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

// this route handles status of the game if its been sold or not

gameRoutes.post('/sold/:id', (req, res) => {
  const gameId = req.params.id;

  const query = 'UPDATE games SET is_sold = TRUE WHERE id = $1 RETURNING *;';

  db.query(query, [gameId])
  .then(() => {
    res.redirect('/'); // this will reload the page but with updated status of game as SOLD
  })
  .catch((err) => {
    console.log('Error, did not mark game as sold', err);
    res.status(500).send('Experienced error, did not update status of game')
  });
});

// Resets marked as sold button upon server start up
// Might move code back to home.js (organization based on what it does)
const resetQuery = 'UPDATE games SET is_sold = FALSE';

db.query(resetQuery)
  .then(() => {
    console.log('All games are marked as available on server startup');
  })
  .catch((err) => {
    console.error('Error resetting games:', err);
  });

  gameRoutes.post('/games/sold/:id', (req, res) => {
    const gameId = req.params.id;
  
    const updateQuery = 'UPDATE games SET is_sold = TRUE WHERE id = $1';
  
    db.query(updateQuery, [gameId])
      .then(() => {
        res.redirect('/'); // Redirect back to the home page after marking it as sold
      })
      .catch((err) => {
        console.error('Error marking game as sold:', err);
        res.status(500).send('Error updating game status');
      });
  });


  // this will filter out games based on the price filtering feature
gameRoutes.get("/", (req, res) => {
  const maxPrice = req.query.maxPrice || 200; //default price if non is set

  // querying games in combination with the price filter
  const query = `
  SELECT * FROM games
  WHERE price_cents <= $1
  ORDER BY is_sold
  `;

  db.query(query, [maxPrice * 100]) //converts prices
    .then((result) => {
      const templateVars = { games: result.rows};
      res.render("index", templateVars)
    })
    .catch((err) => {
      console.error("Error", err);
      res.status(500).send("error loading games")
    });
})
module.exports = gameRoutes