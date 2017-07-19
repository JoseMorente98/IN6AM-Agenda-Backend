var mysql = require('mysql');
//PARAMETROS DE LA CONEXION MYSQL
var parametros =  {
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'AgendaIN6AM'
}
var connection = mysql.createConnection(parametros);

module.exports = connection;
