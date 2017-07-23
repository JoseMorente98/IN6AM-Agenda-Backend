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
routerContacto.get('/contactos/:idContacto',
 function(req, res, next) {
  var idContacto = req.params.idContacto;
  contacto.select(idContacto, function(resultado) {
    if(typeof resultado !== 'undefined') {
      console.log(resultado);
      res.json(resultado);
    } else {
      res.json({"mensaje" : "No hay contactos"});
    }
  });
});

//POST CONTACTO
routerContacto.post('/contactos', services.verificar,
  function(req, res, next) {
  var data = {
    idUsuario: req.usuario.idUsuario,
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    telefono : req.body.telefono,
    correo : req.body.correo,
    idCategoria : req.body.idCategoria
  };
  contacto.insert(data, function(resultado){
    if(resultado !== undefined) {
      res.json({
        estado: true,
        mensaje: "Se agrego el contacto"
      });
    } else {
      res.json({"mensaje":"No se ingreso el contacto"});
    }
  });

});

//PUT CONTACTOS
routerContacto.put('/contactos/:idContacto', services.verificar, function(req, res, next){
  var data = {
    idUsuario: req.usuario.idUsuario,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    telefono: req.body.telefono,
    correo: req.body.correo,
    idCategoria: req.body.idCategoria,
    idContacto: req.params.idContacto
  }
  contacto.update(data, function(resultado){
    if(typeof resultado !== 'undefined') {     
      res.json({
        estado: true,
        mensaje: "Se actualizo el contacto"
      });
    } else {
      res.json({"mensaje":"No se pudo actualizar"});
    }
  });
});

//DELETE CONTACTOS
routerContacto.delete('/contactos/:idContacto', services.verificar, function(req, res, next){
  var data = {
    idUsuario: req.usuario.idUsuario,
    idContacto: req.params.idContacto
  }
  contacto.delete(data, function(resultado){
    if(resultado !== undefined) {
        res.json({
        estado: true,
        mensaje: "Se elimino el contacto"
      });
      } else {
        res.json({"mensaje":"No Se elimino el contacto"});
      }
    });
});

module.exports = routerContacto;
