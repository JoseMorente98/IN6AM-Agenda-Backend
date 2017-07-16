var database = require('../config/database.config');
var tarea = {};

tarea.selectAll = function(callback) {
  if(database) {
    database.query('SELECT * FROM Tarea', function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}

//SELECCIONAR UNA TAREA
tarea.select = function(idTarea, callback) {
  if(database) {
    var sql = "SELECT * FROM Tarea WHERE idTarea = ?";
    database.query(sql, idTarea,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

//AGREGAR TAREA
tarea.insert = function(data, callback) {
  if(database) {
    database.query("CALL SP_AgregarTarea(?, ?, ?)", 
    [data.nombre, data.descripcion, data.fechaEntrega],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });
  }
}

//ACTUALIZAR TAREA
tarea.update = function(data, callback) {
  if(database) {
    var sql = "CALL SP_ActualizarTarea(?, ?, ?, ?)";
    database.query(sql,
    [data.nombre, data.descripcion, data.fechaEntrega, data.idTarea],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, data);
      }
    });
  }
}

//ELIMINAR TAREA
tarea.delete = function(idTarea, callback) {
  if(database) {
    var sql = "CALL SP_EliminarTarea(?)";
    database.query(sql, idTarea,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });
  }
}

module.exports = tarea;
