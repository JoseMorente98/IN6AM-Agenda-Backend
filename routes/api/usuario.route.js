var express = require('express');
var usuario = require('../../model/usuario.model');
var usuarioRouter = express.Router();
var services = require('../../services');

//GET USUARIOS
usuarioRouter.get('/usuarios/', services.verificar,
  function(req, res, next) {
  var idUsuario = req.usuario.idUsuario;
  console.log(idUsuario);
  usuario.selectAll(idUsuario, function(usuarios) {
    if(typeof usuarios !== 'undefined') {
      console.log(usuarios);
      res.json(usuarios);
    } else {
      res.json({"mensaje" : "No hay usuarios"});
    }
  });
});

//POST USUARIOS
usuarioRouter.post('/usuarios', function(req, res) {
  var data = {
    nick : req.body.nick,
    contrasena: req.body.contrasena
  }
  usuario.insert(data, function(resultado) {
    if(typeof resultado !== undefined && resultado.affectedRows > 0) {
      resultado.status = true;
      resultado.mensaje = "Se registo el usuario correctamente";
      
      res.json(resultado);
    } else {
      resultado.status = false;
      resultado.mensaje = "Error no se registro el usuario";
      res.json(resultado);
    }
  });
});

//PUT USUARIO
usuarioRouter.put('/usuario/:idUsuario', function(req, res){
  var idUsuario = req.params.idUsuario;
	var data = {
		idUsuario : req.body.idUsuario,
    nick : req.body.nick,
    contrasena: req.body.contrasena
	}
  console.log(data);
  if (idUsuario == data.idUsuario) {
    usuario.update(data, function(resultado){
      if(typeof resultado !== undefined) {
        auth.cerrarSesion(res);
        res.json({"Editado":"true"});
  		} else {
  			res.json({"mensaje":"No se pudo actualizar"});
  		}
    });
  } else {
    res.json({mensaje: "No hay coherencia en los identificadores"});
  }
});

//DELETE USUARIOS
usuarioRouter.delete('/usuario/:idUsuario', function(req, res){
	var idUsuario = req.params.idUsuario;
	usuario.delete(idUsuario, function(resultado){
		if(resultado && resultado.mensaje ===	"Eliminado") {
			res.json({"mensaje":"Se elimino el usuario correctamente"});
		} else {
			res.json({"mensaje":"Se elimino el usuario"});
		}
	});
});

module.exports = usuarioRouter;
