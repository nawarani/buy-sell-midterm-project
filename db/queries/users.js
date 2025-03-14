const db = require('../connection');
//------------------------------------------------------------------------------
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};
//------------------------------------------------------------------------------
const getUserByEmail = (email) => {
  const query_str = 'SELECT * FROM users WHERE email = $1';
  const query_args = [email];
  return db.query(query_str, query_args)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      console.log('error', err);
    });
};
//------------------------------------------------------------------------------
const getUserById = (id) => {
  const query_str = 'SELECT * FROM users WHERE id = $1';
  const query_args = [id];
  return db.query(query_str, query_args)
  return db.query(`SELECT * FROM users WHERE id = '${id}';`)
    .then(data => {
      return data.rows[0];
    });
};
//------------------------------------------------------------------------------
const getAdmin = () => {
  return db.query('SELECT * FROM users WHERE is_admin = true;')
    .then(data => {
      return data.rows[0];
    });
};
//------------------------------------------------------------------------------
const checkUserExists = (name, email) => {
  const query_str = 'SELECT * FROM users WHERE name = $1 AND email = $2';
  const query_args = [name, email];
  return db.query(query_str, query_args)
    .then(data => {
      return Boolean(data.rows[0]);
    });
};
//------------------------------------------------------------------------------
module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  checkUserExists
};
