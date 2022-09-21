var mysql = require('mysql');
const dotenv = require('dotenv').config();

var pool  = mysql.createPool({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database
});

pool.getConnection(function(err, connection) {
  // connected! (unless `err` is set)
  connection.release();
});

module.exports = pool;