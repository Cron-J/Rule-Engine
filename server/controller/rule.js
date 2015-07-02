'use strict';

var Joi = require('joi'),
    Boom = require('boom'),
    Rule = require('../model/rule').Rule,
    mongoose = require('mongoose'),
    Operator = require('../Utility/staticData'),
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

exports.remove = {
    handler: function(request, reply) {
        Rule.findOneRule(request.params.id, function(err, result) {
            if (!err && user) {
                Rule.removeUser(result, function(err, res) {
                    return reply({
                        message: "Rule deleted successfully"
                    });
                })
            }
            if (!err) {
                return reply(Boom.notFound());
            }
            return reply(Boom.badRequest("Could not delete rule"));
        });
    }
};

exports.removeAll = {
    handler: function(request, reply) {
        mongoose.connection.db.dropCollection('rules', function(err, result) {
            if (!err) {
                return reply({
                    message: "Rule database successfully deleted"
                });
            }
            return reply(Boom.badRequest("Could not delete rule"));
        });
    }
};


function filterProduct(productCollection, criteriaFunction) {
    console.log('criteriaFunction1', criteriaFunction);
    var array = [];
    for (var item in productCollection) {
        if (criteriaFunction(productCollection[item])) array.push(productCollection[item]);
    }
    return array;
}

function filterCollectionFromMongodb(productCollection, criteriaFunction) {
    return filterProduct(productCollection, criteriaFunction);
}

exports.filterRuleData = {
    handler: function(request, reply) {
        var result = request.payload;
        var checkCondition = toJSFunction(JSON.parse(result.jsonExpression));
        Product.findProduct(function(err,product){
          if(!err){
            var filteredData = filterCollectionFromMongodb(product, checkCondition);
             reply(filteredData);
          }
          else
            reply(Boom.badRequest("Could not delete rule"));
        })      
    }
}

function conditionToJSExpression(condition, index) {
    var jsExpr = 'object.';
    for (var j = index | 0; j < condition.keys.length; j++) {
        if (condition.keys[j].aggregator) {
            var aggregator = Operator.staticAggregators[condition.keys[j].aggregator];
            jsExpr += condition.keys[j].field;
            return aggregator.toJSExpression(jsExpr, conditionToJSExpression(condition, j + 1));
        } else
            jsExpr += condition.keys[j].field + '.';
    }
    if (jsExpr.length > 0)
        jsExpr = jsExpr.substr(0, jsExpr.length - 1);
    jsExpr = '(' + Operator.staticOperators[condition.operator].toJSExpression(jsExpr, condition.value) + ')';
    return jsExpr;
}

function subconditionToJSExpression(subcondition) {
    var jsExpr = '';
    var andor = subcondition.allany == "all" ? " && " : " || "
    for (var i in subcondition.conditions) {
        var condition = subcondition.conditions[i];
        jsExpr += conditionToJSExpression(condition) + andor;

    }
    for (var i in subcondition.subconditions) {
        var subcondition = subcondition.subconditions[i];
        jsExpr += '(' + subconditionToJSExpression(subcondition) + ')' + andor;
    }
    //trim the last andor
    if (jsExpr.length > 4)
        jsExpr = jsExpr.substr(0, jsExpr.length - 4);
    return jsExpr;
}

function toJSFunction(expressions) {
    var jsExpr = "(function(object){"
    jsExpr += 'return ' + '(' + subconditionToJSExpression(expressions[0]) + ');';
    jsExpr += "})";
    console.log('jsExpr', jsExpr);
    try {
        return eval(jsExpr);
        //return jsExpression;
    } catch (err) {
        console.log('err', err);
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