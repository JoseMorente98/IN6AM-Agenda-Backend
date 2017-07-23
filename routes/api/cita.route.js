var express = require('express');
var cita = require('../../model/cita.model');
var services = require('../../services');
var routerCita = express.Router();

//GET CITAS
routerCita.get('/citas/', services.verificar,
  function(req, res, next) {
  var idUsuario = req.usuario.idUsuario;
  console.log(idUsuario);
  cita.selectAll(idUsuario, function(citas) {
    if(typeof citas !== 'undefined') {
      console.log(citas);
      res.json(citas);
    } else {
      res.json({"mensaje" : "No hay citas"});
    }
  });
});

//GET CITA
routerCita.get('/citas/:idCita',
  function(req, res, next) {
    var data = req.params.idCita;
    cita.select(data, function(error, resultado){
      if(typeof resultado !== 'undefined') {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No hay cita."});
      }
  });
});
//POST CITAS
routerCita.post('/citas', services.verificar, function(req, res) {
  var data = {
    idUsuario: req.usuario.idUsuario,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    fechaCita: req.body.fechaCita,
    idContacto: req.body.idContacto
  }
  cita.insert(data, function(err, resultado) {
    if(resultado !== undefined) {
      res.json({
        estado: true,
        mensaje: "Se agrego la cita"
      });
    } else {
      res.json({"Mensaje": "No se ingreso la cita"});
    }
  });
});

//PUT CITAS
routerCita.put('/citas/:idCita', services.verificar, function(req, res) {
  var data = {
    idUsuario: req.usuario.idUsuario,
    idCita: req.params.idCita,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    fechaCita: req.body.fechaCita,
    idContacto: req.body.idContacto
  }
  cita.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json({
        estado: true,
        mensaje: "Se edito la cita"
      });
      } else {
        res.json({"Mensaje": "No se modifico la cita"});
      }
  });
});

//DELETE CITAS
routerCita.delete('/citas/:idCita', services.verificar,
  function(req, res) {
    var data = {
      idUsuario: req.usuario.idUsuario,
      idCita: req.params.idCita
    }
    cita.delete(idCita,
      function(error, resultado){
      if(resultado !== undefined) {
        res.json({
        estado: true,
        mensaje: "Se elimino la cita"
      });
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});

module.exports = routerCita;
