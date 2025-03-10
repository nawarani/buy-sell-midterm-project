const db = require('../connection');

const getUsers = () => {
  // currently shows all messages, I will select based on id once i get this working
  return db.query('SELECT text FROM messages;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getMessages };