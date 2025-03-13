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






module.exports = homeRoutes;