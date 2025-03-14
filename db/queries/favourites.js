const db = require('../connection');
//------------------------------------------------------------------------------
const getFavouritesByUserId = (user_id) => {
  const query_str = 'SELECT * FROM favourites LEFT JOIN games ON game_id = games.id WHERE user_id = $1';
  const query_args = [user_id];
  return db.query(query_str, query_args)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};
//------------------------------------------------------------------------------
const markFavourite = (user_id, game_id) => {
  const query_str = 'INSERT INTO favourites(user_id, game_id) VALUES($1, $2)';
  const query_args = [user_id, game_id];
  return db.query(query_str, query_args);
  return db.query(`INSERT INTO favourites(user_id, game_id) VALUES(${user_id}, ${game_id})`);
};

module.exports = { getFavouritesByUserId, markFavourite };