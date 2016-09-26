var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    jwt = require('jwt-simple');

  var db = 'localhost:27017/mydb';

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  var port = process.env.PORT || 8080;
  var router = express.Router();

  app.use('/api', router);
  
  var rotas = require('./rotas');
  router.route('/usuarios')
    .get(require('./validarJWT'), rotas.getUsuarios) 
    .post(rotas.postUsuarios);

  router.route('/login')
    .post(rotas.login);

  mongoose.connect(db);
  app.listen(port);
  console.log('conectado a porta ' + port);