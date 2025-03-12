const express = require('express');
const router  = express.Router();
const favouritesQueries = require('../db/queries/favourites');


router.get('/', (req, res) => {
  favouritesQueries.getFavouritesById(req.session.userId)
  .then((data) => {
    const templateVars = {
      userId: req.session.userId,
      favouriteItems: data
    };
    res.render('favourites', templateVars);
  });
}); 

module.exports = router;
