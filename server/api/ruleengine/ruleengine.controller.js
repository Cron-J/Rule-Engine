/**
 * Created by Eswer on 10/6/2015.
 */
'use strict';
var models = require('../../models'),
    common = require("../../utils/common.js"),
    async = require('async');
/*
 API to get the list of classification group.
 */
exports.index =  function(req,res){

};

/*
 API to get the classification group by ID.
 */
exports.save =  function(req,res){
    console.log(req.body);
    models.ruleeditor.create({'name':req.body.name, 'rule': req.body.rule}).then({'name':req.body.name,'rule':req.body.rule}).then(function(rule){
        res.status(200).json(rule);
    }).catch(function(error){
        res.status(500).json(error);
    });
};

exports.update = function(req,res){
    console.log(req.body.name);
  models.ruleeditor.find({'where':{'name':req.body.name}}).then(function(rule){
      rule.updateAttributes({'name':req.body.name, 'rule': req.body.rule}).then(function(success){
          res.status(200).json(success);
      }).catch(function(error){
          res.status(500).json(error);
      })
  }).catch(function(error){
      res.status(500).json(error);
  });
};


exports.getrules = function(req,res) {
    console.log("getting list of rules")
    models.ruleeditor.findAll().then(function(rules){
        res.status(200).json(rules);
    }).catch(function(error){res.status(500).json(error)});
};

exports.getSchema = function(req,res) {
    console.log('getting schema of postgres schema');
    var PostgresSchema = require('pg-json-schema-export');
    var connection = {
        user: 'postgres',
        password: 'cronj',
        host: 'localhost',
        port: 5432,
        database: 'classification_attributes'
    };
    PostgresSchema.toJSON(connection, 'public')
        .then(function (schemas) {
            // handle json object
            console.log('schema of postgres',schemas);
            res.status(200).json(schemas);
        })
    .catch(function (error) {
        // handle error
            console.log(error);
            res.status(500).json('failed to retrieve schema',error);    });
};