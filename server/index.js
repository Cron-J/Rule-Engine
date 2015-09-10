var express = require('express');
var fs = require('fs');
var secrets = require('./config/secrets');
var models = require('./models');

var app = express();

// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
  if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

// Bootstrap application settings
require('./config/express')(app);
// Bootstrap routes
require('./config/routes')(app);

models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});