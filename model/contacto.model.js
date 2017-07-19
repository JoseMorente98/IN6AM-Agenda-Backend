var database = require('../config/database.config');
var contacto = {};

//SELECCIONAR CONTACTOS
contacto.selectAll = function(idUsuario, callback) {
  if(database) {
    var sql = "SELECT contacto.idContacto AS 'idContacto', contacto.nombre AS 'nombre', contacto.apellido AS 'apellido', contacto.correo AS 'correo', contacto.telefono AS 'telefono', categoria.nombre AS 'nombreCategoria' FROM DetalleUsuario INNER JOIN contacto ON (detalleusuario.idContacto = contacto.idContacto) INNER JOIN categoria ON (contacto.idCategoria = categoria.idCategoria) WHERE idUsuario = ?";
    database.query(sql, idUsuario,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado);
        console.log(resultado);
      }
    });
  }
}

//SELECCIONAR UN CONTACTO
contacto.select = function(data, callback) {
  if(database) {
    var sql = "SELECT contacto.idContacto AS 'idContacto', contacto.nombre AS 'nombre', contacto.apellido AS 'apellido', " +
      "contacto.correo AS 'correo', contacto.telefono AS 'telefono', categoria.nombre AS 'nombreCategoria' FROM DetalleUsuario " +
      "INNER JOIN contacto ON (detalleusuario.idContacto = contacto.idContacto) " +
      "INNER JOIN categoria ON (contacto.idCategoria = categoria.idCategoria) "+
      "WHERE idUsuario = ? AND contacto.idContacto = ?";
    database.query(sql, [data.idUsuario, data.idContacto],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });
  }
}

//AGREGAR CONTACTO
contacto.insert = function(data, callback) {
  if(database) {
    database.query("CALL SP_AgregarDetalleUsuario(?, ?, ?, ?, ?, ?)", 
    [data.idUsuario, data.nombre, data.apellido, data.telefono, data.correo, data.idCategoria],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });
  }
}

//ACTUALIZAR CONTACTO
contacto.update = function(data, callback) {
  if(database) {
    var sql = "CALL SP_ActualizarContacto(?, ?, ?, ?, ?, ?)";
    database.query(sql,
    [data.nombre, data.apellido, data.telefono, data.correo, data.idCategoria, data.idContacto],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, data);
      }
    });
  }
}

//ELIMINAR CONTACTO
contacto.delete = function(idContacto, callback) {
  if(database) {
    var sql = "CALL SP_EliminarContacto(?)";
    database.query(sql, idContacto,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });
  }
}

module.exports = contacto;
