'use strict';
var models = require('../../models');
/*
  API to get the list of classification group.
*/
exports.index =  function(req,res){
  models.ClassificationGroup.findAll({
    include: []
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
      include: []
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
  models.ClassificationGroup.create({
    hierarchyCode: req.body.hierarchyCode,
    status: req.body.status,
    description: req.body.description,
    orderNo: req.body.orderNo,
    documentUrl1: req.body.documentUrl1,
    documentUrl2: req.body.documentUrl2,
    documentUrl3: req.body.documentUrl3,
    ClassificationId: req.body.ClassificationId,
    ClassificationGroupId: req.body.ClassificationGroupId
  }).then(function(classificationGroup){
    res.status(200).json(classificationGroup);
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  API to Update Classification group.
*/
exports.update =  function(req,res){
  models.ClassificationGroup.find({
    where: {id: req.params.id}
  }).then(function(classificationGroup){
    classificationGroup.updateAttributes({
      hierarchyCode: req.body.hierarchyCode,
      status: req.body.status,
      description: req.body.description,
      orderNo: req.body.orderNo,
      documentUrl1: req.body.documentUrl1,
      documentUrl2: req.body.documentUrl2,
      documentUrl3: req.body.documentUrl3,
      ClassificationId: req.body.ClassificationId,
      ClassificationGroupId: req.body.ClassificationGroupId
    }).then(function(classificationGroup){
    }).catch(function(error){
      res.status(500).json(error);
    });
  }).catch(function(error){
    res.status(500).json(error);
  });
};

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
