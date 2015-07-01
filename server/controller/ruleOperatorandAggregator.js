var Joi = require('joi'),
    Boom = require('boom'),
    Operator = require('../Utility/staticData');

exports.getOperator = {
    handler: function(request, reply) {
        reply(Operator.staticOperators);
    }
};

exports.getAggregator = {
    handler: function(request, reply) {
        reply(Operator.staticAggregators);
    }
};

