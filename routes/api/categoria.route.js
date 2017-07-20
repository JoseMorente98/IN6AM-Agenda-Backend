var express = require('express');
var routerCategorias = express.Router();
var categoria = require('../../model/categoria.model');

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

routerCategorias.get('/categorias/:idCategoria',
  function(req, res) {
    var idCategoria = req.params.idCategoria;
    categoria.select(idCategoria,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay categorias"});
      }
  });
});
//POST CATEGORIA
routerCategorias.post('/categorias', function(req, res, next) {
  nombre = req.body.nombre
  categoria.insert(nombre, function(resultado){
    if(resultado && resultado.insertId > 0) {
      res.redirect('/api/categorias/');
    } else {
      res.json({"mensaje":"No se ingreso la categoria"});
    }
  });
});

//PUT CATEGORIA
routerCategorias.put('/categorias/:idCategoria', function(req, res, next){
  var data = {
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
routerCategorias.delete('/categorias/:idCategoria', function(req, res, next){
  var idCategoria = req.params.idCategoria;
  categoria.delete(idCategoria, function(resultado){
    if(resultado && resultado.mensaje === "Eliminado") {
      res.json({"mensaje":"Se elimino la categoria correctamente"});
    } else {
      res.json({"mensaje":"Se elimino la categoria"});
    }
  });
});

module.exports = routerCategorias;
