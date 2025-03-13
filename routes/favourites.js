const express = require('express');
const router  = express.Router();
const favouritesQueries = require('../db/queries/favourites');

router.get('/', (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    favouritesQueries.getFavouritesById(req.session.userId)
    .then((data) => {
      const templateVars = {
        userId: req.session.userId,
        favouriteItems: data
      };
      res.render('favourites', templateVars);
    });
  } else {
    res.redirect('/login');
  }
}); 

router.post('/', (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    const game_id = req.query.game_id; // for testing
    favouritesQueries.markFavourite(userId, game_id);
    res.send;
  } else {
    res.redirect('/login');
  }
}); 

module.exports = router;
