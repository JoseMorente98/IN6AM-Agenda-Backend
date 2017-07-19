var jwt = require('jsonwebtoken');
var services = {};

//VERIFICAR EL TOKEN
services.verificar = function(req, res, next) {
	console.log("Funcion para verificar el token");
	var header = req.headers.authorization;
    if (typeof header !== 'undefined') {
        var headerArray = header.split(" ");
        var token = headerArray[1];
        if(token) {
        	console.log("Si existe el token");
        	jwt.verify(token, 'shh', function(err, decoded){
						if(err) {
							return res.json({
								success: false,
								mensaje: 'Autenticacion Fallida, Expiró el Token :(',
								error: err
							});
						} else {
							console.log("Token Decodificado :D");
							req.token = token;
							estado = true;
							req.usuario = decoded;
							console.log(req.usuario);
							next();
						}
					});
        } else {
        	console.log("No existe el token");
        	res.json({
	        	estado: false,
	        	mensaje: "No Existe el Token D:"
	        });
        }
    } else {
        console.log("No Lleva la Cabezera Authorization");
        res.json({
        	estado: false,
        	mensaje: "No Lleva la Cabezera Authorization"
        });
    }
}

module.exports = services;