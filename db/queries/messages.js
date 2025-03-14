const db = require('../connection');
//------------------------------------------------------------------------------
const getMessages = () => {
  return db.query('SELECT * FROM messages;')
    .then(data => {
      return data.rows;
    });
};
//------------------------------------------------------------------------------
const sendMessage = (sender_id, text) => {
  const query_str = 'INSERT INTO messages(sender_id, text) VALUES ($1, $2)';
  const query_args = [sender_id, text];
  return db.query(query_str, query_args)
    .catch(err => {
      console.log('error sending message:', err);
    });
};

module.exports = {
  getMessages,
  sendMessage
};