const express = require("express");
const homeRoutes = express.Router();
const db = require("../db/connection");

// Home page route - Fetch all games and render them
homeRoutes.get("/", (req, res) => {
  const query = 'SELECT * FROM games ORDER BY is_sold';
  
  db.query(query)
    .then((result) => {
      const templateVars = { games: result.rows };
      res.render("index", templateVars);
    })
    .catch((err) => {
      console.error("Error fetching games:", err);
      res.status(500).send("Error loading games");
    });
});


// // this will filter out games based on the price filtering feature
// homeRoutes.get("/", (req, res) => {
//   const maxPrice = req.query.maxPrice || 200; //default price if non is set

//   // querying games in combination with the price filter
//   const query = `
//   SELECT * FROM games
//   WHERE price_cents <= $1
//   ORDER BY is_sold
//   `;

//   db.query(query, [maxPrice * 100]) //converts prices
//     .then((result) => {
//       const templateVars = { games: result.rows};
//       res.render("index", templateVars)
//     })
//     .catch((err) => {
//       console.error("Error", err);
//       res.status(500).send("error loading games")
//     });
// })



module.exports = homeRoutes;