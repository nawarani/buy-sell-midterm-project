const db = require('../connection');

const getFavouritesById = (user_id) => {
  return db.query(`SELECT * FROM favourites LEFT JOIN games ON game_id = games.id WHERE user_id = ${user_id};`)
    .then(data => {
      return data.rows;
    });
};

const markFavourite = (user_id, game_id) => {
 return db.query(`INSERT INTO favourites(user_id, game_id) VALUES(${user_id}, ${game_id})`);
};

module.exports = { getFavouritesById, markFavourite };