'use strict';
var models = require('../../models'),
    async = require('async'),
    common = require('../../utils/common.js');
/*
  API to get the list of attribute.
*/
exports.index =  function(req,res){
  models.Attribute.findAll({
    include: [models.AttributeSection,models.AttributeLongDescription,models.AttributeShortDescription]
  }).then(function(attribute){
    console.log('attribute0', attribute);
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
    unitOfMeasure: req.body.unitOfMeasure,
    orderNo: req.body.orderNo,
    isMultivalued: req.body.isMultivalued,
    isRequired: req.body.isRequired,
    isMultiLanguage: req.body.isMultiLanguage,
    isVariable: req.body.isVariable,
    isReadonly: req.body.isReadonly,
    AttributeSectionId: req.body.AttributeSectionId,
    type: req.body.type,
    valueOption: req.body.valueOption
  }).then(function(attribute){
      var longDesc = common.attribute(req.body.longDesc,attribute.id);
      models.AttributeLongDescription.bulkCreate(longDesc).then(function(longDesc){
        var shortDesc = common.attribute(req.body.shortDesc,attribute.id);
        models.AttributeShortDescription.bulkCreate(shortDesc).then(function(shortDesc){
          res.json(200);
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
      type: req.body.type,
      valueOption: req.body.valueOption
    }).then(function(attribute){
      updateLongDescription(req,res);
    });
  }).catch(function(error){
    res.status(404).json(error)
  });
};

var updateLongDescription = function(req,res){
  async.each(req.body.longDesc,
    function(item, callback){
      models.AttributeLongDescription.find({
        where: {id: item.id}
      }).then(function(lDesc){
        lDesc.updateAttributes({
        language: req.body.language,
        description: req.body.description
        }).then(function(attribute){
          callback();
        });
      });
    },
    function(err){
      updateShortDescripttion(req,res);
    }
  );
}
var updateShortDescripttion = function(req,res){
  async.each(req.body.shortDesc,
    function(item, callback){
      models.AttributeShortDescription.find({
        where: {id: item.id}
      }).then(function(sDesc){
        sDesc.updateAttributes({
        language: req.body.language,
        description: req.body.description
        }).then(function(attribute){
          callback();
        });
      });
    },
    function(err){
      res.json(204)
    }
  );
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
    res.json(200, attributes);
  }).catch(function(error){
    console.log("==",error);
    res.status(500).json(error);
  });
};


