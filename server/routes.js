// Load modules

var Rule = require('./controller/rule'),
    Product = require('./controller/product'),
    Static  = require('./static');

// API Server Endpoints
exports.endpoints = [

  { method: 'GET',  path: '/{somethingss*}', config: Static.get },
  { method: 'POST', path: '/rule', config: Rule.create},
  { method: 'POST', path: '/getFilteredRule', config: Rule.filterRuleData},
  { method: 'GET', path: '/rule', config: Rule.getAll},
  { method: 'GET', path: '/rule/{id}', config: Rule.getOne},
  { method: 'PUT', path: '/rule/{id}', config: Rule.update},
  { method: 'POST', path: '/getFilteredProduct', config: Rule.filterRuleData},
  { method: 'POST', path: '/createProduct', config: Product.createProduct}
];