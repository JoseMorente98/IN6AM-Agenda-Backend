var express = require('express');
var tarea = require('../../model/tarea.model');
var routerTarea = express.Router();

//GET TAREAS
routerTarea.get('/tareas/', function(req, res, next) {
  tarea.selectAll(function(tarea) {
    if(typeof tarea !== 'undefined') {
      res.json(tarea);
    } else {
      res.json({"mensaje" : "No hay tareas"});
    }
  });
});

//GET TAREA
routerTarea.get('/tareas/:idTarea',
  function(req, res) {
    var idTarea = req.params.idTarea;
    tarea.select(idTarea,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay tareas"});
      }
  });
});

//POST TAREAS
routerTarea.post('/tareas', function(req, res) {
  var data = {
    idTarea : null,
    nombre : req.body.nombre,
    descripcion: req.body.descripcion,
    fechaEntrega: req.body.fechaEntrega
  }
  tarea.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.redirect('/api/tareas');
    } else {
      res.json({"Mensaje": "No se ingreso la tarea"});
    }
  });
});

//PUT TAREAS
routerTarea.put('/tareas/:idTarea', function(req, res) {
  var idTarea = req.params.idTarea;
  var data = {
    idTarea : req.body.idTarea,
    nombre : req.body.nombre,
    descripcion: req.body.descripcion,
    fechaEntrega: req.body.fechaEntrega
  }
  if(idTarea === data.idTarea) {
    tarea.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la tarea"});
      }
    });
  } else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

//DELETE TAREAS
routerTarea.delete('/tareas/:idTarea',
  function(req, res) {
    var idTarea = req.params.idTarea;
    tarea.delete(idTarea,
      function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.redirect("/api/tareas");
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});

module.exports = routerTarea;
