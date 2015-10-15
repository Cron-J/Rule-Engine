'use strict';
var models = require('../../models'),
common = require("../../utils/common.js"),
async = require('async');
/*
  API to get the list of classification group.
*/
exports.index =  function(req,res){
  models.ClassificationGroup.findAll({
    include: [models.ClassgrpLongDescription,models.ClassgrpShortDescription]
  }).then(function(attribute){
    res.status(200).json(attribute);
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  API to get the classification group by ID.
*/
exports.getOne =  function(req,res){
    models.ClassificationGroup.find({
      where: {id: req.params.id},
      include: [{
        model: models.ClassgrpShortDescription,
        required: false
      },
      {
        model: models.ClassgrpLongDescription,
        required: false
      },
      {
        model: models.ClassGrpToAttribute,
        required: false
      }]
    }).then(function(classificationGroup){
      res.status(200).json(classificationGroup);
    }).catch(function(error){
      res.status(500).json(error);
    });
};

/**
 * to get the classification group data
 */
 exports.getClassification = function(req, res) {
   models.ClassificationGroup.findAll({
     where: {ClassificationId: req.params.id},
     include: [models.ClassgrpShortDescription, models.ClassgrpLongDescription]
   }).then(function(classificationGroup){
     res.status(200).json(classificationGroup);
   }).catch(function(error){
     res.status(500).json(error);
   });
 };


/*
  API to create the Classification group.
*/
exports.create =  function(req,res){
  var createData = {
      hierarchyCode: req.body.hierarchycode,
      status: req.body.status,
      description: req.body.description,
      orderNo: req.body.orderNo,
      documentUrl1: req.body.documentUrl1,
      documentUrl2: req.body.documentUrl2,
      documentUrl3: req.body.documentUrl3,
      ClassificationId: req.body.classificationId
    };
  if(req.body.classificationgroupId > 0) {
    createData['ClassificationGroupId'] = req.body.classificationgroupId;
  }

  models.ClassificationGroup.create(createData).then(function(classificationGroup){
    var reformattedShortDescription = common.classificationGroup(req.body.shortDescription, classificationGroup.id);
    var reformattedLongDescription = common.classificationGroup(req.body.longDescription, classificationGroup.id);
    models.ClassgrpLongDescription.bulkCreate(reformattedLongDescription).then(function(classgrplong){
      models.ClassgrpShortDescription.bulkCreate(reformattedShortDescription).then(function() {
        if(req.body.attributes) {
          var reformattedclassificationarray = common.classificationGroup(req.body.attributes, classificationGroup.id);
          models.ClassGrpToAttribute.bulkCreate(reformattedclassificationarray).then(function(classificationattributes) {
            res.status(200).json(classificationGroup);
          }).catch(function(error){
            res.status(500).json(error);
          });
        } else {
          res.status(200).json(classificationGroup);
        }
      }).catch(function(error){
        res.status(500).json(error);
      })
    }).catch(function(error){
        res.status(500).json(error);
    });
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/**
 * search the classification group data
 */
 exports.search = function(req, res) {
   var classification_where_clause = {};
   if(req.body.id && req.body.id > 0) {
     classification_where_clause['id'] = req.body.id;
   }
   if(req.body.classificationId) {
     classification_where_clause['ClassificationId'] = req.body.classificationId;
   }
   var requireddescription = req.body.description && req.body.description.length > 0 ? true : false;
   models.ClassificationGroup.findAll({
     where : classification_where_clause,
     include: [{
       model: models.ClassgrpShortDescription,
       required: requireddescription,
       where: {
         description: {
           $like: "%"+req.body.description+"%"
         }
       }
     },
     {
       model: models.ClassgrpLongDescription,
       required: false
     }]
   }).then(function(classificationgroup){
     res.status(200).json(classificationgroup);
   }).catch(function(error){
     res.status(500).json(error);
   });
 }


/*
  API to Update Classification group.
*/
exports.update =  function(req,res){
  var createData = {
      hierarchyCode: req.body.hierarchycode,
      status: req.body.status,
      description: req.body.description,
      orderNo: req.body.orderNo,
      documentUrl1: req.body.documentUrl1,
      documentUrl2: req.body.documentUrl2,
      documentUrl3: req.body.documentUrl3,
      ClassificationId: req.body.classificationId
    };
  if(req.body.classificationgroupId > 0) {
    createData['ClassificationGroupId'] = req.body.classificationgroupId;
  }
  models.ClassificationGroup.find({
    where: {id: req.params.id}
  }).then(function(classificationGroup){
    classificationGroup.updateAttributes(createData).then(function(classificationGroup){
      updateLongDescription(req, res, function(req, res) {
        updateShortDescription(req, res, function(req, res){
          updateGroupAttributes(req,res,function(res, error){
            if(error) {
              res.status(500).json(error);
            } else {
              res.status(200).json(classificationGroup);
            }
          });
        });
      });
    }).catch(function(error){
      res.status(500).json(error);
    });
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/**
 * to update long description
 */
var updateLongDescription = function(req, res, next) {
  models.ClassgrpLongDescription.findAll({
    where: {ClassificationGroupId: req.params.id}
  }).then(function(classificationgroupLongDescriptions) {
    var updateRecords = [];
    var addRecords = [];
    var deleteRecords = [];
    for(var i = 0; i <req.body.longDescription.length; i++) {
      var classificationgroupdescription = req.body.longDescription[i];
      if(common.keyvalueExistsin('id', classificationgroupdescription.id, classificationgroupLongDescriptions)) {
        updateRecords.push(classificationgroupdescription);
      } else {
        addRecords.push(classificationgroupdescription);
      }
    }
    for(var i = 0; i < classificationgroupLongDescriptions.length; i++) {
      var classificationgroupdescription = classificationgroupLongDescriptions[i];
      if(!common.keyvalueExistsin('id', classificationgroupdescription.id, req.body.longDescription)) {
        deleteRecords.push(classificationgroupdescription);
      }
    }
    var reformattedDescriptions = common.classificationGroup(addRecords, req.params.id);
    models.ClassgrpLongDescription.bulkCreate(reformattedDescriptions).then(function() {
      async.each(updateRecords,
        function(item, callback) {
          models.ClassgrpLongDescription.find({
            where: {id: item.id}
          }).then(function(data){
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
              models.ClassgrpLongDescription.find({
                where: {id: item.id}
              }).then(function(data){
                data.destroy().then(function(){
                  callback();
                });
              });
            },
            function() {
              next(req, res);
            });
          });
        });
      });
}
 /**
  * to update short description
  */
var updateShortDescription = function(req, res, next) {
  models.ClassgrpShortDescription.findAll({
    where: {ClassificationGroupId: req.params.id}
  }).then(function(classificationgroupShortDescriptions) {
    var updateRecords = [];
    var addRecords = [];
    var deleteRecords = [];
    for(var i = 0; i <req.body.shortDescription.length; i++) {
      var classificationgroupdescription = req.body.shortDescription[i];
      if(common.keyvalueExistsin('id', classificationgroupdescription.id, classificationgroupShortDescriptions)) {
        updateRecords.push(classificationgroupdescription);
      } else {
        addRecords.push(classificationgroupdescription);
      }
    }
    for(var i = 0; i < classificationgroupShortDescriptions.length; i++) {
      var classificationgroupdescription = classificationgroupShortDescriptions[i];
      if(!common.keyvalueExistsin('id', classificationgroupdescription.id, req.body.shortDescription)) {
        deleteRecords.push(classificationgroupdescription);
      }
    }
    var reformattedDescriptions = common.classificationGroup(addRecords, req.params.id);
    models.ClassgrpShortDescription.bulkCreate(reformattedDescriptions).then(function() {
      async.each(updateRecords,
        function(item, callback) {
          models.ClassgrpShortDescription.find({
            where: {id: item.id}
          }).then(function(data){
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
              models.ClassgrpShortDescription.find({
                where: {id: item.id}
              }).then(function(data){
                data.destroy().then(function(){
                  callback();
                });
              });
            },
            function() {
              next(req, res);
            });
          });
        });
      });
}

/**
 * update attributes
 */
 var updateGroupAttributes  = function(req, res, next) {
   models.ClassGrpToAttribute.findAll({
     where: {ClassificationGroupId: req.params.id}
   }).then(function(classificationGroupAttributes) {
     var updateRecords = [];
     var addRecords = [];
     var deleteRecords = [];
     for(var i = 0; i <req.body.attributes.length; i++) {
       var classificationgroupattribute = req.body.attributes[i];
       if(common.keyvalueExistsin('id', classificationgroupattribute.id, classificationGroupAttributes)) {
         updateRecords.push(classificationgroupattribute);
       } else {
         addRecords.push(classificationgroupattribute);
       }
     }
     for(var i = 0; i < classificationGroupAttributes.length; i++) {
       var classificationgroupattribute = classificationGroupAttributes[i];
       if(!common.keyvalueExistsin('id', classificationgroupattribute.id, req.body.attributes)) {
         deleteRecords.push(classificationgroupattribute);
       }
     }
     var reformattedattributes = common.classificationGroup(addRecords, req.params.id);
     models.ClassGrpToAttribute.bulkCreate(reformattedattributes).then(function() {
       async.each(updateRecords,
         function(item, callback) {
           models.ClassGrpToAttribute.find({
             where: {id: item.id}
           }).then(function(data){
             data.updateAttributes({
               AttributeId: item.AttributeId,
               sortNo: item.sortNo,
               grpId: item.grpId
             }).then(function(){
               callback();
             });
           });
         },
         function(){
           async.each(deleteRecords,
             function(item, callback) {
               models.ClassGrpToAttribute.find({
                 where: {id: item.id}
               }).then(function(data){
                 data.destroy().then(function(){
                   callback();
                 });
               });
             },
             function() {
               next(res);
             });
           });
         });
   }).catch(function(error){
     next(res, error);
   });
 }

/*
  API to delete Classification group.
*/
exports.destroy =  function(req,res){
  models.ClassificationGroup.find({
    where: {id: req.params.id}
  }).then(function(classificationGroup){
    if(classificationGroup){
      classificationGroup.destroy();
      res.json(204);
    }else{
      res.json({error:"No Attribute exist with this identity in database."});
    }
  }).catch(function(error){
    res.status(500).json(error);
  });
};
