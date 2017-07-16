var database = require('../config/database.config');
var usuario = {};

//SELECCIONAR USUARIOS
usuario.selectAll = function(callback) {
  if(database) {
    database.query('SELECT * FROM Usuario', function(error, resultados) {
      if(error) throw error;
      callback(resultados);
    });
  }
}

//SELECCIONAR UN USUARIO
usuario.select = function(idUsuario, callback) {
  if(database) {
    var sql = "SELECT * FROM Usuario WHERE idUsuario = ?";
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

//AUTENTICAR USUARIO
usuario.login = function(data, callback) {
  if(database) {
    var sql = "SELECT * FROM Usuario WHERE nick = ? AND contrasena = ?;";
    database.query(sql, [data.nick, data.contrasena],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(resultado[0]);
      }
    });
  }
}

//AGREGAR USUARIO
usuario.insert = function(data, callback) {
  if(database) {
    database.query("CALL SP_AgregarUsuario(?,?)", [data.nick, data.contrasena],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        var respuesta = {
          insertId: resultado.insertId,
          nick: data.nick,
          idusuario: resultado.insertId
        };
        callback(null, respuesta);
      }
    });
  }
}

//ACTUALIZAR USUARIO
usuario.update = function(data, callback) {
  if(database) {
    var sql = "CALL SP_ActualizarUsuario(?, ?, ?)";
    database.query(sql,
    [data.nick, data.contrasena, data.idUsuario],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });
  }
}

//ELIMINAR USUARIO
usuario.delete = function(idUsuario, callback) {
  if(database) {
    var sql = "CALL SP_EliminarUsuario(?)";
    database.query(sql, idUsuario,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });
  }
}

module.exports = usuario;
