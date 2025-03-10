const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserId = (email) => {
  return db.query(`SELECT id FROM users WHERE email = ${email};`)
    .then(data => {
      return data.rows[0];
    });
};

const getAdmin = (id) => {
  return db.query(`SELECT is_admin FROM users WHERE id = ${id};`)
    .then(data => {
      return data.rows[0];
    });
};

const checkUserExists = (name, email) => {
  // return db.query(`SELECT * FROM users WHERE name = ${name} AND email = ${email};`)
  //   .then(data => {
  //     return Boolean(data.rows[0]);
  //   });
  return true;
};

module.exports = { 
  getUsers, 
  getUserId, 
  getAdmin, 
  checkUserExists 
};
