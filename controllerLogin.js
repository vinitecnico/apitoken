var Usuario = require('./ModelUsuario');
var jwt = require('jwt-simple');
var moment = require('moment');
var segredo = 'apitoken';

module.exports = function(req, res) {

  var username = req.body.username || '';
  var password = req.body.password || '';
  
  if (username == '' || password == '') {
    return res.send(401);
  }
  
  Usuario.findOne({username: username}, function (err, user) {
  	if (err || !user) {
      return res.json(401, err ? err : 'user not found!')
    }
  
    user.verificaSenha(password, function(isMatch) {
      if (!isMatch) {
        console.log("Attempt failed to login with " + user.username);
        return res.send(401);
      }
  
  	var expires = moment().add(1,'days').valueOf();
    var token = jwt.encode({
      iss: user.id,
      exp: expires
    }, segredo);  

     return res.json({
     	token : token,
      expires: expires,
      user: username
      // user: user.toJSON()
      });
      });
    });
};