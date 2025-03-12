const db = require('../connection');

const getFavouritesById = (user_id) => {
  return db.query(`SELECT * FROM favourites LEFT JOIN games ON game_id = games.id WHERE user_id = ${user_id};`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFavouritesById };