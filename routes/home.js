const express = require("express");
const homeRoutes = express.Router();
const db = require("../db/connection");

// Home page route - Fetch all games and render them
homeRoutes.get("/", (req, res) => {
  const query = "SELECT * FROM games WHERE is_sold = FALSE"; // THIS CODE CURRENTLY DELETES THE GAME LISTING ONCE SOLD
  const values = [];

  if (req.query.max_price) {
    query += " AND price_cents <= $1";
    values.push(req.query.max_price);
  }

  db.query(query, values)
    .then((result) => {
      const templateVars = { games: result.rows };
      res.render("index", templateVars);
    })
    .catch((err) => {
      console.error("Error fetching games:", err);
      res.status(500).send("Error loading games");
    });
});






module.exports = homeRoutes;