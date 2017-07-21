var database = require('../config/database.config');
var categoria = {};

//SELECCIONAR CATEGORIAS
categoria.selectAll = function(callback) {
  if(database) {
    database.query('SELECT * FROM Categoria', function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}

//SELECCIONAR UNA CATEGORIA
categoria.select = function(idCategoria, callback) {
  if(database) {
    var sql = "SELECT * FROM Categoria WHERE idCategoria = ?";
    database.query(sql, idCategoria,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado);
      }
    });
  }
}

//AGREGAR CATEGORIA
categoria.insert = function(data, callback) {
  if(database) {
    database.query("CALL SP_AgregarCategoria(?, ?);", [data.idUsuario, data.nombre],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });
  }
}

//ACTUALIZAR CATEGORIA
categoria.update = function(data, callback) {
  if(database) {
    var sql = "CALL SP_ActualizarCategoria(?, ?, ?);";
    database.query(sql,
    [data.idUsuario, data.nombre, data.idCategoria],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });
  }
}

//ELIMINAR CATEGORIA
categoria.delete = function(data, callback) {
  if(database) {
    var sql = "CALL SP_EliminarCategoria(?, ?);";
    database.query(sql, [data.idUsuario, data.idCategoria],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });
  }
}

module.exports = categoria;