"use strict";

module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define("product", {
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    tenantId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    supplierId: {
      type: DataTypes.STRING
    },
    statusId: {
      type: DataTypes.STRING
    },
    mfgProductId: DataTypes.STRING,
    mfgProductName: DataTypes.INTEGER,
    
    manufactererId: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },    

    manufactererName: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    extProductId: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    productIdExtension: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    unitOfMeasureId: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    
    salesUnitOfMeasureId: {
      type: DataTypes.JSON
    },
    
    keywords: {
      type: DataTypes.STRING
    },
    ean: {
      type: DataTypes.STRING
    },
    isMainProdLine: {
      type: DataTypes.BOOLEAN
    },
    isForSales: {
      type: DataTypes.BOOLEAN
    },
    isSpecialOffer: {
      type: DataTypes.BOOLEAN
    },
    isStocked: {
      type: DataTypes.BOOLEAN
    },
    isPunchout: {
      type: DataTypes.BOOLEAN
    },
    isConfigurable: {
      type: DataTypes.BOOLEAN
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
        product.hasMany(models.prices);
        product.hasMany(models.documents);
        product.hasMany(models.attribute_values);
        product.hasMany(models.contractedproducts);
        product.hasMany(models.product_relations);
        product.hasMany(models.classification_group_associations);
        product.hasMany(models.variants);
      }
    }
  });

  return product;
};