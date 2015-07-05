'use strict';

var Joi = require('joi'),
    Boom = require('boom'),
    Rule = require('../model/rule').Rule,
    mongoose = require('mongoose'),
    Product = require('../model/product').Product;


exports.getAll = {
    handler: function(request, reply) {
        Rule.findRule(function(err, result) {
            if (!err) {
                return reply(result);
            }
            return reply(Boom.badImplementation(err)); // 500 error
        });
    }
};

exports.getOne = {
    handler: function(request, reply) {
        Rule.findOneRule(request.params.id, function(err, result) {
            if (!err) {
                return reply(result);
            }
            return reply(Boom.badImplementation(err)); // 500 error
        });
    }
};

exports.create = {
    handler: function(request, reply) {
        request.payload.condition = eval(request.payload.condition);
        Rule.createRule(request.payload, function(err, result) {
            if (!err) {
                return reply(result).created('/result/' + result._id); // HTTP 201
            }
            if (11000 === err.code || 11001 === err.code) {
                return reply(Boom.forbidden("please provide another rule id, it already exist"));
            }
            return reply(Boom.forbidden(err)); // HTTP 403
        });
    }
};




exports.update = {
    handler: function(request, reply) {
        console.log('request', request.payload);
        Rule.findOneRule(request.params.id, function(err, result) {
            if (!err) {
                updateHelper(request.payload, result);
                Rule.updateRule(result, function(err, saveData) {
                    if (!err) {
                        return reply(saveData); // HTTP 201
                    }
                    if (11000 === err.code || 11001 === err.code) {
                        return reply(Boom.forbidden("please provide another rule id, it already exist"));
                    }
                    return reply(Boom.forbidden(err)); // HTTP 403
                });
            } else {
                return reply(Boom.badImplementation(err)); // 500 error
            }
        });
    }
};


exports.filterRuleData = {
    handler: function(request, reply) {
        var result = request.payload;
        console.log('result.jsFunction',result);
        var criteriaFunction = eval(result.jsFunction);
        Product.findProduct(function(err, productCollection) {
            if (!err) {
                var filteredCollection = [];
                for (var item in productCollection) {
                    if (criteriaFunction(productCollection[item])) 
                     filteredCollection.push(productCollection[item]);
                }
                reply(filteredCollection);

            } else
                reply(Boom.badRequest("Could not find product"));
        })
    }
}


var updateHelper = function(requestData, originalData) {
    for (var req in requestData) {
        if (requestData[req] === " ") {
            originalData[req] = " ";
        } else {
            originalData[req] = requestData[req];
        }
    }
}