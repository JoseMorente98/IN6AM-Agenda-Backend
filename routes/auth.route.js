var express = require('express');
var jwt = require('jsonwebtoken');
var usuario = require('../model/usuario.model');
var router = express.Router();

//AUTENTICAR USUARIOS
router.post('/auth/', function(req, res) {
	var data = {
		nick: req.body.nick,
		contrasena: req.body.contrasena
	}
	usuario.login(data, function(resultado) {
		if(typeof resultado !== undefined) {
			var temp = {
				idUsuario: resultado.idUsuario,
				nick: resultado.nick,
				contrasena: resultado.contrasena
			}
			console.log(temp);
			var token = 'Bearer ' + jwt.sign(temp, 'shh');
			res.setHeader('Authorization', token);

			res.json({
				estado: true,
				mensaje: "Se autorizo el acceso",
				token: token
			});
		} else {
			res.json({
				estado: false,
				mensaje: "No hay usuarios"
			});
		}
	});
});

module.exports = router;
