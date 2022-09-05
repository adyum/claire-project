const mysql = require('mysql');
const pool = mysql.createPool({
    host: "143.95.32.203",
    user: "cranford_claires",
    password: "bGEg5p41!",
    database: "cranford_claire"
});

pool.getConnection(function(err, connection) {
    connection.release();
});

module.exports = pool;