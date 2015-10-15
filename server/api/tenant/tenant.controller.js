'use strict';
var models = require('../../models');

/*
  To get the list of Tenants.
*/
exports.index = function(req,res){
  models.Tenant.findAll().then(function(tenants){
        res.status(200).json(tenants);
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  API to get the Tenant by ID.
*/
exports.tenantById = function(req,res){
  models.Tenant.find({
    where: {id: req.params.id}
  }).then(function(tenant){
    res.status(200).json(tenant);
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  API to get the Tenant by Name.
*/
exports.tenantByName = function(req,res){
  models.Tenant.find({
    where: {name: req.params.name}
  }).then(function(tenant){
    res.status(200).json(tenant);
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  API to create the Tenant.
*/
exports.create = function(req, res){
  models.Tenant.create({
    tenantId: req.body.tenantId,
    name: req.body.name,
    status: req.body.status,
    description: req.body.description,
    validFrom: req.body.validFrom,
    validTo: req.body.validTo
  }).then(function(tenant){
    res.status(200).json(tenant);
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  API to update the Tenant
*/
exports.update = function(req,res){
  models.Tenant.find({
    where: {id: req.param('id')}
  }).then(function(Tenant){
    Tenant.updateAttributes({
      name: req.body.name,
      status: req.body.status,
      description: req.body.description,
      validFrom: req.body.validFrom,
      validTo: req.body.validTo
    }).then(function(attributeSection) {
       res.json(200);
    }).catch(function(error){
      res.status(500).json(error);
    });
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/**
 * API to search for the tenant details
 */
 exports.search = function(req, res) {
   models.Tenant.findAll({
     where: {
       name: {
         $like: "%"+req.body.name+"%"
       },
       description: {
         $like: "%"+req.body.description+"%"
       }
     }
   }).then(function(tenantData){
     res.json(tenantData);
   }).catch(function(error){
     res.status(500).json(error);
   })
 }

/*
  API to delete Tenant.
*/
exports.destroy = function(req,res){
  models.Tenant.find({
    where: {id: req.params.id}
  }).then(function(tenant){
    if(tenant){
        tenant.destroy();
        res.json(204);
    }
    else
      res.json({error:"No Tenant exist with this identity in database."});
  }).catch(function(error){
    res.status(500).json(error);
  });
};
