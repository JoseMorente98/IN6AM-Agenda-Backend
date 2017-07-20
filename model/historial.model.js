var database = require('../config/database.config');
var historial = {};

//SELECCIONAR UNA historial
historial.selectAll = function(idUsuario, callback) {
  if(database) {
    var sql = "SELECT * FROM historial WHERE idUsuario = ?";
    database.query(sql, idUsuario,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

//AGREGAR historial
historial.insert = function(data, callback) {
  if(database) {
    database.query("CALL SP_AgregarHistorial(?, ?);", [data.idUsuario, data.descripcion],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });
  }
}

module.exports = historial;