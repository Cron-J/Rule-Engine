require('babel/register');

const server = require('../server'),
      config = require('../config');

const port = config.get('server_port');

server.syncmodels(function() {
  server.listen(port);
  console.log('Express server listening on port: ' + port);
});
