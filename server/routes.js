// Load modules

var Rule = require('./controller/rule'),
	  ruleOperatorandAggregator = require('./controller/ruleOperatorandAggregator'),
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
  { method: 'DELETE', path: '/rule/{id}', config: Rule.remove},
  { method: 'DELETE', path: '/rule', config: Rule.removeAll},
  { method: 'GET', path: '/getOperators', config: ruleOperatorandAggregator.getOperator},
  { method: 'GET', path: '/getAggregators', config: ruleOperatorandAggregator.getAggregator},
  { method: 'POST', path: '/getFilteredProduct', config: Rule.filterRuleData},
  { method: 'POST', path: '/createProduct', config: Product.createProduct}
];