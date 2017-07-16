var database = require('../config/database.config');
var contacto = {};

//SELECCIONAR CONTACTOS
contacto.selectAll = function(callback) {
  if(database) {
    database.query("SELECT contacto.idContacto as 'idContacto', contacto.nombre as 'nombre', contacto.apellido as 'apellido'," + 
      "contacto.telefono as 'telefono', contacto.correo as 'correo', categoria.nombre as 'categoriaNombre'" +
        "from contacto INNER JOIN categoria ON (contacto.idCategoria = categoria.idCategoria)", 
    function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}

//SELECCIONAR UN CONTACTO
contacto.select = function(idContacto, callback) {
  if(database) {
    var sql = "SELECT * FROM Contacto WHERE idContacto = ?";
    database.query(sql, idContacto,
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
