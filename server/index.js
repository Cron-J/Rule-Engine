import Express  from 'express';
import serve    from 'serve-static';
import config   from '../config';
import fs       from 'fs';
import models   from './models';

import routeConfig   from './serverconfig/routes';

require('babel/register');

const paths = config.get('utils_paths');
const app   = new Express();

// temporary allow for CROS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ------------------------------------
// Response Time Header and Logging
// ------------------------------------
// app.use(require('./middleware/gzip')());
// app.use(require('./middleware/response-time'));
// app.use(require('./middleware/logger'));

routeConfig(app);

// ------------------------------------
// Static File Middleware
// ------------------------------------
app.use(serve(paths.dist('client'), {
  index : '__IGNORE_INDEX.HTML__'
}));

// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
  if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

app.syncmodels = function(callback) {
  models.sequelize.sync().then(() => {
    callback();
  });
}

export default app;
