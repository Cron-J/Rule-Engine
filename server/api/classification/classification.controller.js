'use strict';
var models = require('../../models'),
    async = require("async"),
    common = require("../../utils/common.js");
/*
  API to get the list of Classifications.
*/
exports.index =  function(req,res){
  models.Classification.findAll({
    include: [models.ClassificationGroup]
  }).then(function(classifications){
    res.status(200).json(classifications);
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  API to get the classification by ID.
*/
exports.getOne =  function(req,res){
    models.Classification.find({
      where: {id: req.params.id},
      include: [models.ClassificationGroup, models.ClassificationLongDescription, models.ClassificationShortDescription]
    }).then(function(classification){
      res.status(200).json(classification);
    }).catch(function(error){
      res.status(500).json(error);
    });
};


/*
  API to create the Classification.
*/
exports.create =  function(req,res){
  models.Classification.create({
    classificationId: req.body.classificationId,
    TenantId: req.body.tenantId,
    versionNo: req.body.versionNo,
    type: req.body.type,
    orderNo: req.body.orderNo,
    documentUrl1: req.body.documentUrl1,
    documentUrl2: req.body.documentUrl2,
    documentUrl3: req.body.documentUrl3
  }).then(function(classification){
    var longDescription = common.classification(req.body.longDescription,classification.id);
    models.ClassificationLongDescription.bulkCreate(longDescription)
    .then(function(longDescription){
      var shortDescription = common.classification(req.body.shortDescription,classification.id);
      models.ClassificationShortDescription.bulkCreate(shortDescription)
      .then(function(shortDescription){
        res.status(200).json(classification);
      }).catch(function(error){
        res.status(500).json(error);
      });
    }).catch(function(error){
      res.status(500).json(error);
    }).catch(function(error){
      res.status(500).json(error);
    });
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  API to Update Classification.
*/
exports.update =  function(req,res){
  models.Classification.find({
    where: {id: req.params.id}
  }).then(function(classification){
    classification.updateAttributes({
      classificationId: req.body.classificationId,
      TenantId: req.body.tenantId,
      versionNo: req.body.versionNo,
      orderNo: req.body.orderNo,
      type: req.body.type,
      documentUrl1: req.body.documentUrl1,
      documentUrl2: req.body.documentUrl2,
      documentUrl3: req.body.documentUrl3
    }).then(function(classification){
      updateLongDescription(req,res);
    }).catch(function(error){
      res.status(500).json(error);
    });
  }).catch(function(error){
    res.status(500).json(error);
  });
};


/**
 * update Long description
 */
 var updateLongDescription = function(req, res) {
   models.ClassificationLongDescription.findAll({
     where: {ClassificationId: req.params.id}
   }).then(function(classifications) {
       var updateRecords = [];
       var addRecords = [];
       var deleteRecords = [];
       for(var i = 0; i<req.body.longDescription.length; i++) {
         var classification = req.body.longDescription[i];
         if(common.keyvalueExistsin('id', classification.id, classifications)) {
           updateRecords.push(classification);
         } else {
           addRecords.push(classification);
         }
       }
       for(var i = 0; i<classifications.length; i++) {
         var classification = classifications[i]
         if(!common.keyvalueExistsin('id', classification.id, req.body.longDescription)) {
           deleteRecords.push(classification);
         }
       }
       var reformattedDescriptions = common.classification(addRecords, req.params.id);
       models.ClassificationLongDescription.bulkCreate(reformattedDescriptions).then(function() {
         async.each(updateRecords,
           function(item, callback) {
             models.ClassificationLongDescription.find({
               where: {id: item.id}
             }).then(function(data) {
               data.updateAttributes({
                 language: item.language,
                 description: item.description
               }).then(function(){
                 callback();
               });
             });
           },
           function(){
             async.each(deleteRecords,
               function(item, callback) {
                 models.ClassificationLongDescription.find({
                   where: {id: item.id}
                 }).then(function(data){
                   data.destroy().then(function(){
                   callback();
                 });
                });
          },
        function() {
          updateShortDescription(req, res);
        });
      });
    });
  });
}

/**
 * update short description
 */
 var updateShortDescription = function(req, res) {
   models.ClassificationShortDescription.findAll({
     where: {ClassificationId: req.params.id}
   }).then(function(classifications) {
       var updateRecords = [];
       var addRecords = [];
       var deleteRecords = [];
       for(var i = 0; i<req.body.shortDescription.length; i++) {
         var classification = req.body.shortDescription[i];
         if(common.keyvalueExistsin('id', classification.id, classifications)) {
           updateRecords.push(classification);
         } else {
           addRecords.push(classification);
         }
       }
       for(var i = 0; i<classifications.length; i++) {
         var classification = classifications[i]
         if(!common.keyvalueExistsin('id', classification.id, req.body.shortDescription)) {
           deleteRecords.push(classification);
         }
       }
       var reformattedDescriptions = common.classification(addRecords, req.params.id);
       models.ClassificationShortDescription.bulkCreate(reformattedDescriptions).then(function() {
         async.each(updateRecords,
           function(item, callback) {
             models.ClassificationShortDescription.find({
               where: {id: item.id}
             }).then(function(data) {
               data.updateAttributes({
                 language: item.language,
                 description: item.description
               }).then(function(){
                 callback();
               });
             });
           },
           function(){
             async.each(deleteRecords,
               function(item, callback) {
                 models.ClassificationShortDescription.find({
                   where: {id: item.id}
                 }).then(function(data){
                   data.destroy().then(function(){
                   callback();
                 });
                });
          },
        function() {
          res.json(204);
        });
      });
    });
  });
}


/**
 * classification destroy
 */
 exports.destroy = function(req, res) {
   models.ClassificationLongDescription.destroy({where:{ClassificationId: req.params.id}}).then(function(){
     models.ClassificationShortDescription.destroy({where:{ClassificationId: req.params.id}}).then(function(){
       models.Classification.destroy({where:{id: req.params.id}}).then(function(){
         res.json(204);
       }).catch(function(error) {
         res.status(500).json(error);
       });
     }).catch(function(error) {
       res.status(500).json(error);
     });
   }).catch(function(error) {
     res.status(500).json(error);
   });
 }

/*
  APT to search Classifications.
*/
exports.searchdata = function(req,res){
    var tenantrequiredJoin = (req.body.tenant && req.body.tenant.length > 0) ? true : false;
    var shortrequiredJoin = (req.body.shortDesc && req.body.shortDesc.length > 0) ? true : false;
    var longrequiredJoin = (req.body.longDesc && req.body.longDesc.length > 0) ? true : false;
    models.Classification.findAll({
    where: {
      classificationId: {
        $like:"%"+req.body.classificationId+"%"
      },
      versionNo: {
        $like: "%"+req.body.versionNo+"%"
      },
      type: {
        $like: "%"+req.body.type+"%"
      }
    },
    include: [{
      model: models.Tenant,
      required: tenantrequiredJoin,
      where: {
        name: {
          $like: "%"+req.body.tenant+"%"
        }
      }
    },
    {
      model: models.ClassificationShortDescription,
      required: shortrequiredJoin,
      where: {
        description: {
          $like: "%"+req.body.shortDesc+"%"
        }
      }
    },
    {
      model: models.ClassificationLongDescription,
      required: longrequiredJoin,
      where: {
        description: {
          $like: "%"+req.body.longDesc+"%"
        }
      }
    }]
  }).then(function(classification){
    res.status(200).json(classification);
  }).catch(function(error){
    res.status(500).json(error);
  });
};
