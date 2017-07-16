var express = require('express');
var contacto = require('../../model/contacto.model');
var routerContacto = express.Router();
var idUsuario = 1;

//GET CONTACTOS
routerContacto.get('/contactos/', function(req, res, next) {
  contacto.selectAll(function(contactos) {
    if(typeof contactos !== 'undefined') {
      res.json(contactos);
    } else {
      res.json({"mensaje" : "No hay contactos"});
    }
  });
});

//GET CONTACTO
routerContacto.get('/contactos/:idContacto', function(req, res, next) {
  var idContacto = req.params.idContacto;
  contacto.select(idContacto, function(contactos) {
    if(typeof contactos !== 'undefined') {
      res.json(contactos);
    } else {
      res.json({"mensaje" : "No hay contactos"});
    }
  });
});

//POST CONTACTO
routerContacto.post('/contactos', function(req, res, next) {
  var data = {
    idUsuario: idUsuario,
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    telefono : req.body.telefono,
    correo : req.body.correo,
    idCategoria : req.body.idCategoria
  };
  contacto.insert(data, function(resultado){
    if(resultado && resultado.affectedRows > 0) {
      res.redirect('/api/contactos/');
    } else {
      res.json({"mensaje":"No se ingreso el contacto"});
    }
  });
});

//PUT CONTACTOS
routerContacto.put('/contacto/:idContacto', function(req, res, next){
  var idContacto = req.params.idContacto;
  var data = {
    idContacto : req.body.idContacto,
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    telefono : req.body.telefono,
    correo : req.body.correo,
    idCategoria : req.body.idCategoria
  }
  if(idContacto == data.idContacto) {
    contacto.update(data, function(resultado){
      if(resultado.length > 0) {
        res.json(resultado);
      } else {
        console.log("NO: " + resultado.length);
        res.end();
      }
    });
  } else {
    res.json({"mensaje": "No coinciden los identificadores"});
  }
});

//DELETE CONTACTOS
routerContacto.delete('/contacto/:idContacto', function(req, res, next){
  var idContactoUri = req.params.idContacto;
  var idContactoBody = req.body.idContacto;
  if(idContactoUri == idContactoBody) {
    contacto.delete(idContactoBody, function(resultado){
      if(resultado && resultado.mensaje ===	"Eliminado") {
        res.json({"mensaje":"Se elimino el contacto correctamente"});
      } else {
        res.json({"mensaje":"Se elimino el contacto"});
      }
    });
  }
});

module.exports = routerContacto;
