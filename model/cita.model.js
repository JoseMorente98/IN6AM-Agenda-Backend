var database = require('../config/database.config');

var cita = {};

//SELECCIONAR CITAS PROPIAS DEL USUARIO
cita.selectAll = function(idUsuario, callback) {
  if(database) {
    var sql = "SELECT cita.idCita, cita.nombre, cita.descripcion, cita.fechaCita, contacto.nombre, contacto.apellido, contacto.telefono, cita.idUsuario FROM Cita INNER JOIN contacto ON (cita.idContacto = contacto.idContacto) WHERE idUsuario = ? ORDER BY cita.fechaCita DESC";
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

//SELECCIONAR UNA CITA
cita.select = function(idCita, callback) {
  if(database) {
    var sql = "SELECT * FROM Cita WHERE idCita = ?";
    database.query(sql, idCita,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado[0]);
      }
    });
  }
}

//AGREGAR CITA
cita.insert = function(data, callback) {
  if(database) {
    database.query("CALL SP_AgregarCita(?, ?, ?, ?, ?);", 
    [data.idUsuario, data.nombre, data.descripcion, data.fechaCita, data.idContacto],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });
  }
}

//ACTUALIZAR CITA
cita.update = function(data, callback) {
  if(database) {
    var sql = "CALL SP_ActualizarCita(?, ?, ?, ?, ?, ?);";
    database.query(sql,
    [data.idUsuario, data.nombre, data.descripcion, data.fechaCita, data.idContacto, data.idCita],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, data);
      }
    });
  }
}

//ELIMINAR CITA
cita.delete = function(data, callback) {
  if(database) {
    var sql = "CALL SP_EliminarCita(?, ?);";
    database.query(sql, [data.idUsuario, data.idCita],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

module.exports = cita;
