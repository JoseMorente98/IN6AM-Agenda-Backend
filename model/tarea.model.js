var database = require('../config/database.config');

var tarea = {};

//SELECCIONAR TAREAS PROPIAS DEL USUARIO
tarea.selectAll = function(idUsuario, callback) {
  if(database) {
    var sql = "SELECT * FROM Tarea WHERE idUsuario = ?;";
    database.query(sql, idUsuario,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(resultados);
        console.log(resultados);
      }
    });
  }
}

//SELECCIONAR UNA TAREA
tarea.select = function(idTarea, callback) {
  if(database) {
    var sql = "SELECT * FROM Tarea WHERE idTarea = ? LIMIT 1";
    database.query(sql, idTarea,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado[0]);
      }
    });
  }
}

//AGREGAR TAREA
tarea.insert = function(data, callback) {
  if(database) {
    database.query("CALL SP_AgregarTarea(?, ?, ?, ?);", 
    [data.idUsuario, data.nombre, data.descripcion, data.fechaEntrega],
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
    var sql = "CALL SP_ActualizarTarea(?, ?, ?, ?, ?);";
    database.query(sql,
    [data.idUsuario, data.nombre, data.descripcion, data.fechaEntrega, data.idTarea],
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
tarea.delete = function(data, callback) {
  if(database) {
    var sql = "CALL SP_EliminarTarea(?, ?);";
    database.query(sql, [data.idUsuario, data.idTarea],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

module.exports = tarea;
