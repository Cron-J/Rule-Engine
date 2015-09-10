var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var secrets = require('./secrets');
var flash = require('express-flash');
var methodOverride = require('method-override');

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

module.exports = function (app, passport) {
  app.set('port', (process.env.PORT || 3000));

  // X-Powered-By header has no functional value.
  // Keeping it makes it easier for an attacker to build the site's profile
  // It can be removed safely
  app.disable('x-powered-by');
  app.set('views', path.join(__dirname, '..', 'views'));

  app.set('view cache', false);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, '../..', 'public')));

  // I am adding this here so that the Heroku deploy will work
  // Indicates the app is behind a front-facing proxy,
  // and to use the X-Forwarded-* headers to determine the connection and the IP address of the client.
  // NOTE: X-Forwarded-* headers are easily spoofed and the detected IP addresses are unreliable.
  // trust proxy is disabled by default.
  // When enabled, Express attempts to determine the IP address of the client connected through the front-facing proxy, or series of proxies.
  // The req.ips property, then, contains an array of IP addresses the client is connected through.
  // To enable it, use the values described in the trust proxy options table.
  // The trust proxy setting is implemented using the proxy-addr package. For more information, see its documentation.
  app.enable('trust proxy');
  // Cookie parser should be above session
  // cookieParser - Parse Cookie header and populate req.cookies with an object keyed by cookie names
  // Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret
  // so it may be used by other middleware
  app.use(cookieParser());

  app.use(flash());

  // We only run this workflow when not in Production
  var isProduction = process.env.NODE_ENV === 'production';
  var port = isProduction ? app.get('port') : 3000;

  if(!isProduction) {
    // We require the bundle inside the if block because
    // it is only needed in a development environment.
    var devServer = require('../dev-server');
    devServer();

    // Any request to localhost:3000 is proxied to webpack-dev-server
    app.all('/assets/*', function(req, res) {
      proxy.web(req, res, {
          target: 'http://localhost:3001'
      });
    });

  }

  // It is important to catch any errors from the proxy or the
  // server will crash. An example of this is connecting to the
  // server when webpack is bundling
  proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
  });

};
