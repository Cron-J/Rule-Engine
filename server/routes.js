// Load modules

var Rule      = require('./controller/rule'),
  Static    = require('./static');

// API Server Endpoints
exports.endpoints = [

  { method: 'GET',  path: '/{somethingss*}', config: Static.get },
  { method: 'POST', path: '/rule', config: Rule.create},
  { method: 'GET', path: '/rule', config: Rule.getAll},
  { method: 'GET', path: '/rule/{id}', config: Rule.getOne},
  { method: 'PUT', path: '/rule/{id}', config: Rule.update},
  { method: 'DELETE', path: '/rule/{id}', config: Rule.remove},
  { method: 'DELETE', path: '/rule', config: Rule.removeAll}
];