const mysql = require('mysql');

// Database Connection
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'haulageapi',
  password : 'haulageapi',
  database : 'testhaul'
});

//connection.connect();

module.exports = connection;
