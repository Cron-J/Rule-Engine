"use strict";

module.exports = function(sequelize, DataTypes) {
  var product_relations = sequelize.define("product_relations", {
    relatedProductId: {
      type: DataTypes.STRING
    },
    relatedCatalogId: {
      type: DataTypes.STRING
    },
    typeId: {
      type: DataTypes.STRING
    },
    statusId: {
      type: DataTypes.STRING
    },
    syncTypeId: DataTypes.STRING,
    mfgProductName: DataTypes.STRING,
    
    selectionGroupId: {
      type: DataTypes.STRING
    },    

    quantity: {
      type: DataTypes.INTEGER
    },
    
    seqNo: {
      type:DataTypes.STRING
    },
    
    udxText1: {
      type: DataTypes.STRING
    },
    
    udxText2: {
      type: DataTypes.STRING
    },
    
    udxText3: {
      type: DataTypes.STRING
    },
    
    udxNum1: {
      type: DataTypes.INTEGER
    },
    udxNum2: {
      type: DataTypes.INTEGER
    },
    udxNum3: {
      type: DataTypes.INTEGER
    },
    udxSortKey1: {
      type: DataTypes.STRING
    },
    udxSortKey2: {
      type: DataTypes.STRING
    },
    udxSortKey3: {
      type: DataTypes.STRING
    },
    isMandatory: {
      type: DataTypes.BOOLEAN
    },
    isDefaultSelected: {
      type: DataTypes.BOOLEAN
    },
    descriptions: {
      type: DataTypes.JSON
    },
    validFrom: {
      type: DataTypes.STRING
    },
    validTo: {
      type: DataTypes.STRING
    },
    createdBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'},
    updatedBy: {type: DataTypes.STRING, defaultValue: 'jcadmin'}
  },
  {
    classMethods: {
      associate: function(models) {
        product_relations.belongsTo(models.product);
        }
    }
  }
  );

  return product_relations;
};