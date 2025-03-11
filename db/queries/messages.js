const db = require('../connection');

const getMessages = () => {
  // currently shows all messages, I will select based on id once i get this working
  return db.query('SELECT text FROM messages;')
    .then(data => {
      // console.log('messages data', data.rows);
      return data.rows;
    });
};

const sendMessage = (sender_id, text) => {
  return db.query(`INSERT INTO messages(sender_id, text) VALUES ('${sender_id}', '${text}');`)
  .catch(err => {
    console.log('error sending message:', err);
  })
};

module.exports = { getMessages, sendMessage };