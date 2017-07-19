var express = require('express');
var contacto = require('../../model/contacto.model');
var services = require('../../services');
var routerContacto = express.Router();

//GET CONTACTOS
routerContacto.get('/contactos/', services.verificar,
  function(req, res, next) {
  var idUsuario = req.usuario.idUsuario;
  console.log(idUsuario);
  contacto.selectAll(idUsuario, function(contactos) {
    if(typeof contactos !== 'undefined') {
      console.log(contactos);
      res.json(contactos);
    } else {
      res.json({"mensaje" : "No hay contactos"});
    }
  });
});

//GET CONTACTO
routerContacto.get('/contactos/:idContacto', services.verificar,
 function(req, res, next) {
  var idContact = req.params.idContacto;
  var idUser = req.usuario.idUsuario;
  console.log(idUser);
  var data = {
    idContacto: idContact,
    idUsuario: idUser
  }
  contacto.select(data, function(contactos) {
    if(typeof contactos !== 'undefined') {
      res.json(contactos);
    } else {
      res.json({"mensaje" : "No hay contactos"});
    }
  });
});

//POST CONTACTO
routerContacto.post('/contactos', services.verificar, 
function(req, res, next) {
  var idUser = req.usuario.idUsuario;
  console.log(idUser);
  var data = {
    idUsuario: idUser,
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
