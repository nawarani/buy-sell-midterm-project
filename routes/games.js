const express = require("express");
const gameRoutes = express.Router();
const db = require('../db/connection');
//-------------------------------------------------------------------------------------
//rendering form to add new game
gameRoutes.get('/new', (req, res) => {
  // Query to fetch all systems from the database
  const query = 'SELECT * FROM systems';

  db.query(query)
    .then((result) => {
      // Create templateVars object and pass systems from the database to it
      const templateVars = {
        systems: result.rows,
        userId: req.session.userId
      };

      // Render the 'new-game' template and pass the templateVars
      res.render('new-game', templateVars);
    })
    .catch(() => {
      res.status(500).send("Error fetching systems");
    });
});
//-------------------------------------------------------------------------------------
// This handles adding a new game into the database when posting a new game for sale
gameRoutes.post('/new', (req, res) => {
  const { name, description, price, condition, system } = req.body;

  const query = `INSERT INTO games(name, description, price_cents, condition, system_id) VALUES($1, $2, $3, $4, $5)
  `;

  const values = [name, description, price, condition, system];

  db.query(query, values)
    .then(() => {
      res.redirect('/');
    })
    .catch(() => {
      res.status(500).send("Error inserting new game");
    });
});
//-------------------------------------------------------------------------------------
// This route handles the status of the game and marks it as sold when a user buys the game
gameRoutes.post('/sold/:id', (req, res) => {
  const gameId = req.params.id;

  const query = 'UPDATE games SET is_sold = TRUE WHERE id = $1 RETURNING *;';

  db.query(query, [gameId])
    .then(() => {
      res.redirect('/'); // this will reload the page but with updated status of game as SOLD
    })
    .catch(() => {
      res.status(500).send('Experienced error, did not update status of game');
    });
});

//-------------------------------------------------------------------------------------
// This route will display games and filter out listing based on the price filtering feature
gameRoutes.get("/", (req, res) => {
  const maxPrice = req.query.maxPrice || 100; //default price if non is set
  console.log(maxPrice);
  // querying games in combination with the price filter
  const query = `
  SELECT * FROM games
  WHERE price_cents <= $1
  ORDER BY is_sold
  `;

  db.query(query, [maxPrice * 100]) //converts prices from cents to dollars
    .then((result) => {
      const templateVars = {
        games: result.rows,
        maxPrice: maxPrice, // connects to the index.js scripts which handles the filter slider
        userId: req.session.userId,
        isAdmin: req.session.isAdmin
      };
      res.render("index", templateVars);
    })
    .catch(() => {
      res.status(500).send("error loading games");
    });
});
//-------------------------------------------------------------------------------------
// This route handles the deleting of game id as well as from the  database where the id matches the gameId
gameRoutes.post("/:id/delete", (req, res) => {
  const gameId = req.params.id;
  console.log(gameId);
  const query = "DELETE FROM games WHERE id = $1";

  db.query(query, [gameId])
    .then(() => {
      res.redirect("/"); // Redirect back to the main pages
    })
    .catch(() => {
      res.status(500).send("Error deleting game");
    });
});
//-------------------------------------------------------------------------------------
// Resets marked as sold button upon server start up
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
    .catch(() => {
      res.status(500).send('Error updating game status');
    });
});


module.exports = gameRoutes;