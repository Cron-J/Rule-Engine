'use strict';
var models = require('../../models'),
    async = require('async'),
    common = require('../../utils/common.js'),
    staticData = require('../../utils/staticData.js'),
    cc = require('currency-codes');
/*
  API to get the list of attribute.
*/
exports.index =  function(req,res){
  models.Attribute.findAll({
    include: [models.AttributeSection,models.AttributeLongDescription,models.AttributeShortDescription]
  }).then(function(attribute){
    res.status(200).json(attribute);
  }).catch(function(error){
    res.status(404).json(error);
  });
};

/*
  API to get the Attribuute by ID.
*/
exports.getOne =  function(req,res){
    models.Attribute.find({
      where: {id: req.params.id},
      include: [models.AttributeSection,models.AttributeLongDescription,models.AttributeShortDescription]
    }).then(function(attribute){
      res.status(200).json(attribute);
    }).catch(function(error){
      res.status(404).json(error);
    });
};

/*
  API to get Attribute detail based on attributeId.
*/
exports.attributeByAttributeId = function(req,res){
  models.Attribute.find({
    where: {attributeId: req.params.attributeId},
    include: [models.AttributeSection,models.AttributeLongDescription,models.AttributeShortDescription]
  }).then(function(attribute){
    res.status(200).json(attribute);
  }).catch(function(error){
    res.status(404).json(error);
  });
};

/*
  API to create the Attribute.
*/
exports.create =  function(req,res){
  models.Attribute.create({
    attributeId: req.body.attributeId,
    extAttributeId: req.body.extAttributeId,
    extDefaultName: req.body.extDefaultName,
    unitOfMeasure: req.body.unitOfMeasure,
    orderNo: req.body.orderNo,
    isMultivalued: req.body.isMultivalued,
    isRequired: req.body.isRequired,
    isMultiLanguage: req.body.isMultiLanguage,
    isVariable: req.body.isVariable,
    isReadonly: req.body.isReadonly,
    AttributeSectionId: req.body.section.id,
    type: req.body.type,
    valueOption: req.body.valueOption
  }).then(function(attribute){
    console.log(attribute.id);
      var longDesc = common.attribute(req.body.longDescription,attribute.id);
      models.AttributeLongDescription.bulkCreate(longDesc).then(function(longDesc){
        var shortDesc = common.attribute(req.body.shortDescription,attribute.id);
        models.AttributeShortDescription.bulkCreate(shortDesc).then(function(shortDesc){
          res.status(200).json();
        })
      })          
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  API to Update Attribute.
*/
exports.update =  function(req,res){
  console.log('resssssssssss', req.body);
  models.Attribute.find({
    where: {id: req.param('id')}
  }).then(function(attribute){
    attribute.updateAttributes({
      attributeId: req.body.attributeId,
      extAttributeId: req.body.extAttributeId,
      descriptions: req.body.descriptions,
      unitOfMeasure: req.body.unitOfMeasure,
      orderNo: req.body.orderNo,
      isMultivalued: req.body.isMultivalued,
      isRequired: req.body.isRequired,
      isMultiLanguage: req.body.isMultiLanguage,
      isVariable: req.body.isVariable,
      isReadonly: req.body.isReadonly,
      AttributeSectionId: req.body.section.id,
      type: req.body.type,
      valueOption: req.body.valueOption
    }).then(function(attribute){
      updateLongDescription(req,res);
    });
  }).catch(function(error){
    res.status(404).json(error)
  });
};

  var updateLongDescription = function(req, res) {
    models.AttributeLongDescription.findAll({
      where: {AttributeId: req.params.id}
    }).then(function(attributeLongDescriptions) {
      var updateRecords = [];
      var addRecords = [];
      var deleteRecords = [];
      for(var i = 0; i <req.body.longDesc.length; i++) {
        var attributeLDescription = req.body.longDesc[i];
        if(common.keyvalueExistsin('id', attributeLDescription.id, attributeLongDescriptions)) {
          updateRecords.push(attributeLDescription);
        } else {
          addRecords.push(attributeLDescription);
        }
      }
      for(var i = 0; i < attributeLongDescriptions.length; i++) {
        var attributeLDescription = attributeLongDescriptions[i];
        if(!common.keyvalueExistsin('id', attributeLDescription.id, req.body.longDesc)) {
          deleteRecords.push(attributeLDescription);
        }
      }
      var reformattedLongDescriptions = common.attribute(addRecords, req.params.id);
      models.AttributeLongDescription.bulkCreate(reformattedLongDescriptions).then(function() {
        async.each(updateRecords,function(item, callback) {
          models.AttributeLongDescription.find({
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
          async.each(deleteRecords,function(item, callback) {
            models.AttributeLongDescription.find({
              where: {id: item.id}
            }).then(function(data){
              data.destroy().then(function(){
                callback();
              });
            });
          },
          function() {
            updateShortDescription(req,res);
          });
        });
      });
    });
  }

  var updateShortDescription = function(req, res) {
    models.AttributeShortDescription.findAll({
      where: {AttributeId: req.params.id}
    }).then(function(attributeShortDescriptions) {
      var updateRecords = [];
      var addRecords = [];
      var deleteRecords = [];
      for(var i = 0; i <req.body.shortDesc.length; i++) {
        var attributeSDescription = req.body.shortDesc[i];
        if(common.keyvalueExistsin('id', attributeSDescription.id, attributeShortDescriptions)) {
          updateRecords.push(attributeSDescription);
        } else {
          addRecords.push(attributeSDescription);
        }
      }
      for(var i = 0; i < attributeShortDescriptions.length; i++) {
        var attributeSDescription = attributeShortDescriptions[i];
        if(!common.keyvalueExistsin('id', attributeSDescription.id, req.body.shortDesc)) {
          deleteRecords.push(attributeSDescription);
        }
      }
      var reformattedShortDescriptions = common.attribute(addRecords, req.params.id);
      models.AttributeShortDescription.bulkCreate(reformattedShortDescriptions).then(function() {
        async.each(updateRecords,function(item, callback) {
          models.AttributeShortDescription.find({
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
          async.each(deleteRecords,function(item, callback) {
            models.AttributeShortDescription.find({
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

/*
  API to delete Attribute.
*/
exports.destroy =  function(req,res){
  models.Attribute.find({
    where: {id: req.params.id}
  }).then(function(attribute){
    if(attribute){
      attribute.destroy();
      res.json(204);
    }else{
      res.json({error:"No Attribute exist with this identity in database."});
    }
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  APT to search Attributes.
*/
exports.search = function(req,res){
  console.log("====",req.body);
  console.log("models", models);
  models.Attribute.findAll({
    include: [models.AttributeSection,models.AttributeLongDescription,models.AttributeShortDescription],
    where: { 
      $or: [
        {
          extAttributeId: {
            $like: "%"+req.body.extAttributeId
          }
        }, 
        {
          attributeId: {
            $like: "%"+req.body.attributeId
          }
        }
      ] 
    }
  }).then(function(attributes){
    res.status(200).json(attributes);
  }).catch(function(error){
    console.log("==",error);
    res.status(500).json(error);
  });
};

/** get static data*/
exports.getStaticData = function(req, res) {
    var obj = {};
    obj['measureList'] = staticData.measurementList();
    var array = cc.codes();
    var newArray = [];
    for( var index=0; index<array.length; index++ ){
        var obj1 = {};
        obj1['code'] = array[index];
        newArray.push(obj1);
    }
    obj['currencyCode'] = newArray;
    res.status(200).json(obj);
}


