const mysql = require('mysql2');
const conf = require('../config/conf')

const connection = mysql.createConnection({
  host     : conf.DB_HOST,
  user     : conf.DB_USER,
  password : conf.DB_PWD,
  database : conf.DB_NAME
});
 

/*connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});*/

module.exports = connection

