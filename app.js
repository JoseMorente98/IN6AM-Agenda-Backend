var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');

//IMPORTAR ROUTES
var indexRoute = require('./routes/index');
var authRoute = require('./routes/auth.route');
var usuarioRoute = require('./routes/api/usuario.route');
var categoriaRoute = require('./routes/api/categoria.route');
var contactoRoute = require('./routes/api/contacto.route');
var tareaRoute = require('./routes/api/tarea.route');
var services = require('./services');

var app = express();
var port = 3000;
var uri = '/api/';

//CONFIGURACION VISTA
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//CONFIGURACION LOGGER
app.use(logger('dev'));

//CONFIGURACION DE BODY-PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//CONTROL DE ACCESO
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
	if(req.methods == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

//IMPORTAR ROUTES
app.use('/', indexRoute);
app.use('/', authRoute);
app.use(uri, usuarioRoute);
app.use(uri, categoriaRoute);
app.use(uri, contactoRoute);
app.use(uri, tareaRoute);

//ERROR 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err);
  next();
});

//COMENTARIOS
app.listen(port, function() {
  console.log("El servidor se está ejecutando en el puerto: " + port);
});
