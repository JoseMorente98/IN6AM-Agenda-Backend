var express = require('express');
var routerHistorial = express.Router();
var historial = require('../../model/historial.model');
var services = require('../../services');

routerHistorial.get('/historiales/', services.verificar,
  function(req, res, next) {
    var idUsuario = req.usuario.idUsuario;
    historial.selectAll(idUsuario,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay historials"});
      }
  });
});

routerHistorial.post('/historial',services.verificar, function(req, res, next) {
  var idUser = req.usuario.idUsuario;
  var data = {
      idUsuario : idUser,
      descripcion : req.body.descripcion
  }
  historial.insert(data, function(resultado){
    if(resultado && resultado.insertId > 0) {
      res.redirect('/api/historiales/');
    } else {
      res.json({"mensaje":"No se ingreso la categoria"});
    }
  });
});

module.exports = routerHistorial;
