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
  console.log('email', email);
  return db.query(`SELECT * FROM users WHERE email = '${email}';`)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      console.log('error', err);
    });
};
//------------------------------------------------------------------------------
const getUserById = (id) => {
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
  return db.query(`SELECT * FROM users WHERE name = '${name}' AND email = '${email}';`)
    .then(data => {
      return Boolean(data.rows[0]);
    });
};
//------------------------------------------------------------------------------
module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  checkUserExists,
  getAdmin
};
