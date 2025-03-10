const db = require('../connection');

const getMessages = () => {
  // currently shows all messages, I will select based on id once i get this working
  return db.query('SELECT text FROM messages;')
    .then(data => {
      console.log('messages data', data);
      return data.rows;
    });
};

module.exports = { getMessages };