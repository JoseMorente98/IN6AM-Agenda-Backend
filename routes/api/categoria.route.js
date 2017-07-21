var express = require('express');
var routerCategorias = express.Router();
var categoria = require('../../model/categoria.model');
var services = require('../../services');

//GET CATEGORIAS
routerCategorias.get('/categorias/', function(req, res, next) {
  categoria.selectAll(function(categorias) {
    if(typeof categorias !== 'undefined') {
      res.json(categorias);
    } else {
      res.json({"mensaje" : "No hay categorias"});
    }
  });
});

//GET CONTACTO
routerCategorias.get('/categorias/:idCategoria',
 function(req, res, next) {
  var idCategoria = req.params.idCategoria;
  contacto.select(idCategoria, function(resultado) {
    if(typeof resultado !== 'undefined') {
      console.log(resultado);
      res.json(resultado);
    } else {
      res.json({"mensaje" : "No hay categorias"});
    }
  });
});

//POST CATEGORIA
routerCategorias.post('/categorias', services.verificar, function(req, res, next) {
  data = {
    idUsuario: req.usuario.idUsuario,
    nombre: req.body.nombre
  }
  categoria.insert(data, function(resultado){
    if(resultado && resultado.insertId > 0) {
      res.redirect('/api/categorias/');
    } else {
      res.json({"mensaje":"No se ingreso la categoria"});
    }
  });
});

//PUT CATEGORIA
routerCategorias.put('/categorias/:idCategoria', services.verificar, function(req, res, next){
  var data = {
    idUsuario: req.usuario.idUsuario,
    idCategoria : req.params.idCategoria,
    nombre : req.body.nombre
  }
  categoria.update(data, function(resultado){
    if(typeof resultado !== 'undefined') {
      res.json(resultado);
    } else {
      res.json({"mensaje":"No se pudo actualizar"});
    }
  });
});

//DELETE CATEGORIA
routerCategorias.delete('/categorias/:idCategoria', services.verificar, 
function(req, res, next){
  var data = {
    idUsuario: req.usuario.idUsuario,
    idCategoria: req.params.idCategoria
  }
  categoria.delete(data, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado") {
      res.json({"mensaje":"Se elimino la categoria correctamente"});
    } else {
      res.json({"mensaje":"Se elimino la categoria"});
    }
  });
});

module.exports = routerCategorias;
