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
      include: [models.ClassificationGroup]
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
    TenantId: req.body.TenantId,
    versionNo: req.body.versionNo,
    type: req.body.type,
    orderNo: req.body.orderNo,
    documentUrl1: req.body.documentUrl1,
    documentUrl2: req.body.documentUrl2,
    documentUrl3: req.body.documentUrl3
  }).then(function(classification){
    var longDescription = common.classification(req.body.longDescription,classification.id)
    models.classificationLongDescription.bulkCreate(longDescription)
    .then(function(longDescription){
      var shortDescription = common.classification(req.body.shortDescription,classification.id)
      models.classificationShortDescription.bulkCreate(shortDescription)
      .then(function(shortDescription){
        res.json(200);
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
      TenantId: req.body.TenantId,
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

var updateLongDescription = function(req,res){
  async.each(req.body.longDesc,
    function(item, callback){
      models.ClassificationLongDescription.find({
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
      models.ClassificationShortDescription.find({
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
  API to delete Classification.
*/
exports.destroy =  function(req,res){
  models.Classification.find({
    where: {id: req.params.id}
  }).then(function(classification){
    if(classification){
      classification.destroy();
      res.json(204);
    }else{
      res.json({error:"No Attribute exist with this identity in database."});
    }
  }).catch(function(error){
    res.status(500).json(error);
  });
};

/*
  APT to search Classifications.
*/
exports.searchdata = function(req,res){

    models.Classification.findAll({
    where: { $or: [{classificationId: "%"+req.body.classificationId+"%"}, {versionNo: "%"+req.body.versionNo+"%"}, {type:"%"+req.body.type+"%"}] },
    include: [{
      model: models.Tenant,
      where: {
        name: {
          $like: "%"+req.body.name+"%"
        }
      }
    },
    {
      model: models.ClassificationShortDescription,
      where: {
        description: {
          $like: "%"+req.body.shortDesc+"%"
        }
      }
    },
    {
      model: models.ClassificationLongDescription,
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



