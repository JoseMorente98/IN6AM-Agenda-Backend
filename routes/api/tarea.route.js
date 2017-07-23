var express = require('express');
var tarea = require('../../model/tarea.model');
var services = require('../../services');
var routerTarea = express.Router();

//GET TAREAS
routerTarea.get('/tareas/', services.verificar,
  function(req, res, next) {
  var idUsuario = req.usuario.idUsuario;
  console.log(idUsuario);
  tarea.selectAll(idUsuario, function(tareas) {
    if(typeof tareas !== 'undefined') {
      console.log(tareas);
      res.json(tareas);
    } else {
      res.json({"mensaje" : "No hay tareas"});
    }
  });
});

//GET TAREA
routerTarea.get('/tareas/:idTarea',
 function(req, res, next) {
  var idTarea = req.params.idTarea;
  tarea.select(idTarea, function(resultado) {
    if(typeof resultado !== 'undefined') {
      console.log(resultado);
      res.json(resultado);
    } else {
      res.json({"mensaje" : "No hay tareas"});
    }
  });
});

//POST TAREAS
routerTarea.post('/tareas', services.verificar, function(req, res) {
  var data = {
    idUsuario: req.usuario.idUsuario,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    fechaEntrega: req.body.fechaEntrega
  }
  tarea.insert(data, function(err, resultado) {
    if(resultado !== undefined) {
      res.json({
        estado: true,
        mensaje: "Se agrego la tarea"
      });
    } else {
      res.json({"Mensaje": "No se ingreso la tarea"});
    }
  });
});

//PUT TAREAS
routerTarea.put('/tareas/:idTarea', services.verificar, function(req, res) {
  var data = {
    idUsuario: req.usuario.idUsuario,
    idTarea: req.params.idTarea,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    fechaEntrega: req.body.fechaEntrega
  }
  tarea.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json({
          estado: true,
          mensaje: "Se actualizo la tarea"
        });
      } else {
        res.json({"Mensaje": "No se modifico la tarea"});
      }
  });
});

//DELETE TAREAS
routerTarea.delete('/tareas/:idTarea', services.verificar,
  function(req, res) {
    var data = {
      idUsuario: req.usuario.idUsuario,
      idTarea: req.params.idTarea
    }
    tarea.delete(idTarea,
      function(error, resultado){
      if(resultado !== undefined) {
        res.json({
        estado: true,
        mensaje: "Se elimino la tarea"
      });
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});

module.exports = routerTarea;
