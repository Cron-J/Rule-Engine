var models = require('../../models'),
    async = require('async'),
    common = require("../../utils/common.js");
/*
  To get all the Attribute Section's list.
*/

exports.index = function(req,res){
  models.AttributeSection.findAll({
    include: [ models.AttributeSectionName , models.AttributeSectionDescription]
  }).then(function(attributeSections) {
    res.status(200).json(attributeSections);
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  To get an Attribute Section By id.
*/
exports.attributeSectionById = function(req,res){
  models.AttributeSection.find({
    where: { id: req.params.id },
    include: [ models.AttributeSectionName , models.AttributeSectionDescription]
  }).then(function(attributeSection) {
    res.status(200).json(attributeSection);
  }).catch(function(error){
    res.status(404).json(error);
  });
};


/*
  API to get the Attribute Section by AttributeSectionID.
*/
exports.attributeByAttributeSectionId = function(req,res){
  models.AttributeSection.find({
    where: {attributeSectionId: req.params.attributeSectionId},
    include: [ models.AttributeSectionName , models.AttributeSectionDescription]
  }).then(function(attributeSection){
    res.status(200).json(attributeSection);
  }).catch(function(error){
    res.status(404).json(error);
  });
};

/*
  API to create Attribute Section  with Attribute Section name and Attribute section description.
*/
exports.create = function(req, res) {
  models.AttributeSection.create({
    attributeSectionId: req.body.attributeSectionId,
    orderNo: req.body.orderNo
  }).then(function(AttributeSection) {
    if(req.body.names){
      var reformattedArray = common.attributeSection(req.body.names,AttributeSection.id);
      models.AttributeSectionName.bulkCreate(reformattedArray).then(function(AttributeSectionName) {
        if(req.body.descriptions){
          var reformattedArray = common.attributeSection(req.body.descriptions,AttributeSection.id);
          models.AttributeSectionDescription.bulkCreate(reformattedArray)
          .then(function(AttributeSectionDescription) {
            res.status(200).json();
          }).catch(function(error){
            res.status(500).json(error);
          });
        }else res.status(200).json();
      }).catch(function(error){
        res.status(500).json(error);
      });
    } else res.status(200).json();
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  API to update Attribute Section.
*/
exports.update = function(req,res){
  models.AttributeSection.find({
    where: {id: req.params.id},
    include: [models.AttributeSectionName , models.AttributeSectionDescription]
  }).then(function(AttributeSection){
    AttributeSection.updateAttributes({
      orderNo: req.body.orderNo
    }).then(function(attributeSection) {
       updateNames(req,res);
    }).catch(function(error){
      res.status(500).json(error);
    });
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/**
 * update names from request object
 */
 var updateNames = function(req, res) {
   models.AttributeSectionName.findAll({
     where: {AttributeSectionId: req.params.id}
   }).then(function(attributeSectionNames) {
     var updateRecords = [];
     var addRecords = [];
     var deleteRecords = [];
     for(var i = 0; i<req.body.names.length; i++) {
       var attributeSectionName = req.body.names[i];
       if(common.keyvalueExistsin('id', attributeSectionName.id, attributeSectionNames)) {
         updateRecords.push(attributeSectionName);
       } else {
         addRecords.push(attributeSectionName);
       }
     }
     for(var i = 0; i<attributeSectionNames.length; i++) {
       var attributeSectionName = attributeSectionNames[i]
       if(!common.keyvalueExistsin('id', attributeSectionName.id, req.body.names)) {
         deleteRecords.push(attributeSectionName);
       }
     }
     var reformattedNames = common.attributeSection(addRecords, req.params.id);
     models.AttributeSectionName.bulkCreate(reformattedNames).then(function() {
       async.each(updateRecords,
         function(item, callback) {
           models.AttributeSectionName.find({
             where: {id: item.id}
           }).then(function(data) {
             data.updateAttributes({
               language: item.language,
               name: item.name
             }).then(function(){
               callback();
             });
           });
         },
         function(){
           async.each(deleteRecords,
             function(item, callback) {
               models.AttributeSectionName.find({
                 where: {id: item.id}
               }).then(function(data){
                 data.destroy().then(function(){
                   callback();
                 });
               });
             },
             function() {
               updateDescriptions(req, res);
             });
           });
         });
       });
     }

  /**
    * update descriptions from request object
  */
 var updateDescriptions = function(req, res) {
   models.AttributeSectionDescription.findAll({
     where: {AttributeSectionId: req.params.id}
   }).then(function(attributeSectionDescriptions) {
     var updateRecords = [];
     var addRecords = [];
     var deleteRecords = [];
     for(var i = 0; i <req.body.descriptions.length; i++) {
       var attributeSectionDescription = req.body.descriptions[i];
       if(common.keyvalueExistsin('id', attributeSectionDescription.id, attributeSectionDescriptions)) {
         updateRecords.push(attributeSectionDescription);
       } else {
         addRecords.push(attributeSectionDescription);
       }
     }
     for(var i = 0; i < attributeSectionDescriptions.length; i++) {
       var attributeSectionDescription = attributeSectionDescriptions[i];
       if(!common.keyvalueExistsin('id', attributeSectionDescription.id, req.body.descriptions)) {
         deleteRecords.push(attributeSectionDescription);
       }
     }
     var reformattedDescriptions = common.attributeSection(addRecords, req.params.id);
     models.AttributeSectionDescription.bulkCreate(reformattedDescriptions).then(function() {
       async.each(updateRecords,
         function(item, callback) {
           models.AttributeSectionDescription.find({
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
               models.AttributeSectionDescription.find({
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
  Delete one attribute section by id.
*/
exports.destroy = function(req,res){
  models.Attribute.find({
    where: {AttributeSectionId: req.params.id}
  }).then(function(Attributes){
    if(Attributes != null){
      res.status(500).json({error:"this attribute section is assigned in attribute, so can not be deleted."});
    }else{
      models.AttributeSection.find({
        where: {id: req.params.id}
      }).then(function(attributeSection) {
        attributeSection.destroy().then(function(u) {
          res.json(204);
        }).catch(function(error){
          res.status(500).json(error);
        });
      }).catch(function(error){
        res.status(500).json(error);
      });
    }
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  APT to search Attribute Sections.
*/
exports.search = function(req,res) {
  var requiredJoin = (req.body.name && req.body.name.length > 0) || (req.body.description && req.body.description.length > 0) ? true : false;
  models.AttributeSection.findAll({
    where: {
      attributeSectionId: {
        $like: "%"+req.body.attributeSectionId+"%"
      }
    },
    include: [{
      model: models.AttributeSectionName,
      required: requiredJoin,
      where: {
        name: {
          $like: "%"+req.body.name+"%"
        }
      }
    },
    {
      model: models.AttributeSectionDescription,
      required: requiredJoin,
      where: {
        description: {
          $like: "%"+req.body.description+"%"
        }
      }
    }]
  }).then(function(data){
    res.status(200).json(data);
  }).catch(function(error){
    res.status(500).json(error);
  });
};
